import { db } from "@/db";
import { letters } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq, desc } from "drizzle-orm";

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

export async function GET(request: Request) {
  console.log("GET /api/letters called");
  try {
    const publicLetters = await db.select()
      .from(letters)
      .where(eq(letters.isPublic, true))
      .orderBy(desc(letters.createdAt));

    console.log(`Fetched ${publicLetters.length} public letters`);
    return NextResponse.json(publicLetters);
  } catch (error) {
    console.error("Database error in GET /api/letters:", error);
    return NextResponse.json({ error: "Failed to fetch letters" }, { status: 500 });
  }
}
