import { db } from "@/db";
import { letters } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { content, fontFamily, stampId, paperStyle, isPublic, sender, recipient } = body;

    if (!content || !fontFamily || !stampId || !paperStyle) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newLetter = await db.insert(letters).values({
      content,
      fontFamily,
      stampId,
      paperStyle,
      sender,
      recipient,
      isPublic: isPublic !== undefined ? !!isPublic : true,
    }).returning();

    return NextResponse.json(newLetter[0], { status: 201 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Failed to save letter" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const publicLetters = await db.select()
      .from(letters)
      .where(letters.isPublic)
      .orderBy(letters.createdAt);

    return NextResponse.json(publicLetters);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Failed to fetch letters" }, { status: 500 });
  }
}
