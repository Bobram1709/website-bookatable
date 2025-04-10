import { Skeleton } from "antd";

const OrderSkeleton = () => {
  return (
    <div>
      <div className="mx-auto flex max-w-sm items-center gap-x-4 rounded bg-primary-secondary-2 px-4 py-2">
        {/* left */}
        <div className="w-1/3 text-center">
          <Skeleton.Image
            active
            className="mx-auto mb-2 block"
            style={{ width: 60, height: 60 }}
          />
          <Skeleton.Input
            active
            className="w-full"
            style={{ width: "100%" }}
            size="small"
          />
        </div>

        {/* right */}
        <div className="w-2/3">
          <Skeleton
            active
            title={false}
            paragraph={{ rows: 2, width: ["100%", "100%"] }}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderSkeleton;
