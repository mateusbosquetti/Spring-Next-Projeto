package io.github.mateusbosquetti.vendasapi.Service;

import io.github.mateusbosquetti.vendasapi.DTO.Request.ProdutoRequestDTO;
import io.github.mateusbosquetti.vendasapi.DTO.Response.ProdutoResponseDTO;
import io.github.mateusbosquetti.vendasapi.DTO.Response.ProdutoResponseDTO;
import io.github.mateusbosquetti.vendasapi.Entity.Produto;
import io.github.mateusbosquetti.vendasapi.Entity.Produto;
import io.github.mateusbosquetti.vendasapi.Repository.ProdutoRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@AllArgsConstructor
public class ProdutoService {

    private ProdutoRepository repository;

    public ProdutoResponseDTO adicionarProduto(ProdutoRequestDTO produtoRequestDTO) {
        return repository.save(produtoRequestDTO.toEntity()).toDto();
    }

    public void atualizarProduto(ProdutoRequestDTO produtoRequestDTO, Integer id) {
        Produto produtoAntigo = buscarProdutoEntidadePeloId(id);
        Produto produtoAtual = produtoRequestDTO.toEntity();
        produtoAtual.setId(id);
        produtoAtual.setDataCadastro(produtoAntigo.getDataCadastro());

        repository.save(produtoAtual);
    }

    public List<ProdutoResponseDTO> buscarProdutos() {
        return repository.findAll()
                .stream()
                .map(Produto::toDto)
                .toList();
        //For each embutido
    }

    public ProdutoResponseDTO buscarProdutoPeloId(Integer id) {
        return repository.findById(id).orElseThrow(() -> new NoSuchElementException("Produto não encontrado")).toDto();
    }

    public Produto buscarProdutoEntidadePeloId(Integer id) {
        return repository.findById(id).orElseThrow(() -> new NoSuchElementException("Produto não encontrado"));
    }

    public void excluirProduto(Integer id) {
        buscarProdutoPeloId(id);
        repository.deleteById(id);
    }

}
