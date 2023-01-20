package com.kanban.kanbanservice.repository;

import com.kanban.kanbanservice.domain.Kanban;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KanbanRepository extends MongoRepository<Kanban, String> {
    /**
     * This method get the Kanban Board by email id
     *
     * @param email The email if for the user
     * @return The Kanban Board for that user
     */
    Kanban findKanbanByEmail(String email);
}
