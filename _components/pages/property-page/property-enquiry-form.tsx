"use client";

import { useRef, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { sendEnquiry } from "@/_actions/send-enquiry-actions";
import EnquiryFormTextInput from "@/_components/ui/forms/enquiry-form/enquiry-form-text-input";
import EnquiryFormSelectInput from "@/_components/ui/forms/enquiry-form/enquiry-form-select-input";
import EnquiryFormDateInput from "@/_components/ui/forms/enquiry-form/enquiry-form-date-input";
import EnquiryFormTextareaInput from "@/_components/ui/forms/enquiry-form/enquiry-form-textarea-input";
import ButtonType from "@/_components/ui/buttons/button-type";
import Image from "next/image";
import classNames from "classnames";

const adultsOptions = Array.from({ length: 8 }, (_, i) => ({
  value: String(i + 1),
  label: String(i + 1),
}));

const childrenOptions = Array.from({ length: 8 }, (_, i) => ({
  value: String(i),
  label: String(i),
}));

interface PropertyEnquiryFormProps {
  propertyName: string;
  propertyId: string;
}

const PropertyEnquiryForm = ({
  propertyName,
  propertyId,
}: PropertyEnquiryFormProps) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [checkInDate, setCheckInDate] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const today = new Date().toISOString().split("T")[0];
  const minCheckOut = checkInDate
    ? new Date(new Date(checkInDate).getTime() + 86400000)
        .toISOString()
        .split("T")[0]
    : today;

  const handleSubmit = async (formData: FormData) => {
    setError("");
    setPending(true);

    if (!executeRecaptcha) {
      setError("reCAPTCHA not ready. Please try again.");
      setPending(false);
      return;
    }

    const token = await executeRecaptcha("enquiry_form");
    formData.set("recaptchaToken", token);

    const result = await sendEnquiry(formData);

    setPending(false);

    if (result.success) {
      setSuccess(true);
      formRef.current?.reset();
      containerRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      setError(result.error || "Something went wrong. Please try again.");
    }
  };

  return (
    <div
      ref={containerRef}
      className="bg-teal rounded-[2px] flex flex-col gap-10 px-5 py-7 scroll-mt-24 tablet:scroll-mt-28 tablet:p-10 desktop:p-7 desktop:self-start"
      id="enquire"
    >
      <div
        className={classNames("flex flex-col gap-5", {
          "my-auto": success,
        })}
      >
        {!success ? (
          <>
            <h2 className="text-white text-subheading">Enquiry form:</h2>
            <p className="text-white text-paragraph">
              Fill out the form below and our team will get back to you ASAP...
            </p>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center gap-10">
            <p className="text-white text-heading text-center">
              Thank you for your enquiry! We&apos;ll be in touch soon.
            </p>
            <Image
              src="/logos/bay-holiday-homes-logo.png"
              alt="Bay Holiday Homes Logo"
              width={359}
              height={84}
              className="h-auto py-4 px-7 bg-white rounded-xs"
              priority
            />
          </div>
        )}
      </div>
      {!success && (
        <form
          ref={formRef}
          action={handleSubmit}
          className="flex flex-col gap-5"
        >
          <input
            type="text"
            name="_honey"
            className="visually-hidden"
            tabIndex={-1}
            autoComplete="off"
          />
          <input type="hidden" name="recaptchaToken" />
          <input type="hidden" name="propertyId" value={propertyId} />
          <fieldset disabled={pending} className="contents">
            <div className="grid gap-5 tablet:grid-cols-2">
              <EnquiryFormTextInput
                label="Property:"
                name="property"
                defaultValue={propertyName}
                readOnly
                cssClasses="flex-1 min-w-0"
              />
              <EnquiryFormTextInput
                label="Name*:"
                name="name"
                placeholderText="Full name"
                required
                autoComplete="name"
                cssClasses="flex-1 min-w-0"
              />
            </div>
            <div className="grid gap-5 tablet:grid-cols-2">
              <EnquiryFormTextInput
                label="Email*:"
                name="email"
                placeholderText="Email address"
                required
                autoComplete="email"
                cssClasses="flex-1 min-w-0"
              />
              <EnquiryFormTextInput
                label="Phone:"
                name="phone"
                placeholderText="Phone number"
                autoComplete="tel"
                cssClasses="flex-1 min-w-0"
              />
            </div>
            <div className="grid gap-5 tablet:grid-cols-2">
              <EnquiryFormSelectInput
                label="Number of adults*:"
                name="adults"
                options={adultsOptions}
                required
                cssClasses="flex-1 min-w-0"
              />
              <EnquiryFormSelectInput
                label="Number of children*:"
                name="children"
                options={childrenOptions}
                required
                cssClasses="flex-1 min-w-0"
              />
            </div>
            <div className="grid gap-5 tablet:grid-cols-2">
              <EnquiryFormDateInput
                label="Preferred check-in date:"
                name="checkIn"
                min={today}
                onChange={setCheckInDate}
                cssClasses="flex-1 min-w-0"
              />
              <EnquiryFormDateInput
                label="Preferred check-out date:"
                name="checkOut"
                min={minCheckOut}
                cssClasses="flex-1 min-w-0"
              />
            </div>
            <EnquiryFormTextareaInput
              label="Additional notes:"
              name="notes"
              placeholderText="Notes"
            />
          </fieldset>
          {error && <p className="text-white text-paragraph">{error}</p>}
          <ButtonType
            type="submit"
            navyStroke
            cssClasses="w-full mt-5 min-[500px]:w-auto min-[500px]:self-start"
          >
            Submit
          </ButtonType>
        </form>
      )}
    </div>
  );
};

export default PropertyEnquiryForm;
