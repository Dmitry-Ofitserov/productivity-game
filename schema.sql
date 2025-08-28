CREATE TABLE IF NOT EXISTS "goals" (
	"id"	INTEGER,
	"title"	TEXT,
	"position"	INTEGER NOT NULL UNIQUE,
	"color"	TEXT DEFAULT '#FFE27C',
	"is_solved"	INTEGER DEFAULT 0,
	"current_level"	REAL DEFAULT 0,
	"tag_id"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("tag_id") REFERENCES "tags"("id")
);

CREATE TABLE IF NOT EXISTS "kanban" (
	"id"	INTEGER NOT NULL,
	"task_id"	INTEGER NOT NULL,
	"task_position"	INTEGER NOT NULL,
	PRIMARY KEY("task_id","id"),
	FOREIGN KEY("task_id") REFERENCES "tasks"("id")
);

CREATE TABLE IF NOT EXISTS "milestones" (
	"id"	INTEGER NOT NULL,
	"position"	INTEGER NOT NULL UNIQUE,
	"description"	TEXT,
	"goal_id"	INTEGER NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("goal_id") REFERENCES "goals"("id")
);

CREATE TABLE IF NOT EXISTS "steps" (
	"id"	INTEGER NOT NULL,
	"position"	INTEGER NOT NULL UNIQUE,
	"description"	TEXT,
	"milestone_id"	INTEGER NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("milestone_id") REFERENCES "milestones"("id")
);

CREATE TABLE IF NOT EXISTS "table" (
	"date"	TEXT,
	"task_id"	INTEGER,
	"hours"	REAL,
	"points"	REAL,
	PRIMARY KEY("date","task_id"),
	FOREIGN KEY("task_id") REFERENCES "tasks"("id")
);

CREATE TABLE IF NOT EXISTS "tags" (
	"id"	INTEGER NOT NULL,
	"name"	TEXT,
	"color"	TEXT DEFAULT '#FFFFFF',
	PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS "tasks" (
	"id"	INTEGER,
	"description"	TEXT,
	"points"	REAL DEFAULT 0,
	"duration"	REAL DEFAULT 0,
	"end_time"	TEXT,
	"is_solved"	INTEGER DEFAULT 0,
	"goal_id"	INTEGER,
	"step_id"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS "user" (
	"id"	INTEGER NOT NULL,
	"last_login"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);