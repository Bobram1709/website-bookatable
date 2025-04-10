"use client";

import ContentWrapper from "@/components/ContentWrapper/ContentWrapper";
import { useGetContentQuery } from "@/redux/api/contentApi";

export default function TermsContainer() {
  const { data: contentRes } = useGetContentQuery("termsAndConditions");
  const termsAndConditions = contentRes?.data?.termsAndConditions || "";

  return <ContentWrapper htmlContent={termsAndConditions} />;
}
