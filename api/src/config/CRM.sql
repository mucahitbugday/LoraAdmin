USE crmdemo;
GO

DROP TABLE IF EXISTS dbo.Users;
CREATE TABLE dbo.Users
(
      UserID          INT           IDENTITY(1, 1) PRIMARY KEY
     ,NameSurname     NVARCHAR(100) NOT NULL
     ,Email           NVARCHAR(50)  NOT NULL
     ,[Password]      NVARCHAR(200) NOT NULL
     ,[RolID]         SMALLINT      NOT NULL DEFAULT 1
     ,ImageURL        NVARCHAR(250) NULL DEFAULT 'https://lh3.googleusercontent.com/a/ACg8ocI4qKjS5UiUzu2Q85-sCbf72go6Ecw0GXAgXfloudzFQFtnBhU=s288-c-no'
     ,MailConfirmCode VARCHAR(6)    NULL
     ,Deleted         BIT           DEFAULT 0 NOT NULL
     ,Statu           BIT           DEFAULT 1 NOT NULL
     ,CreateDate      DATETIME      DEFAULT GETDATE() NULL
     ,ModifyDate      DATETIME      DEFAULT GETDATE() NULL,
);
INSERT INTO Users
(
      [NameSurname]
     ,[Email]
     ,[Password]
     ,[RolID]
     ,[Deleted]
     ,[CreateDate]
     ,[ModifyDate]
     ,[MailConfirmCode]
     ,[ImageURL]
)
VALUES
(
      N'Mücahit Buğday '
     ,'admin@gmail.com'
     ,'123'
     ,1
     ,0
     ,N'2025-05-02T19:43:06.623'
     ,N'2025-05-02T19:43:06.623'
     ,'801817'
     ,'https://lh3.googleusercontent.com/a/ACg8ocLRoq7AfC8ZDBmOeyKDmMDamHjilHFkvUn3c9omKjsQPuRA0goH=s288-c-no'
);
SELECT * FROM dbo.Users;


DROP PROC IF EXISTS SP_Save_CreateMailSms;
GO
CREATE PROCEDURE dbo.SP_Save_CreateMailSms
      @SourceModule   NVARCHAR(250)
     ,@SourceModuleID NVARCHAR(250)
     ,@MailTo         NVARCHAR(250)
     ,@Code           NVARCHAR(250) = NULL
AS
BEGIN
      IF (@SourceModule = 'MailConfirm')
      BEGIN

            EXEC SmsEmailServices..SP_Save_MailServis
                  @MailTo = @MailTo                  -- nvarchar(250)
                 ,@MailCC = NULL                     -- nvarchar(250)
                 ,@MailBCC = NULL                    -- nvarchar(250)
                 ,@Code = @Code                      -- nvarchar(250)
                 ,@MailName = N'ogrencim.tr'         -- nvarchar(250)
                 ,@SourceModule = @SourceModule      -- nvarchar(250)
                 ,@SourceModuleID = @SourceModuleID; -- nvarchar(250)
      END;

END;
GO


DROP PROC IF EXISTS dbo.SP_Select_Login;
GO
CREATE PROCEDURE dbo.SP_Select_Login
      @Email    VARCHAR(50)
     ,@Password VARCHAR(50)
AS
BEGIN
      SELECT UserID, NameSurname, Email, RolID FROM dbo.Users WHERE Email = @Email AND Password = @Password AND Deleted = 0;
END;
GO

DROP PROC IF EXISTS SP_Save_Register;
GO
CREATE PROCEDURE dbo.SP_Save_Register
      @UserID      INT           = NULL
     ,@NameSurname NVARCHAR(100) = NULL
     ,@Email       VARCHAR(50)   = NULL
     ,@Password    VARCHAR(200)  = NULL
     ,@RolID       SMALLINT      = NULL
