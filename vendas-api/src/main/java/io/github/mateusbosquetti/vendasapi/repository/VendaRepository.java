package io.github.mateusbosquetti.vendasapi.repository;

import io.github.mateusbosquetti.vendasapi.entity.Venda;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VendaRepository extends JpaRepository<Venda, Integer> {
}
