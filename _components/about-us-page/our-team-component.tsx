import Image from "next/image";

const OurTeamComponent = () => {
  return (
    <section className="flex flex-col gap-10 items-center w-full">
      <h2 className="text-[40px] font-light uppercase text-center">Our Team</h2>

      <div className="w-full aspect-[4/3] overflow-hidden desktop:aspect-video">
        <Image
          src="/images/our-team/bay-holiday-homes-team.jpg"
          alt="Bay Holiday Homes team photo showing the entire team"
          width={1280}
          height={800}
          className="w-full h-full object-cover desktop:object-bottom"
        />
      </div>

      <ul className="grid gap-3 w-full desktop:grid-cols-2">
        <li className="text-paragraph">
          <span className="font-bold">Simone</span> &ndash; Director, Manager,
          business development, Marketing
        </li>
        <li className="text-paragraph desktop:col-start-1 desktop:row-start-2">
          <span className="font-bold">Gavin</span> &ndash; Accounts
        </li>
        <li className="text-paragraph desktop:col-start-1 desktop:row-start-3">
          <span className="font-bold">Mandy</span> &ndash; Rentals and Social
          Media Marketing
        </li>
        <li className="text-paragraph">
          <span className="font-bold">Lisa</span> &ndash; Operations Manager
          Home Management
        </li>
        <li className="text-paragraph">
          <span className="font-bold">Laura</span> &ndash; Office Manager
        </li>
        <li className="text-paragraph">
          <span className="font-bold">Luan</span> &ndash; Head of Operations
          Home Management
        </li>
      </ul>
    </section>
  );
};

export default OurTeamComponent;
