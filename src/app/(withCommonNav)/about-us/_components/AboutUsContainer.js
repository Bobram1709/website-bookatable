"use client";

import ContentWrapper from "@/components/ContentWrapper/ContentWrapper";
import { useGetContentQuery } from "@/redux/api/contentApi";

export default function AboutUsContainer() {
  const { data: aboutUsRes } = useGetContentQuery("aboutUs");
  const aboutUs = aboutUsRes?.data?.aboutUs || "";

  return <ContentWrapper htmlContent={aboutUs} />;
}
