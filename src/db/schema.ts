import {
  MySqlDatabase,
  mysqlTable,
  serial,
  text,
  varchar,
  json,
} from "drizzle-orm/mysql-core";
export const users = mysqlTable("users", {
  uid: varchar("uid", { length: 36 }).primaryKey(),
});
// export const plaid_access_tokens = mysqlTable("plaid_access_tokens", {
//   uid: varchar("uid", { length: 36 }),
//   token: varchar("token", { length: 150 }).primaryKey().notNull(),
//   item_id: varchar("item_id", { length: 150 }).notNull(),
// });

// export const plaid_items = mysqlTable("plaid_items", {
//   item_id: varchar("item_id", { length: 50 }).primaryKey(),
//   institution_id: varchar("institution_id", { length: 50 }).notNull(),
//   uid: varchar("uid", { length: 36 }).notNull(),
//   insitution_name: varchar("insitution_name", { length: 255 }),
//   account_names: json("account_names"),
// });
