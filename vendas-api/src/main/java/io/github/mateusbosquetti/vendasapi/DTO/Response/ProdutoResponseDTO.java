package io.github.mateusbosquetti.vendasapi.DTO.Response;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;


public record ProdutoResponseDTO(
        Integer id,
        String nome,
        String descricao,
        BigDecimal preco,
        String sku,

        @JsonFormat(pattern = "dd/MM/yyyy")
        LocalDate dataCadastro
) {


}
