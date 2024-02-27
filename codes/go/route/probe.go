package route

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/nicolas-grevin/green-it/model"
	"github.com/nicolas-grevin/green-it/service"
)

type probeRoute struct {
  svc *service.PostgresService
}

func ProbeRouter(svc *service.PostgresService, r *gin.RouterGroup) {
  pb := probeRoute{
    svc,
  }

  r.GET("/liveness", pb.liveness)
  r.GET("/readiness", pb.readiness)
}

func (pr *probeRoute) check(c *gin.Context) {
  probe := model.NewProbe()
  postgresServiceProb := model.ServiceStatus{
    Status: "ok",
    Message: "Service is up",
  }

  status := http.StatusOK

  if err := pr.svc.Ping(); err != nil {
    status = http.StatusInternalServerError

    postgresServiceProb.Status = "nok"
    postgresServiceProb.Message = err.Error()
  }

  probe.Services["postgres"] = postgresServiceProb

  c.JSON(status, probe)
}

func (pr *probeRoute) liveness(c *gin.Context) {
  pr.check(c)
}

func (pr *probeRoute) readiness(c *gin.Context) {
  pr.check(c)
}
