"use client";

import { useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { sendEmail } from "@/_actions/send-email-actions";
import ButtonType from "@/_components/ui/buttons/button-type";
import Link from "next/link";

const ContactFormComponent = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [showEmailSubmitted, setShowEmailSubmitted] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (showEmailSubmitted) {
      const element = document.getElementById("contact");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [showEmailSubmitted]);

  return (
    <div className="flex flex-col gap-7 flex-1 bg-teal px-7 py-10 -mx-5 tablet:-mx-10 min-[1360px]:mx-0 desktop:rounded-[2px]">
      {showEmailSubmitted ? (
        <div className="h-full grid place-items-center min-h-[400px] desktop:min-h-[600px]">
          <p className="text-white text-[24px] text-center">
            Your email has been sent, we will be in touch soon.
          </p>
        </div>
      ) : (
        <>
          <p className="text-paragraph text-white w-full">
            Please fill out the form below and our team will get back to you
            ASAP...
          </p>
          <form
            className="flex flex-col gap-7"
            action={async (formData) => {
              try {
                setError(null);
                setIsSubmitting(true);

                if (!executeRecaptcha) {
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  if (!executeRecaptcha) {
                    setError(
                      "Security verification unavailable. Please refresh the page and try again.",
                    );
                    return;
                  }
                }

                const recaptchaToken = await executeRecaptcha("contact_form");
                formData.append("recaptchaToken", recaptchaToken);

                const result = await sendEmail(formData);

                if (result.success) {
                  setShowEmailSubmitted(true);
                } else {
                  setError(
                    result.error || "Failed to send message. Please try again.",
                  );
                }
              } catch (err) {
                setError("An unexpected error occurred. Please try again.");
                console.error("Contact form error:", err);
              } finally {
                setIsSubmitting(false);
              }
            }}
          >
            <input type="hidden" name="_honey" className="hidden" />

            <label htmlFor="fullName" className="flex flex-col gap-3">
              <span className="text-subheading font-semibold text-white">
                Name: *
              </span>
              <input
                type="text"
                id="fullName"
                name="name"
                className="bg-white px-4 py-3 rounded font-light text-black/75 border-none h-10"
                autoComplete="name"
                required
              />
            </label>

            <label htmlFor="emailAddress" className="flex flex-col gap-3">
              <span className="text-subheading font-semibold text-white">
                Email: *
              </span>
              <input
                type="email"
                id="emailAddress"
                name="email"
                className="bg-white px-4 py-3 rounded font-light text-black/75 border-none h-10"
                autoComplete="email"
                required
              />
            </label>

            <label htmlFor="phoneNumber" className="flex flex-col gap-3">
              <span className="text-subheading font-semibold text-white">
                Phone:
              </span>
              <input
                type="tel"
                id="phoneNumber"
                name="phone"
                className="bg-white px-4 py-3 rounded font-light text-black/75 border-none h-10"
                autoComplete="phone"
              />
            </label>

            {!showMessage ? (
              <ButtonType
                type="button"
                navyStroke
                onClick={() => setShowMessage(true)}
              >
                Next
              </ButtonType>
            ) : (
              <>
                <label htmlFor="message" className="flex flex-col gap-3">
                  <span className="text-subheading font-semibold text-white">
                    Message: *
                  </span>
                  <textarea
                    id="message"
                    name="message"
                    className="bg-white px-4 py-3 rounded font-light text-black/75 border-none h-38"
                    rows={5}
                    required
                  ></textarea>
                </label>
                {error && (
                  <div className="bg-red/10 border border-red/50 rounded-[2px] p-3">
                    <p className="text-[14px] text-red">{error}</p>
                  </div>
                )}
                <div className="flex flex-col gap-4">
                  <ButtonType type="submit" navyStroke disabled={isSubmitting}>
                    Submit
                  </ButtonType>
                  <p className="text-[12px] text-white text-center">
                    This site is protected by reCAPTCHA and the Google{" "}
                    <Link
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      className="underline"
                    >
                      Privacy Policy
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="https://policies.google.com/terms"
                      target="_blank"
                      className="underline"
                    >
                      Terms of Service
                    </Link>{" "}
                    apply.
                  </p>
                </div>
              </>
            )}
          </form>
        </>
      )}
    </div>
  );
};

export default ContactFormComponent;
