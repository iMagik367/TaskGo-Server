"use client";

import { ReactNode } from "react";
import Link from "next/link";
import {
  HomeIcon,
  UsersIcon,
  PackageIcon,
  WrenchIcon,
  LogOutIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const handleLogout = async () => {
    // Implementar logout
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <h1 className="text-xl font-semibold text-primary">TaskGo Admin</h1>
        </div>
        <nav className="px-4 space-y-1">
          <SidebarLink href="/admin/dashboard" icon={<HomeIcon size={20} />}>
            Dashboard
          </SidebarLink>
          <SidebarLink href="/admin/users" icon={<UsersIcon size={20} />}>
            Usuários
          </SidebarLink>
          <SidebarLink href="/admin/products" icon={<PackageIcon size={20} />}>
            Produtos
          </SidebarLink>
          <SidebarLink href="/admin/services" icon={<WrenchIcon size={20} />}>
            Serviços
          </SidebarLink>
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full rounded-md"
          >
            <LogOutIcon size={20} />
            <span className="ml-3">Sair</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  );
}

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function SidebarLink({ href, icon, children }: SidebarLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center px-4 py-2 text-sm font-medium rounded-md",
        "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
      )}
    >
      {icon}
      <span className="ml-3">{children}</span>
    </Link>
  );
}