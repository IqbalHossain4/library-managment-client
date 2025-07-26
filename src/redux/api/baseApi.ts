import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://library-management-nine-coral.vercel.app/api",
  }),
  tagTypes: ["Books"],
  endpoints: (build) => ({
    //Get Book
    getBooks: build.query({
      query: ({ page }) => {
        return page ? `/books?page=${page}` : `/books`;
      },
      providesTags: ["Books"],
    }),
    //Get Book with id
    getBook: build.query({
      query: (id) => `/books/${id}`,
    }),

    //Update Book
    updateBook: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: data,
      }),

      invalidatesTags: ["Books"],
    }),

    //Delete Book
    deleteBook: build.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),

    //Borrow Book
    borrowBook: build.mutation({
      query: (data) => ({
        url: `/borrow`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Books"],
    }),

    //Add Book
    addBook: build.mutation({
      query: (data) => ({
        url: `/books`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Books"],
    }),

    //Get Borrow Book
    getBorrowBook: build.query({
      query: () => `/borrow`,
    }),
  }),
});

export const {
  useGetBooksQuery,
  useUpdateBookMutation,
  useGetBookQuery,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useAddBookMutation,
  useGetBorrowBookQuery,
} = baseApi;
