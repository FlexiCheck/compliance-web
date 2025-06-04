'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { ScanningLoader } from '@/components/scan/scanning-loader';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  tokenName: z.string().min(1).trim(),
  website: z
    .string()
    .url({
      message: 'Please enter a valid website URL (including http:// or https://)',
    })
    .trim(),
});

type FormValues = z.infer<typeof formSchema>;

export const ScanTokenForm = () => {
  const [isScanning, setIsScanning] = useState(false);
  const form = useForm<FormValues>({
    defaultValues: {
      tokenName: '',
      website: '',
    },
    resolver: zodResolver(formSchema),
  });

  const [tokenName, website] = form.watch(['tokenName', 'website']);

  const onSubmit = async (values: FormValues) => {
    setIsScanning(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(values);
    } finally {
      setIsScanning(false);
    }
  };

  if (isScanning) {
    return <ScanningLoader tokenName={tokenName} />;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-white p-5 border rounded-md w-[670px]"
      >
        <h3 className="tracking-tight text-2xl font-bold text-center">Analyze Crypto Token</h3>

        <p className="text-sm text-muted-foreground text-center mt-2 mb-5">
          Enter token details to perform due diligence analysis
        </p>

        <FormField
          control={form.control}
          name="tokenName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Token Name (e.g. Bitcoin)</FormLabel>
              <FormControl>
                <Input placeholder="Enter token name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem className="mt-5 mb-8">
              <FormLabel>Token Website URL (e.g. bitcoin.org)</FormLabel>
              <FormControl>
                <Input placeholder="Enter website URL..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={tokenName === '' || website === ''} className="w-full">
          Run Analysis
        </Button>
      </form>
    </Form>
  );
};
