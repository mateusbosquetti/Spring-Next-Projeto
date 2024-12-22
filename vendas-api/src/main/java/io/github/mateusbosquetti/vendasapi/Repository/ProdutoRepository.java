package io.github.mateusbosquetti.vendasapi.Repository;

import io.github.mateusbosquetti.vendasapi.Entity.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository<Produto, Integer> {
}
