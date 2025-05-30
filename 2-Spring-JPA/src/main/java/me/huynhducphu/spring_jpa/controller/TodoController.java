package me.huynhducphu.spring_jpa.controller;

import lombok.RequiredArgsConstructor;
import me.huynhducphu.spring_jpa.dto.TodoDto;
import me.huynhducphu.spring_jpa.entity.Todo;
import me.huynhducphu.spring_jpa.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Admin 5/30/2025
 **/
@RestController
@RequiredArgsConstructor
public class TodoController {

    private final TodoService todoService;

    @PostMapping("/todo")
    public ResponseEntity<Todo> create(@RequestBody TodoDto todoDto) {
        Todo todo = this.todoService.handleCreateTodo(todoDto);

        return new ResponseEntity(todo, HttpStatus.OK);
    }

    @GetMapping("/todo")
    public ResponseEntity<List<Todo>> findAll() {

        return new ResponseEntity(this.todoService.handlefindAll(), HttpStatus.OK);
    }

    @GetMapping("/todo/{id}")
    public ResponseEntity<Todo> findById(@PathVariable int id) {
        Todo todo = this.todoService.handleFindById(id);

        if (todo == null) return new ResponseEntity(HttpStatus.NOT_FOUND);
        else return new ResponseEntity(todo, HttpStatus.OK);
    }

    @PutMapping("/todo/{id}")
    public ResponseEntity<Todo> update(@PathVariable int id, @RequestBody TodoDto todoDto) {
        Todo todo = this.todoService.handleUpdateTodo(id, todoDto);

        return new ResponseEntity(todo, HttpStatus.OK);
    }

    @DeleteMapping("/todo/{id}")
    public ResponseEntity<Todo> remove(@PathVariable int id) {

        Todo todo = this.todoService.handleDeleteTodo(id);

        if (todo == null) return new ResponseEntity(HttpStatus.NOT_FOUND);
        else return new ResponseEntity(todo, HttpStatus.OK);
    }


}
