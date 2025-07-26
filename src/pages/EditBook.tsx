import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetBookQuery, useUpdateBookMutation } from "@/redux/api/baseApi";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";

export function EditBook() {
  //   const [open, setOpen] = useState(false);
  const { id } = useParams();
  const GENRES = [
    "FICTION",
    "NON_FICTION",
    "SCIENCE",
    "HISTORY",
    "BIOGRAPHY",
    "FANTASY",
  ];

  const form = useForm();
  const { data } = useGetBookQuery(id);
  const navigate = useNavigate();
  const [updateBook] = useUpdateBookMutation();
  const book = data?.data;
  const onSubmit: SubmitHandler<FieldValues> = async (bookData) => {
    const res = await updateBook({ id, ...bookData });

    if (res?.data?.success === true) {
      navigate("/books");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Book Update Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    form.reset();
  };
  return (
    <div className="p-5 shadow-lg">
      <h1 className="text-4xl text-center mb-5 font-bold">Edit Book</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input defaultValue={book?.title} {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input defaultValue={book?.author} {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genre</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select genre" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {GENRES.map((genre) => (
                      <SelectItem key={genre} value={genre}>
                        {genre.replace("_", " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isbn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ISBN</FormLabel>
                <FormControl>
                  <Input defaultValue={book?.isbn} {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="copies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Copies</FormLabel>
                <FormControl>
                  <Input defaultValue={book?.copies} {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="availability"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Availability</FormLabel>
                <FormControl>
                  <Input
                    readOnly
                    defaultValue={
                      book?.copies > 0 ? "Available" : "Unavailable"
                    }
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button className="max-w-[150px]" type="submit">
            Update Book
          </Button>
        </form>
      </Form>
    </div>
  );
}
