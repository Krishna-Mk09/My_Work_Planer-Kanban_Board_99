package com.kanban.notificationservice.configuration;

import com.kanban.notificationservice.domain.Notification;
import com.kanban.notificationservice.service.NotificationService;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class Consumer {

	private final NotificationService NOTIFICATION_SERVICE;

	@Autowired
	public Consumer(NotificationService NOTIFICATION_SERVICE) {
		this.NOTIFICATION_SERVICE = NOTIFICATION_SERVICE;
	}

	@RabbitListener(queuesToDeclare = @Queue("messageQueue"))
	public void getData(MessageDTO messageDTO) {
		Notification notificationByEmail = this.NOTIFICATION_SERVICE.getByEmail(messageDTO.getEmail());
		List<String> message = notificationByEmail.getMessage();
		if (message == null) {
			message = new ArrayList<>();
		}
		message.add(messageDTO.getMessage());
		notificationByEmail.setMessage(message);
		this.NOTIFICATION_SERVICE.saveNotification(notificationByEmail);
	}
}
