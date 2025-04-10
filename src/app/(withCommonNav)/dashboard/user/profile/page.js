import UserProfileForm from "./_componets/UserProfileForm";

export const metadata = {
  title: "Your Profile | Bookable",
  description: "User profile page",
};

export default function UserProfile() {
  return (
    <div className="container pt-[160px]">
      <h1>Profile Picture</h1>

      {/* user details form */}
      <div className="my-10">
        <UserProfileForm />
      </div>
    </div>
  );
}
