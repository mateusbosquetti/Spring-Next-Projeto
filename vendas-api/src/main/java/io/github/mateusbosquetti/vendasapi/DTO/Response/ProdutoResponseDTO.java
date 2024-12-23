package io.github.mateusbosquetti.vendasapi.DTO.Response;


import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class ProdutoResponseDTO {
    private Integer id;
    private String nome;
    private String descricao;
    private BigDecimal preco;
    private String sku;

}
