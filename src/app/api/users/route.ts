import { db } from "@/lib/db";
import { users } from "@/drizzle/schema";
import { NextResponse } from "next/server";
import { eq, isNull } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    requireAdmin();

    const allUsers = await db
      .select()
      .from(users)
      .where(isNull(users.deletedAt));

    return NextResponse.json(allUsers);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}