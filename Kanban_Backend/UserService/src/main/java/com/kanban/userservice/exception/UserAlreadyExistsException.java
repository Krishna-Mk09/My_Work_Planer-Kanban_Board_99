/*
 * Author Name: Aditya Chaurasia
 * Date: 02-01-2023
 * Created With: IntelliJ IDEA Ultimate
 * Profile: github.com/ChaurasiaAditya
 * Website: ChaurasiaAditya.in
 */
package com.kanban.userservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "User Already Exists")
public class UserAlreadyExistsException extends Exception {
}
