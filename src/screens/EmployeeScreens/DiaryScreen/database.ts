import { openDatabaseSync, type SQLiteDatabase } from 'expo-sqlite';

const DB_NAME = 'mentis.db';

let db: SQLiteDatabase | null = null;

export function getDatabase(): SQLiteDatabase {
  if (!db) {
    db = openDatabaseSync(DB_NAME);
    db.execSync(`
      CREATE TABLE IF NOT EXISTS diary_entries (
        id TEXT PRIMARY KEY,
        date TEXT NOT NULL,
        text TEXT NOT NULL,
        prompt TEXT
      );
    `);
  }
  return db;
}

export async function loadEntries() {
  const database = getDatabase();
  const result = await database.getAllAsync<{
    id: string;
    date: string;
    text: string;
    prompt: string;
  }>('SELECT * FROM diary_entries ORDER BY date DESC');
  return result;
}

export async function saveEntry(entry: {
  id: string;
  date: string;
  text: string;
  prompt: string;
}) {
  const database = getDatabase();
  await database.runAsync(
    'INSERT INTO diary_entries (id, date, text, prompt) VALUES (?, ?, ?, ?)',
    entry.id,
    entry.date,
    entry.text,
    entry.prompt
  );
}