AS
BEGIN

      IF EXISTS (SELECT 1 FROM dbo.Users WHERE Email = @Email)
      BEGIN
            SELECT -99;
            RETURN;
      END;

      IF NOT EXISTS (SELECT 1 FROM dbo.Users WHERE Email = @Email)
      BEGIN
            DECLARE @Code VARCHAR(20) = FLOOR(RAND() * 900000) + 100000;
            INSERT INTO dbo.Users
            (
                  NameSurname
                 ,Email
                 ,Password
                 ,RolID
                 ,Deleted
                 ,CreateDate
                 ,ModifyDate
                 ,MailConfirmCode
            )
            VALUES
            (
                  @NameSurname
                 ,@Email
                 ,@Password
                 ,@RolID
                 ,0
                 ,GETDATE()
                 ,GETDATE()
                 ,@Code
            );
            SET @UserID = SCOPE_IDENTITY();

            EXECUTE dbo.SP_Save_CreateMailSms
                  @SourceModule = N'MailConfirm' -- nvarchar(250)
                 ,@SourceModuleID = @UserID      -- nvarchar(250)
                 ,@MailTo = @Email               -- nvarchar(250)
                 ,@Code = @Code;                 -- nvarchar(250)

            RETURN;
      END;
      ELSE
      BEGIN
            UPDATE
                  dbo.Users
             SET
                  NameSurname = ISNULL(@NameSurname, NameSurname)
                 ,Email = ISNULL(@Email, Email)
                 ,Password = ISNULL(@Password, Password)
                 ,RolID = ISNULL(@RolID, RolID)
                 ,Deleted = ISNULL(0, Deleted)
                 ,ModifyDate = ISNULL(GETDATE(), ModifyDate)
             WHERE
                  Email = @Email;
      END;
END;
GO
DROP PROC IF EXISTS dbo.SP_Select_User;
GO
CREATE PROCEDURE dbo.SP_Select_User @SessionUserID BIGINT
AS
BEGIN
      SELECT
            UserID
           ,NameSurname
           ,Email
           ,Password
           ,RolID
           ,'Admin 2'      AS RolName
           ,Deleted
           ,CreateDate
           ,ModifyDate
           ,MailConfirmCode
           ,ImageURL
       FROM dbo.Users
       WHERE
            UserID = @SessionUserID;
END;
GO
DROP TABLE IF EXISTS SetupMenu;
GO
CREATE TABLE dbo.SetupMenu
(
      MenuID        INT           IDENTITY(1, 1) PRIMARY KEY
     ,TopMenuID     INT           NOT NULL DEFAULT 0
     ,Title         NVARCHAR(100) NOT NULL
     ,Icon          NVARCHAR(100) NOT NULL
     ,Path          NVARCHAR(100) NULL
     ,ProcedureName NVARCHAR(100) NULL
     ,Deleted       BIT           DEFAULT 0 NOT NULL
     ,Statu         BIT           DEFAULT 1 NOT NULL
);
INSERT INTO dbo.SetupMenu
(
      TopMenuID
     ,Title
     ,Icon
     ,Path
     ,ProcedureName
)
VALUES
(
      DEFAULT
     ,N'Dashboard'
     ,N'bi bi-speedometer'
     ,N'/admin'
     ,NULL
)
,(
       DEFAULT
      ,N'Kullanıcı Yönetimi'
      ,N'bi bi-person-vcard'
      ,NULL
      ,NULL
 )
,(
       2
      ,N'Kullanıcı Listesi'
      ,N'bi bi-person-vcard'
      ,'/admin/users'
      ,'SP_Select_Menu_Users'
 );
SELECT * FROM dbo.SetupMenu;
DROP PROCEDURE IF EXISTS SP_Select_Menu;
GO
CREATE PROCEDURE SP_Select_Menu @SessionUserID BIGINT
AS
BEGIN
      SET NOCOUNT ON;
      SELECT (     SELECT
                         M.Title              AS title
                        ,ISNULL(M.Path, '')   AS path
                        ,M.Icon               AS icon
                        ,'0'                  AS badge
                        ,(     SELECT
                                     SM.Title            AS title
                                    ,ISNULL(SM.Path, '') AS path
                                    ,SM.Icon             AS icon
                                FROM dbo.SetupMenu SM
                                WHERE
                                     SM.TopMenuID = M.MenuID AND SM.Deleted = 0 AND SM.Statu = 1
                               FOR JSON PATH) AS submenu
                    FROM dbo.SetupMenu M
                    WHERE
                         ISNULL(M.TopMenuID, 0) = 0 AND M.Deleted = 0 AND M.Statu = 1
                   FOR JSON PATH, INCLUDE_NULL_VALUES) AS menu;
END;
GO
DROP TABLE IF EXISTS [Logs];

CREATE TABLE [dbo].[Logs]
(
      [Id]             BIGINT        IDENTITY(1, 1) PRIMARY KEY
     ,[LogType]        NVARCHAR(50)  NULL
     ,[Source]         NVARCHAR(255) NULL
     ,[Action]         NVARCHAR(255) NULL
     ,[RequestData]    NVARCHAR(MAX) NULL
     ,[ResponseData]   NVARCHAR(MAX) NULL
     ,[ErrorMessage]   NVARCHAR(MAX) NULL
     ,[UserId]         NVARCHAR(50)  NULL
     ,[AdditionalInfo] NVARCHAR(MAX) NULL
     ,[CreatedAt]      DATETIME      NOT NULL DEFAULT GETDATE()
);

