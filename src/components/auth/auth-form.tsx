import { AlertCircleIcon } from 'lucide-react';
import { Path, UseFormReturn } from 'react-hook-form';

import { Alert, AlertTitle } from '../ui/alert';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

type AuthFields = {
  username?: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

type Props<T extends AuthFields> = {
  form: UseFormReturn<T>;
  onSubmit: (values: T) => void;
  isLoading?: boolean;
  mode: 'signin' | 'signup';
};

export const AuthForm = <T extends AuthFields>({ form, onSubmit, isLoading, mode }: Props<T>) => {
  const email = form.watch('email' as Path<T>);
  const password = form.watch('password' as Path<T>);
  const rootError = form.formState.errors.root?.message;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 min-w-[300px] md:min-w-[400px]"
      >
        {rootError && (
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>{rootError}</AlertTitle>
          </Alert>
        )}

        {/* Only show Username for signup */}
        {mode === 'signup' && (
          <FormField
            control={form.control}
            name={'username' as Path<T>}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter your username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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

        {/* Only show confirmPassword for signup */}
        {mode === 'signup' && (
          <FormField
            control={form.control}
            name={'confirmPassword' as Path<T>}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Confirm your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button
          type="submit"
          disabled={email === '' || password === '' || isLoading}
          className="w-full"
          isLoading={isLoading}
        >
          {mode === 'signin' ? 'Sign In' : 'Sign Up'}
        </Button>
      </form>
    </Form>
  );
};
