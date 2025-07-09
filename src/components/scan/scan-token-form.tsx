'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

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
import { generateReportAction } from '@/server/actions/token';

const formSchema = z.object({
  symbol: z.string().min(1).trim(),
  url: z
    .string()
    .url({
      message: 'Please enter a valid website URL (including http:// or https://)',
    })
    .trim(),
});

type FormValues = z.infer<typeof formSchema>;

export const ScanTokenForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<FormValues>({
    defaultValues: {
      symbol: '',
      url: '',
    },
    resolver: zodResolver(formSchema),
  });

  const [symbol, url] = form.watch(['symbol', 'url']);

  const $generateReport = useMutation({
    mutationKey: ['generate-report'],
    mutationFn: generateReportAction,
  });

  const onSubmit = async (values: FormValues) => {
    $generateReport.mutate(values, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['report-status'] });
        toast.success(`Generating report started for token: ${values.symbol}`);
        router.push('/dashboard');
      },
      onError: () => {
        toast.error('Failed to scan token: Please make sure to insert the correct token name.');
      },
    });
  };

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
          name="symbol"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Make sure to insert correct Token Name (e.g. Bitcoin)</FormLabel>
              <FormControl>
                <Input placeholder="Enter token name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="url"
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

        <Button
          type="submit"
          disabled={symbol === '' || url === ''}
          className="w-full"
          isLoading={$generateReport.isPending}
        >
          Run Analysis
        </Button>
      </form>
    </Form>
  );
};
