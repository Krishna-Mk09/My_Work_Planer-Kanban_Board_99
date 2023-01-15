/*
 * Author Name: Aditya Chaurasia
 * Date: 30-12-2022
 * Created With: IntelliJ IDEA Ultimate
 * Profile: github.com/ChaurasiaAditya
 * Website: ChaurasiaAditya.in
 */
package com.kanban.userservice.domain;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
@AllArgsConstructor
public class User {
	private String firstName;
	private String lastName;
	@Id
	private String email;
	private String password;
	private long mobileNumber;
	private String imageURL;
	private int numberOfTaskAssigned;

	public User() {
		this.numberOfTaskAssigned = 0;
	}
}
