import { ReactNode } from 'react';

export const DetailsItem = ({
  title,
  children,
  subContent,
  icon,
}: {
  title: string;
  children: ReactNode;
  subContent?: ReactNode;
  icon?: ReactNode;
}) => {
  return (
    <div className="bg-white p-4 rounded border w-full">
      <div className="flex items-center gap-2 mb-1">
        {icon && icon}
        <p className="text-sm text-gray-500">{title}</p>
      </div>
      {children}
      {subContent}
    </div>
  );
};
