import AdminLayout from "@/components/layout/admin-layout";
import { Card, CardContent } from "@/components/ui/card";

export default function Loading() {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Carregando...</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardContent className="p-6 h-32 animate-pulse bg-gray-100" />
          </Card>
          <Card>
            <CardContent className="p-6 h-32 animate-pulse bg-gray-100" />
          </Card>
          <Card>
            <CardContent className="p-6 h-32 animate-pulse bg-gray-100" />
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}