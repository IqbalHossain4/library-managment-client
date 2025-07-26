import App from "@/App";
import { createBrowserRouter } from "react-router";
import AllBooks from "../pages/AllBooks";
import BorrowSummary from "@/pages/BorrowSummary";
import Home from "../pages/Home";
import { EditBook } from "../pages/EditBook";
import { AddBook } from "@/pages/AddBook";
import BookDetails from "@/pages/BookDetails";
import { BorrowBook } from "@/pages/BorrowBook";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "books",
        element: <AllBooks />,
      },
      {
        path: "create-book",
        element: <AddBook />,
      },
      {
        path: "books/:id",
        element: <BookDetails />,
      },
      {
        path: "edit-book/:id",
        element: <EditBook />,
      },
      {
        path: "borrow/:id",
        element: <BorrowBook />,
      },
      {
        path: "borrow-summary",
        element: <BorrowSummary />,
      },
    ],
  },
]);
export default router;
