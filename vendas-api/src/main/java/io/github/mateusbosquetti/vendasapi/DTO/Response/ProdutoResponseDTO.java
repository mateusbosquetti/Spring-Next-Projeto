package io.github.mateusbosquetti.vendasapi.DTO.Response;


import java.math.BigDecimal;

public class ProdutoResponseDTO {
    private Integer id;
    private String nome;
    private String descricao;
    private BigDecimal preco;
    private String sku;

    public ProdutoResponseDTO(Integer id, String nome, String descricao, BigDecimal preco, String sku) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.sku = sku;
    }

    @Override
    public String toString() {
        return "ProdutoResponseDTO{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", descricao='" + descricao + '\'' +
                ", preco=" + preco +
                ", sku='" + sku + '\'' +
                '}';
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public BigDecimal getPreco() {
        return preco;
    }

    public void setPreco(BigDecimal preco) {
        this.preco = preco;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }
}
