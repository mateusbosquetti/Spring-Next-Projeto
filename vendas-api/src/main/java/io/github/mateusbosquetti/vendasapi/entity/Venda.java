package io.github.mateusbosquetti.vendasapi.entity;

import io.github.mateusbosquetti.vendasapi.dto.response.VendaResponseDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Builder
@Entity
@Table(name = "venda")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Venda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;

    @ManyToMany(mappedBy = "vendaList")
    private List<Produto> produtoList;

    @Column(nullable = false)
    private BigDecimal precoTotal;
    @Column(name = "data_cadastro", nullable = false)
    private LocalDate dataCadastro;

    @PrePersist
    private void prePersist() {
        setDataCadastro(LocalDate.now());
    }

    public VendaResponseDTO toDto() {
        return new VendaResponseDTO(
                this.id,
                this.cliente.toDto(),
                this.produtoList.stream().map(Produto::toDto).collect(Collectors.toList()),
                this.precoTotal,
                this.dataCadastro
        );
    }
}
