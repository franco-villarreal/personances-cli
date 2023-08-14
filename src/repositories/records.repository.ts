import sqlite3 from "sqlite3";

import { Record } from "../interfaces/index.js";
import { RecordCategory } from "../enums/index.js";
import { DATABASE_NAME, RECORDS_TABLE_NAME } from "../constants/index.js";

export const addNewRecord = (record: Record) => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DATABASE_NAME);

    db.run(
      `
        INSERT INTO ${RECORDS_TABLE_NAME} (id, type, category, timestamp, amount, description)
        VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        record.id,
        record.type,
        record.category,
        record.timestamp,
        record.amount,
        record.description,
      ],
      (error: any) => {
        db.close();
        if (error) {
          reject(error);
        } else {
          resolve(true);
        }
      }
    );
  });
};

export const deleteRecord = (id: string) => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DATABASE_NAME);

    db.run(
      `
        DELETE FROM ${RECORDS_TABLE_NAME}
        WHERE id = ?
      `,
      [id],
      (error: any) => {
        db.close();
        if (error) {
          reject(error);
        } else {
          resolve(true);
        }
      }
    );
  });
};

export const getRecords = ({
  from = 0,
  to = 0,
  category,
}: {
  from?: number;
  to?: number;
  category?: string;
}): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DATABASE_NAME);
    let query: string = `SELECT * FROM records `;
    let params: any[] = [];

    if (from > 0 && to > 0) {
      query += `WHERE timestamp BETWEEN ? AND ? `;
      params.push(from);
      params.push(to);
    }

    if (category !== RecordCategory.ANY) {
      query += `WHERE category = ?`;
      params.push(category);
    }

    db.all(query, params, (error, rows) => {
      db.close();
      if (error) {
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });
};

export const getBalanceGroupByCategory = ({
  from = 0,
  to = 0,
}: {
  from?: number;
  to?: number;
}): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DATABASE_NAME);
    let query: string = `SELECT category, sum("amount") as "amount" FROM records `;
    let params: any[] = [];

    if (from > 0 && to > 0) {
      query += `WHERE timestamp BETWEEN ? AND ? `;
      params.push(from);
      params.push(to);
    }

    query += `GROUP BY category`;

    db.all(query, params, (error, rows) => {
      db.close();
      if (error) {
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });
};
