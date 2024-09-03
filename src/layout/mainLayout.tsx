import React from "react";
import { cn } from "../utils/cn";

const MainLayout = ({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={cn("min-h-[100vh] bg-[#0F172A] p-2", className)}>
      {children}
    </div>
  );
};

export default MainLayout;
