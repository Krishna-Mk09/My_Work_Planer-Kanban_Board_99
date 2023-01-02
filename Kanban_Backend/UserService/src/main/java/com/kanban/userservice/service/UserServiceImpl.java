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
import com.kanban.userservice.proxy.KanbanProxy;
import com.kanban.userservice.proxy.NotificationProxy;
import com.kanban.userservice.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

	private final KanbanProxy kanbanProxy;
	private final NotificationProxy notificationProxy;

	private final UserRepository userRepository;

	public UserServiceImpl(KanbanProxy kanbanProxy, NotificationProxy notificationProxy, UserRepository userRepository) {
		this.kanbanProxy = kanbanProxy;
		this.notificationProxy = notificationProxy;
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
		kanbanProxy.saveKanban(user);
		notificationProxy.saveNotification(user);
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
	 * @param password This is the password of the user which is to be logged in.
	 * @return User
	 */
	@Override
	public User loginUser(String email, String password) throws UserNotFoundException {
		return this.userRepository.findUserByEmailAndPassword(email, password);
	}

	/**
	 * This method is used to find the user by email and return the user.
	 * @param email This is the email of the user which is to be found.
	 * @return User
	 */
	@Override
	public User findUserByEmail(String email) throws UserNotFoundException  {
//		User optuser = this.userRepository.findUserByEmail(email);
		return this.userRepository.findUserByEmail(email);
	}

//	@Override
//	public Notification updateNotification(Notification notification) {
//		Notification optUser = notificationRepository.findByEmail(notification.getEmail());
//		if (optUser == null) {
//			return null;
//		} else {
//			return notificationRepository.save(notification);
//		}
//	}
}

