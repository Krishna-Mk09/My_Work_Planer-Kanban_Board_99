package com.kanban.userservice.repository;

import com.kanban.userservice.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

	User findUserByEmailAndPassword(String email, String password);

//	List<String> findAllEmails();

	User findUserByEmail(String email);





}