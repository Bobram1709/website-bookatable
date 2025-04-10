import { useGetPointsRedeemRequestQuery } from "@/redux/api/pointsApi";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import moment from "moment";
import { Separator } from "../ui/separator";

const PointsHistoryTable = () => {
  const { data: requestData } = useGetPointsRedeemRequestQuery(undefined);
  return (
    <div className="mt-16">
      <h1 className="text-center text-3xl font-bold">History</h1>
      <Separator className="mx-auto mt-5 max-w-[90%]"></Separator>
      {/* table  */}
      <Table className="mt-10 overflow-x-auto shadow-lg">
        <TableHeader>
          <TableRow className="bg-[#F8FAFC]">
            <TableHead className="pl-10">Point</TableHead>
            <TableHead className="text-center">Date & Time</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requestData?.data?.map((point, idx) => (
            <TableRow
              key={idx}
              className={`${idx % 2 === 0 && "bg-[#F8FAFC]"}`}
            >
              <TableCell className="pl-10">{point.coins}</TableCell>
              <TableCell className="truncate text-center">
                {moment(point.createdAt).format("DD MMM YYYY, hh:mm A")}
              </TableCell>
              <TableCell className="text-right">{point.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PointsHistoryTable;
