package io.github.mateusbosquetti.vendasapi.DTO.Request;

import io.github.mateusbosquetti.vendasapi.Entity.Cliente;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import java.time.LocalDate;

public record ClienteRequestDTO (
        @NotNull LocalDate nascimento,
        @NotBlank @Length(max = 11, min = 11) String cpf,
        @NotBlank String nome,
        @NotBlank String endereco,
        @NotBlank @Length(max = 11, min = 11) String telefone,
        @NotBlank @Email String email
) {
    public Cliente toEntity() {
        return Cliente.builder()
                .nome(this.nome)
                .cpf(this.cpf)
                .email(this.email)
                .telefone(this.telefone)
                .endereco(this.endereco)
                .nascimento(this.nascimento)
                .build();
    }
}
