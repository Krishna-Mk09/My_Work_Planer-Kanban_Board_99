package com.kanban.notificationservice.repository;

import com.kanban.notificationservice.domain.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository extends MongoRepository<Notification, String> {

	Notification findByEmail(String email);
}
