package model

type Probe struct {
  Services map[string]ServiceStatus `json:"services"`
}

type ServiceStatus struct {
  Status    string    `json:"status"`
  Message   string    `json:"message"`
}

func NewProbe() *Probe {
  return &Probe{
    Services: make(map[string]ServiceStatus),
  }
}
