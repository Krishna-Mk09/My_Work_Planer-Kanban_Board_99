package com.kanban.kanbanservice.domain;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class Board {
    private String boardName;
    private List<Column> columns;
    private List<String> members;

    public Board() {
    }

    public Board(String boardName, List<Column> columns, List<String> members) {
        this.boardName = boardName;
        this.columns = columns;
        this.members = members;
    }

    public String getBoardName() {
        return boardName;
    }

    public void setBoardName(String boardName) {
        this.boardName = boardName;
    }

    public List<Column> getColumns() {
        return columns;
    }

    public void setColumns(List<Column> columns) {
        this.columns = columns;
    }

    public List<String> getMembers() {
        return members;
    }

    public void setMembers(List<String> members) {
        this.members = members;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Board)) return false;
        Board board = (Board) o;
        return Objects.equals(getBoardName(), board.getBoardName()) && Objects.equals(getColumns(), board.getColumns()) && Objects.equals(getMembers(), board.getMembers());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getBoardName(), getColumns(), getMembers());
    }

    @Override
    public String toString() {
        return "Board{" +
                "boardName='" + boardName + '\'' +
                ", columns=" + columns +
                ", members=" + members +
                '}';
    }
}
