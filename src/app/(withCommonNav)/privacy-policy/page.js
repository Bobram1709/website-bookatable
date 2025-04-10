import PrivacyPolicyContainer from "./_components/PrivacyPolicyContainer";

/* eslint-disable react/no-unescaped-entities */
export const metadata = {
  title: "Privacy Policy | Bookable",
};

export default function PrivacyPolicy() {
  return (
    <div className="container space-y-14 pt-[160px]">
      <PrivacyPolicyContainer />
    </div>
  );
}
