package com.kanban.kanbanservice.service;

import com.kanban.kanbanservice.domain.Kanban;

public interface KanbanService {
    Kanban getKanbanByEmail(String email);

    Kanban saveKanban(Kanban kanban);

    Kanban updateKanbanBoard(Kanban kanban);

    void deleteKanbanBoardByEmail(String email);


}
