import { pgTable, serial, text, varchar, boolean, timestamp } from "drizzle-orm/pg-core";

export const letters = pgTable("letters", {
  id: serial("id").primaryKey(),
  recipient: varchar("recipient", { length: 255 }),
  sender: varchar("sender", { length: 255 }),
  content: text("content").notNull(),
  fontFamily: varchar("font_family", { length: 255 }).notNull(),
  stampId: varchar("stamp_id", { length: 255 }).notNull(),
  paperStyle: varchar("paper_style", { length: 255 }).notNull(),
  isPublic: boolean("is_public").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
