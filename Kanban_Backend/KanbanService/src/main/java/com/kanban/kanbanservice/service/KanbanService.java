package com.kanban.kanbanservice.service;

import com.kanban.kanbanservice.domain.Kanban;

public interface KanbanService {
    /**
     * Get the Kanban Board by email id
     * @param email The email if for the user
     * @return The Kanban Board for that user
     */
    Kanban getKanbanByEmail(String email);

    /**
     * Save the Kanban Board
     * @param kanban The Kanban Board to save
     * @return The saved Kanban Board
     */
    Kanban saveKanban(Kanban kanban);

    /**
     * Update the Kanban Board
     * @param kanban The Kanban Board to update
     * @return The updated Kanban Board
     */
    Kanban updateKanbanBoard(Kanban kanban);

    /**
     * Delete the Kanban Board by email id
     * @param email The email id for the user
     */
    void deleteKanbanBoardByEmail(String email);


}
