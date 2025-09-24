import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { db } from "@/lib/db";
import { users, products, services, orders } from "@/drizzle/schema";
import { count } from "drizzle-orm";
import { eq } from "drizzle-orm";

async function getStats() {
  const [
    totalUsers,
    totalProducts,
    totalServices,
    activeOrders
  ] = await Promise.all([
    db.select({ count: count() }).from(users).where(eq(users.deletedAt, null)),
    db.select({ count: count() }).from(products).where(eq(products.deletedAt, null)),
    db.select({ count: count() }).from(services).where(eq(services.deletedAt, null)),
    db.select({ count: count() }).from(orders).where(eq(orders.status, "active")),
  ]);

  return {
    users: totalUsers[0].count,
    products: totalProducts[0].count,
    services: totalServices[0].count,
    activeOrders: activeOrders[0].count,
  };
}

export default async function DashboardPage() {
  const stats = await getStats();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>Total Users</CardHeader>
          <CardContent>
            <h2 className="text-3xl font-semibold text-primary">
              {stats.users}
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>Active Products</CardHeader>
          <CardContent>
            <h2 className="text-3xl font-semibold text-primary">
              {stats.products}
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>Available Services</CardHeader>
          <CardContent>
            <h2 className="text-3xl font-semibold text-primary">
              {stats.services}
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>Active Orders</CardHeader>
          <CardContent>
            <h2 className="text-3xl font-semibold text-primary">
              {stats.activeOrders}
            </h2>
          </CardContent>
        </Card>
      </div>

      {/* TODO: Add charts section */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>Recent Activity</CardHeader>
          <CardContent>
            {/* TODO: Add activity chart */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>User Growth</CardHeader>
          <CardContent>
            {/* TODO: Add user growth chart */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}