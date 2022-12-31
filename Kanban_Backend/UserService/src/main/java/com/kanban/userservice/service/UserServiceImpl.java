/*
 * Author Name: Aditya Chaurasia
 * Date: 30-12-2022
 * Created With: IntelliJ IDEA Ultimate
 * Profile: github.com/ChaurasiaAditya
 * Website: ChaurasiaAditya.in
 */
package com.kanban.userservice.service;

import com.kanban.userservice.domain.User;
import com.kanban.userservice.exception.UserNotFoundException;
import com.kanban.userservice.proxy.UserProxy;
import com.kanban.userservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

	private UserProxy userProxy;

	private final UserRepository userRepository;

	public UserServiceImpl(UserProxy userProxy, UserRepository userRepository) {
		this.userProxy = userProxy;
		this.userRepository = userRepository;
	}

	/**
	 * This method is used to save the user in the database and return the saved user.
	 *
	 * @param user This is the user object which is to be saved in the database.
	 * @return User
	 */
	@Override
	public User registerUser(User user) {
		userProxy.saveKanban(user);
		return userRepository.save(user);
	}

	/**
	 * This method is used to update the user in the database and return the updated user.
	 *
	 * @param user This is the user object which is to be updated in the database.
	 * @return User
	 */
	@Override
	public User updateUser(User user) {
		return this.userRepository.save(user);
	}

	/**
	 * This method is used to delete the user from the database and return the deleted user.
	 *
	 * @param email This is the email of the user which is to be deleted from the database.
	 */
	@Override
	public void deleteUser(String email) {
		this.userRepository.deleteById(email);
	}

	/**
	 * This method is used to log in the user and return the user.
	 *
	 * @param email    and password This is the email and password of the user which is to be logged in.
	 * @param password
	 * @return User
	 */
	@Override
	public User loginUser(String email, String password) throws UserNotFoundException {
		return this.userRepository.findUserByEmailAndPassword(email, password);
	}

	/**
	 * @return
	 */
	@Override
	public User findUserByEmail(String email) {
		return this.userRepository.findUserByEmail(email);
	}
}

