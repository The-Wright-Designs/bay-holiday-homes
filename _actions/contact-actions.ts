"use server";

import contactData from "@/_data/general-data.json";
import { verifyRecaptchaToken } from "@/_lib/verify-recaptcha";

const {
  contact: { email, phone, cell },
} = contactData;

const requireRecaptcha = async (recaptchaToken?: string) => {
  if (!recaptchaToken) {
    throw new Error("reCAPTCHA token required");
  }
  const recaptchaResult = await verifyRecaptchaToken(recaptchaToken);
  if (!recaptchaResult.success) {
    throw new Error(recaptchaResult.error || "reCAPTCHA verification failed");
  }
};

export const fetchEmail = async (recaptchaToken?: string) => {
  await requireRecaptcha(recaptchaToken);
  return email;
};

export const fetchPhone = async (recaptchaToken?: string) => {
  await requireRecaptcha(recaptchaToken);
  return phone;
};

export const fetchCell = async (recaptchaToken?: string) => {
  await requireRecaptcha(recaptchaToken);
  return cell;
};
