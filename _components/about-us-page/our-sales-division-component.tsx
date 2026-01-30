import Image from "next/image";
import Link from "next/link";

const OurSalesDivisionComponent = () => {
  return (
    <section
      className="flex flex-col gap-10 items-center w-full pt-15 scroll-mt-12 desktop:scroll-mt-24"
      id="sales"
    >
      <h2 className="text-[40px] font-light uppercase text-center">
        Our Sales Division
      </h2>

      <div className="flex flex-col gap-5 items-center w-full">
        <div className="flex flex-col min-[600px]:flex-row gap-10 items-center justify-center">
          <Link
            href="#"
            target="_blank"
            className="desktop:hover:opacity-90 ease-in-out duration-300"
          >
            <Image
              src="/logos/choice-properties-logo.png"
              alt="Choice Properties Group logo"
              width={220}
              height={110}
              className="max-w-[220px] h-auto object-contain"
            />
          </Link>
          <Link
            href="#"
            target="_blank"
            className="desktop:hover:opacity-90 ease-in-out duration-300"
          >
            <Image
              src="/logos/choice-rentals-logo.png"
              alt="Choice Rentals logo"
              width={220}
              height={110}
              className="max-w-[220px] h-auto object-contain"
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
