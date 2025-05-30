import { Path, UseFormReturn } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

type AuthFields = { email: string; password: string };
type Props<T extends AuthFields> = {
  form: UseFormReturn<T>;
  onSubmit: (values: T) => void;
};

export const AuthForm = <T extends AuthFields>({
  form,
  onSubmit,
}: Props<T>) => {
  const email = form.watch("email" as Path<T>);
  const password = form.watch("password" as Path<T>);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 min-w-[400px]"
      >
        <FormField
          control={form.control}
          name={"email" as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"password" as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={email === "" || password === ""}
          className="w-full"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};
