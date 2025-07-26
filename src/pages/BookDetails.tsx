import PreLoader from "@/components/loader/PreLoader";
import { useGetBookQuery } from "@/redux/api/baseApi";
import { BookAIcon, Edit2Icon } from "lucide-react";
import { Link, useParams } from "react-router";

const BookDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetBookQuery(id);
  const book = data?.data;
  console.log(book);
  if (isLoading) return <PreLoader />;
  return (
    <div>
      <h1 className="text-4xl text-center mb-5 font-bold">Book Details</h1>
      <div className="space-y-4">
        <div className="border rounded-xl p-4 shadow-sm flex flex-col gap-2">
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
            <Link to={`/edit-book/${book._id}`}>
              <Edit2Icon className="w-4 h-4" />
            </Link>
            <Link to={`/borrow/${book._id}`}>
              <BookAIcon />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
