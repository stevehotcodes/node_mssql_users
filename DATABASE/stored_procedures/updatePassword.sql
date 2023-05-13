CREATE OR ALTER PROCEDURE resetPassword(
@email VARCHAR(200),
@newPassword VARCHAR(200)
)
AS
BEGIN
UPDATE assessUserTable
SET userpassword=@newPassword
WHERE email=@email
END