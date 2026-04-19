import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  index,
  unique,
} from "drizzle-orm/pg-core"
import { InferSelectModel, relations } from "drizzle-orm"
import { user } from "../db/auth-schema"
import { nanoid } from "nanoid"

export * from "../db/auth-schema"

export const githubInstallations = pgTable(
  "github_installations",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => nanoid()),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    installationId: integer("installation_id").notNull().unique(),
    accountLogin: text("account_login").notNull(),
    accountType: text("account_type"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("github_installations_userId_idx").on(table.userId),
    index("github_installations_installationId_idx").on(table.installationId),
  ]
)

export const repositories = pgTable(
  "repositories",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => nanoid()),
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
    installationId: integer("installation_id")
      .notNull()
      .references(() => githubInstallations.installationId, {
        onDelete: "cascade",
      }),
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

export const activities = pgTable(
  "activities",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => nanoid()),
    githubRepoId: integer("github_repo_id").notNull(),
    externalId: text("external_id").notNull(),
    type: text("type").notNull(),
    actor: text("actor").notNull(),
    message: text("message"),
    url: text("url"),
    eventCreatedAt: timestamp("event_created_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [unique("activities_external_id_unique").on(table.externalId)]
)

// Alerts Table (for future use)
export const alerts = pgTable(
  "alerts",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => nanoid()),
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
    activities: many(activities),
  })
)

export const activitiesRelations = relations(activities, ({ one }) => ({
  repository: one(repositories, {
    fields: [activities.githubRepoId],
    references: [repositories.githubRepoId],
  }),
}))

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

export type DBActivity = InferSelectModel<typeof activities>
