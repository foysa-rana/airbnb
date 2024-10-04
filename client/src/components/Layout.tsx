"use client";
import { DataProvider } from "@/context/dataContext";
import { HeaderProvider } from "@/context/headerContext";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <HeaderProvider>
      <DataProvider>{children}</DataProvider>
    </HeaderProvider>
  );
};

export default Layout;
