-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

-- Modify this code to update the DB schema diagram.
-- To reset the sample schema, replace everything with
-- two dots ('..' - without quotes).

SET XACT_ABORT ON

BEGIN TRANSACTION QUICKDBD

CREATE TYPE "LocationType" AS ENUM (
  'online',
  'physical'
);


CREATE TABLE [Merchant] (
    [Id] int  NOT NULL ,
    [Name] string  NOT NULL ,
    [Summary] text  NOT NULL ,
    [Description] text  NOT NULL ,
    [Code] varchar  NOT NULL ,
    [Active] boolean  NOT NULL ,
    CONSTRAINT [PK_Merchant] PRIMARY KEY CLUSTERED (
        [Id] ASC
    ),
    CONSTRAINT [UK_Merchant_Code] UNIQUE (
        [Code]
    )
)

CREATE TABLE [Locations] (
    [MerchantID] int  NOT NULL ,
    [LocationID] int  NOT NULL 
)

CREATE TABLE [Location] (
    [Id] int  NOT NULL ,
    [Type] LocationType  NOT NULL ,
    CONSTRAINT [PK_Location] PRIMARY KEY CLUSTERED (
        [Id] ASC
    )
)

CREATE TABLE [Address] (
    [Id] int  NOT NULL ,
    [URL] varchar  NOT NULL ,
    CONSTRAINT [PK_Address] PRIMARY KEY CLUSTERED (
        [Id] ASC
    )
)

ALTER TABLE [Locations] WITH CHECK ADD CONSTRAINT [FK_Locations_MerchantID] FOREIGN KEY([MerchantID])
REFERENCES [Merchant] ([Id])

ALTER TABLE [Locations] CHECK CONSTRAINT [FK_Locations_MerchantID]

ALTER TABLE [Locations] WITH CHECK ADD CONSTRAINT [FK_Locations_LocationID] FOREIGN KEY([LocationID])
REFERENCES [Location] ([Id])

ALTER TABLE [Locations] CHECK CONSTRAINT [FK_Locations_LocationID]

CREATE INDEX [idx_Merchant_Name]
ON [Merchant] ([Name])

COMMIT TRANSACTION QUICKDBD