package io.github.mateusbosquetti.vendasapi.DTO.Response;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class ClienteResponseDTO {

    private Integer id;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate nascimento;

    private String cpf;
    private String nome;
    private String endereco;
    private String telefone;
    private String email;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataCadastro;

}
