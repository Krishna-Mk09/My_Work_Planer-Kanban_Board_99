package com.kanban.kanbanservice.configuration;

public class MessageDTO {
	private String email;
	private String message;

	public MessageDTO() {
	}

	public MessageDTO(String email, String message) {
		this.email = email;
		this.message = message;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	@Override
	public String toString() {
		return "TrackDTO{" + "email='" + email + '\'' + ", message='" + message + '\'' + '}';
	}
}
