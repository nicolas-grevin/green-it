package com.github.nicolas_grevin.green_it.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.github.nicolas_grevin.green_it.model.Astronaut;

public interface AstronautRepository extends JpaRepository<Astronaut, Long>{

}
