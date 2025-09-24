import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import { and, eq, like, or, isNull, desc } from "drizzle-orm";
import { users } from "@/drizzle/schema";
import { SQL } from "drizzle-orm";
import { PgColumn } from "drizzle-orm/pg-core";

export const db = drizzle(sql);

// Helper functions
export async function executeQuery(query: string, params: any[] = []) {
  try {
    const result = await sql.query(query, params);
    return result.rows;
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
}

export async function getUsers(
  search?: string,
  status?: string,
  type?: string,
  page: number = 1,
  limit: number = 10,
  skipPagination: boolean = false
) {
  const query = `
    WITH filtered_users AS (
      SELECT *
      FROM users
      WHERE deleted_at IS NULL
        ${search ? `AND (name ILIKE $1 OR email ILIKE $1)` : ""}
        ${status ? `AND status = $2` : ""}
        ${type ? `AND account_type = $3` : ""}
    )
    SELECT
      json_build_object(
        'data', (
          SELECT coalesce(json_agg(u.*), '[]'::json)
          FROM (
            SELECT *
            FROM filtered_users
            ORDER BY created_at DESC
            ${skipPagination ? "" : "LIMIT $4 OFFSET $5"}
          ) u
        ),
        'totalCount', (
          SELECT count(*)
          FROM filtered_users
        )
      ) as result
  `;

  const params = [
    search ? `%${search}%` : null,
    status || null,
    type || null,
    limit,
    (page - 1) * limit,
  ].filter(p => p !== null);

  const result = await sql.query(query, params);
  const { data, totalCount } = result.rows[0].result;
  return {
    data,
    totalCount,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: page
  };

  return {
    data,
    totalCount,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: page,
  };
}