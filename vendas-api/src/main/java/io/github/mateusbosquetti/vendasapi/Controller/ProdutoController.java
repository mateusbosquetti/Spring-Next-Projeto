package io.github.mateusbosquetti.vendasapi.Controller;

import io.github.mateusbosquetti.vendasapi.DTO.Request.ProdutoRequestDTO;
import io.github.mateusbosquetti.vendasapi.DTO.Response.ProdutoResponseDTO;
import io.github.mateusbosquetti.vendasapi.Entity.Produto;
import io.github.mateusbosquetti.vendasapi.Service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/produtos")
public class ProdutoController {

    @Autowired
    private ProdutoService service;

    @PostMapping
    public ResponseEntity<ProdutoResponseDTO> postProduto(@RequestBody ProdutoRequestDTO produto) {
        return new ResponseEntity<>(service.adicionarProduto(produto), HttpStatus.OK);
    }

}
