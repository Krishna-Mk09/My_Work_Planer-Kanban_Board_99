package com.kanban.notificationservice.service;

import com.kanban.notificationservice.domain.Notification;

public interface NotificationService {

	/**
	 * Save the Notification
	 *
	 * @param notification The Notification to save
	 * @return The saved notification
	 */
	Notification saveNotification(Notification notification);

	/**
	 * Get notification by email
	 *
	 * @param email The notification is returned using email
	 * @return The  notification
	 */
	Notification getByEmail(String email);

	/**
	 * Update the Notification
	 *
	 * @param notification The notification is updated
	 * @return The updated notification
	 */
	Notification updateNotification(Notification notification);

	/**
	 * Delete the Notification
	 *
	 * @param email The notification is deleted using email
	 */
	void deleteNotification(String email);
}
