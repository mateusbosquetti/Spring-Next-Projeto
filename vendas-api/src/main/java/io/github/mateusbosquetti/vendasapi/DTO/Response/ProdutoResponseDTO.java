package io.github.mateusbosquetti.vendasapi.DTO.Response;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@AllArgsConstructor
public class ProdutoResponseDTO {
    private Integer id;
    private String nome;
    private String descricao;
    private BigDecimal preco;
    private String sku;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataCadastro;

}
