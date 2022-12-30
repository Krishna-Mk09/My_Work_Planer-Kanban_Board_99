package com.kanban.userservice.service;

import com.kanban.userservice.domain.User;

import java.util.Map;

public interface SecurityTokenGenerator {

	Map<String,String> generateToken(User user);
}
