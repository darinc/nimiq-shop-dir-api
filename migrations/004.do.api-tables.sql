-- Created via app.quickdatabasediagrams.com

CREATE TABLE "account" (
    "id" SERIAL   NOT NULL,
    "name" varchar   NOT NULL,
    "active" boolean   NOT NULL,
    "created_at" timestamptz  DEFAULT now() NOT NULL,
    "updated_at" timestamptz  DEFAULT now() NOT NULL,
    CONSTRAINT "pk_account" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "user" (
    "id" SERIAL   NOT NULL,
    "name" varchar   NOT NULL,
    "email" varchar   NOT NULL,
    "active" boolean   NOT NULL,
    "account_id" int   NOT NULL,
    "user_role_id" int   NOT NULL,
    "created_at" timestamptz  DEFAULT now() NOT NULL,
    "updated_at" timestamptz  DEFAULT now() NOT NULL,
    CONSTRAINT "pk_user" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "user_role" (
    "id" SERIAL   NOT NULL,
    "name" varchar   NOT NULL,
    "created_at" timestamptz  DEFAULT now() NOT NULL,
    CONSTRAINT "pk_user_role" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "reset_token" (
    "reset_token" varchar   NOT NULL,
    "user_id" int   NOT NULL,
    "expires_at" timestamptz  DEFAULT now() NOT NULL,
    "created_at" timestamptz  DEFAULT now() NOT NULL
);

CREATE TABLE "api_token" (
    "id" SERIAL   NOT NULL,
    "secret" varchar   NOT NULL,
    "account_id" int   NOT NULL,
    "created_by" int   NOT NULL,
    "username" varchar   NOT NULL,
    "active" boolean   NOT NULL,
    "created_at" timestamptz  DEFAULT now() NOT NULL,
    "updated_at" timestamptz  DEFAULT null NOT NULL,
    "seen_at" timestamptz  DEFAULT null NOT NULL,
    CONSTRAINT "pk_api_token" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "api_auth_role" (
    "id" SERIAL   NOT NULL,
    "name" varchar   NOT NULL,
    "created_at" time   NOT NULL,
    CONSTRAINT "pk_api_auth_role" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "api_auth_permission" (
    "id" SERIAL   NOT NULL,
    "method" method_type   NOT NULL,
    "path" varchar   NOT NULL,
    "api_auth_role_id" int   NOT NULL,
    CONSTRAINT "pk_api_auth_permission" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "api_token__api_auth_role" (
    "api_token_id" int   NOT NULL,
    "api_auth_role_id" int   NOT NULL,
    "created_at" timestamptz  DEFAULT now() NOT NULL
);

CREATE TABLE "user_role__api_auth_role" (
    "user_role_id" int   NOT NULL,
    "api_auth_role_id" int   NOT NULL,
    "created_at" timestamptz  DEFAULT now() NOT NULL
);

ALTER TABLE "user" ADD CONSTRAINT "fk_user_account_id" FOREIGN KEY("account_id")
REFERENCES "account" ("id");

ALTER TABLE "user" ADD CONSTRAINT "fk_user_user_role_id" FOREIGN KEY("user_role_id")
REFERENCES "user_role" ("id");

ALTER TABLE "reset_token" ADD CONSTRAINT "fk_reset_token_user_id" FOREIGN KEY("user_id")
REFERENCES "user" ("id");

ALTER TABLE "api_token" ADD CONSTRAINT "fk_api_token_account_id" FOREIGN KEY("account_id")
REFERENCES "account" ("id");

ALTER TABLE "api_token" ADD CONSTRAINT "fk_api_token_created_by" FOREIGN KEY("created_by")
REFERENCES "user" ("id");

ALTER TABLE "api_auth_permission" ADD CONSTRAINT "fk_api_auth_permission_api_auth_role_id" FOREIGN KEY("api_auth_role_id")
REFERENCES "api_auth_role" ("id");

ALTER TABLE "api_token__api_auth_role" ADD CONSTRAINT "fk_api_token__api_auth_role_api_token_id" FOREIGN KEY("api_token_id")
REFERENCES "api_token" ("id");

ALTER TABLE "api_token__api_auth_role" ADD CONSTRAINT "fk_api_token__api_auth_role_api_auth_role_id" FOREIGN KEY("api_auth_role_id")
REFERENCES "api_auth_role" ("id");

ALTER TABLE "user_role__api_auth_role" ADD CONSTRAINT "fk_user_role__api_auth_role_user_role_id" FOREIGN KEY("user_role_id")
REFERENCES "user_role" ("id");

ALTER TABLE "user_role__api_auth_role" ADD CONSTRAINT "fk_user_role__api_auth_role_api_auth_role_id" FOREIGN KEY("api_auth_role_id")
REFERENCES "api_auth_role" ("id");

CREATE INDEX "idx_account_name"
ON "account" ("name");

CREATE INDEX "idx_user_name"
ON "user" ("name");

CREATE INDEX "idx_user_role_name"
ON "user_role" ("name");

CREATE INDEX "idx_reset_token_reset_token"
ON "reset_token" ("reset_token");

CREATE INDEX "idx_api_token_secret"
ON "api_token" ("secret");

CREATE INDEX "idx_api_auth_role_name"
ON "api_auth_role" ("name");