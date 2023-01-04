package com.kanban.kanbanservice.domain;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
public class Column {
    private String columnName;
    private List<Task> tasks;

    public Column() {
        this.tasks = new ArrayList<>();
    }
}
