package main

import (
	"context"
	"database/sql"
	"os"

	_ "github.com/go-sql-driver/mysql"
	generated "github.com/o-ga09/orm-sample/generated"
)

func main() {
	ctx := context.Background()
	dsn := os.Getenv("DATABASE_URL")
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		panic(err)
	}

	query := generated.New(db)
	status, err := query.CreateAuthor(ctx, generated.CreateAuthorParams{
		Name: "Alice",
		Bio:  sql.NullString{String: "Alice's bio", Valid: true},
	})
	if err != nil {
		panic(err)
	}
	lastInsertId, err := status.LastInsertId()
	if err != nil {
		panic(err)
	}

	res, err := query.GetAuthor(ctx, lastInsertId)
	if err != nil {
		panic(err)
	}
	println(res.Name)
	println(res.Bio.String)
}
