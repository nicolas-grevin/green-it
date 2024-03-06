package com.github.nicolas_grevin.green_it.model;

final public class ProbeServiceStatus {
  private String status;

  private String message;

  public ProbeServiceStatus() {

  }

  public ProbeServiceStatus(String status, String message) {
    super();
    this.status = status;
    this.message = message;
  }

  public String getStatus() {
    return this.status;
  }

  public ProbeServiceStatus setStatus(String status) {
    this.status = status;

    return this;
  }

  public String getMessage() {
    return this.message;
  }

  public ProbeServiceStatus setMessage(String message) {
    this.message = message;

    return this;
  }
}
