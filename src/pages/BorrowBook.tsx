import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useBorrowBookMutation, useGetBookQuery } from "@/redux/api/baseApi";
import { CalendarIcon } from "lucide-react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router";

export function BorrowBook() {
  const { id } = useParams();
  const form = useForm();
  const navigate = useNavigate();
  const { data } = useGetBookQuery(id);
  const book = data?.data;
  const [borrowBook] = useBorrowBookMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (data?.quantity > book?.copies) {
      alert("You cannot borrow more than available copies");
      return;
    }
    const payload: { book: string; quantity: number; dueDate: Date } = {
      book: id ? id : "",
      quantity: data.quantity,
      dueDate: data.dueDate,
    };

    const res = await borrowBook(payload);

    if (res?.data?.success === true) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Book Borrow Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/borrow-summary");
    }

    form.reset();
  };
  return (
    <div className="p-5 shadow-lg">
      <h1 className="text-4xl text-center mb-5 font-bold">Book Details</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-5">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input type="number" defaultValue={0} required {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Due Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          " pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      required
                      selected={field.value}
                      onSelect={field.onChange}
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />

          <Button type="submit">Borrow Book</Button>
        </form>
      </Form>
    </div>
  );
}
