"use client";

import Link from "next/link";
import { useState } from "react";

import classNames from "classnames";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

import { fetchEmail } from "@/_actions/contact-actions";
import { showContactProps } from "@/_types/general-types";

const ShowEmailAddress = ({ buttonClasses, linkClasses }: showContactProps) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [showEmail, setShowEmail] = useState("Show email address");
  const [showSpinnerEmail, setShowSpinnerEmail] = useState(false);

  const handleShowEmailAddress = async () => {
    setShowSpinnerEmail(true);

    try {
      let recaptchaToken: string | undefined;

      if (executeRecaptcha) {
        recaptchaToken = await executeRecaptcha("fetch_email");
      }

      const emailAddress =
        (await fetchEmail(recaptchaToken)) || "Email not found";
      setShowEmail(emailAddress);
    } catch (error) {
      console.error("Error fetching email:", error);
      setShowEmail("Email not available");
    }

    setShowSpinnerEmail(false);
  };

  if (showEmail === "Show email address") {
    return (
      <button
        onClick={() => handleShowEmailAddress()}
        className={classNames(
          "px-2 text-left -mx-2 text-link-blue text-paragraph py-3 self-start -my-3 tablet:hover:opacity-80 hover:cursor-pointer desktop:p-0 desktop:m-0 italic",
          buttonClasses,
        )}
        aria-label="Show email address"
      >
        {showSpinnerEmail ? (
          <div className="py-[1.5px]">
            <div className="spinner"></div>
          </div>
        ) : (
          showEmail
        )}
      </button>
    );
  } else {
    return (
      <Link
        href={`mailto:${showEmail}`}
        className={classNames(
          "py-2 text-left px-2 -my-2 -mx-2 text-paragraph self-start tablet:hover:opacity-80 desktop:p-0 desktop:m-0",
          linkClasses,
        )}
      >
        {showEmail}
      </Link>
    );
  }
};

export default ShowEmailAddress;
