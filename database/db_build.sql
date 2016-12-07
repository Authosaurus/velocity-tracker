BEGIN;

DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
    id           SERIAL     PRIMARY KEY,
    username     TEXT       UNIQUE,
    name         TEXT       NOT NULL,
    email        TEXT       NOT NULL,
    repos        TEXT       NUMBER,
    link         TEXT       NOT NULL,
    access_token TEXT
);

DROP TABLE IF EXISTS issues;

CREATE TABLE IF NOT EXISTS issues (
  id          SERIAL     PRIMARY KEY,
  url         TEXT       NOT NULL,
  state       TEXT       NOT NULL,
  title       TEXT       NOT NULL,
  body        TEXT,
  created     TEXT       NOT NULL,
  closed      TEXT
);


COMMIT;
