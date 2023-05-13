CREATE OR ALTER PROCEDURE getUserByName(@username VARCHAR(200))
AS
BEGIN

SELECT * FROM assessUserTable WHERE username=@username
END