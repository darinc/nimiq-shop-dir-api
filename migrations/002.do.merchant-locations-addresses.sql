-- Created via app.quickdatabasediagrams.com

CREATE TABLE "Merchant" (
    "Id" int   NOT NULL,
    "Name" varchar   NOT NULL,
    "Summary" varchar   NOT NULL,
    "Description" varchar   NOT NULL,
    "Code" varchar   NOT NULL,
    "Active" boolean   NOT NULL,
    CONSTRAINT "pk_Merchant" PRIMARY KEY (
        "Id"
     ),
    CONSTRAINT "uc_Merchant_Code" UNIQUE (
        "Code"
    )
);

CREATE TABLE "Locations" (
    "MerchantID" int   NOT NULL,
    "LocationID" int   NOT NULL
);

CREATE TABLE "Location" (
    "Id" int   NOT NULL,
    "Type" "LocationType"   NOT NULL,
    "AddressID" int   NOT NULL,
    CONSTRAINT "pk_Location" PRIMARY KEY (
        "Id"
     )
);

-- Inspired by https://github.com/google/libaddressinput
CREATE TABLE "Address" (
    "Id" int   NOT NULL,
    "URL" varchar   NOT NULL,
    "Name" varchar   NOT NULL,
    "Organisation" varchar   NOT NULL,
    "StreetAddressLines" varchar   NOT NULL,
    "DependentLocality" varchar   NOT NULL,
    "CityOrLocality" varchar   NOT NULL,
    "StateOrProvince" varchar   NOT NULL,
    "ZipOrPostalCode" varchar   NOT NULL,
    "SortingCode" varchar   NOT NULL,
    CONSTRAINT "pk_Address" PRIMARY KEY (
        "Id"
     )
);

ALTER TABLE "Locations" ADD CONSTRAINT "fk_Locations_MerchantID" FOREIGN KEY("MerchantID")
REFERENCES "Merchant" ("Id");

ALTER TABLE "Locations" ADD CONSTRAINT "fk_Locations_LocationID" FOREIGN KEY("LocationID")
REFERENCES "Location" ("Id");

ALTER TABLE "Location" ADD CONSTRAINT "fk_Location_AddressID" FOREIGN KEY("AddressID")
REFERENCES "Address" ("Id");

CREATE INDEX "idx_Merchant_Name"
ON "Merchant" ("Name");