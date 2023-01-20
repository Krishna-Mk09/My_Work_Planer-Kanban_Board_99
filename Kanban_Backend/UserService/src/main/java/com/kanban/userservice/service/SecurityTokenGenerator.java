package com.kanban.userservice.service;

import com.kanban.userservice.domain.User;

import java.util.Map;

public interface SecurityTokenGenerator {

	/**
	 * This method is used to generate token
	 *
	 * @param user The user
	 * @return The Map containing token
	 */
	Map<String, String> generateToken(User user);
}
