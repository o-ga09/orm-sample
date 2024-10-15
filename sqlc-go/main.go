package main

import (
	"context"
	"database/sql"
	"os"
	"strings"

	_ "github.com/go-sql-driver/mysql"
	"github.com/google/uuid"
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
	newId := uuid.New().String()
	newUserId := strings.Replace(uuid.New().String(), "-", "", -1)
	newName := "test_" + newUserId
	err = query.CreateAuthor(ctx, generated.CreateAuthorParams{
		ID:       newId,
		Userid:   sql.NullString{String: newUserId, Valid: true},
		Name:     sql.NullString{String: newName, Valid: true},
		Birthday: sql.NullString{String: "2020-01-01", Valid: true},
		Email:    sql.NullString{String: "example@example.com", Valid: true},
		Password: sql.NullString{String: "password", Valid: true},
		Sex:      sql.NullString{String: "1", Valid: true},
	})
	if err != nil {
		panic(err)
	}

	res, err := query.GetAuthor(ctx, newId)
	if err != nil {
		panic(err)
	}
	println(res.Name.String)
	println(res.Email.String)
	println(res.Password.String)
	println(res.Userid.String)
	println(res.Birthday.String)
	println(res.Sex.String)
	println(res.InsertDatetime.GoString())
	println(res.UpdateDatetime.GoString())

	r, err := query.GetMouthlyBuyerCount(ctx)
	if err != nil {
		panic(err)
	}

	for _, v := range r {
		println(v.ItemCount)
		println(v.UserID)
		println(v.UserName.String)
	}

}
