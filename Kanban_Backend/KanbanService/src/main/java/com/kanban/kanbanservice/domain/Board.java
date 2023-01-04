package com.kanban.kanbanservice.domain;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
public class Board {
    private String boardName;
    private List<Column> columns;
    private List<String> members;

    public Board() {
        this.columns = new ArrayList<>();
        this.members = new ArrayList<>();
    }
}