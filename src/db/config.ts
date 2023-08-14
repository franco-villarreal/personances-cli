import sqlite3 from "sqlite3";
import { DATABASE_NAME, RECORDS_TABLE_NAME } from "../constants/index.js";

export async function initDb() {
  const db = new sqlite3.Database(DATABASE_NAME);

  db.serialize(() => {
    db.run(`
    CREATE TABLE IF NOT EXISTS ${RECORDS_TABLE_NAME} (
      id TEXT PRIMARY KEY,
      type TEXT,
      category TEXT,
      timestamp INTEGER,
      amount REAL,
      description TEXT
    )
  `);
  });

  db.close();
}
