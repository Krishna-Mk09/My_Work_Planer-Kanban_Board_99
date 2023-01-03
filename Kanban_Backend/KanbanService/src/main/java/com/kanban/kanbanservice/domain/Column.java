package com.kanban.kanbanservice.domain;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class Column {
    private String columnName;
    private List<Task> tasks;

    public Column() {
        this.tasks = new ArrayList<>();
    }

    public Column(String columnName, List<Task> tasks) {
        this.columnName = columnName;
        this.tasks = tasks;
    }

    public String getColumnName() {
        return columnName;
    }

    public void setColumnName(String columnName) {
        this.columnName = columnName;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Column)) return false;
        Column column = (Column) o;
        return Objects.equals(getColumnName(), column.getColumnName()) && Objects.equals(getTasks(), column.getTasks());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getColumnName(), getTasks());
    }

    @Override
    public String toString() {
        return "Column{" +
                "columnName='" + columnName + '\'' +
                ", tasks=" + tasks +
                '}';
    }
}
