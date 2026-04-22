"use client";

import { useRef, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { sendEnquiry } from "@/_actions/send-enquiry-actions";
import EnquiryFormTextInput from "@/_components/ui/forms/enquiry-form/enquiry-form-text-input";
import EnquiryFormSelectInput from "@/_components/ui/forms/enquiry-form/enquiry-form-select-input";
import EnquiryFormDateInput from "@/_components/ui/forms/enquiry-form/enquiry-form-date-input";
import EnquiryFormTextareaInput from "@/_components/ui/forms/enquiry-form/enquiry-form-textarea-input";
import ButtonType from "@/_components/ui/buttons/button-type";

const adultsOptions = Array.from({ length: 8 }, (_, i) => ({
  value: String(i + 1),
  label: String(i + 1),
}));

const childrenOptions = Array.from({ length: 8 }, (_, i) => ({
  value: String(i),
  label: String(i),
}));

const petsOptions = Array.from({ length: 6 }, (_, i) => ({
  value: String(i),
  label: String(i),
}));

interface PropertyEnquiryFormProps {
  propertyName: string;
}

const PropertyEnquiryForm = ({ propertyName }: PropertyEnquiryFormProps) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    setError("");

    if (!executeRecaptcha) {
      setError("reCAPTCHA not ready. Please try again.");
      return;
    }

    const token = await executeRecaptcha("enquiry_form");
    formData.set("recaptchaToken", token);

    const result = await sendEnquiry(formData);

    if (result.success) {
      setSuccess(true);
      formRef.current?.reset();
    } else {
      setError(result.error || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-teal rounded-[2px] flex flex-col gap-10 p-5 tablet:p-10 desktop:p-7">
      <div className="flex flex-col gap-5">
        <h2 className="text-white text-subheading">Enquiry form:</h2>
        <p className="text-white text-paragraph">
          Fill out the form below and our team will get back to you ASAP...
        </p>
      </div>
      <form ref={formRef} action={handleSubmit} className="flex flex-col gap-5">
        <input
          type="text"
          name="_honey"
          className="visually-hidden"
          tabIndex={-1}
          autoComplete="off"
        />
        <input type="hidden" name="recaptchaToken" />
        <div className="grid gap-5 tablet:grid-cols-2">
          <EnquiryFormTextInput
            label="Property:"
            name="property"
            defaultValue={propertyName}
            disabled
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
            cssClasses="flex-1 min-w-0"
          />
          <EnquiryFormDateInput
            label="Preferred check-out date:"
            name="checkOut"
            cssClasses="flex-1 min-w-0"
          />
        </div>
        <EnquiryFormSelectInput
          label="Number of pets:"
          name="pets"
          options={petsOptions}
        />
        <EnquiryFormTextareaInput
          label="Additional notes:"
          name="notes"
          placeholderText="Notes"
        />
        {error && <p className="text-white text-paragraph">{error}</p>}
        {success && (
          <p className="text-white text-paragraph">
            Thank you! We&apos;ll be in touch soon.
          </p>
        )}
        <ButtonType type="submit" navyStroke cssClasses="w-full mt-5">
          Submit
        </ButtonType>
      </form>
    </div>
  );
};

export default PropertyEnquiryForm;
