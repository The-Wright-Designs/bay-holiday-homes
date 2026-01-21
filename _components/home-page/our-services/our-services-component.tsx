import Image from "next/image";
import generalData from "@/_data/general-data.json";
import OurServicesCard from "./our-services-card";

const OurServicesComponent = () => {
  const ourServices = generalData.ourServices;

  return (
    <section className="flex flex-col gap-10">
      <div className="flex flex-col gap-2 items-center text-center">
        <h2 className="text-[40px] font-light text-black uppercase">
          Our Services
        </h2>
      </div>

      <div className="flex flex-col gap-10">
        <div className="grid gap-15 tablet:gap-5 desktop:grid-cols-2">
          <div className="relative w-full aspect-[16/10] tablet:aspect-video desktop:aspect-[16/10]">
            <Image
              src={ourServices.managing[0].image}
              alt={ourServices.managing[0].heading}
              fill
              className="object-cover tablet:rounded-br-[8px]"
            />
            <div className="absolute -bottom-8 right-1/2 translate-x-1/2 bg-white/80 px-5 py-3 rounded-t-[8px] tablet:bottom-0 tablet:right-0 tablet:rounded-tr-none tablet:translate-x-0">
              <h3 className="text-[24px] min-[350px]:text-[32px] font-light text-nowrap">
                {ourServices.managing[0].heading}
              </h3>
            </div>
          </div>
          <div className="relative w-full aspect-[16/10] tablet:aspect-video desktop:aspect-[16/10]">
            <Image
              src={ourServices.managing[1].image}
              alt={ourServices.managing[1].heading}
              fill
              className="object-cover tablet:rounded-bl-[8px]"
            />
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black/80 px-5 py-3 rounded-[8px] tablet:bottom-0 tablet:left-0 tablet:rounded-tl-none tablet:translate-x-0 tablet:rounded-br-none">
              <h3 className="text-[24px] min-[350px]:text-[32px] font-light text-nowrap text-white">
                {ourServices.managing[1].heading}
              </h3>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 text-center mt-10 tablet:mt-0 desktop:px-20">
          <h3 className="text-[24px] font-semibold">
            Safeguarding your Home in Plett
          </h3>
          <p>
            As a homeowner in Plettenberg Bay, you have many years of fulfilled
            family holidays with memories that last a lifetime. You should enjoy
            every moment of your holiday with your loved ones and escape
            maintenance, chores…laundry.
          </p>
          <p>
            Plett, as a coastal town is a magnificent location, but the coastal
            climate takes its toll on properties. Your home also represents a
            significant financial investment, which warrants to be safeguarded
            in your absence. Our expert team covers all holiday home management
            services to ensure your property is in good care.
          </p>
        </div>

        <div className="grid gap-10">
          <div className="grid gap-10 tablet:grid-cols-2 desktop:grid-cols-2">
            <OurServicesCard
              key={ourServices.services[0].id}
              image={ourServices.services[0].image}
              heading={ourServices.services[0].heading}
              paragraph={ourServices.services[0].paragraph}
              flipImage={ourServices.services[0].flipImage}
              vertical={ourServices.services[0].vertical}
            />
            <OurServicesCard
              key={ourServices.services[1].id}
              image={ourServices.services[1].image}
              heading={ourServices.services[1].heading}
              paragraph={ourServices.services[1].paragraph}
              flipImage={ourServices.services[1].flipImage}
              vertical={ourServices.services[1].vertical}
            />
          </div>

          <div className="grid gap-10 tablet:grid-cols-2 desktop:grid-cols-3">
            <OurServicesCard
              key={ourServices.services[2].id}
              image={ourServices.services[2].image}
              heading={ourServices.services[2].heading}
              paragraph={ourServices.services[2].paragraph}
              flipImage={ourServices.services[2].flipImage}
              vertical={ourServices.services[2].vertical}
            />
            <OurServicesCard
              key={ourServices.services[3].id}
              image={ourServices.services[3].image}
              heading={ourServices.services[3].heading}
              paragraph={ourServices.services[3].paragraph}
              flipImage={ourServices.services[3].flipImage}
              vertical={ourServices.services[3].vertical}
            />
            <OurServicesCard
              key={ourServices.services[4].id}
              image={ourServices.services[4].image}
              heading={ourServices.services[4].heading}
              paragraph={ourServices.services[4].paragraph}
              flipImage={ourServices.services[4].flipImage}
              vertical={ourServices.services[4].vertical}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurServicesComponent;
