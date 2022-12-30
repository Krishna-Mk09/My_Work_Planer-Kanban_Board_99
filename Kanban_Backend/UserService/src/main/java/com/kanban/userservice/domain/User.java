/*
 * Author Name: Aditya Chaurasia
 * Date: 30-12-2022
 * Created With: IntelliJ IDEA Ultimate
 * Profile: github.com/ChaurasiaAditya
 * Website: ChaurasiaAditya.in
 */
package com.kanban.userservice.domain;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.PrimaryKeyJoinColumn;

@Entity
public class User {
	String firstName;
	String lastName;
	@Id
	@PrimaryKeyJoinColumn
	String email;
	String password;
	long mobileNumber;

	public User() {
	}
}
