SELECT *
FROM users
JOIN posts ON users.id = posts.author_id
WHERE users.id = $1