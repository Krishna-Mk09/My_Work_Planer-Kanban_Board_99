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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Optional;

@Service
public class NotificationServiceImpl implements NotificationService {
    NotificationRepository notificationRepository;

    @Autowired
    public NotificationServiceImpl(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @Override
    public Notification saveNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

    @Override
    public Notification getByEmail(String email) {
        return notificationRepository.findByEmail(email);
    }

    @Override
    public Notification updateNotification(Notification notification) {
        Notification optUser = notificationRepository.findByEmail(notification.getEmail());
        return notificationRepository.save(notification);
    }



}
