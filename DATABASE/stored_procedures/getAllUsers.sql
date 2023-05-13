CREATE OR ALTER PROCEDURE getAllUsers(@username VARCHAR(200))
AS
BEGIN

SELECT * FROM assessUserTable WHERE username=@username
END
