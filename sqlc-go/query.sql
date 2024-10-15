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

-- name: GetMouthlyBuyerCount :many
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
