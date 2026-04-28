import classNames from "classnames";

import generalData from "@/_data/general-data.json";
import ShowEmailAddress from "@/_components/ui/contact/show-email-address";
import ShowPhoneNumber from "@/_components/ui/contact/show-phone-number";
import ShowAfterHoursPhoneNumber from "@/_components/ui/contact/show-after-hours-phone-number";

interface Props {
  cssClasses?: string;
}

export default function ContactInfoComponent({ cssClasses }: Props) {
  const { address } = generalData.contact;

  return (
    <div className={classNames("flex flex-col gap-5", cssClasses)}>
      <div className="flex flex-col gap-3 tablet:items-center tablet:flex-row">
        <p className="text-paragraph font-semibold w-[120px] shrink-0">
          Phone:
        </p>
        <ShowPhoneNumber />
      </div>

      <div className="flex flex-col gap-3 tablet:items-center tablet:flex-row">
        <p className="text-paragraph font-semibold w-[120px] shrink-0">
          After hours:
        </p>
        <ShowAfterHoursPhoneNumber />
      </div>

      <div className="flex flex-col gap-3 tablet:items-center tablet:flex-row">
        <p className="text-paragraph font-semibold w-[120px] shrink-0">
          Email:
        </p>
        <ShowEmailAddress />
      </div>
      <div className="flex flex-col tablet:flex-row gap-2 items-start">
        <p className="text-paragraph font-semibold w-[120px] shrink-0">
          Address:
        </p>
        <p className="text-paragraph">{address}</p>
      </div>
    </div>
  );
}
