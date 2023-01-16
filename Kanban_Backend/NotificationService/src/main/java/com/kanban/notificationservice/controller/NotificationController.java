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
	private final NotificationService NOTIFICATION_SERVICE;

	@Autowired
	public NotificationController(NotificationService NOTIFICATION_SERVICE) {
		this.NOTIFICATION_SERVICE = NOTIFICATION_SERVICE;
	}

	@PostMapping("saveNotification")
	public ResponseEntity<?> saveNotification(@RequestBody Notification notification) {
		return new ResponseEntity<>(NOTIFICATION_SERVICE.saveNotification(notification), HttpStatus.CREATED);
	}

	@GetMapping("/getByEmail/{email}")
	public ResponseEntity<?> getByEmailId(@PathVariable String email) {
		return new ResponseEntity<>(NOTIFICATION_SERVICE.getByEmail(email), HttpStatus.OK);
	}

	@PutMapping("/updateNotification")
	public ResponseEntity<?> updateNotification(@RequestBody Notification notification) {
		return new ResponseEntity<>(NOTIFICATION_SERVICE.updateNotification(notification), HttpStatus.ACCEPTED);
	}

	@DeleteMapping("/delete/notification/{email}")
	public ResponseEntity<?> deleteNotification(@PathVariable String email){
		this.NOTIFICATION_SERVICE.deleteNotification(email);
		return new ResponseEntity<>("User Notification Successfully", HttpStatus.OK);
	}

}
