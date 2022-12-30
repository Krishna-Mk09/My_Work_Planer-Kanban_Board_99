package com.kanban.userservice.service;

import com.kanban.userservice.domain.User;

public interface UserService {
	User registorUser(User user);

	User updateUser(User user);

//	User loginUser(String email, String password);
}
