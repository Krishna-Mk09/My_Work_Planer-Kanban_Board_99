package com.kanban.userservice.proxy;

import com.kanban.userservice.domain.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@FeignClient(name = "notification-service", url = "notification-service:8083")
public interface NotificationProxy {
	@PostMapping("/notification/saveNotification")
	ResponseEntity<?> saveNotification(@RequestBody User user);

}
