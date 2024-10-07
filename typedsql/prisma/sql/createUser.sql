-- name: CreateAuthor :execresult
INSERT INTO User (
  name, bio
) VALUES (
  ?, ?
);