"use client";

import { useState } from "react";
import classNames from "classnames";
import TestimonialsSlider from "./testimonials-slider";
import placeholderData from "@/_data/placeholder-data.json";

const TestimonialsComponent = () => {
  const [activeTab, setActiveTab] = useState<"clients" | "guests">("clients");

  const testimonialsData =
    activeTab === "clients"
      ? placeholderData.happyClients
      : placeholderData.happyGuests;

  return (
    <section className="flex flex-col gap-10 items-center w-full py-15">
      <h2 className="text-[40px] font-light text-black uppercase text-center">
        Testimonials
      </h2>

      <div className="flex items-center justify-center w-full max-w-[900px] rounded-[2px] overflow-hidden">
        <button
          onClick={() => setActiveTab("clients")}
          className={classNames(
            "flex-1 px-2 py-3 text-[16px] font-normal text-center border-2 border-teal duration-300 ease-in-out desktop:hover:cursor-pointer",
            {
              "bg-teal text-white": activeTab === "clients",
              "bg-white text-black opacity-60 desktop:hover:opacity-85":
                activeTab !== "clients",
            },
          )}
          aria-label="View happy clients testimonials"
        >
          Happy clients
        </button>
        <button
          onClick={() => setActiveTab("guests")}
          className={classNames(
            "flex-1 px-2 py-3 text-[16px] font-normal text-center border-2 border-teal duration-300 ease-in-out desktop:hover:cursor-pointer",
            {
              "bg-teal text-white": activeTab === "guests",
              "bg-white text-black opacity-60 desktop:hover:opacity-85":
                activeTab !== "guests",
            },
          )}
          aria-label="View happy guests testimonials"
        >
          Happy guests
        </button>
      </div>

      <div className="w-full">
        <TestimonialsSlider testimonials={testimonialsData} />
      </div>
    </section>
  );
};

export default TestimonialsComponent;
