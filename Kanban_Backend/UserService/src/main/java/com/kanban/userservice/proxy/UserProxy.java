package com.kanban.userservice.proxy;

import com.kanban.userservice.domain.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@FeignClient(name = "kanban-service",url = "kanban-service:8082")
public interface UserProxy {
	@PostMapping("/kanban/save-kanban")
	ResponseEntity<?> saveKanban(@RequestBody User user);

}
