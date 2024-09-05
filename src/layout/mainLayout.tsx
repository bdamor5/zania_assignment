import { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-[100vh] bg-gradient-to-b from-slate-900 to-slate-700 p-2 font-sans">
      {children}
    </div>
  );
};

export default MainLayout;
