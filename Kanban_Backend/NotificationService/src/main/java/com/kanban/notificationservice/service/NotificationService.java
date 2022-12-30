package com.kanban.notificationservice.service;

import com.kanban.notificationservice.domain.Notification;

public interface NotificationService {
    Notification saveNotification(Notification notification);

    Notification getByEmail(String email);

    Notification updateNotification(Notification notification );

}
