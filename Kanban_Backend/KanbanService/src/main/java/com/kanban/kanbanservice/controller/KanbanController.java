package com.kanban.kanbanservice.controller;

import com.kanban.kanbanservice.domain.Kanban;
import com.kanban.kanbanservice.service.KanbanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/kanban")
public class KanbanController {
    private final KanbanService kanbanService;

    @Autowired
    public KanbanController(KanbanService kanbanService) {
        this.kanbanService = kanbanService;
    }

    @PostMapping("/save-kanban")
    public ResponseEntity<?> saveKanban(@RequestBody Kanban kanban) {
        return new ResponseEntity<>(this.kanbanService.saveKanban(kanban), HttpStatus.CREATED);
    }

    @GetMapping("/get-kanban")
    public ResponseEntity<?> getKanban(@RequestBody String email) {
        return new ResponseEntity<>(this.kanbanService.getKanbanByEmail(email), HttpStatus.OK);
    }

    @PutMapping("/update-kanban")
    public ResponseEntity<?> updateKanban(@RequestBody Kanban kanban) {
        return new ResponseEntity<>(this.kanbanService.updateKanbanBoard(kanban), HttpStatus.OK);
    }

    @DeleteMapping("/delete-kanban")
    public ResponseEntity<?> deleteKanban(@RequestBody String email) {
        this.kanbanService.deleteKanbanBoardByEmail(email);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
