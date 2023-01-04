/*
 * Author Name: Aditya Chaurasia
 * Date: 30-12-2022
 * Created With: IntelliJ IDEA Ultimate
 * Profile: github.com/ChaurasiaAditya
 * Website: ChaurasiaAditya.in
 */
package com.kanban.userservice.service;

import com.kanban.userservice.domain.User;
import com.kanban.userservice.exception.UserAlreadyExistsException;
import com.kanban.userservice.exception.UserNotFoundException;
import com.kanban.userservice.proxy.KanbanProxy;
import com.kanban.userservice.proxy.NotificationProxy;
import com.kanban.userservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

	private final KanbanProxy KANBAN_PROXY;
	private final NotificationProxy NOTIFICATION_PROXY;
	private final UserRepository USER_REPOSITORY;

	@Autowired
	public UserServiceImpl(KanbanProxy KANBAN_PROXY, NotificationProxy NOTIFICATION_PROXY, UserRepository USER_REPOSITORY) {
		this.KANBAN_PROXY = KANBAN_PROXY;
		this.NOTIFICATION_PROXY = NOTIFICATION_PROXY;
		this.USER_REPOSITORY = USER_REPOSITORY;
	}

	/**
	 * This method is used to save the user in the database and return the saved user.
	 *
	 * @param user This is the user object which is to be saved in the database.
	 * @return User
	 */
	@Override
	public User registerUser(User user) throws UserAlreadyExistsException {
		if (this.USER_REPOSITORY.existsById(user.getEmail())) {
			throw new UserAlreadyExistsException();
		}
		KANBAN_PROXY.saveKanban(user);
		NOTIFICATION_PROXY.saveNotification(user);
		return USER_REPOSITORY.save(user);
	}

	/**
	 * This method is used to update the user in the database and return the updated user.
	 *
	 * @param user This is the user object which is to be updated in the database.
	 * @return User
	 */
	@Override
	public User updateUser(User user) {
		return this.USER_REPOSITORY.save(user);
	}

	/**
	 * This method is used to delete the user from the database and return the deleted user.
	 *
	 * @param email This is the email of the user which is to be deleted from the database.
	 */
	@Override
	public void deleteUser(String email) {
		this.USER_REPOSITORY.deleteById(email);
	}

	/**
	 * This method is used to log in the user and return the user.
	 *
	 * @param email    and password This is the email and password of the user which is to be logged in.
	 * @param password This is the password of the user which is to be logged in.
	 * @return User
	 */
	@Override
	public User loginUser(String email, String password) throws UserNotFoundException {
		User userByEmailAndPassword = USER_REPOSITORY.findUserByEmailAndPassword(email, password);
		if (userByEmailAndPassword == null) {
			throw new UserNotFoundException();
		}
		return userByEmailAndPassword;
	}

	/**
	 * This method is used to find the user by email and return the user.
	 *
	 * @param email This is the email of the user which is to be found.
	 * @return User
	 */
	@Override
	public User findUserByEmail(String email) throws UserNotFoundException {
		User userByEmail = USER_REPOSITORY.findUserByEmail(email);
		if (userByEmail == null) {
			throw new UserNotFoundException();
		}
		return userByEmail;
	}
}

