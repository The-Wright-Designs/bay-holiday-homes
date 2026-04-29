"use server";

import nodemailer from "nodemailer";
import { enquiryEmailTemplate } from "@/_lib/utils/email-templates/enquiry-email-template";
import { verifyRecaptchaToken } from "@/_lib/verify-recaptcha";

export async function sendEnquiry(
  formData: FormData,
): Promise<{ success: boolean; error?: string }> {
  const honey = formData.get("_honey");
  const recaptchaToken = formData.get("recaptchaToken") as string;

  try {
    if (!honey || honey.toString().trim() === "") {
      if (!recaptchaToken) {
        return { success: false, error: "reCAPTCHA verification required" };
      }

      const recaptchaResult = await verifyRecaptchaToken(recaptchaToken);
      if (!recaptchaResult.success) {
        return {
          success: false,
          error: recaptchaResult.error || "reCAPTCHA verification failed",
        };
      }

      const property = formData.get("property")?.toString() || "";
      const propertyId = formData.get("propertyId")?.toString() || "";
      const name = formData.get("name")?.toString() || "";
      const email = formData.get("email")?.toString() || "";
      const phone = formData.get("phone")?.toString() || "";
      const adults = formData.get("adults")?.toString() || "";
      const children = formData.get("children")?.toString() || "";
      const checkIn = formData.get("checkIn")?.toString() || "";
      const checkOut = formData.get("checkOut")?.toString() || "";
      const pets = formData.get("pets")?.toString() || "";
      const notes = formData.get("notes")?.toString() || "";

      if (!name.trim() || !email.trim() || !adults.trim() || !children.trim()) {
        return { success: false, error: "All required fields must be filled" };
      }

      const emailHtmlContent = enquiryEmailTemplate({
        property,
        propertyId,
        name,
        email,
        phone: phone || undefined,
        adults,
        children,
        checkIn: checkIn || undefined,
        checkOut: checkOut || undefined,
        pets: pets || undefined,
        notes: notes || undefined,
      });

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST as string,
        port: 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER as string,
          pass: process.env.SMTP_PASS as string,
        },
        requireTLS: true,
      });

      await transporter.sendMail({
        from: `Bay Holiday Homes <${process.env.SMTP_USER}>`,
        to: process.env.SMTP_SEND_TO_RENTAL as string,
        subject: "Property Enquiry - Bay Holiday Homes",
        replyTo: email,
        html: emailHtmlContent,
      });

      return { success: true };
    } else {
      console.error("Invalid form submission due to non-empty honeypot field");
      return { success: false, error: "Spam detected" };
    }
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to send enquiry" };
  }
}
