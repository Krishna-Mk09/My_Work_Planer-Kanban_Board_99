package com.kanban.notificationservice.repository;

import com.kanban.notificationservice.domain.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository extends MongoRepository<Notification, String> {

	/**
	 * This method is used to find the notification by email
	 *
	 * @param email The email of the user
	 * @return The notification
	 */
	Notification findByEmail(String email);
}
