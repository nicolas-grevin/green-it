package com.github.nicolas_grevin.green_it.model;

import java.util.HashMap;

final public class Probe {
  private HashMap<String, ProbeServiceStatus> services;

  public Probe() {
    this.services = new HashMap<String, ProbeServiceStatus>();
  }

  public HashMap<String, ProbeServiceStatus> all() {
    return this.services;
  }

  public HashMap<String, ProbeServiceStatus> getServices() {
    return this.services;
  }

  public ProbeServiceStatus getService(String service) {
    return this.services.get(service);
  }

  public Probe addService(String service, ProbeServiceStatus probeServiceStatus) {
    this.services.put(service, probeServiceStatus);

    return this;
  }

  public Probe removeService(String service) {
    this.services.remove(service);

    return this;
  }
}
