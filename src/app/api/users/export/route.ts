import { NextResponse } from "next/server";
import { getUsers } from "@/lib/db";
import { headers } from "next/headers";
import Papa from "papaparse";
import { users } from "@/drizzle/schema";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search");
  const status = searchParams.get("status");
  const type = searchParams.get("type");

  try {
    const { data: users } = await getUsers(
      search || undefined,
      status || undefined,
      type || undefined,
      1,
      undefined,
      true // skipPagination
    );

    // Transformar dados para CSV
    const csvData = users.map((user: typeof users.$inferSelect) => ({
      ID: user.id,
      Nome: user.name,
      Email: user.email,
      "Tipo de Conta": user.accountType,
      Status: user.status,
      "Data de Criação": new Date(user.createdAt).toLocaleString("pt-BR"),
      "Última Atualização": user.updatedAt
        ? new Date(user.updatedAt).toLocaleString("pt-BR")
        : "",
    }));

    const csv = Papa.unparse(csvData, {
      delimiter: ",",
      header: true,
    });

    // Configurar cabeçalhos para download
    const headersList = headers();
    const fileName = `usuarios_taskgo_${new Date().toISOString().split("T")[0]}.csv`;

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="${fileName}"`,
      },
    });
  } catch (error) {
    console.error("Erro ao exportar usuários:", error);
    return new NextResponse(
      JSON.stringify({ error: "Erro ao exportar usuários" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}