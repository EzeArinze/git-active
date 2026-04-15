import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  index,
  unique,
} from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { user } from "../db/auth-schema"

export * from "../db/auth-schema"

export const githubInstallations = pgTable(
  "github_installations",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    installationId: integer("installation_id").notNull(),
    accountLogin: text("account_login").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("github_installations_userId_idx").on(table.userId),
    unique("github_installations_userId_installationId_unique").on(
      table.userId,
      table.installationId
    ),
  ]
)

export const repositories = pgTable(
  "repositories",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    githubRepoId: integer("github_repo_id").notNull(),
    name: text("name").notNull(),
    fullName: text("full_name").notNull(),
    owner: text("owner").notNull(),
    private: boolean("private").default(false).notNull(),
    url: text("url").notNull(),
    defaultBranch: text("default_branch").default("main").notNull(),
    installationId: integer("installation_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("repositories_userId_idx").on(table.userId),
    unique("repositories_userId_githubRepoId_unique").on(
      table.userId,
      table.githubRepoId
    ),
  ]
)

// Alerts Table (for future use)
export const alerts = pgTable(
  "alerts",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    repoId: text("repo_id")
      .notNull()
      .references(() => repositories.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    message: text("message").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("alerts_userId_idx").on(table.userId),
    index("alerts_repoId_idx").on(table.repoId),
  ]
)

// Relations
export const repositoriesRelations = relations(
  repositories,
  ({ one, many }) => ({
    user: one(user, {
      fields: [repositories.userId],
      references: [user.id],
    }),
    alerts: many(alerts),
  })
)

export const alertsRelations = relations(alerts, ({ one }) => ({
  user: one(user, {
    fields: [alerts.userId],
    references: [user.id],
  }),
  repository: one(repositories, {
    fields: [alerts.repoId],
    references: [repositories.id],
  }),
}))

export const githubInstallationsRelations = relations(
  githubInstallations,
  ({ one }) => ({
    user: one(user, {
      fields: [githubInstallations.userId],
      references: [user.id],
    }),
  })
)
