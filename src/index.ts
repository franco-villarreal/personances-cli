import inquirer from "inquirer";
import {
  printStartUp,
  printRecordsTable,
  printSummary,
  printBalanceTable,
} from "./drawer.js";
import {
  MainMenuOptions,
  RecordType,
  ReportsMenuOption,
} from "./enums/index.js";
import {
  addNewRecord,
  getRecords,
  deleteRecord,
  getBalanceGroupByCategory,
} from "./repositories/records.repository.js";
import {
  DELETE_RECORD_QUESTIONS,
  INSERT_RECORD_QUESTIONS,
  MAIN_MENU_QUESTIONS,
  REPORTS_CATEGORY_QUESTIONS,
  REPORTS_MONTH_AND_YEAR_QUESTIONS,
  LIST_RECORDS_QUESTIONS,
  REPORTS_RANGE_QUESTIONS,
} from "./constants/index.js";
import { formatDateRange, generateUuid, getTimestamp } from "./utils/index.js";
import { initDb } from "./db/config.js";

async function main() {
  const selectedOption = await inquirer.prompt(MAIN_MENU_QUESTIONS);

  if (selectedOption.type == MainMenuOptions.INSERT_RECORD) {
    await handleInsertRecord();
  }

  if (selectedOption.type == MainMenuOptions.DELETE_RECORD) {
    await handleDeleteRecord();
  }

  if (selectedOption.type == MainMenuOptions.LIST_RECORDS) {
    await handleListRecords();
  }

  if (selectedOption.type == MainMenuOptions.BALANCES) {
    await handleBalances();
  }

  if (selectedOption.type == MainMenuOptions.EXIT) {
    process.exit(0);
  }

  main();
}

async function handleInsertRecord() {
  const { type, amount, description, category } = await inquirer.prompt(
    INSERT_RECORD_QUESTIONS
  );
  const parsedAmount = parseFloat(amount);
  const record = {
    id: generateUuid(),
    type,
    category,
    description,
    amount: type == RecordType.EXPENSE ? parsedAmount * -1 : parsedAmount,
    timestamp: getTimestamp(new Date()),
  };

  await addNewRecord(record);
}

async function handleDeleteRecord() {
  const { id } = await inquirer.prompt(DELETE_RECORD_QUESTIONS);

  await deleteRecord(id);
}

async function handleListRecords() {
  const { type } = await inquirer.prompt(LIST_RECORDS_QUESTIONS);

  // let records = await getRecords();
  let totalExpenses = 0;
  let totalIncomes = 0;
  let balance = 0;
  let from: number = 0;
  let to: number = 0;
  let dateRange = "HISTORIC";
  let category: string | undefined = undefined;

  if (type == ReportsMenuOption.DATE_RANGE) {
    const { from: inputFrom, to: inputTo } = await inquirer.prompt(
      REPORTS_RANGE_QUESTIONS
    );

    from = getTimestamp(new Date(inputFrom));
    to = getTimestamp(new Date(inputTo));
    dateRange = formatDateRange(from, to);
  }

  if (type == ReportsMenuOption.MONTH_AND_YEAR) {
    const { month, year } = await inquirer.prompt(
      REPORTS_MONTH_AND_YEAR_QUESTIONS
    );
    const parsedMonth = parseInt(month);
    const parsedYear = parseInt(year);

    from = getTimestamp(new Date(`${parsedMonth}/1/${parsedYear}`));
    to = getTimestamp(new Date(`${parsedMonth}/31/${parsedYear}`));
    dateRange = formatDateRange(from, to);
  }

  category = (await inquirer.prompt(REPORTS_CATEGORY_QUESTIONS)).category;

  let records = await getRecords({ from, to, category });

  records.forEach((record: any) => {
    const { amount } = record;
    balance += amount;

    if (amount > 0) {
      totalIncomes += amount;
    } else {
      totalExpenses += amount;
    }
  });

  printRecordsTable(records);
  printSummary({ dateRange, totalExpenses, totalIncomes, balance });
}

async function handleBalances() {
  const { type } = await inquirer.prompt(LIST_RECORDS_QUESTIONS);

  // let records = await getRecords();
  // let totalExpenses = 0;
  // let totalIncomes = 0;
  // let balance = 0;
  let from: number = 0;
  let to: number = 0;
  let dateRange = "HISTORIC";

  if (type == ReportsMenuOption.DATE_RANGE) {
    const { from: inputFrom, to: inputTo } = await inquirer.prompt(
      REPORTS_RANGE_QUESTIONS
    );

    from = getTimestamp(new Date(inputFrom));
    to = getTimestamp(new Date(inputTo));
    dateRange = formatDateRange(from, to);
  }

  if (type == ReportsMenuOption.MONTH_AND_YEAR) {
    const { month, year } = await inquirer.prompt(
      REPORTS_MONTH_AND_YEAR_QUESTIONS
    );
    const parsedMonth = parseInt(month);
    const parsedYear = parseInt(year);

    from = getTimestamp(new Date(`${parsedMonth}/1/${parsedYear}`));
    to = getTimestamp(new Date(`${parsedMonth}/31/${parsedYear}`));
    dateRange = formatDateRange(from, to);
  }

  const balances = await getBalanceGroupByCategory({ from, to });

  console.log(`DATE RANGE: ${dateRange}`);
  printBalanceTable(balances);
}

printStartUp();
initDb();
main();
