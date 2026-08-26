import Image from "next/image";
import teamData from "@/_data/general-data.json";

const OurTeamComponent = () => {
  return (
    <section
      className="flex flex-col gap-10 items-center w-full scroll-mt-32 tablet:scroll-mt-36 desktop:scroll-mt-44"
      id="team"
    >
      <h2 className="text-[40px] font-light uppercase text-center">Our Team</h2>

      <div className="w-full grid gap-10 min-[1000px]:grid-cols-[1.5fr_1fr]">
        <div className="relative w-full aspect-[4/3] overflow-hidden tablet:aspect-video">
          <Image
            src="/images/our-team/bay-holiday-homes-team.jpg"
            alt="Bay Holiday Homes team photo showing the entire team"
            fill
            className="w-full h-full object-cover"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
        </div>
        <div className="relative w-full aspect-[4/3] overflow-hidden min-[1000px]:aspect-auto">
          <Image
            src="/images/our-team/bay-holiday-homes-ops-team.jpg"
            alt="Bay Holiday Homes operations team photo"
            fill
            className="w-full h-full object-cover"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
        </div>
      </div>

      <ul className="flex flex-col gap-3 w-full min-[500px]:grid min-[500px]:grid-cols-2 min-[1000px]:grid-cols-3">
        {teamData.ourTeam.map(({ name, role, column, row }) => (
          <li
            key={name}
            className="text-paragraph"
            style={
              column && row ? { gridColumn: column, gridRow: row } : undefined
            }
          >
            <span className="font-bold">{name}</span> &ndash; {role}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default OurTeamComponent;
