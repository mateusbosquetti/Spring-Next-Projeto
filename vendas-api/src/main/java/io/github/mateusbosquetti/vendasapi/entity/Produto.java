package io.github.mateusbosquetti.vendasapi.entity;

import io.github.mateusbosquetti.vendasapi.dto.response.ProdutoResponseDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Builder
@Entity
@Table(name = "produto")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nome", length = 100, nullable = false)
    private String nome;

    @Column(name = "descricao", length = 255, nullable = false)
    private String descricao;

    @Column(name = "preco", precision = 16, scale = 2, nullable = false)
    private BigDecimal preco;
    @Column(nullable = false)
    private String sku;

    @Column(name = "data_cadastro", nullable = false)
    private LocalDate dataCadastro;

    @ManyToMany
    @JoinTable(
            name = "produto_venda",
            joinColumns = @JoinColumn(name = "produto_id", nullable = false),
            inverseJoinColumns = @JoinColumn(name = "venda_id", nullable = false)
    )
    private List<Venda> vendaList;

    @PrePersist
    public void prePersist() {
        setDataCadastro(LocalDate.now());
    }

    public ProdutoResponseDTO toDto() {
        return new ProdutoResponseDTO(
                this.id,
                this.nome,
                this.descricao,
                this.preco,
                this.sku,
                this.dataCadastro
        );
    }
}