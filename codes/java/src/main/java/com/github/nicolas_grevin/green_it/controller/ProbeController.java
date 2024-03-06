package com.github.nicolas_grevin.green_it.controller;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.nicolas_grevin.green_it.model.Probe;
import com.github.nicolas_grevin.green_it.model.ProbeServiceStatus;

@RestController
@RequestMapping("/api/v1")
final public class ProbeController {

  @Autowired
  private DataSource dataSource;

  @GetMapping("/liveness")
  public ResponseEntity<Probe> liveness() {
    return this.check();
  }

  @GetMapping("/readiness")
  public ResponseEntity<Probe> readiness() {
    return this.check();
  }
  
  private ResponseEntity<Probe> check() {
    Probe probe = new Probe();    
    ProbeServiceStatus probeServiceStatus = new ProbeServiceStatus();

    try {
      Connection connection = this.dataSource.getConnection();
      connection.createStatement().executeQuery("SELECT 1");
      
      probeServiceStatus.setStatus("ok");
      probeServiceStatus.setMessage("Service is up");
      
      connection.close();
      
    } catch(SQLException e) {
      probeServiceStatus.setStatus("nok");
      probeServiceStatus.setMessage(e.getMessage());
      
      probe.addService("postgres", probeServiceStatus);

      return new ResponseEntity<>(probe, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    probe.addService("postgres", probeServiceStatus);
      
    return new ResponseEntity<>(probe, HttpStatus.OK);
  }
}
