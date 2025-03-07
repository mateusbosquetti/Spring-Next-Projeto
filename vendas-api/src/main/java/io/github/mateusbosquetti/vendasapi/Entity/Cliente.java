package io.github.mateusbosquetti.vendasapi.entity;

import io.github.mateusbosquetti.vendasapi.dto.response.ClienteResponseDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Builder
@Entity
@Table(name = "cliente")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private LocalDate nascimento;
    @Column(nullable = false, unique = true)
    private String cpf;
    @Column(nullable = false)
    private String nome;
    @Column(nullable = false)
    private String endereco;
    @Column(nullable = false)
    private String telefone;
    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "data_cadastro", nullable = false)
    private LocalDate dataCadastro;

    @PrePersist
    private void prePersist() {
        setDataCadastro(LocalDate.now());
    }

    public ClienteResponseDTO toDto() {
        return new ClienteResponseDTO(
                this.id,
                this.nascimento,
                this.cpf,
                this.nome,
                this.endereco,
                this.telefone,
                this.email,
                this.dataCadastro
        );
    }
}
