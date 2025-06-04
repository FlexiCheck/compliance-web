import { ReactNode } from 'react';

import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type Props = {
  title: string;
  children: ReactNode;
};

export const DetailsAccordion = ({ title, children }: Props) => {
  return (
    <AccordionItem value={title} className="bg-white rounded border shadow-none !border-b">
      <AccordionTrigger className="text-lg font-medium m-3 hover:no-underline cursor-pointer items-center">
        {title}
      </AccordionTrigger>
      <AccordionContent className="rounded-b-md p-6 border-t bg-background">
        {children}
      </AccordionContent>
    </AccordionItem>
  );
};
