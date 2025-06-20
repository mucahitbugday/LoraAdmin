USE LoraCrm;
GO
DROP TABLE IF EXISTS dbo.SetupMenu;
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
GO

-- SQL Prompt formatting off
INSERT INTO dbo.SetupMenu (TopMenuID, Title, Icon, Path, ProcedureName) 
VALUES 
(DEFAULT, N'Dashboard', N'bi bi-speedometer', N'/crm/customers', 'SP_Select_CustomerList')
 

-- SQL Prompt formatting on
GO
DROP PROCEDURE IF EXISTS SP_Select_CustomerList;
GO
CREATE PROCEDURE SP_Select_CustomerList
      @CustomerName NVARCHAR(100) = NULL
     ,@pageNumber   INT           = 1
     ,@pageLimit    INT           = 10
     ,@pageOrderBy  VARCHAR(10)   = '1 ASC'
AS
BEGIN

      SELECT 
	  c.NameSurname AS fullName,
	  'Bireysel Müşteri' AS customerType,
	  c.Email AS email,
	  '05455518591' AS phone,
	  c.Statu AS statu,
	  '-' AS source,
	  '-' AS store,
	  FORMAT(c.CreateDate, 'dd.MM.yyyy') AS registerDate
	  INTO #tmp FROM crmdemo.dbo.Users c


      DECLARE @SatirAtla INT = (@pageNumber * @pageLimit) - @pageLimit;
      DECLARE @SatirAtlaChar VARCHAR(10) = CONVERT(VARCHAR(10), @SatirAtla);
      DECLARE @pageLimitChar VARCHAR(10) = CONVERT(VARCHAR(10), @pageLimit);
      IF (ISNULL(@pageOrderBy, '') = '') SET @pageOrderBy = '1 DESC';

      --Table 0
      SELECT 'Müşteri Listesi' AS pageTitle, 1 AS page, '' AS orderBy, (SELECT COUNT(*)FROM #tmp WITH (NOLOCK)) AS pageTodalCount;
	  --SQL Prompt formatting off      
	  --Table 1 butons
      SELECT 'Yeni Kayıt' AS label, 'bi-plus' AS icon, 'new' AS action UNION
      SELECT 'Dışa Aktar' AS label, 'bi-box-arrow-up-right' AS icon, 'export' AS action UNION
      SELECT 'Yazdır' AS label, 'bi-printer' AS icon, 'print' AS action;
      --Table 2 filterFields
      SELECT 'fullName' AS name, 'Ad Soyad' AS label UNION
      SELECT 'customerType', 'Müşteri Tipi' UNION
      SELECT 'email', 'Email' UNION
      SELECT 'phone', 'Telefon' UNION
      SELECT 'statu', 'Durum' UNION
      SELECT 'source', 'Kaynak' UNION
      SELECT 'store', 'Mağaza' UNION
      SELECT 'registerDate', 'Kayıt Tarihi';
	  --SQL Prompt formatting on
      --Table 3 pageData
      EXECUTE ('SELECT * FROM #tmp WITH(NOLOCK) ORDER BY ' + @pageOrderBy + ' OFFSET ' + @SatirAtlaChar + ' ROWS FETCH NEXT ' + @pageLimitChar + ' ROWS ONLY;');


      DROP TABLE #tmp;
END;
