import Image from "next/image";

const OurStoryComponent = () => {
  return (
    <main className="flex flex-col gap-10 items-center py-15">
      <p className="text-[40px] font-light uppercase text-center">Our Story</p>
      <div className="flex flex-col items-center gap-10 w-full">
        <div className="flex flex-col gap-[20px] w-full">
          <p className="text-paragraph font-semibold text-center">
            Guardians of homes in Plett
          </p>
          <p className="text-paragraph text-center w-full">
            In 1965 a business was born, Bay Holiday Homes ~ its home was 5 Gibb
            Street.
          </p>
        </div>
        <div className="rotate-[2deg] bg-white/90 p-2 rounded-full drop-shadow-md size-[190px] desktop:hidden">
          <Image
            src="/images/our-story/60-years-stamp.png"
            alt="60 Years Anniversary Badge"
            width={190}
            height={190}
            className="w-full h-full object-cover"
            sizes="190px"
          />
        </div>
      </div>
      <div className="hidden text-center tablet:block">
        <p className="text-[24px]">
          Three owners, various premises, and{" "}
          <span className="font-semibold text-[24px]">60 years later</span>, we
          are the proud owners of Bay Holiday Homes.
        </p>
        <p>
          For the past five years, we&apos;ve also owned 5 Gibb Street –{" "}
          <span className="font-semibold">
            Our Home to Safeguard Your Home.
          </span>
        </p>
        <p className="mt-5">
          As specialists in managing homes and holiday rentals in Plettenberg
          Bay, Bay Holiday Homes is currently owned by the CBH Holdings Group,
          with Simone Carr at the helm alongside a dedicated team.
        </p>
      </div>
      <div className="relative grid gap-10 w-full tablet:grid-cols-2">
        <div className="relative aspect-[4/2.6]">
          <Image
            src="/images/our-story/old-plett-photo.png"
            alt="Historic Plettenberg Bay photo from 1965"
            fill
            sizes="(max-width: 800px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute left-0 bottom-0 bg-white/90 px-[8px] py-[4px]">
            <p className="text-paragraph font-semibold text-center">Then</p>
          </div>
          <div className="hidden absolute -top-10 -right-5 rotate-[5deg] bg-white/90 p-2 rounded-full drop-shadow-md size-[190px] desktop:block">
            <Image
              src="/images/our-story/60-years-stamp.png"
              alt="60 Years Anniversary Badge"
              width={204}
              height={204}
              className="w-full h-full object-cover"
              sizes="204px"
            />
          </div>
        </div>

        <div className="relative aspect-[4/2.6]">
          <Image
            src="/images/our-story/new-plett-photo.png"
            alt="Modern Plettenberg Bay photo"
            fill
            sizes="(max-width: 1279px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute left-0 bottom-0 bg-white/90 px-[8px] py-[4px]">
            <p className="text-paragraph font-semibold text-center">Now</p>
          </div>
        </div>
      </div>
      <div className="text-center tablet:hidden">
        <p>
          Three owners, various premises, and{" "}
          <span className="font-semibold">60 years later</span>, we are the
          proud owners of Bay Holiday Homes.
        </p>
        <p>
          For the past five years, we&apos;ve also owned 5 Gibb Street –{" "}
          <span className="font-semibold">
            Our Home to Safeguard Your Home.
          </span>
        </p>
        <p className="mt-5">
          As specialists in managing homes and holiday rentals in Plettenberg
          Bay, Bay Holiday Homes is currently owned by the CBH Holdings Group,
          with Simone Carr at the helm alongside a dedicated team.
        </p>
      </div>
      <div className="flex flex-col gap-[20px] text-paragraph text-center w-full">
        <p className="font-semibold">
          What sets us apart in this beautiful coastal town, which many visitors
          and homeowners call &quot;paradise&quot;?
        </p>
        <p>
          We are <span className="font-semibold">registered with the PPRA</span>{" "}
          (Property Practitioners Regulatory Authority) and{" "}
          <span className="font-semibold">
            strictly adhere to their regulations
          </span>
          . All funds held on behalf of clients are retained in Trust accounts
          which are audited annually. As an energised and experienced team with
          a keen interest in property, we build exclusive, meaningful, and
          reliable relationships with all our clients, founded on{" "}
          <span className="font-semibold">
            commitment and clear communication
          </span>
          .
        </p>
        <p>
          Our approach is built on selectivity and partnership. We deliberately
          limit the number of properties we manage to ensure we never compromise
          on service quality, but we remain open to homes of all types, sizes,
          and locations. What matters most is finding the right fit – homeowners
          who are committed to working collaboratively with us to create
          exceptional guest experiences. We carefully curate each partnership to
          ensure both happy guests and happy owners, because every property we
          manage reflects our commitment to safeguarding your investment in our
          coastal paradise.
        </p>
      </div>
    </main>
  );
};

export default OurStoryComponent;
