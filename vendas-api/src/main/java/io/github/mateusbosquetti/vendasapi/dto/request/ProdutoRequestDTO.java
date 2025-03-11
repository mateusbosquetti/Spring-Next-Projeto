package io.github.mateusbosquetti.vendasapi.dto.request;

import io.github.mateusbosquetti.vendasapi.entity.Produto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record ProdutoRequestDTO(
        @NotBlank String nome,
        @NotBlank String descricao,
        @NotNull BigDecimal preco,
        @NotBlank String sku
) {
    public Produto toEntity() {
        return Produto.builder()
                .nome((this.nome))
                .descricao((this.descricao))
                .preco((this.preco))
                .sku((this.sku))
                .build();
    }
}
