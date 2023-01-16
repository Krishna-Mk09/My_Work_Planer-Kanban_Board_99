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

    /**
     * Save the Notification
     *
     * @param notification The Notification to save
     * @return The saved notification
     */
    @Override
    public Notification saveNotification(Notification notification) {
        return NOTIFICATION_REPOSITORY.save(notification);
    }

    /**
     * Get notification by email
     *
     * @param email The notification is returned using email
     * @return The  notification
     */
    @Override
    public Notification getByEmail(String email) {
        return NOTIFICATION_REPOSITORY.findByEmail(email);
    }

    /**
     * Update the Notification
     *
     * @param notification The notification is updated
     * @return The updated notification
     */
    @Override
    public Notification updateNotification(Notification notification) {
        Notification optUser = NOTIFICATION_REPOSITORY.findByEmail(notification.getEmail());
        if (optUser == null) {
            return null;
        } else {
            return NOTIFICATION_REPOSITORY.save(notification);
        }
    }

    @Override
    public void deleteNotification(String email) {
        NOTIFICATION_REPOSITORY.deleteById(email);
    }
}
