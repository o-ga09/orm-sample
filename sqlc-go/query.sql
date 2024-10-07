-- name: GetAuthor :one
SELECT * FROM User
WHERE id = ? LIMIT 1;

-- name: ListUser :many
SELECT * FROM User
ORDER BY name;

-- name: CreateAuthor :execresult
INSERT INTO User (
  name, bio
) VALUES (
  ?, ?
);

-- name: DeleteAuthor :exec
DELETE FROM User
WHERE id = ?;
