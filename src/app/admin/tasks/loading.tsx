import AdminLayout from "@/components/layout/admin-layout";
import { Card, CardContent } from "@/components/ui/card";

export default function Loading() {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Carregando...</h1>
        
        <Card>
          <div className="p-4">
            <div className="animate-pulse bg-gray-100 h-10 rounded" />
          </div>
          <div className="border-t">
            <div className="p-4 space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-16 animate-pulse bg-gray-100 rounded" />
              ))}
            </div>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}