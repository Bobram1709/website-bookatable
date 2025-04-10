"use client";

import ContentWrapper from "@/components/ContentWrapper/ContentWrapper";
import { useGetContentQuery } from "@/redux/api/contentApi";

export default function PrivacyPolicyContainer() {
  const { data: privacyPolicyRes } = useGetContentQuery("privacyPolicy");
  const privacyPolicy = privacyPolicyRes?.data?.privacyPolicy || "";

  return <ContentWrapper htmlContent={privacyPolicy} />;
}
