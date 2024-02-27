package service

import (
	"context"

	"github.com/go-pg/pg/v10"

	"github.com/nicolas-grevin/green-it/util"
)

type PostgresService struct {
  DB *pg.DB
}

func NewPostgresService() *PostgresService {
  db := pg.Connect(&pg.Options{
    Addr:       util.GetEnvDefault("POSTGRES_HOST", "localhost") + ":" + util.GetEnvDefault("POSTGRES_POST", "5432"),
    User:       util.GetEnvDefault("POSTGRES_USER", "user"),
    Password:   util.GetEnvDefault("POSTGRES_PASSWORD", "password"),
    Database:   util.GetEnvDefault("POSTGRES_DB", "database"),
  })

  return &PostgresService{DB: db}
}

func (ps *PostgresService) Ping() error {
  return ps.DB.Ping(context.Background())
}
