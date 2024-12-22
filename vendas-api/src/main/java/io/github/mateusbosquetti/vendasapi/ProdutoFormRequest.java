package io.github.mateusbosquetti.vendasapi;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;

@Getter
@Setter
@ToString
public class ProdutoFormRequest {

    private String nome;
    private String descricao;
    private BigDecimal preco;
    private String sku;

}
