package io.github.mateusbosquetti.vendasapi.dto.response;

import java.time.Instant;

public record ExceptionResponseDTO(
        String autor,
        String mensagem,
        Class classe,
        Instant instant
) {
}
