import figlet from "figlet";
import Table from "cli-table3";
import { Record } from "./interfaces/index.js";
import { formatCurrency, formatDate } from "./utils/index.js";

export const printStartUp = () => {
  console.log(figlet.textSync("Personances CLI"));
  console.log(" Personances CLI");
  console.log(" v1.0.0");
  console.log("");
};

export const printRecordsTable = (records: Record[]) => {
  const recordsTable = new Table({
    head: ["ID", "TYPE", "CAT.", "AMOUNT", "DESC.", "TIME"],
  });

  records.forEach((record: Record) => {
    recordsTable.push([
      record.id,
      record.type,
      record.category,
      record.amount,
      record.description,
      formatDate(new Date(record.timestamp)),
    ]);
  });

  console.log(recordsTable.toString());
};

export const printBalanceTable = (balance: any[]) => {
  const balanceTable = new Table({
    head: ["CAT.", "AMOUNT"],
  });

  balance.forEach((balance) => {
    balanceTable.push([balance.category, balance.amount]);
  });

  console.log(balanceTable.toString());
};

export const printSummary = ({
  dateRange,
  totalIncomes,
  totalExpenses,
  balance,
}: any) => {
  console.log("--------------------------------");
  console.log(`DATE RANGE: ${dateRange}`);
  console.log(`TOTAL INCOMES: ${formatCurrency(totalIncomes)}`);
  console.log(`TOTAL EXPENSES: ${formatCurrency(totalExpenses)}`);
  console.log(`BALANCE: ${formatCurrency(balance)}`);
  console.log("--------------------------------");
};
