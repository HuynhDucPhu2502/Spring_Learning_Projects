package me.huynhducphu.spring_jpa.service;

import lombok.RequiredArgsConstructor;
import me.huynhducphu.spring_jpa.dto.TodoDto;
import me.huynhducphu.spring_jpa.entity.Todo;
import me.huynhducphu.spring_jpa.repository.TodoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Admin 5/30/2025
 **/
@Service
@RequiredArgsConstructor
public class TodoService {

    private final TodoRepository todoRepository;

    public Todo handleCreateTodo(TodoDto todoDto) {
        Todo todo = new Todo(todoDto.getTitle(), todoDto.getDescription());
        return todoRepository.save(todo);
    }

    public List<Todo> handlefindAll() {
        return todoRepository.findAll();
    }

    public Todo handleFindById(int id) {
        return todoRepository.findById(id).orElse(null);
    }

    public Todo handleUpdateTodo(int id, TodoDto todoDto) {
        return todoRepository
                .findById(id)
                .map(todo -> {
                    todo.setTitle(todoDto.getTitle());
                    todo.setDescription(todoDto.getDescription());
                    todoRepository.save(todo);
                    return todo;
                })
                .orElse(null);
    }

    public Todo handleDeleteTodo(int id) {
        Todo todo = todoRepository.findById(id).orElse(null);

        if (todo != null) {
            todoRepository.delete(todo);
            return todo;
        } else return null;
    }


}
