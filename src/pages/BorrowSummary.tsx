import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetBorrowBookQuery } from "@/redux/api/baseApi";
import type { IBorrow } from "@/types/types";
import PreLoader from "../components/loader/PreLoader";

const BorrowSummary = () => {
  const { data, isLoading } = useGetBorrowBookQuery(undefined);

  if (isLoading) return <PreLoader />;

  return (
    <div className="mt-14 w-full">
      {/* Desktop Table */}
      <div className="hidden md:block">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Book Title</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Total Quantity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.data.map((borrow: IBorrow) => (
              <TableRow key={borrow._id}>
                <TableCell>{borrow.book.title}</TableCell>
                <TableCell>{borrow.book.isbn}</TableCell>
                <TableCell>{borrow.totalQuantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-4">
        {data.data.map((borrow: IBorrow) => (
          <div
            key={borrow._id}
            className="border rounded-xl p-4 shadow-sm dark:border-1"
          >
            <p>
              <strong>Title:</strong> {borrow.book.title}
            </p>
            <p>
              <strong>ISBN:</strong> {borrow.book.isbn}
            </p>
            <p>
              <strong>Total Quantity:</strong> {borrow.totalQuantity}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BorrowSummary;
