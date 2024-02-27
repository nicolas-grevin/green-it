package route

import (
  "net/http"
  "strconv"

	"github.com/gin-gonic/gin"

  "github.com/nicolas-grevin/green-it/repository"
  "github.com/nicolas-grevin/green-it/service"
)

type astronautRoute struct {
  repo *repository.AstronautRepository
}

func AstronautRouter(svc *service.PostgresService, r *gin.RouterGroup) {
  ar := astronautRoute{
    repo: repository.NewAstronautRepository(svc.DB),
  }

  agr := r.Group("/astronauts")
  agr.GET("", ar.list)
  agr.GET("/:id", ar.view)
}

func (ar astronautRoute) list(c *gin.Context) {
  astronauts, err := ar.repo.List()

  if err != nil {
    c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

    return
  }
  
  c.JSON(http.StatusOK, astronauts)
} 

func (ar astronautRoute) view(c *gin.Context) {
  id, err := strconv.ParseUint(c.Param("id"), 10, 64)

  if err != nil {
    panic(err)
  }

  astronaut, err := ar.repo.FindById(uint16(id))

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
	
    return
  }

	c.JSON(http.StatusOK, astronaut)
}

