package io.github.mateusbosquetti.vendasapi.exception;

import io.github.mateusbosquetti.vendasapi.dto.response.ExceptionResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.Instant;

@ControllerAdvice
public class ExceptionHandlerController {

    @ExceptionHandler(exception = {Exception.class})
    public ResponseEntity<ExceptionResponseDTO> genericExceptionHandler(Exception e) {
        return new ResponseEntity<>(
                new ExceptionResponseDTO("Mateus Bosquetti", e.getMessage(), e.getClass(), Instant.now()),
                HttpStatus.BAD_REQUEST
        );
    }

}
