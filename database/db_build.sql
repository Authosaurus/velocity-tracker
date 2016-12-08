BEGIN;

DROP TABLE IF EXISTS users, issues;

CREATE TABLE IF NOT EXISTS users (
    id          SERIAL     PRIMARY KEY,
    username    TEXT       UNIQUE,
    name        TEXT       NOT NULL,
    email       TEXT       NOT NULL,
    repos       INTEGER,
    access_token TEXT,
    link        TEXT       NOT NULL
);

DROP TABLE IF EXISTS issues;

CREATE TABLE IF NOT EXISTS issues (
  id          SERIAL     PRIMARY KEY,
  url         TEXT       UNIQUE,
  state       TEXT       NOT NULL,
  title       TEXT       NOT NULL,
  body        TEXT,
  created_at  TEXT       NOT NULL,
  closed_at   TEXT
);


COMMIT;
