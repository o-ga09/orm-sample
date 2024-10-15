-- name: GetAuthor :one
SELECT * FROM User
WHERE id = ? LIMIT 1;

-- name: ListUser :many
SELECT * FROM User
ORDER BY name;

-- name: CreateAuthor :exec
INSERT INTO User (
  name, bio
) VALUES (
  ?, ?
);

-- name: UpdateAuthor :exec
UPDATE User
SET name = ?, bio = ?
WHERE id = ?;

-- name: DeleteAuthor :exec
DELETE FROM User
WHERE id = ?;

-- name: getMouthlyBuyerCount :many
SELECT 
    user.id AS user_id,
    user.name AS user_name,
    COUNT(items.id) AS item_count
FROM 
    items
JOIN 
    user ON items.user_id = user.id
WHERE 
    items.created_at BETWEEN '開始日' AND '終了日'
GROUP BY 
    user.id, user.name
ORDER BY 
    item_count DESC;
