import {
	integer,
	numeric,
	pgTable,
	serial,
	varchar,
} from 'drizzle-orm/pg-core';

export const Users = pgTable('users', {
	id: serial('id').primaryKey(),
	clerkId: varchar('clerk_id').notNull().unique(),
	name: varchar('name').notNull(),
	email: varchar('email').notNull().unique(),
	createdAt: varchar('createdAt').notNull(),
	plan: varchar('plan').notNull().default('starter'),
});

export const Budgets = pgTable('budgets', {
	id: serial('id').primaryKey(),
	userId: integer('userId').references(() => Users.id),
	name: varchar('name').notNull(),
	amount: varchar('amount').notNull(),
	icon: varchar('icon'),
	createdBy: varchar('createdBy').notNull(),
});

export const Incomes = pgTable('incomes', {
	id: serial('id').primaryKey(),
	userId: integer('userId').references(() => Users.id),
	name: varchar('name').notNull(),
	amount: varchar('amount').notNull(),
	icon: varchar('icon'),
	createdBy: varchar('createdBy').notNull(),
});

export const Expenses = pgTable('expenses', {
	id: serial('id').primaryKey(),
	userId: integer('userId').references(() => Users.id),
	budgetId: integer('budgetId').references(() => Budgets.id),
	name: varchar('name').notNull(),
	amount: numeric('amount').notNull().default(0),
	createdAt: varchar('createdAt').notNull(),
});
