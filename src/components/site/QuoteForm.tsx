import { useEffect, useId, useRef, useState, type ChangeEvent, type ReactNode } from "react";
import {
  ImagePlus,
  RefreshCw,
  Trash2,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Info,
  Copy,
  Paperclip,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { cn } from "@/lib/utils";
import { BUSINESS, whatsappChatUrl } from "@/lib/site";
import {
  BUDGET_OPTIONS,
  buildEnquiryMessage,
  emptyEnquiry,
  formatFileSize,
  validateEnquiry,
  validateImageFile,
  type Enquiry,
  type EnquiryErrors,
} from "@/lib/enquiry";

type Status =
  | { kind: "idle" }
  | { kind: "invalid" }
  | { kind: "sharing" }
  | { kind: "shared" }
  | { kind: "cancelled" }
  | { kind: "share-failed" }
  | { kind: "fallback-image" }
  | { kind: "opened" };

const FIELD_ORDER: (keyof Enquiry)[] = ["name", "phone", "product", "link", "quantity"];

export function QuoteForm({ initialService }: { initialService?: string }) {
  const formId = useId();
  const [data, setData] = useState<Enquiry>(() => ({
    ...emptyEnquiry,
    details: initialService ? `I'm interested in: ${initialService}.` : "",
  }));
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [touched, setTouched] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [copied, setCopied] = useState(false);
  const [canShareFiles, setCanShareFiles] = useState<boolean | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  // Detect file-sharing support after hydration.
  useEffect(() => {
    try {
      const probe = new File(["x"], "probe.png", { type: "image/png" });
      setCanShareFiles(typeof navigator.canShare === "function" && navigator.canShare({ files: [probe] }));
    } catch {
      setCanShareFiles(false);
    }
  }, []);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  useEffect(() => {
    if (status.kind !== "idle" && status.kind !== "sharing") {
      statusRef.current?.focus({ preventScroll: false });
    }
  }, [status]);

  const message = buildEnquiryMessage(data, !!file);

  const update = (key: keyof Enquiry) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const next = { ...data, [key]: e.target.value };
    setData(next);
    if (touched) setErrors(validateEnquiry(next));
  };

  const onPickFile = (e: ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files?.[0];
    e.target.value = "";
    if (!picked) return;
    const err = validateImageFile(picked);
    if (err) {
      setFileError(err);
      return;
    }
    setFileError(null);
    setFile(picked);
  };

  const removeFile = () => {
    setFile(null);
    setFileError(null);
  };

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const openWhatsApp = () => {
    window.open(whatsappChatUrl(message), "_blank", "noopener,noreferrer");
  };

  const handleShare = async () => {
    setTouched(true);
    const errs = validateEnquiry(data);
    setErrors(errs);
    const firstInvalid = FIELD_ORDER.find((k) => errs[k]);
    if (firstInvalid) {
      setStatus({ kind: "invalid" });
      document.getElementById(`${formId}-${firstInvalid}`)?.focus();
      return;
    }

    // No photo: open a chat with Tujaze directly, message prefilled.
    if (!file) {
      openWhatsApp();
      setStatus({ kind: "opened" });
      return;
    }

    const shareData: ShareData = { text: message, files: [file] };
    const supported =
      typeof navigator.share === "function" &&
      typeof navigator.canShare === "function" &&
      navigator.canShare(shareData);

    if (!supported) {
      openWhatsApp();
      setStatus({ kind: "fallback-image" });
      return;
    }

    // Some apps drop the text when a photo is shared, so keep a copy ready to paste.
    navigator.clipboard?.writeText(message).catch(() => {});
    setStatus({ kind: "sharing" });
    try {
      await navigator.share(shareData);
      setStatus({ kind: "shared" });
    } catch (err) {
      const name = err instanceof DOMException ? err.name : "";
      setStatus({ kind: name === "AbortError" ? "cancelled" : "share-failed" });
    }
  };

  const errorCount = Object.keys(errors).length;

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        void handleShare();
      }}
      className="space-y-10"
      aria-describedby={`${formId}-req`}
    >
      <p id={`${formId}-req`} className="text-sm text-muted-foreground">
        Fields marked <span className="text-burgundy">*</span> are required.
      </p>

      <Fieldset legend="Your details">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id={`${formId}-name`} label="Full name" required error={errors.name}>
            <input
              id={`${formId}-name`}
              className="field"
              autoComplete="name"
              value={data.name}
              onChange={update("name")}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? `${formId}-name-err` : undefined}
              placeholder="e.g. Jane Wanjiku"
            />
          </Field>
          <Field id={`${formId}-phone`} label="Phone number" required error={errors.phone}>
            <input
              id={`${formId}-phone`}
              type="tel"
              inputMode="tel"
              className="field"
              autoComplete="tel"
              value={data.phone}
              onChange={update("phone")}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? `${formId}-phone-err` : undefined}
              placeholder="e.g. 0712 345 678"
            />
          </Field>
        </div>
      </Fieldset>

      <Fieldset legend="The product">
        <div className="space-y-5">
          <Field id={`${formId}-product`} label="Product name / description" required error={errors.product}>
            <input
              id={`${formId}-product`}
              className="field"
              value={data.product}
              onChange={update("product")}
              aria-invalid={!!errors.product}
              aria-describedby={errors.product ? `${formId}-product-err` : undefined}
              placeholder="e.g. Stainless steel water bottles, 750 ml"
            />
          </Field>

          {/* Image upload */}
          <div>
            <p className="text-sm font-semibold text-ink">
              Product image <span className="font-normal text-muted-foreground">(optional)</span>
            </p>
            <input
              ref={fileInput}
              id={`${formId}-image`}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={onPickFile}
              aria-describedby={`${formId}-image-help`}
            />
            {!file ? (
              <label
                htmlFor={`${formId}-image`}
                className="mt-2 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-input bg-card px-6 py-9 text-center transition-colors hover:border-gold-muted hover:bg-accent/40 focus-within:border-burgundy"
              >
                <span className="flex size-12 items-center justify-center rounded-full bg-accent">
                  <ImagePlus className="size-6 text-burgundy" strokeWidth={1.5} />
                </span>
                <span className="text-sm font-semibold text-ink">Choose a photo from your device</span>
                <span id={`${formId}-image-help`} className="text-xs text-muted-foreground">
                  JPG, PNG, WEBP or HEIC · up to 10 MB
                </span>
              </label>
            ) : (
              <div className="mt-2 flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center">
                {preview && (
                  <img
                    src={preview}
                    alt="Preview of the selected product"
                    className="h-40 w-full rounded-lg object-cover sm:h-24 sm:w-24"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink" title={file.name}>
                    {file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                </div>
                <div className="flex gap-2">
                  <Button type="button" variant="outline" size="sm" onClick={() => fileInput.current?.click()}>
                    <RefreshCw /> Replace
                  </Button>
                  <Button type="button" variant="ghost" size="sm" onClick={removeFile} className="text-destructive">
                    <Trash2 /> Remove
                  </Button>
                </div>
              </div>
            )}
            {fileError && (
              <p role="alert" className="mt-2 flex items-center gap-1.5 text-sm text-destructive">
                <AlertTriangle className="size-4" /> {fileError}
              </p>
            )}
          </div>

          <Field id={`${formId}-link`} label="Product link" optional error={errors.link}>
            <input
              id={`${formId}-link`}
              type="url"
              inputMode="url"
              className="field"
              value={data.link}
              onChange={update("link")}
              aria-invalid={!!errors.link}
              aria-describedby={errors.link ? `${formId}-link-err` : undefined}
              placeholder="https://… (Alibaba, 1688, Taobao, etc.)"
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field id={`${formId}-quantity`} label="Quantity required" required error={errors.quantity}>
              <input
                id={`${formId}-quantity`}
                className="field"
                value={data.quantity}
                onChange={update("quantity")}
                aria-invalid={!!errors.quantity}
                aria-describedby={errors.quantity ? `${formId}-quantity-err` : undefined}
                placeholder="e.g. 500 pieces"
              />
            </Field>
            <Field id={`${formId}-budget`} label="Estimated budget" optional>
              <select id={`${formId}-budget`} className="field" value={data.budget} onChange={update("budget")}>
                <option value="">Select a range</option>
                {BUDGET_OPTIONS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field id={`${formId}-details`} label="Additional instructions" optional>
            <textarea
              id={`${formId}-details`}
              rows={4}
              className="field resize-y"
              value={data.details}
              onChange={update("details")}
              placeholder="Colours, sizes, materials, branding, when you need it…"
            />
          </Field>
        </div>
      </Fieldset>

      {/* Message preview */}
      <details className="group rounded-xl border border-border bg-card">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-sm font-semibold text-ink">
          Preview your WhatsApp message
          <span className="text-xs font-medium text-muted-foreground group-open:hidden">Show</span>
          <span className="hidden text-xs font-medium text-muted-foreground group-open:inline">Hide</span>
        </summary>
        <pre className="whitespace-pre-wrap border-t border-border px-5 py-4 font-sans text-sm leading-relaxed text-ink-soft">
          {message}
        </pre>
      </details>

      {/* Submit */}
      <div className="space-y-4">
        {status.kind === "invalid" && errorCount > 0 && (
          <p role="alert" className="flex items-center gap-2 text-sm font-medium text-destructive">
            <AlertTriangle className="size-4" /> Please complete the highlighted {errorCount === 1 ? "field" : "fields"}.
          </p>
        )}
        <Button type="submit" size="xl" className="w-full sm:w-auto" disabled={status.kind === "sharing"}>
          {status.kind === "sharing" ? (
            <>
              <Loader2 className="animate-spin" /> Opening share options…
            </>
          ) : (
            <>
              <WhatsAppIcon className="size-5" /> Share Enquiry via WhatsApp
            </>
          )}
        </Button>
        <p className="flex gap-2 text-xs leading-relaxed text-muted-foreground">
          <Info className="mt-0.5 size-3.5 shrink-0" />
          {file && canShareFiles
            ? `Your phone’s share menu will open. Choose WhatsApp, then pick Tujaze (${BUSINESS.whatsappDisplay}) and tap send.`
            : file
              ? "WhatsApp will open with your message. You’ll attach the photo yourself in the chat."
              : `WhatsApp will open a chat with Tujaze (${BUSINESS.whatsappDisplay}) with your message ready to send.`}{" "}
          Nothing is stored on this website.
        </p>
      </div>

      <div ref={statusRef} tabIndex={-1} aria-live="polite" className="outline-none">
        <StatusPanel status={status} onOpen={openWhatsApp} onCopy={copyMessage} copied={copied} />
      </div>
    </form>
  );
}

function StatusPanel({
  status,
  onOpen,
  onCopy,
  copied,
}: {
  status: Status;
  onOpen: () => void;
  onCopy: () => void;
  copied: boolean;
}) {
  if (status.kind === "idle" || status.kind === "invalid" || status.kind === "sharing") return null;

  const content: Record<string, { tone: "ok" | "warn"; title: string; body: ReactNode }> = {
    shared: {
      tone: "ok",
      title: "Almost there — finish in WhatsApp",
      body: (
        <>
          Pick Tujaze ({BUSINESS.whatsappDisplay}) as the recipient and send. Your message was also copied — if the
          text doesn’t appear next to the photo, just paste it.
        </>
      ),
    },
    cancelled: {
      tone: "warn",
      title: "Sharing was cancelled",
      body: "No problem — your details are still here. Tap the button again whenever you’re ready.",
    },
    "share-failed": {
      tone: "warn",
      title: "Your device couldn’t share the photo",
      body: (
        <>
          Open WhatsApp with your message instead, then attach the photo using the <Paperclip className="inline size-3.5" /> icon
          in the chat. Your details are still here.
        </>
      ),
    },
    "fallback-image": {
      tone: "warn",
      title: "Remember to attach your photo",
      body: (
        <>
          WhatsApp opened with your message. Your device can’t attach photos automatically, so add your product photo using
          the <Paperclip className="inline size-3.5" /> icon in the chat before sending.
        </>
      ),
    },
    opened: {
      tone: "ok",
      title: "WhatsApp opened with your enquiry",
      body: "Check the message and tap send. If WhatsApp didn’t open, use the button below.",
    },
  };

  const c = content[status.kind];
  return (
    <div
      className={cn(
        "rounded-2xl border p-6 fade-up",
        c.tone === "ok" ? "border-success/40 bg-success/5" : "border-gold/60 bg-accent/50",
      )}
    >
      <p className="flex items-center gap-2 font-semibold text-ink">
        {c.tone === "ok" ? (
          <CheckCircle2 className="size-5 text-success" />
        ) : (
          <AlertTriangle className="size-5 text-gold-muted" />
        )}
        {c.title}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{c.body}</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Button type="button" size="sm" onClick={onOpen}>
          <WhatsAppIcon className="size-4" /> Open Tujaze chat
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={onCopy}>
          <Copy /> {copied ? "Copied" : "Copy message"}
        </Button>
      </div>
    </div>
  );
}

function Fieldset({ legend, children }: { legend: string; children: ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-5 flex w-full items-center gap-4 font-display text-2xl text-burgundy">
        {legend}
        <span className="h-px flex-1 bg-border" />
      </legend>
      {children}
    </fieldset>
  );
}

function Field({
  id,
  label,
  required,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-ink">
        {label} {required && <span className="text-burgundy" aria-hidden="true">*</span>}
        {optional && <span className="font-normal text-muted-foreground">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className="mt-1.5 text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
