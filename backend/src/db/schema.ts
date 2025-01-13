import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const songsTable = sqliteTable("songs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  artist: text("artist").notNull(),
  spotifyUri: text("spotify_uri").notNull(),
  previewUrl: text("preview_url").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`CURRENT_TIMESTAMP`
  ),
});

export const userProgressTable = sqliteTable("user_progress", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  songId: integer("song_id")
    .notNull()
    .references(() => songsTable.id),
  correctCount: integer("correct_count").default(0),
  incorrectCount: integer("incorrect_count").default(0),
  lastReviewed: integer("last_reviewed", { mode: "timestamp" }),
  nextReviewDate: integer("next_review_date", { mode: "timestamp" }),
  easeFactor: text("ease_factor").default("2.5"),
});

export const usersTable = sqliteTable("users", {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  age: integer().notNull(),
  email: text().notNull().unique(),
});
