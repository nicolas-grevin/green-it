package repository

import (
	"errors"

	"github.com/go-pg/pg/v10/orm"

	"github.com/nicolas-grevin/green-it/model"
)

func NewAstronautRepository(db orm.DB) *AstronautRepository {
  return &AstronautRepository{db}
}

type AstronautRepository struct {
  db orm.DB
}

func (ar *AstronautRepository) FindById(id uint16) (model.Astronaut, error) {
  var astronaut = model.Astronaut{Id: id}

  err := ar.db.Model(astronaut).WherePK().Select()

  if err != nil {
    return astronaut, errors.New("Astronaut not found")
  }

  return astronaut, nil
}

func (ar *AstronautRepository) List() ([]model.Astronaut, error) {
	var astronauts []model.Astronaut

	if err := ar.db.Model(&astronauts).Select(); err != nil {
		return nil, err
	}

	return astronauts, nil
}
