"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import PropertyEnquiryForm from "@/_components/pages/property-page/property-enquiry-form";

interface Props {
  propertyName: string;
  propertyId: string;
}

const PropertyEnquiryFormWrapper = ({ propertyName, propertyId }: Props) => {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
      useRecaptchaNet
    >
      <PropertyEnquiryForm propertyName={propertyName} propertyId={propertyId} />
    </GoogleReCaptchaProvider>
  );
};

export default PropertyEnquiryFormWrapper;
