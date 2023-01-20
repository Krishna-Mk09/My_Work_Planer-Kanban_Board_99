package com.kanban.kanbanservice.controller;

import com.kanban.kanbanservice.configuration.MessageDTO;
import com.kanban.kanbanservice.domain.Kanban;
import com.kanban.kanbanservice.service.KanbanService;
import com.kanban.kanbanservice.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/kanban")
public class KanbanController {
    private final KanbanService KANBAN_SERVICE;
    private final MessageService MESSAGE_SERVICE;

    @Autowired
    public KanbanController(KanbanService KANBAN_SERVICE, MessageService messageService) {
        this.KANBAN_SERVICE = KANBAN_SERVICE;
        MESSAGE_SERVICE = messageService;
    }

    @PostMapping("/save-kanban")
    public ResponseEntity<?> saveKanban(@RequestBody Kanban kanban) {
        return new ResponseEntity<>(this.KANBAN_SERVICE.saveKanban(kanban), HttpStatus.CREATED);
    }

    @GetMapping("/get-kanban/{email}")
    public ResponseEntity<?> getKanban(@PathVariable String email) {
        return new ResponseEntity<>(this.KANBAN_SERVICE.getKanbanByEmail(email), HttpStatus.OK);
    }

    @PutMapping("/update-kanban")
    public ResponseEntity<?> updateKanban(@RequestBody Kanban kanban) {
        return new ResponseEntity<>(this.KANBAN_SERVICE.updateKanban(kanban), HttpStatus.OK);
    }

    @DeleteMapping("/delete-kanban/{email}")
    public ResponseEntity<?> deleteKanban(@PathVariable String email) {
        this.KANBAN_SERVICE.deleteKanbanByEmail(email);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/send-message")
    public ResponseEntity<?> sendMessage(@RequestBody MessageDTO messageDTO) {
        return new ResponseEntity<>(this.MESSAGE_SERVICE.sendMessage(messageDTO), HttpStatus.OK);
    }

    @PutMapping("/add-member-to-board/{email}")
    public ResponseEntity<?> addMemberToBoardByEmail(@RequestBody Kanban kanban, @PathVariable String email) {
        return new ResponseEntity<>(this.KANBAN_SERVICE.addMemberToBoardByEmail(kanban, email), HttpStatus.OK);
    }

    @GetMapping("/all-emails-in-board/{email}/{boardName}")
    public ResponseEntity<?> getAllEmailsInBoard(@PathVariable String email, @PathVariable String boardName) {
        return new ResponseEntity<>(this.KANBAN_SERVICE.getAllEmailsInBoard(email, boardName), HttpStatus.OK);
    }
}
