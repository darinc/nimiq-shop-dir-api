-- Created via app.quickdatabasediagrams.com

CREATE TABLE "merchant" (
    "id" SERIAL   NOT NULL,
    "name" varchar   NOT NULL,
    "summary" varchar  DEFAULT null,
    "description" varchar  DEFAULT null,
    "code" varchar   NOT NULL,
    "active" boolean  DEFAULT true NOT NULL,
    "created_at" timestamptz  DEFAULT now() NOT NULL,
    "updated_at" timestamptz  DEFAULT now() NOT NULL,
    CONSTRAINT "pk_merchant" PRIMARY KEY (
        "id"
     ),
    CONSTRAINT "uc_merchant_code" UNIQUE (
        "code"
    )
);

-- Inspired by https://github.com/google/libaddressinput
CREATE TABLE "address" (
    "id" SERIAL   NOT NULL,
    "name" varchar  DEFAULT null,
    "organisation" varchar  DEFAULT null,
    "street_address_lines" varchar   NOT NULL,
    "dependent_locality" varchar   NOT NULL,
    "city_or_locality" varchar   NOT NULL,
    "state_or_province" varchar   NOT NULL,
    "zip_or_postal_code" varchar   NOT NULL,
    "sorting_code" varchar   NOT NULL,
    -- geo location: longitude, latitude
    "geo_location" point  DEFAULT null,
    "created_at" timestamptz  DEFAULT now() NOT NULL,
    "updated_at" timestamptz  DEFAULT now() NOT NULL,
    CONSTRAINT "pk_address" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "merchant__address" (
    "merchant_id" int   NOT NULL,
    "address_id" int   NOT NULL,
    "created_at" timestamptz  DEFAULT now() NOT NULL
);

CREATE TABLE "link" (
    "id" SERIAL   NOT NULL,
    "url" varchar   NOT NULL,
    "created_at" timestamptz  DEFAULT now() NOT NULL,
    "updated_at" timestamptz  DEFAULT now() NOT NULL,
    CONSTRAINT "pk_link" PRIMARY KEY (
        "id"
     )
);

-- link_type enum: url, googlemaps
CREATE TABLE "merchant__link" (
    "merchant_id" int   NOT NULL,
    "link_type" link_type   NOT NULL,
    "link_id" int   NOT NULL,
    -- links can be tied to a physical address
    "address_id" int   NOT NULL,
    "created_at" timestamptz  DEFAULT now() NOT NULL
);

-- products or services
CREATE TABLE "product" (
    "id" SERIAL   NOT NULL,
    "product" varchar   NOT NULL,
    "created_at" timestamptz  DEFAULT now() NOT NULL,
    CONSTRAINT "pk_product" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "merchant__product" (
    "merchant_id" int   NOT NULL,
    "product_id" int   NOT NULL,
    "created_at" timestamptz  DEFAULT now() NOT NULL
);

-- shipping limit
CREATE TABLE "limit" (
    "id" SERIAL   NOT NULL,
    -- from address or geo_circle, geo_polygon
    "limit_type" limit_type   NOT NULL,
    "limit" varchar  DEFAULT null,
    -- <(x,y),r> (center point and radius)
    "geo_circle" circle  DEFAULT null,
    -- ((x1,y1),...)
    "geo_polygon" polygon  DEFAULT null,
    "created_at" timestamptz  DEFAULT now() NOT NULL,
    CONSTRAINT "pk_limit" PRIMARY KEY (
        "id"
     )
);

-- shipping limits
CREATE TABLE "merchant__limit" (
    "merchant_id" int   NOT NULL,
    "limit_type" limit_type   NOT NULL,
    "limit_id" int   NOT NULL,
    -- links can be tied to a physical address
    "address_id" int   NOT NULL,
    "created_at" timestamptz  DEFAULT now() NOT NULL
);

ALTER TABLE "merchant__address" ADD CONSTRAINT "fk_merchant__address_merchant_id" FOREIGN KEY("merchant_id")
REFERENCES "merchant" ("id") ON DELETE CASCADE;

ALTER TABLE "merchant__address" ADD CONSTRAINT "fk_merchant__address_address_id" FOREIGN KEY("address_id")
REFERENCES "address" ("id") ON DELETE CASCADE;

ALTER TABLE "merchant__link" ADD CONSTRAINT "fk_merchant__link_merchant_id" FOREIGN KEY("merchant_id")
REFERENCES "merchant" ("id") ON DELETE CASCADE;

ALTER TABLE "merchant__link" ADD CONSTRAINT "fk_merchant__link_link_id" FOREIGN KEY("link_id")
REFERENCES "link" ("id") ON DELETE CASCADE;

ALTER TABLE "merchant__link" ADD CONSTRAINT "fk_merchant__link_address_id" FOREIGN KEY("address_id")
REFERENCES "address" ("id") ON DELETE CASCADE;

ALTER TABLE "merchant__product" ADD CONSTRAINT "fk_merchant__product_merchant_id" FOREIGN KEY("merchant_id")
REFERENCES "merchant" ("id") ON DELETE CASCADE;

ALTER TABLE "merchant__product" ADD CONSTRAINT "fk_merchant__product_product_id" FOREIGN KEY("product_id")
REFERENCES "product" ("id") ON DELETE CASCADE;

ALTER TABLE "merchant__limit" ADD CONSTRAINT "fk_merchant__limit_merchant_id" FOREIGN KEY("merchant_id")
REFERENCES "merchant" ("id") ON DELETE CASCADE;

ALTER TABLE "merchant__limit" ADD CONSTRAINT "fk_merchant__limit_limit_id" FOREIGN KEY("limit_id")
REFERENCES "limit" ("id") ON DELETE CASCADE;

ALTER TABLE "merchant__limit" ADD CONSTRAINT "fk_merchant__limit_address_id" FOREIGN KEY("address_id")
REFERENCES "address" ("id") ON DELETE CASCADE;

CREATE INDEX "idx_merchant_name"
ON "merchant" ("name");

CREATE INDEX "idx_address_dependent_locality"
ON "address" ("dependent_locality");

CREATE INDEX "idx_address_city_or_locality"
ON "address" ("city_or_locality");

CREATE INDEX "idx_address_state_or_province"
ON "address" ("state_or_province");

CREATE INDEX "idx_address_zip_or_postal_code"
ON "address" ("zip_or_postal_code");

CREATE INDEX "idx_address_sorting_code"
ON "address" ("sorting_code");

CREATE INDEX "idx_product_product"
ON "product" ("product");