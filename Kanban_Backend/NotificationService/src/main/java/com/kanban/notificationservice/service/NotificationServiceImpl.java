/*
 * Author Name : M.Krishna.
 * Date: 30-12-2022
 * Created With: IntelliJ IDEA Community Edition
 *
 */

package com.kanban.notificationservice.service;

import com.kanban.notificationservice.domain.Notification;
import com.kanban.notificationservice.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NotificationServiceImpl implements NotificationService {
	private final NotificationRepository NOTIFICATION_REPOSITORY;

	@Autowired
	public NotificationServiceImpl(NotificationRepository NOTIFICATION_REPOSITORY) {
		this.NOTIFICATION_REPOSITORY = NOTIFICATION_REPOSITORY;
	}

	@Override
	public Notification saveNotification(Notification notification) {
		return NOTIFICATION_REPOSITORY.save(notification);
	}

	@Override
	public Notification getByEmail(String email) {
		return NOTIFICATION_REPOSITORY.findByEmail(email);
	}

	@Override
	public Notification updateNotification(Notification notification) {
		Notification optUser = NOTIFICATION_REPOSITORY.findByEmail(notification.getEmail());
		if (optUser == null) {
			return null;
		} else {
			return NOTIFICATION_REPOSITORY.save(notification);
		}
	}

}
