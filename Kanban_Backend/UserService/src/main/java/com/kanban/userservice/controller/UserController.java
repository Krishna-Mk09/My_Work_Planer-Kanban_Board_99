/*
 * Author Name: Aditya Chaurasia
 * Date: 30-12-2022
 * Created With: IntelliJ IDEA Ultimate
 * Profile: github.com/ChaurasiaAditya
 * Website: ChaurasiaAditya.in
 */
package com.kanban.userservice.controller;

import com.kanban.userservice.domain.User;
import com.kanban.userservice.exception.UserNotFoundException;
import com.kanban.userservice.service.SecurityTokenGeneratorImpl;
import com.kanban.userservice.service.UserService;
import com.kanban.userservice.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {

	private final UserServiceImpl userService;
	private final SecurityTokenGeneratorImpl securityTokenGenerator;

	public UserController(UserServiceImpl userService, SecurityTokenGeneratorImpl securityTokenGenerator) {
		this.userService = userService;
		this.securityTokenGenerator = securityTokenGenerator;
	}

	@PostMapping("/add")
	public ResponseEntity<?> addUser(@RequestBody User user) {
		return new ResponseEntity<>(this.userService.registerUser(user), HttpStatus.CREATED);
	}

	@GetMapping("/login")
	public ResponseEntity<?> getByLogin(@RequestBody User user) throws UserNotFoundException {
		try {
			this.userService.loginUser(user.getEmail(), user.getPassword());
			Map<String, String> secretKey = this.securityTokenGenerator.generateToken(user);
			return new ResponseEntity<>(secretKey, HttpStatus.OK);
		} catch (UserNotFoundException exception) {
			throw new UserNotFoundException();
		} catch (Exception exception) {
			return new ResponseEntity<>("Network Error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/update")
	public ResponseEntity<?> updateUser(@RequestBody User user) {
		return new ResponseEntity<>(this.userService.updateUser(user), HttpStatus.OK);
	}

	@DeleteMapping("/delete/{email}")
	public ResponseEntity<?> deleteUser(@PathVariable String email) {
		this.userService.deleteUser(email);
		return new ResponseEntity<>("User Deleted Successfully", HttpStatus.OK);
	}

//	@GetMapping("/emails")
//	public ResponseEntity<?> getByEmail() {
//		return new ResponseEntity<>(this.userService.getAllEmails(), HttpStatus.OK);
//	}


}
