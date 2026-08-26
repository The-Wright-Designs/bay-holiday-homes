"use client";

import Link from "next/link";
import { useState } from "react";

import classNames from "classnames";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

import { fetchCell } from "@/_actions/contact-actions";
import { showContactProps } from "@/_types/general-types";

const ShowCellNumber = ({ buttonClasses, linkClasses }: showContactProps) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [showPhone, setShowPhone] = useState("Show phone number");
  const [showSpinnerPhone, setShowSpinnerPhone] = useState(false);

  const handleShowPhoneNumbers = async () => {
    setShowSpinnerPhone(true);

    try {
      let recaptchaToken: string | undefined;

      if (executeRecaptcha) {
        recaptchaToken = await executeRecaptcha("fetch_cell");
      }

      const phoneNumber =
        (await fetchCell(recaptchaToken)) || "Phone number not found";
      setShowPhone(phoneNumber);
    } catch (error) {
      console.error("Error fetching phone:", error);
      setShowPhone("Phone not available");
    }

    setShowSpinnerPhone(false);
  };

  if (showPhone === "Show phone number") {
    return (
      <button
        onClick={() => handleShowPhoneNumbers()}
        className={classNames(
          "px-2 text-left text-link-blue self-start -mx-2 text-paragraph py-3 -my-3 tablet:hover:opacity-80 hover:cursor-pointer desktop:p-0 desktop:m-0 italic",
          buttonClasses,
        )}
        aria-label="Show cell number"
      >
        {showSpinnerPhone ? (
          <div className="py-[1.5px]">
            <div className="spinner"></div>
          </div>
        ) : (
          showPhone
        )}
      </button>
    );
  } else {
    return (
      <Link
        href={`tel:${showPhone}`}
        className={classNames(
          "py-2 text-left px-2 -my-2 -mx-2 self-start text-paragraph tablet:hover:opacity-80 desktop:p-0 desktop:m-0",
          linkClasses,
        )}
      >
        {showPhone}
      </Link>
    );
  }
};

export default ShowCellNumber;
