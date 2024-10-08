-- name: GetAuthor :one
SELECT * FROM User
WHERE id = ? LIMIT 1;

-- name: ListUser :many
SELECT * FROM User
ORDER BY name;

-- name: CreateAuthor :exec
INSERT INTO User 
(
  id,
  userId,
  name, 
  birthday, 
  email, 
  password,
  sex
)
VALUES 
(
  ?,?, ?, ?, ?, ?, ?
);

-- name: UpdateAuthor :exec
UPDATE User
SET 
  userId = ?,
  name = ?, 
  birthday = ?, 
  email = ?,
  password = ?,
  sex = ?
WHERE id = ?;

-- name: DeleteAuthor :exec
DELETE FROM User
WHERE id = ?;
