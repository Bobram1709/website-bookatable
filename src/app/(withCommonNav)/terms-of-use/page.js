/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import React from "react";
import TermsContainer from "./_components/TermsContainer";

export const metadata = {
  title: "Terms of Use | Bookable",
  description: "Terms and condition page",
};

export default function TermsOfUse() {
  return (
    <div className="container space-y-14 pt-[160px]">
      <TermsContainer />
    </div>
  );
}
