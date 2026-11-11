import { describe, expect, it } from "vitest";
import { buildEnquiryMessage, emptyEnquiry, validateEnquiry, validateImageFile, MAX_IMAGE_BYTES } from "@/lib/enquiry";
import { whatsappChatUrl } from "@/lib/site";

const valid = { ...emptyEnquiry, name: "Jane Wanjiku", phone: "0712 345 678", product: "Water bottles", quantity: "500" };

describe("enquiry rules", () => {
  it("requires name, phone, product and quantity", () => {
    const errs = validateEnquiry(emptyEnquiry);
    expect(Object.keys(errs).sort()).toEqual(["name", "phone", "product", "quantity"]);
  });

  it("accepts a complete enquiry with optional fields empty", () => {
    expect(validateEnquiry(valid)).toEqual({});
  });

  it("rejects a product link that is not a web address", () => {
    expect(validateEnquiry({ ...valid, link: "not a link" }).link).toBeDefined();
  });

  it("rejects images over 10 MB and non-image files", () => {
    expect(validateImageFile({ type: "image/jpeg", size: MAX_IMAGE_BYTES + 1 })).not.toBeNull();
    expect(validateImageFile({ type: "application/pdf", size: 1000 })).not.toBeNull();
    expect(validateImageFile({ type: "image/png", size: 1000 })).toBeNull();
  });

  it("builds the message in the agreed format", () => {
    const msg = buildEnquiryMessage(valid);
    expect(msg.startsWith("Hello Tujaze Container Na Steve,")).toBe(true);
    expect(msg).toContain("Name: Jane Wanjiku");
    expect(msg).toContain("Quantity: 500");
    expect(msg.endsWith("Please let me know how we can proceed.")).toBe(true);
  });

  it("opens chats to the official WhatsApp number", () => {
    expect(whatsappChatUrl("hi")).toBe("https://wa.me/254716456964?text=hi");
  });
});
