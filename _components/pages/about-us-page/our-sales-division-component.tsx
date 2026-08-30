import Image from "next/image";
import Link from "next/link";

const OurSalesDivisionComponent = () => {
  return (
    <section
      className="flex flex-col gap-10 items-center w-full pt-15 scroll-mt-20 tablet:scroll-mt-28 desktop:scroll-mt-32"
      id="sales"
    >
      <h2 className="text-[40px] font-light uppercase text-center">
        Our Sales Division
      </h2>

      <div className="mt-15 flex flex-col gap-5 items-center w-full tablet:mt-0">
        <div className="flex flex-col min-[700px]:flex-row gap-10 items-center justify-center">
          <div className="relative">
            <Link
              href="#"
              target="_blank"
              className="desktop:hover:opacity-90 ease-in-out duration-300"
            >
              <Image
                src="/logos/choice-properties-logo.png"
                alt="Choice Properties Group logo"
                width={350}
                height={210}
                className="max-w-[350px] h-auto object-contain"
                sizes="350px"
              />
            </Link>
            <div className="absolute -top-25 -right-10 rotate-[5deg] bg-white/90 p-2 rounded-full shadow-md size-[130px] tablet:-left-15 tablet:-top-26 tablet:rotate-[-5deg]">
              <Image
                src="/images/our-story/38-years-stamp.png"
                alt="60 Years Anniversary Badge"
                width={204}
                height={204}
                className="w-full h-full object-cover"
                sizes="(max-width:1280px) 130px, 204px"
              />
            </div>
          </div>
          <Link
            href="#"
            target="_blank"
            className="desktop:hover:opacity-90 ease-in-out duration-300"
          >
            <Image
              src="/logos/choice-rentals-logo.jpg"
              alt="Choice Rentals logo"
              width={300}
              height={210}
              className="max-w-[250px] desktop:max-w-[280px] h-auto object-contain"
              sizes="(max-width:1280px) 280px, 250px"
            />
          </Link>
        </div>

        <div className="flex flex-col gap-5 text-center w-full">
          <p>
            The Choice Group believes that property is more than bricks and land
            &mdash; it&apos;s about people, families, and the lives built
            within.
          </p>

          <p>
            Proudly South African, our reputation rests on honesty, integrity,
            and genuine care for every client we serve. Whether you&apos;re
            buying a family home, managing your coastal retreat, or letting your
            holiday property, our promise is simple:
          </p>

          <p className="text-[22px] font-semibold">
            Your Property. Your Peace of Mind. Our Commitment.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OurSalesDivisionComponent;
