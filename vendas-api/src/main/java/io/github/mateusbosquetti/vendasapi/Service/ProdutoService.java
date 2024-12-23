package io.github.mateusbosquetti.vendasapi.Service;

import io.github.mateusbosquetti.vendasapi.DTO.Request.ProdutoRequestDTO;
import io.github.mateusbosquetti.vendasapi.DTO.Response.ProdutoResponseDTO;
import io.github.mateusbosquetti.vendasapi.Entity.Produto;
import io.github.mateusbosquetti.vendasapi.Repository.ProdutoRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ProdutoService {

    private ProdutoRepository repository;

    public ProdutoResponseDTO adicionarProduto(ProdutoRequestDTO produtoRequestDTO) {
        return EntitytoDTO(repository.save(DTOtoEntity(produtoRequestDTO)));
    }

    public Produto DTOtoEntity(ProdutoRequestDTO produtoRequestDTO) {
        Produto produtoEntidade = new Produto();
        produtoEntidade.setNome(produtoRequestDTO.getNome());
        produtoEntidade.setDescricao(produtoRequestDTO.getDescricao());
        produtoEntidade.setPreco(produtoRequestDTO.getPreco());
        produtoEntidade.setSku(produtoRequestDTO.getSku());

        return produtoEntidade;
    }

    public ProdutoResponseDTO EntitytoDTO(Produto produto) {
        return new ProdutoResponseDTO(produto.getId(), produto.getNome(), produto.getDescricao(), produto.getPreco(), produto.getSku());
    }

}
