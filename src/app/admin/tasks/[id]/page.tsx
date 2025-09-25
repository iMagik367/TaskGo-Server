import AdminLayout from "@/components/layout/admin-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function getTask(id: string) {
  if (id === "new") return null;
  
  const result = await sql`
    SELECT id, title, description, status
    FROM tasks
    WHERE id = ${id}
  `;
  
  return result.rows[0];
}

async function saveTask(formData: FormData) {
  "use server";
  
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const status = formData.get("status") as string;
  
  if (id === "new") {
    await sql`
      INSERT INTO tasks (title, description, status)
      VALUES (${title}, ${description}, ${status})
    `;
  } else {
    await sql`
      UPDATE tasks
      SET title = ${title},
          description = ${description},
          status = ${status},
          completed_at = ${status === "completed" ? new Date().toISOString() : null}
      WHERE id = ${id}
    `;
  }
  
  revalidatePath("/admin/tasks");
  redirect("/admin/tasks");
}

async function deleteTask(formData: FormData) {
  "use server";
  
  const id = formData.get("id") as string;
  
  await sql`
    DELETE FROM tasks
    WHERE id = ${id}
  `;
  
  revalidatePath("/admin/tasks");
  redirect("/admin/tasks");
}

export default async function TaskPage({
  params,
}: {
  params: { [key: string]: string };
}) {
  const task = await getTask(params.id);
  const isNew = params.id === "new";
  
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">
          {isNew ? "Nova Tarefa" : "Editar Tarefa"}
        </h1>
        
        <Card>
          <form action={saveTask} className="p-6 space-y-4">
            <input type="hidden" name="id" value={params.id} />
            
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Título
              </label>
              <Input
                id="title"
                name="title"
                defaultValue={task?.title}
                required
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Descrição
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                defaultValue={task?.description}
              />
            </div>
            
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                name="status"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                defaultValue={task?.status || "pending"}
              >
                <option value="pending">Pendente</option>
                <option value="completed">Concluída</option>
              </select>
            </div>
            
            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => history.back()}
              >
                Cancelar
              </Button>
              
              <div className="flex space-x-2">
                {!isNew && (
                  <form action={deleteTask}>
                    <input type="hidden" name="id" value={params.id} />
                    <Button type="submit" variant="destructive">
                      Excluir
                    </Button>
                  </form>
                )}
                
                <Button type="submit">
                  {isNew ? "Criar" : "Salvar"}
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </AdminLayout>
  );
}