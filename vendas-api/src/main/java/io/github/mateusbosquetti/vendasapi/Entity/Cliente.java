package io.github.mateusbosquetti.vendasapi.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "cliente")
@Data
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private LocalDate nascimento;
    private String cpf;
    private String nome;
    private String endereco;
    private String telefone;
    private String email;

    @Column(name = "data_cadastro")
    private LocalDate dataCadastro;

    @PrePersist
    private void prePersist() {
        setDataCadastro(LocalDate.now());
    }

}
