-- name: DeleteAuthor :exec
DELETE FROM User
WHERE id = ?;