DROP PROCEDURE IF EXISTS [SP_Save_Log];

GO
CREATE PROCEDURE [dbo].[SP_Save_Log]
      @LogType        NVARCHAR(50)
     ,@Source         NVARCHAR(255)
     ,@Action         NVARCHAR(255)
     ,@RequestData    NVARCHAR(MAX) = NULL
     ,@ResponseData   NVARCHAR(MAX) = NULL
     ,@ErrorMessage   NVARCHAR(MAX) = NULL
     ,@UserId         NVARCHAR(50)  = NULL
     ,@AdditionalInfo NVARCHAR(MAX) = NULL
AS
BEGIN

      INSERT INTO dbo.Logs
      (
            LogType
           ,Source
           ,Action
           ,RequestData
           ,ResponseData
           ,ErrorMessage
           ,UserId
           ,AdditionalInfo
           ,CreatedAt
      )
      VALUES
      (
            @LogType
           ,@Source
           ,@Action
           ,@RequestData
           ,@ResponseData
           ,@ErrorMessage
           ,@UserId
           ,@AdditionalInfo
           ,GETDATE()
      );
END;

GO
DROP PROCEDURE IF EXISTS SP_Select_Menu_Users;
GO
CREATE PROCEDURE SP_Select_Menu_Users
      @UserID     INT           = NULL
     ,@UserName   NVARCHAR(250) = NULL
     ,@Statu      BIT           = NULL
     ,@Email      NVARCHAR(250) = NULL
     ,@pageNumber INT           = 1
     ,@pageLimit  INT           = 50
     ,@orderBy    VARCHAR(10)   = NULL
