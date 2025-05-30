import { Navigation } from "@/components/navigation";
import { Sidebar } from "@/components/sidebar";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="w-screen h-screen flex flex-col items-start justify-stretch">
      <Navigation />
      <div className="flex-1 flex items-stretch justify-start w-full">
        <Sidebar />
        <div className="p-6 w-full">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
