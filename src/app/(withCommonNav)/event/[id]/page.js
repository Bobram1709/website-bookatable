import SingleEvent from "./_components/SingleEvent";

const SingleEventPage = ({ params }) => {
  return (
    <div className="container pt-[160px]">
      <SingleEvent paramsId={params.id}></SingleEvent>
    </div>
  );
};

export default SingleEventPage;
