export interface Probe {
  services: Services;
}

export interface Services {
  [key: string]: ServiceStatus;
}

export interface ServiceStatus {
  status: string;
  message: string;
}
