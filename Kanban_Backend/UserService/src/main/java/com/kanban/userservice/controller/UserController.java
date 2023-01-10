/*
 * Author Name: Aditya Chaurasia
 * Date: 30-12-2022
 * Created With: IntelliJ IDEA Ultimate
 * Profile: github.com/ChaurasiaAditya
 * Website: ChaurasiaAditya.in
 */
package com.kanban.userservice.controller;

import com.kanban.userservice.domain.User;
import com.kanban.userservice.exception.UserAlreadyExistsException;
import com.kanban.userservice.exception.UserNotFoundException;
import com.kanban.userservice.service.SecurityTokenGeneratorImpl;
import com.kanban.userservice.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {

	private final UserServiceImpl USER_SERVICE;
	private final SecurityTokenGeneratorImpl SECURITY_TOKEN_GENERATOR;

	@Autowired
	public UserController(UserServiceImpl USER_SERVICE, SecurityTokenGeneratorImpl SECURITY_TOKEN_GENERATOR) {
		this.USER_SERVICE = USER_SERVICE;
		this.SECURITY_TOKEN_GENERATOR = SECURITY_TOKEN_GENERATOR;
	}

	@PostMapping("/add")
	public ResponseEntity<?> addUser(@RequestBody User user) throws UserAlreadyExistsException {
		try {
			return new ResponseEntity<>(this.USER_SERVICE.registerUser(user), HttpStatus.CREATED);
		} catch (UserAlreadyExistsException e) {
			throw new UserAlreadyExistsException();
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/login")
	public ResponseEntity<?> getByLogin(@RequestBody User user) throws UserNotFoundException {
		try {
			this.USER_SERVICE.loginUser(user.getEmail(), user.getPassword());
			Map<String, String> secretKey = this.SECURITY_TOKEN_GENERATOR.generateToken(user);
			return new ResponseEntity<>(secretKey, HttpStatus.OK);
		} catch (UserNotFoundException exception) {
			throw new UserNotFoundException();
		} catch (Exception exception) {
			return new ResponseEntity<>("Network Error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/guard/update/{email}")
	public ResponseEntity<?> updateUser(@RequestBody User user, @PathVariable String email) {
		return new ResponseEntity<>(this.USER_SERVICE.updateUser(user,email), HttpStatus.OK);
	}

	@DeleteMapping("/guard/delete/{email}")
	public ResponseEntity<?> deleteUser(@PathVariable String email) {
		this.USER_SERVICE.deleteUser(email);
		return new ResponseEntity<>("User Deleted Successfully", HttpStatus.OK);
	}

	@GetMapping("/guard/email/{email}")
	public ResponseEntity<?> getByEmail(@PathVariable String email) throws UserNotFoundException {
		try {
			return new ResponseEntity<>(this.USER_SERVICE.findUserByEmail(email), HttpStatus.OK);
		} catch (UserNotFoundException exception) {
			throw new UserNotFoundException();
		} catch (Exception exception) {
			return new ResponseEntity<>("Network Error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/guard/all-emails")
	public ResponseEntity<?> getAllEmails() {
		return new ResponseEntity<>(this.USER_SERVICE.findAllEmails(), HttpStatus.OK);
	}

}
