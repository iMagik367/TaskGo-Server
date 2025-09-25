import AdminLayout from "@/components/layout/admin-layout";
import { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: RootLayoutProps) {
  return <AdminLayout>{children}</AdminLayout>;
}