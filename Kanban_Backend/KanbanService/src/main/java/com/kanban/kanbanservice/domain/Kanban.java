package com.kanban.kanbanservice.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Document
public class Kanban {
    @Id
    private String email;
    private List<Board> boards;

    public Kanban() {
        this.boards = new ArrayList<>();
    }

    public Kanban(String email, List<Board> boards) {
        this.email = email;
        this.boards = boards;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Board> getBoards() {
        return boards;
    }

    public void setBoards(List<Board> boards) {
        this.boards = boards;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Kanban)) return false;
        Kanban kanban = (Kanban) o;
        return Objects.equals(getEmail(), kanban.getEmail()) && Objects.equals(getBoards(), kanban.getBoards());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getEmail(), getBoards());
    }

    @Override
    public String toString() {
        return "Kanban{" +
                "email='" + email + '\'' +
                ", boards=" + boards +
                '}';
    }
}
