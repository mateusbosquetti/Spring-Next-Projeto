package io.github.mateusbosquetti.vendasapi.Controller;

import io.github.mateusbosquetti.vendasapi.Entity.Produto;
import io.github.mateusbosquetti.vendasapi.ProdutoFormRequest;
import io.github.mateusbosquetti.vendasapi.Repository.ProdutoRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/produtos")
@AllArgsConstructor
public class ProdutoController {

    private ProdutoRepository repository;

    @PostMapping
    public ProdutoFormRequest salvar(@RequestBody ProdutoFormRequest produto) {
        Produto produto1 = new Produto(
                produto.getNome(),
                produto.getDescricao(),
                produto.getPreco(),
                produto.getSku());
        repository.save(produto1);
        System.out.println(produto1);
        return produto;
    }

}
