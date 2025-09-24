import { db } from "@/lib/db";
import { users } from "@/drizzle/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth";
import { pusher } from "@/lib/realtime";
import { CHANNELS, EVENTS } from "@/lib/realtime";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    requireAdmin();
    
    const { status } = await req.json();
    
    const updatedUser = await db
      .update(users)
      .set({ status })
      .where(eq(users.id, params.id))
      .returning();

    // Notify clients about the update
    await pusher.trigger(CHANNELS.USERS, EVENTS.USER_UPDATED, {
      id: params.id,
      status,
    });

    return NextResponse.json(updatedUser[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    requireAdmin();
    
    const deletedUser = await db
      .update(users)
      .set({ deletedAt: new Date() })
      .where(eq(users.id, params.id))
      .returning();

    return NextResponse.json(deletedUser[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}