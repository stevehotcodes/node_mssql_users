----USE TheJituDB
CREATE OR ALTER PROC getUserById(@id VARCHAR(200))
AS 

BEGIN

SELECT * FROM assessUserTable 
WHERE id=@id
END 


