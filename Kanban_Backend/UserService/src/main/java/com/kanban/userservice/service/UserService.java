package com.kanban.userservice.service;

import com.kanban.userservice.domain.User;
import com.kanban.userservice.exception.UserAlreadyExistsException;
import com.kanban.userservice.exception.UserNotFoundException;

import java.util.List;

public interface UserService {

	/**
	 * This method is used to save the user in the database and return the saved user.
	 *
	 * @param user This is the user object which is to be saved in the database.
	 * @return User
	 */
	User registerUser(User user) throws UserAlreadyExistsException;

	/**
	 * This method is used to update the user in the database and return the updated user.
	 *
	 * @param user This is the user object which is to be updated in the database.
	 * @return User
	 */
	User updateUser(User user, String email);

	/**
	 * This method is used to delete the user from the database and return the deleted user.
	 *
	 * @param email This is the email of the user which is to be deleted from the database.
	 */
	void deleteUser(String email);

	/**
	 * This method is used to log in the user and return the user.
	 *
	 * @param email and password This is the email and password of the user which is to be logged in.
	 */
	void loginUser(String email, String password) throws UserNotFoundException;

	/**
	 * This method is used to get all the users from the database.
	 *
	 * @param email This is the email of the user which is to be fetched from the database.
	 * @return List of users
	 */
	User findUserByEmail(String email) throws UserNotFoundException;

	/**
	 * This method is used to get all the users from the database.
	 *
	 * @return List of users
	 */
	List<String> findAllEmails();
}
