package io.github.mateusbosquetti.vendasapi.dto.response;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record VendaResponseDTO(
        Integer id,
        ClienteResponseDTO cliente,
        List<ProdutoResponseDTO> produtoList,
        BigDecimal precoTotal,
        LocalDate dataCadastro
) {
}
