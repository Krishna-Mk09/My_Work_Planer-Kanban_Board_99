/*
 * Author Name: Aditya Chaurasia
 * Date: 04-01-2023
 * Created With: IntelliJ IDEA Ultimate
 * Profile: github.com/ChaurasiaAditya
 * Website: ChaurasiaAditya.in
 */
package com.kanban.kanbanservice.service;

import com.kanban.kanbanservice.configuration.MessageDTO;
import com.kanban.kanbanservice.configuration.Producer;
import com.kanban.kanbanservice.repository.KanbanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MessageServiceImpl implements MessageService {

	private final KanbanRepository KANBAN_REPOSITORY;
	private final Producer PRODUCER;

	@Autowired
	public MessageServiceImpl(KanbanRepository KANBAN_REPOSITORY, Producer PRODUCER) {
		this.KANBAN_REPOSITORY = KANBAN_REPOSITORY;
		this.PRODUCER = PRODUCER;
	}

	@Override
	public MessageDTO sendMessage(MessageDTO messageDTO) {
		if (this.KANBAN_REPOSITORY.existsById(messageDTO.getEmail())) {
			PRODUCER.sendMessage(messageDTO);
		}
		return messageDTO;
	}
}
