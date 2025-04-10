import PointsContainer from "@/components/Points/PointsContainer";

export const metadata = {
  title: "Points",
  description: "Description Page",
};

const PointsPage = () => {
  return (
    <div className="container pt-[160px]">
      <PointsContainer></PointsContainer>
    </div>
  );
};

export default PointsPage;
