package com.github.nicolas_grevin.green_it.model;


final public class ErrorResponse {
  private String message;

  public ErrorResponse(String message) {
    this.message = message;
  }

  public String getMessage() {
    return this.message;
  }
}
