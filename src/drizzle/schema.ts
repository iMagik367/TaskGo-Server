import { pgTable, varchar, uuid, integer, boolean, timestamp, numeric } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }),
  email: varchar("email", { length: 200 }).unique(),
  accountType: varchar("account_type", { length: 20 }), // cliente | vendedor | prestador
  status: varchar("status", { length: 20 }).default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 150 }),
  price: numeric("price", { precision: 10, scale: 2 }),
  description: varchar("description", { length: 500 }),
  sellerId: uuid("seller_id").references(() => users.id),
  approved: boolean("approved").default(false),
  status: varchar("status", { length: 20 }).default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const services = pgTable("services", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 150 }),
  description: varchar("description", { length: 500 }),
  providerId: uuid("provider_id").references(() => users.id),
  status: varchar("status", { length: 20 }).default("pending"),
  price: numeric("price", { precision: 10, scale: 2 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id),
  serviceId: uuid("service_id").references(() => services.id),
  status: varchar("status", { length: 20 }).default("pending"),
  price: numeric("price", { precision: 10, scale: 2 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});