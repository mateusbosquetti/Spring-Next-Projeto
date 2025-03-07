package io.github.mateusbosquetti.vendasapi.service;

import io.github.mateusbosquetti.vendasapi.dto.request.ProdutoRequestDTO;
import io.github.mateusbosquetti.vendasapi.dto.response.ProdutoResponseDTO;
import io.github.mateusbosquetti.vendasapi.entity.Produto;
import io.github.mateusbosquetti.vendasapi.repository.ProdutoRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

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

    public Page<ProdutoResponseDTO> buscarProdutos(Pageable pageable) {
        return repository.findAll(pageable)
                .map(Produto::toDto);
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
