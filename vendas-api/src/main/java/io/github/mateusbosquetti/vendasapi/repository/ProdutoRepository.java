package io.github.mateusbosquetti.vendasapi.repository;

import io.github.mateusbosquetti.vendasapi.entity.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository<Produto, Integer> {
}
