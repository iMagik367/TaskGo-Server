import { UsersTable } from "@/components/users/users-table";
import { FilterBar } from "@/components/ui/filter-bar";
import { db, getUsers } from "@/lib/db";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { PaginationBar } from "@/components/ui/pagination-bar";
import { revalidatePath } from "next/cache";

export default async function UsersPage({
  searchParams,
}: {
  searchParams: { 
    search?: string; 
    status?: string; 
    type?: string;
    page?: string;
  };
}) {
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
  const { data: usersList, totalPages } = await getUsers(
    searchParams.search,
    searchParams.status,
    searchParams.type,
    currentPage
  );

  async function approveUser(id: string) {
    "use server";
    await db
      .update(users)
      .set({ status: "active" })
      .where(eq(users.id, id));
    revalidatePath("/admin/users");
  }

  async function toggleBlockUser(id: string) {
    "use server";
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .then((rows: any[]) => rows[0]);

    const newStatus = user.status === "blocked" ? "active" : "blocked";
    
    await db
      .update(users)
      .set({ status: newStatus })
      .where(eq(users.id, id));
    revalidatePath("/admin/users");
  }

  async function deleteUser(id: string) {
    "use server";
    await db
      .update(users)
      .set({ deletedAt: new Date() })
      .where(eq(users.id, id));
    revalidatePath("/admin/users");
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
        <form action={`/api/users/export?${new URLSearchParams(searchParams)}`} method="get">
          <Button type="submit" variant="primary">
            Export Data
          </Button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow">
        <FilterBar
          onSearch={(query) => {
            const url = new URL(window.location.href);
            if (query) {
              url.searchParams.set("search", query);
            } else {
              url.searchParams.delete("search");
            }
            window.history.pushState({}, "", url);
          }}
          onFilterStatus={(status) => {
            const url = new URL(window.location.href);
            if (status) {
              url.searchParams.set("status", status);
            } else {
              url.searchParams.delete("status");
            }
            window.history.pushState({}, "", url);
          }}
          onFilterType={(type) => {
            const url = new URL(window.location.href);
            if (type) {
              url.searchParams.set("type", type);
            } else {
              url.searchParams.delete("type");
            }
            window.history.pushState({}, "", url);
          }}
        />
        <UsersTable
          data={usersList}
          approveUser={approveUser}
          toggleBlockUser={toggleBlockUser}
          deleteUser={deleteUser}
        />
        <PaginationBar
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => {
            const url = new URL(window.location.href);
            url.searchParams.set("page", page.toString());
            window.history.pushState({}, "", url);
          }}
        />
      </div>
    </div>
  );
}