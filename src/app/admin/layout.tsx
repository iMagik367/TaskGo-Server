import { ReactNode } from "react";
import Link from "next/link";
import { IconHome, IconUsers, IconPackage, IconTool, IconLogOut } from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <h1 className="text-xl font-semibold text-primary">TaskGo Admin</h1>
        </div>
        <nav className="px-4 space-y-1">
          <SidebarLink href="/admin/dashboard" icon={<IconHome size={20} />}>
            Dashboard
          </SidebarLink>
          <SidebarLink href="/admin/users" icon={<IconUsers size={20} />}>
            Users
          </SidebarLink>
          <SidebarLink href="/admin/products" icon={<IconPackage size={20} />}>
            Products
          </SidebarLink>
          <SidebarLink href="/admin/services" icon={<IconTool size={20} />}>
            Services
          </SidebarLink>
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <button 
            onClick={() => {}} 
            className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors w-full px-4 py-2 rounded-lg"
          >
            <IconLogOut size={20} />
            <span>Logout</span>
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
  icon: ReactNode;
  children: ReactNode;
}

function SidebarLink({ href, icon, children }: SidebarLinkProps) {
  return (
    <Link
      href={href}
      className="flex items-center space-x-2 text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors px-4 py-2 rounded-lg"
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}