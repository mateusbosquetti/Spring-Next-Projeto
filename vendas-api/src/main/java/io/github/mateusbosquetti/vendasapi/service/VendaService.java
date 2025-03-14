package io.github.mateusbosquetti.vendasapi.service;

import io.github.mateusbosquetti.vendasapi.dto.request.VendaRequestDTO;
import io.github.mateusbosquetti.vendasapi.dto.response.VendaResponseDTO;
import io.github.mateusbosquetti.vendasapi.entity.Produto;
import io.github.mateusbosquetti.vendasapi.entity.Venda;
import io.github.mateusbosquetti.vendasapi.repository.VendaRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@AllArgsConstructor
public class VendaService {

    private VendaRepository repository;
    private ClienteService clienteService;
    private ProdutoService produtoService;

    private List<Produto> converterParaLista(List<Integer> produtoIdList) {
        List<Produto> produtoList = new ArrayList<>();
        produtoIdList.forEach(integer -> {
            produtoList.add(
                    produtoService.buscarProdutoEntidadePeloId(integer)
            );
        });
        return produtoList;
    }

    public VendaResponseDTO adicionarVenda(VendaRequestDTO vendaRequestDTO) {
        Venda venda = vendaRequestDTO.toEntity(clienteService, produtoService);
        List<Produto> produtoList = converterParaLista(vendaRequestDTO.produto_idList());
        produtoList.forEach(produto -> {
            venda.getProdutoList().add(produto);
        });
        return repository.save(venda).toDto();
    }

    public void atualizarVenda(VendaRequestDTO vendaRequestDTO, Integer id) {
        Venda vendaAntigo = buscarVendaEntidadePeloId(id);
        Venda vendaNovo = vendaRequestDTO.toEntity(clienteService, produtoService);
        vendaNovo.setId(id);
        vendaNovo.setDataCadastro(vendaAntigo.getDataCadastro());

        repository.save(vendaNovo);
    }

    public Page<VendaResponseDTO> buscarVendas(Pageable pageable) {
        return repository.findAll(pageable).map(Venda::toDto);
        //For each embutido
    }

    public VendaResponseDTO buscarVendaPeloId(Integer id) {
        return repository.findById(id).orElseThrow(() -> new NoSuchElementException("Venda não encontrada")).toDto();
    }

    public Venda buscarVendaEntidadePeloId(Integer id) {
        return repository.findById(id).orElseThrow(() -> new NoSuchElementException("Venda não encontrada"));
    }

    public void excluirVenda(Integer id) {
        buscarVendaPeloId(id);
        repository.deleteById(id);
    }

}
