package com.kanban.kanbanservice.domain;

import java.util.List;
import java.util.Objects;

public class Board {
    private List<Task> toDo;
    private List<Task> inProgress;
    private List<Task> completed;

    public Board() {
    }

    public Board(List<Task> toDo, List<Task> inProgress, List<Task> completed) {
        this.toDo = toDo;
        this.inProgress = inProgress;
        this.completed = completed;
    }

    public List<Task> getToDo() {
        return toDo;
    }

    public void setToDo(List<Task> toDo) {
        this.toDo = toDo;
    }

    public List<Task> getInProgress() {
        return inProgress;
    }

    public void setInProgress(List<Task> inProgress) {
        this.inProgress = inProgress;
    }

    public List<Task> getCompleted() {
        return completed;
    }

    public void setCompleted(List<Task> completed) {
        this.completed = completed;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Board)) return false;
        Board board = (Board) o;
        return Objects.equals(getToDo(), board.getToDo()) && Objects.equals(getInProgress(), board.getInProgress()) && Objects.equals(getCompleted(), board.getCompleted());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getToDo(), getInProgress(), getCompleted());
    }

    @Override
    public String toString() {
        return "Board{" +
                "toDo=" + toDo +
                ", inProgress=" + inProgress +
                ", completed=" + completed +
                '}';
    }
}
