import {
  MainMenuOptions,
  RecordCategory,
  RecordType,
  ReportsMenuOption,
} from "../enums";
import { isValidUuid } from "../utils/index.js";

export const DATABASE_NAME = "personances.db";

export const RECORDS_TABLE_NAME = "records";

export const MAIN_MENU_QUESTIONS = [
  {
    type: "list",
    name: "type",
    message: "What do you want to do?",
    choices: [
      MainMenuOptions.INSERT_RECORD,
      MainMenuOptions.DELETE_RECORD,
      MainMenuOptions.LIST_RECORDS,
      MainMenuOptions.BALANCES,
      MainMenuOptions.EXIT,
    ],
  },
];
export const INSERT_RECORD_QUESTIONS = [
  {
    type: "list",
    name: "type",
    message: "Type:",
    choices: [RecordType.INCOME, RecordType.EXPENSE],
  },
  {
    type: "input",
    name: "amount",
    message: "Amount:",
    validate: function (value: string) {
      const valid = !isNaN(parseFloat(value));
      return valid || "Must be a valid number";
    },
  },
  {
    type: "input",
    name: "description",
    message: "Description:",
  },
  {
    type: "list",
    name: "category",
    message: "Category:",
    choices: [RecordCategory.GLOCERY, RecordCategory.SERVICES],
  },
];

export const DELETE_RECORD_QUESTIONS = [
  {
    type: "input",
    name: "id",
    message: "ID:",
    validate: function (value: string) {
      return isValidUuid(value);
    },
  },
];

export const LIST_RECORDS_QUESTIONS = [
  {
    type: "list",
    name: "type",
    message: "Type:",
    choices: [
      ReportsMenuOption.HISTORIC,
      ReportsMenuOption.DATE_RANGE,
      ReportsMenuOption.MONTH_AND_YEAR,
    ],
  },
];

export const BALANCES_QUESTIONS = [
  {
    type: "list",
    name: "type",
    message: "Type:",
    choices: [
      ReportsMenuOption.HISTORIC,
      ReportsMenuOption.DATE_RANGE,
      ReportsMenuOption.MONTH_AND_YEAR,
    ],
  },
];

export const REPORTS_RANGE_QUESTIONS = [
  {
    type: "input",
    name: "from",
    message: "From (MM/DD/YYYY):",
    validate: function (value: string) {
      const valid = /\d{2}\/\d{2}\/\d{4}/.test(value);
      if (valid) {
        return true;
      } else {
        return "Must be a valid MM/DD/YYYY date";
      }
    },
  },
  {
    type: "input",
    name: "to",
    message: "To (MM/DD/YYYY):",
    validate: function (value: string) {
      const valid = /\d{2}\/\d{2}\/\d{4}/.test(value);
      if (valid) {
        return true;
      } else {
        return "Must be a valid MM/DD/YYYY date";
      }
    },
  },
];

export const REPORTS_MONTH_AND_YEAR_QUESTIONS = [
  {
    type: "input",
    name: "month",
    message: "Month (1-12):",
    validate: function (value: string) {
      const valid = /^(1[0-2]|[1-9])$/.test(value);
      if (valid) {
        return true;
      } else {
        return "Must be a valid month (1-12)";
      }
    },
  },
  {
    type: "input",
    name: "year",
    message: "Year (YYYY):",
    validate: function (value: string) {
      const valid = /^\d{4}$/.test(value);
      if (valid) {
        return true;
      } else {
        return "Must be a valid year (YYYY)";
      }
    },
  },
];

export const REPORTS_CATEGORY_QUESTIONS = [
  {
    type: "list",
    name: "category",
    message: "Category:",
    choices: [
      RecordCategory.ANY,
      RecordCategory.GLOCERY,
      RecordCategory.SERVICES,
    ],
  },
];
