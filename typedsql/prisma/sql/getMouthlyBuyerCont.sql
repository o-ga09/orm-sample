SELECT 
    User.id AS userId,
    User.name AS user_name,
    COUNT(Item.id) AS Item_count
FROM 
    Item
JOIN 
    User ON Item.userId = User.id
WHERE 
    Item.createdAt BETWEEN '開始日' AND '終了日'
GROUP BY 
    User.id, User.name
ORDER BY 
    Item_count DESC;