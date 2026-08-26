"use client";

import classNames from "classnames";
import ContactInfoComponent from "@/_components/pages/home-page/contact/contact-info-component";
import ContactFormComponent from "@/_components/pages/home-page/contact/contact-form-component";
import MapComponent from "@/_components/pages/home-page/contact/map-component";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import SocialIcons from "@/_components/ui/social-icons";
import generalData from "@/_data/general-data.json";

interface Props {
  cssClasses?: string;
}

export default function ContactSectionComponent({ cssClasses }: Props) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
      useRecaptchaNet
    >
      <div
        className={classNames(
          "grid gap-10 w-full pt-15 scroll-mt-20 tablet:scroll-mt-28 desktop:scroll-mt-32 desktop:grid-cols-2",
          cssClasses,
        )}
        id="contact"
      >
        <div className="flex flex-col gap-10">
          <h2 className="text-[40px] font-light uppercase text-center desktop:text-left">
            Contact
          </h2>
          <ContactInfoComponent />
          <SocialIcons
            cssClasses="desktop:hidden"
            social={generalData.contact.social}
          />
          <SocialIcons
            cssClasses="hidden desktop:flex"
            small
            social={generalData.contact.social}
          />
          <div className="desktop:h-full desktop:w-full">
            <MapComponent cssClasses="w-full h-full rounded-[2px] aspect-square min-[500px]:aspect-video desktop:aspect-auto" />
          </div>
        </div>
        <ContactFormComponent />
      </div>
    </GoogleReCaptchaProvider>
  );
}
