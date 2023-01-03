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

	private final NotificationService notificationService;

	@Autowired
	public Consumer(NotificationService notificationService) {
		this.notificationService = notificationService;
	}

	@RabbitListener(queuesToDeclare = @Queue("messageQueue"))
	public void getData(MessageDTO messageDTO) {
		Notification notificationByEmail = this.notificationService.getByEmail(messageDTO.getEmail());
		List<String> message = notificationByEmail.getMessage();
		if (message == null) {
			message = new ArrayList<>();
		}
		message.add(messageDTO.getMessage());
		notificationByEmail.setMessage(message);
		this.notificationService.saveNotification(notificationByEmail);
	}
}