AS
BEGIN

      SELECT
            us.UserID
           ,us.NameSurname
           ,us.Email
           ,us.Statu
           ,us.CreateDate
           ,us.ModifyDate
       INTO #tmp
       FROM dbo.Users us
       WHERE
            us.UserID = ISNULL(@UserID, us.UserID) AND us.NameSurname LIKE '%' + ISNULL(@UserName, us.NameSurname) + '%' AND us.Statu = ISNULL(@Statu, us.Statu) AND us.Email LIKE '%' + ISNULL(@Email, us.Email) + '%';

      DECLARE @SatirAtla INT = (@pageNumber * @pageLimit) - @pageLimit;
      DECLARE @SatirAtlaChar VARCHAR(10) = CONVERT(VARCHAR(10), @SatirAtla);
      DECLARE @pageLimitChar VARCHAR(10) = CONVERT(VARCHAR(10), @pageLimit);
      IF (ISNULL(@orderBy, '') = '')
      BEGIN
            SET @orderBy = '1 DESC';
      END;

      EXECUTE ('
		SELECT * FROM #tmp WITH(NOLOCK)
		ORDER BY ' + @orderBy + '
		OFFSET ' + @SatirAtlaChar + ' ROWS FETCH NEXT ' + @pageLimitChar + ' ROWS ONLY;
	');

      SELECT COUNT(*) AS totalCount FROM #tmp WITH (NOLOCK);
      DROP TABLE #tmp;
END;
GO
DROP TABLE IF EXISTS SetupMenuField;
CREATE TABLE dbo.SetupMenuField
(
      MenuID INT           NOT NULL
     ,Field  NVARCHAR(250) NOT NULL
     ,Label  NVARCHAR(250) NOT NULL
     ,Type   NVARCHAR(10)  NOT NULL
     ,Query  NVARCHAR(MAX) NULL
     ,Statu  BIT           DEFAULT 1 NOT NULL
     ,CONSTRAINT PK_SetupMenuField PRIMARY KEY (MenuID, Field)
);
INSERT INTO dbo.SetupMenuField
(
      MenuID
     ,Field
     ,Label
     ,Type
     ,Query
     ,Statu
)
VALUES
(
      3
     ,N'UserID'
     ,N'Kullanıcı ID'
     ,N'number'
     ,NULL
     ,DEFAULT
)
,(
       3
      ,N'Email'
      ,N'Eposta'
      ,N'text'
      ,NULL
      ,DEFAULT
 )
,(
       3
      ,N'CreateDate'
      ,N'Kayıt Tarihi'
      ,N'date'
      ,NULL
      ,DEFAULT
 )
,(
       3
      ,N'Statu'
      ,N'Statü'
      ,N'select'
      ,'SELECT ''Aktif'' AS label, ''1'' AS value UNION ALL SELECT ''Pasif'' AS label, ''0'' AS value'
      ,DEFAULT
 );
SELECT * FROM dbo.SetupMenuField;
GO

DROP PROCEDURE IF EXISTS SP_Select_PageFilters;
GO
CREATE PROCEDURE SP_Select_PageFilters @MenuPath NVARCHAR(250)
AS
BEGIN
      --DECLARE @MenuPath NVARCHAR(250) = N'/admin/users'

      SET NOCOUNT ON;

      DECLARE @MenuID INT;
      SELECT @MenuID = MenuID FROM dbo.SetupMenu WHERE Path = @MenuPath;

      IF @MenuID IS NULL
      BEGIN
            SELECT 'Menu not found' AS message;
            RETURN;
      END;

      -- Geçici sonuçlar
      CREATE TABLE #FilterOptions
      (
            field   NVARCHAR(250)
           ,label   NVARCHAR(250)
           ,type    NVARCHAR(10)
           ,options NVARCHAR(MAX)
      );

      -- select dışındaki tüm alanları ekle
      INSERT INTO #FilterOptions (field, label, type) SELECT Field, Label, Type FROM dbo.SetupMenuField WHERE MenuID = @MenuID AND type <> 'select';

      -- select olanlar için işlem yap
      DECLARE
            @Field   NVARCHAR(250)
           ,@Label   NVARCHAR(250)
           ,@Query   NVARCHAR(MAX)
           ,@Options NVARCHAR(MAX);

      DECLARE cur CURSOR FOR
            SELECT Field, Label, Query FROM dbo.SetupMenuField WHERE MenuID = @MenuID AND Type = 'select' AND Query IS NOT NULL;

      OPEN cur;
      FETCH NEXT FROM cur
      INTO
            @Field
           ,@Label
           ,@Query;

      WHILE @@FETCH_STATUS = 0
      BEGIN
            DECLARE
                  @DynamicSQL NVARCHAR(MAX)
                 ,@Result     NVARCHAR(MAX);

            SET @DynamicSQL = N'
            SELECT @Result = (
                SELECT 
                    CAST(label AS NVARCHAR(250)) AS label, 
                    value AS value
                FROM (' + @Query + N') AS sub
                FOR JSON AUTO
            )';

            EXEC sp_executesql
                  @DynamicSQL
                 ,N'@Result NVARCHAR(MAX) OUTPUT'
                 ,@Result = @Options OUTPUT;

            -- ekle
            INSERT INTO #FilterOptions (field, label, type, options) VALUES (@Field, @Label, 'select', @Options);

            FETCH NEXT FROM cur
            INTO
                  @Field
                 ,@Label
                 ,@Query;
      END;

      CLOSE cur;
      DEALLOCATE cur;

      -- Sonuç: FilterOption arayüzüne uygun
      SELECT (SELECT field, label, type, CAST(options AS NVARCHAR(MAX)) AS options FROM #FilterOptions FOR JSON PATH) AS pageFilters;

      DROP TABLE #FilterOptions;
END;

GO
DROP TABLE IF EXISTS Languages
go
CREATE TABLE dbo.Languages
(
      Language      NVARCHAR(10)  NOT NULL
     ,LanguageKey   NVARCHAR(MAX) NOT NULL
     ,LanguageValue NVARCHAR(MAX) NOT NULL
     ,Deleted       BIT           DEFAULT 0 NOT NULL
)
GO
INSERT INTO dbo.Languages
(
      Language
     ,LanguageKey
     ,LanguageValue
)
VALUES
-- Türkçe dilinde çeviriler
(N'TR', N'UserID', N'Kullanıcı ID'),
(N'TR', N'NameSurname', N'Ad Soyad'),
(N'TR', N'Email', N'E-posta'),
(N'TR', N'Password', N'Parola'),
(N'TR', N'RolID', N'Rol ID'),
(N'TR', N'ImageURL', N'Resim URL'),
(N'TR', N'MailConfirmCode', N'Mail Onay Kodu'),
(N'TR', N'Deleted', N'Silindi'),
(N'TR', N'Statu', N'Durum'),
(N'TR', N'CreateDate', N'Oluşturulma Tarihi'),
(N'TR', N'ModifyDate', N'Güncellenme Tarihi'),
(N'EN', N'UserID', N'User ID'),
(N'EN', N'NameSurname', N'Full Name'),
(N'EN', N'Email', N'Email'),
(N'EN', N'Password', N'Password'),
(N'EN', N'RolID', N'Role ID'),
(N'EN', N'ImageURL', N'Image URL'),
(N'EN', N'MailConfirmCode', N'Mail Confirmation Code'),
(N'EN', N'Deleted', N'Deleted'),
(N'EN', N'Statu', N'Status'),
(N'EN', N'CreateDate', N'Creation Date'),
(N'EN', N'ModifyDate', N'Modified Date')