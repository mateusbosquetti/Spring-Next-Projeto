package io.github.mateusbosquetti.vendasapi.Repository;

import io.github.mateusbosquetti.vendasapi.Entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Integer> {
}
