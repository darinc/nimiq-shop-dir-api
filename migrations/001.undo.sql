SET XACT_ABORT ON

BEGIN TRANSACTION QUICKDBDROLLBACK

DROP TABLE [Merchant];
DROP TABLE [Locations];
DROP TABLE [Location];
DROP TABLE [Address];

COMMIT TRANSACTION QUICKDBROLLBACK