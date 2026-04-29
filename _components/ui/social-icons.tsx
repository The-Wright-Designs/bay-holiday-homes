import Link from "next/link";
import Image from "next/image";

import facebook from "@/public/icons/facebook.svg";

const whatsapp = "/icons/whatsapp.svg";

interface Props {
  cssClasses?: string;
  small?: boolean;
  social?: {
    facebook?: string;
    whatsapp?: string;
  };
}

const SocialIcons = ({ cssClasses, small, social }: Props) => {
  if (small) {
    return (
      <ul className={`flex w-full gap-3 ${cssClasses}`}>
        <li>
          <Link
            href={social?.facebook || ""}
            target="_blank"
            className="tablet:tablet:hover:opacity-80 ease-in-out duration-200"
            aria-label="View our Facebook page"
          >
            <Image
              src={facebook}
              alt="View our Facebook page"
              width={24}
              height={24}
            />
          </Link>
        </li>
        <li>
          <Link
            href={social?.whatsapp || ""}
            target="_blank"
            className="tablet:tablet:hover:opacity-80 ease-in-out duration-200"
            aria-label="Get in touch on WhatsApp"
          >
            <Image
              src={whatsapp}
              alt="Get in touch on WhatsApp"
              width={24}
              height={24}
            />
          </Link>
        </li>
      </ul>
    );
  } else {
    return (
      <ul className={`flex gap-5 ${cssClasses}`}>
        <li>
          <Link
            href={social?.facebook || ""}
            className="grid h-8 w-8 place-items-center tablet:hover:opacity-80 ease-in-out duration-200"
            target="_blank"
            aria-label="View our Facebook page"
          >
            <Image
              src={facebook}
              alt="View our Facebook page"
              width={32}
              height={32}
            />
          </Link>
        </li>
        <li>
          <Link
            href={social?.whatsapp || ""}
            className="grid h-8 w-8 place-items-center tablet:hover:opacity-80 ease-in-out duration-200"
            target="_blank"
            aria-label="Get in touch on WhatsApp"
          >
            <Image
              src={whatsapp}
              alt="Get in touch on WhatsApp"
              width={32}
              height={32}
            />
          </Link>
        </li>
      </ul>
    );
  }
};

export default SocialIcons;
