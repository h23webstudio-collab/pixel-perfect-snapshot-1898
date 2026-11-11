import { BUSINESS } from "./site";

export const MAX_IMAGE_BYTES = 10 * 1024 * 1024; // 10 MB
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/heic",
  "image/heif",
];

export const BUDGET_OPTIONS = [
  "Not sure yet",
  "Under KSh 50,000",
  "KSh 50,000 – 200,000",
  "KSh 200,000 – 500,000",
  "KSh 500,000 – 1,000,000",
  "Above KSh 1,000,000",
];

export type Enquiry = {
  name: string;
  phone: string;
  product: string;
  quantity: string;
  budget: string;
  link: string;
  details: string;
};

export type EnquiryErrors = Partial<Record<keyof Enquiry, string>>;

export const emptyEnquiry: Enquiry = {
  name: "",
  phone: "",
  product: "",
  quantity: "",
  budget: "",
  link: "",
  details: "",
};

export function validateEnquiry(e: Enquiry): EnquiryErrors {
  const errors: EnquiryErrors = {};
  if (e.name.trim().length < 2) errors.name = "Please enter your full name.";
  const digits = e.phone.replace(/[^\d]/g, "");
  if (!e.phone.trim()) errors.phone = "Please enter a phone number we can reach you on.";
  else if (digits.length < 9 || digits.length > 15 || !/^[+\d\s()-]+$/.test(e.phone.trim()))
    errors.phone = "Please enter a valid phone number, e.g. 0712 345 678.";
  if (e.product.trim().length < 2) errors.product = "Tell us which product you need.";
  if (!e.quantity.trim()) errors.quantity = "Please add the quantity you need.";
  if (e.link.trim()) {
    try {
      const u = new URL(e.link.trim());
      if (u.protocol !== "http:" && u.protocol !== "https:") throw new Error("bad");
    } catch {
      errors.link = "Please paste a full link starting with https://";
    }
  }
  return errors;
}

export function validateImageFile(file: { type: string; size: number }): string | null {
  const type = file.type.toLowerCase();
  if (!type.startsWith("image/") || (type && !ACCEPTED_IMAGE_TYPES.includes(type))) {
    return "Please choose a photo (JPG, PNG, WEBP, GIF or HEIC).";
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return "This image is larger than 10 MB. Please choose a smaller photo.";
  }
  return null;
}

export function buildEnquiryMessage(e: Enquiry, hasImage = false): string {
  const line = (label: string, value: string) => `${label}: ${value.trim() || "—"}`;
  return [
    `Hello ${BUSINESS.name},`,
    "",
    "I'd like to request a quotation for the following product.",
    "",
    line("Name", e.name),
    line("Phone", e.phone),
    line("Product", e.product),
    line("Quantity", e.quantity),
    line("Estimated budget", e.budget),
    line("Product link", e.link),
    line("Additional details", e.details),
    ...(hasImage ? ["", "(Product image attached)"] : []),
    "",
    "Please let me know how we can proceed.",
  ].join("\n");
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
