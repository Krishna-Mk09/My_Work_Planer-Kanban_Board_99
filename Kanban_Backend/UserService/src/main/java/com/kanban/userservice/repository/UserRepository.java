package com.kanban.userservice.repository;

import com.kanban.userservice.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

	/**
	 * This method is used to find user by email and password
	 *
	 * @param email The email of the user
	 * @return The user
	 */
	User findUserByEmailAndPassword(String email, String password);

	/**
	 * This method is used to find user by email
	 *
	 * @param email The email of the user
	 * @return The user fetched by email from the database
	 */
	User findUserByEmail(String email);
}