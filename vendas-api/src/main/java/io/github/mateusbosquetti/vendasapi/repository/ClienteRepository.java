package io.github.mateusbosquetti.vendasapi.repository;

import io.github.mateusbosquetti.vendasapi.entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Integer> {
}
