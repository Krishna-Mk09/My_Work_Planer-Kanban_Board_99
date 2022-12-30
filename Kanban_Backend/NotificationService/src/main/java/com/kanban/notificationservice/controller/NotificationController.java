/*
 * Author Name : M.Krishna.
 * Date: 30-12-2022
 * Created With: IntelliJ IDEA Community Edition
 *
 */


package com.kanban.notificationservice.controller;

import com.kanban.notificationservice.domain.Notification;
import com.kanban.notificationservice.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("notification")
public class NotificationController {
    NotificationService notificationService;

    @Autowired
    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @PostMapping("saveNotification")
    public ResponseEntity<?> saveNotification(@RequestBody Notification notification) {
        return new ResponseEntity<>(notificationService.saveNotification(notification), HttpStatus.CREATED);
    }

    @GetMapping("/getByEmail/{email}")
    public ResponseEntity<?> getByEmailId(@PathVariable String email) {
        return new ResponseEntity<>(notificationService.getByEmail(email), HttpStatus.OK);
    }

    @PutMapping("/updateNotification/")
    public ResponseEntity<?> updateNotification(@RequestBody Notification notification) {
        return new ResponseEntity<>(notificationService.updateNotification(notification), HttpStatus.ACCEPTED);
    }
}
