import { useDeleteBookMutation, useGetBooksQuery } from "@/redux/api/baseApi";
import PreLoader from "../components/loader/PreLoader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { IBook } from "@/types/types";
import { Edit2Icon, EyeIcon, Trash } from "lucide-react";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";
const AllBooks = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useGetBooksQuery({ page: currentPage });
  const totalPages = data?.meta?.totalPages || 1;
  console.log(totalPages);
  console.log(data);
  const [deleteBook] = useDeleteBookMutation();
  if (isLoading) return <PreLoader />;

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteBook(id);

        if (res) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <div className="mt-8">
      {/* Mobile View: Card Layout */}
      <div className="block md:hidden space-y-4">
        {data?.data.map((book: IBook) => (
          <div
            key={book._id}
            className="border rounded-xl p-4 shadow-sm flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">{book.title}</h2>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  book.copies > 0
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {book.copies > 0 ? "Available" : "Unavailable"}
              </span>
            </div>
            <div className="text-sm space-y-1">
              <p>
                <strong>Author:</strong> {book.author}
              </p>
              <p>
                <strong>Genre:</strong> {book.genre}
              </p>
              <p>
                <strong>ISBN:</strong> {book.isbn}
              </p>
              <p>
                <strong>Copies:</strong> {book.copies}
              </p>
            </div>
            <div className="flex justify-end gap-3 pt-2 items-center text-gray-600">
              <Link to={`/books/${book._id}`}>
                <EyeIcon className="w-4 h-4" />
              </Link>
              <Link to={`/edit-book/${book._id}`}>
                <Edit2Icon className="w-4 h-4" />
              </Link>
              <Trash
                className="w-4 h-4 text-red-500 cursor-pointer"
                onClick={() => handleDelete(book._id)}
              />
              <Button>
                <Link to={`/borrow/${book._id}`}>Borrow</Link>
              </Button>
            </div>
          </div>
        ))}

        {totalPages > 1 && (
          <Pagination className="mt-6 justify-center">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                />
              </PaginationItem>

              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    isActive={currentPage === index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>

      {/*  Tablet/Desktop View: Table Layout */}
      <div className="hidden md:block overflow-x-auto">
        <Table className="min-w-[700px]">
          <TableHeader>
            <TableRow className="text-base lg:text-lg">
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Copies</TableHead>
              <TableHead>Availability</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data.map((book: IBook) => (
              <TableRow key={book._id} className="text-sm lg:text-base">
                <TableCell>
                  <Link to={`/books/${book._id}`}>{book.title}</Link>
                </TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.genre}</TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>{book.copies}</TableCell>
                <TableCell>
                  {book.copies > 0 ? "Available" : "Unavailable"}
                </TableCell>
                <TableCell className="flex gap-2 items-center">
                  <Link to={`/edit-book/${book._id}`}>
                    <Edit2Icon className="w-4 h-4" />
                  </Link>
                  <Trash
                    className="w-4 h-4 text-red-500 cursor-pointer"
                    onClick={() => handleDelete(book._id)}
                  />
                  <Button>
                    <Link to={`/borrow/${book._id}`}>Borrow</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {totalPages > 1 && (
          <Pagination className="mt-6 justify-center">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                />
              </PaginationItem>

              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    isActive={currentPage === index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
};

export default AllBooks;
