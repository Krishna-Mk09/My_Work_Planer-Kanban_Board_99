package com.kanban.kanbanservice.repository;

import com.kanban.kanbanservice.domain.Kanban;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KanbanRepository extends MongoRepository<Kanban, String> {
    Kanban findKanbanByEmail(String email);
}
