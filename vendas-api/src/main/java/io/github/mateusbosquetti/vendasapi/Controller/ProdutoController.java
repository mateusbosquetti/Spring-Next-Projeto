package io.github.mateusbosquetti.vendasapi.Controller;

import io.github.mateusbosquetti.vendasapi.DTO.Request.ProdutoRequestDTO;
import io.github.mateusbosquetti.vendasapi.DTO.Response.ProdutoResponseDTO;
import io.github.mateusbosquetti.vendasapi.Entity.Produto;
import io.github.mateusbosquetti.vendasapi.Service.ProdutoService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/produtos")
@AllArgsConstructor
@CrossOrigin("*")
public class ProdutoController {

    private ProdutoService service;

    @PostMapping
    public ResponseEntity<ProdutoResponseDTO> postProduto(@RequestBody ProdutoRequestDTO produto) {
        try {
            return new ResponseEntity<>(service.adicionarProduto(produto), HttpStatus.OK);
        } catch (Error e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> putProduto(@RequestBody ProdutoRequestDTO produto, @PathVariable Integer id) {
        try {
            service.atualizarProduto(produto, id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Error e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }


    }

}
