package com.github.nicolas_grevin.green_it.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.nicolas_grevin.green_it.exception.ResourceNotFoundException;
import com.github.nicolas_grevin.green_it.model.Astronaut;
import com.github.nicolas_grevin.green_it.repository.AstronautRepository;

@RestController
@RequestMapping("/api/v1")
final public class AstronautController {
  
  @Autowired
  private AstronautRepository astronautRepository;

  @GetMapping("/astronauts")
  public ResponseEntity<List<Astronaut>> list() {
    return new ResponseEntity<>(astronautRepository.findAll(), HttpStatus.OK);
  }

  @GetMapping("/astronauts/{id}")
  public ResponseEntity<Astronaut> view(@PathVariable long id) {
    Astronaut astronaut = astronautRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Astronaut not found"));

    return new ResponseEntity<>(astronaut, HttpStatus.OK);
  }    
}
