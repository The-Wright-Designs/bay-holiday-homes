import Image from "next/image";
import teamData from "@/_data/general-data.json";

const OurTeamComponent = () => {
  return (
    <section
      className="flex flex-col gap-10 items-center w-full scroll-mt-32 tablet:scroll-mt-36 desktop:scroll-mt-44"
      id="team"
    >
      <h2 className="text-[40px] font-light uppercase text-center">Our Team</h2>

      <div className="w-full aspect-[4/3] overflow-hidden desktop:aspect-video">
        <Image
          src="/images/our-team/bay-holiday-homes-team.jpg"
          alt="Bay Holiday Homes team photo showing the entire team"
          width={1280}
          height={800}
          className="w-full h-full object-cover desktop:object-bottom"
          sizes="(max-width: 1280px) 100vw, 1280px"
        />
      </div>

      <ul className="grid gap-3 w-full desktop:grid-cols-2">
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
