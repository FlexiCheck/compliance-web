import { AlertCircleIcon } from 'lucide-react';
import { Path, UseFormReturn } from 'react-hook-form';

import { Alert, AlertTitle } from '../ui/alert';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

type AuthFields = { email: string; password: string };
type Props<T extends AuthFields> = {
  form: UseFormReturn<T>;
  onSubmit: (values: T) => void;
  isLoading?: boolean;
};

export const AuthForm = <T extends AuthFields>({ form, onSubmit, isLoading }: Props<T>) => {
  const email = form.watch('email' as Path<T>);
  const password = form.watch('password' as Path<T>);
  const rootError = form.formState.errors.root?.message;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 min-w-[300px] md:min-w-[400px]"
      >
        {rootError && (
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>{rootError}</AlertTitle>
          </Alert>
        )}
        <FormField
          control={form.control}
          name={'email' as Path<T>}
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
          name={'password' as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={email === '' || password === '' || isLoading}
          className="w-full"
          isLoading={isLoading}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};
