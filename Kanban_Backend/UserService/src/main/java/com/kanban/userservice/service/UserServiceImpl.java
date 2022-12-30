/*
 * Author Name: Aditya Chaurasia
 * Date: 30-12-2022
 * Created With: IntelliJ IDEA Ultimate
 * Profile: github.com/ChaurasiaAditya
 * Website: ChaurasiaAditya.in
 */
package com.kanban.userservice.service;

import com.kanban.userservice.domain.User;
import com.kanban.userservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;

	@Autowired
	public UserServiceImpl(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	/**
	 * This method is used to save the user in the database and return the saved user.
	 *
	 * @param user This is the user object which is to be saved in the database.
	 * @return User
	 */
	@Override
	public User registorUser(User user) {
		return null;
	}

	/**
	 * This method is used to update the user in the database and return the updated user.
	 *
	 * @param user This is the user object which is to be updated in the database.
	 * @return User
	 */
	@Override
	public User updateUser(User user) {
		return null;
	}

	/**
	 * This method is used to delete the user from the database and return the deleted user.
	 *
	 * @param email This is the email of the user which is to be deleted from the database.
	 */
	@Override
	public void deleteUser(String email) {

	}

	/**
	 * This method is used to log in the user and return the user.
	 *
	 * @param email    and password This is the email and password of the user which is to be logged in.
	 * @param password
	 * @return User
	 */
	@Override
	public User loginUser(String email, String password) {
		return null;
	}
}

