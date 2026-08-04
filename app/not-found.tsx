import type { Metadata } from "next";
import ButtonLink from "@/_components/ui/buttons/button-link";
import PageWrapper from "@/_lib/utils/page-wrapper";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The page you are looking for is no longer available. Browse our holiday properties in Plettenberg Bay.",
  robots: { index: false, follow: true },
};

const NotFound = () => {
  return (
    <PageWrapper>
      <section className="flex flex-col gap-5 items-center text-center py-20 px-5">
        <h1 className="text-[40px] font-light uppercase">Page Not Found</h1>
        <p className="max-w-[600px]">
          The page you are looking for may have moved or is no longer available.
          Browse our holiday properties or head back to the home page.
        </p>
        <div className="flex flex-col gap-3 pt-5 tablet:flex-row">
          <ButtonLink href="/properties" ariaLabel="Browse our properties">
            Browse Properties
          </ButtonLink>
          <ButtonLink href="/" ariaLabel="Return to the home page">
            Back Home
          </ButtonLink>
        </div>
      </section>
    </PageWrapper>
  );
};

export default NotFound;
