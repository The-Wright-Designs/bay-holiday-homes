"use client";

import ButtonType from "@/_components/ui/buttons/button-type";
import PageWrapper from "@/_lib/utils/page-wrapper";

interface ErrorProps {
  reset: () => void;
}

const Error = ({ reset }: ErrorProps) => {
  return (
    <PageWrapper>
      <section className="flex flex-col gap-5 items-center text-center py-20 px-5">
        <h1 className="text-[40px] font-light uppercase">
          Something Went Wrong
        </h1>
        <p className="max-w-[600px]">
          We could not load this page right now. Please try again in a moment.
        </p>
        <div className="pt-5">
          <ButtonType
            type="button"
            onClick={reset}
            ariaLabel="Try loading the page again"
          >
            Try Again
          </ButtonType>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Error;
