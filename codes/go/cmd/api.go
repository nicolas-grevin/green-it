package main

import (
	"github.com/gin-gonic/gin"

  "github.com/nicolas-grevin/green-it/route"
  "github.com/nicolas-grevin/green-it/service"
  "github.com/nicolas-grevin/green-it/util"
)

func main() {
  router := gin.Default()

  postgresService := service.NewPostgresService()

  apiGroup := router.Group("/api")
  v1Group := apiGroup.Group("/v1")

  route.ProbeRouter(postgresService, v1Group)
  route.AstronautRouter(postgresService, v1Group)

  router.Run(":" + util.GetEnvDefault("HTTP_PORT", "8080"))
}
