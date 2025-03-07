package io.github.mateusbosquetti.vendasapi.DTO.Response;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;


public record ClienteResponseDTO(
        Integer id,

        @JsonFormat(pattern = "dd/MM/yyyy")
        LocalDate nascimento,

        String cpf,
        String nome,
        String endereco,
        String telefone,
        String email,

        @JsonFormat(pattern = "dd/MM/yyyy")
        LocalDate dataCadastro
) {
}
