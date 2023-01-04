package com.kanban.kanbanservice.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@Document
public class Kanban {
    @Id
    private String email;
    private List<Board> boards;

    public Kanban() {
        this.boards = new ArrayList<>();
    }
}
