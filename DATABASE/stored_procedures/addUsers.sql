CREATE OR ALTER PROCEDURE addUsers(
@id VARCHAR(200),
@username VARCHAR(200) ,
@email VARCHAR(200) ,
@userpassword VARCHAR(200)
)
AS
BEGIN
INSERT INTO assessUserTable(id,username,email,userpassword)
VALUES (@id,@username,@email,@userpassword)
END