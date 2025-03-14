package io.github.mateusbosquetti.vendasapi.dto.request;

import io.github.mateusbosquetti.vendasapi.entity.Produto;
import io.github.mateusbosquetti.vendasapi.entity.Venda;
import io.github.mateusbosquetti.vendasapi.service.ClienteService;
import io.github.mateusbosquetti.vendasapi.service.ProdutoService;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public record VendaRequestDTO(
        Integer cliente_id,
        List<Integer> produto_idList,
        BigDecimal precoTotal
) {
    public Venda toEntity(ClienteService clienteService, ProdutoService produtoService) {
        return Venda.builder()
                .cliente(clienteService.buscarClienteEntidadePeloId(cliente_id))
                .produtoList(converterParaLista(produto_idList, produtoService))
                .precoTotal(precoTotal)
                .build();
    }

    private List<Produto> converterParaLista(List<Integer> produtoIdList, ProdutoService produtoService) {
        List<Produto> produtoList = new ArrayList<>();
        produto_idList.forEach(integer -> {
            produtoList.add(
                    produtoService.buscarProdutoEntidadePeloId(integer)
            );
        });
        return produtoList;
    }
}
