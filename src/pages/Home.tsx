import PreLoader from "@/components/loader/PreLoader";
import { Button } from "@/components/ui/button";
import { useGetBooksQuery } from "@/redux/api/baseApi";
import type { IBook } from "@/types/types";
import { BookAIcon, Edit2Icon } from "lucide-react";
import { Link } from "react-router";

const Home = () => {
  const { data, isLoading } = useGetBooksQuery({});
  const books = data?.data;
  console.log(data);
  if (isLoading) return <PreLoader />;
  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div className="shadow-neutral-200 border-1 p-2 ">
          <p>📚 Library Management System</p>
        </div>
        <h1 className="text-5xl font-bold mt-4 max-w-2xl text-center ">
          Smart Library Management System
        </h1>
        <p className=" mt-5 max-w-2xl text-center ">
          The Library Management System helps organize, track, and manage books
          and borrowing more efficiently and securely for users across multiple
          library branches.
        </p>
        <div className="mt-5 flex gap-4 items-center">
          <Link to={"/books"}>
            <Button className="rounded-none">Browse Books</Button>
          </Link>
          <Link to="/create-book">
            <Button className="rounded-none dark:bg-amber-950 dark:text-white bg-white border-2 text-black hover:bg-white">
              + Add Book
            </Button>
          </Link>
        </div>
        <div className="mt-10">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center">Top Books</h2>
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {!isLoading &&
                books?.slice(0, 6).map((book: IBook) => (
                  <div key={book._id}>
                    <div className="p-5 bg-white rounded-none shadow-md border hover:shadow-lg transition duration-300">
                      <div className="flex justify-between items-start gap-1 ">
                        <div>
                          <h2 className="text-lg font-bold text-gray-900">
                            {book?.title}
                          </h2>
                          <p className="text-sm text-blue-600 mt-1">
                            by {book?.author}
                          </p>
                        </div>
                        <span
                          className={`${
                            book?.available
                              ? "bg-green-100 text-green-700 dark:bg-green-100 dark:text-green-700"
                              : "bg-red-600 text-white dark:bg-red-600 dark:text-white"
                          }text-xs px-2 py-1 rounded-none`}
                        >
                          {book?.available ? "Available" : "Unavailable"}
                        </span>
                      </div>

                      <div className="mt-4 space-y-1 text-sm text-gray-700">
                        <p>
                          <span className="font-medium mr-2">Genre:</span>
                          {book?.genre}
                        </p>
                        <p>
                          <span className="font-medium mr-2">Copies:</span>
                          {book?.copies}
                        </p>
                        {/* <p className="text-gray-600 mt-2">
                          Banished by her own court, a queen returns with
                          vengeance in...
                        </p> */}
                      </div>

                      <div className="flex justify-end gap-3 pt-2 items-center text-gray-600">
                        <Link to={`/edit-book/${book._id}`}>
                          <Edit2Icon className="w-4 h-4" />
                        </Link>
                        <Link to={`/borrow/${book._id}`}>
                          <BookAIcon />
                        </Link>
                      </div>

                      <div className="mt-5">
                        <Link to={`/books/${book._id}`}>
                          <Button className="cursor-pointer w-full bg-green-400 text-[18px] hover:bg-green-500 text-white font-medium py-2 px-4 rounded-none transition">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="mt-6 flex justify-center items-center ">
              <Link to="/books">
                <Button className="rounded-none cursor-pointer">
                  See All Books
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
