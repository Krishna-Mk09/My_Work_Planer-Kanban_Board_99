package com.kanban.kanbanservice.service;

import com.kanban.kanbanservice.configuration.MessageDTO;
import com.kanban.kanbanservice.configuration.Producer;
import com.kanban.kanbanservice.domain.Board;
import com.kanban.kanbanservice.domain.Kanban;
import com.kanban.kanbanservice.repository.KanbanRepository;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class KanbanServiceImpl implements KanbanService {
	private final KanbanRepository kanbanRepository;

	private final RabbitTemplate rabbitTemplate;
	private final DirectExchange directExchange;

	@Autowired
	Producer producer;

	@Autowired
	public KanbanServiceImpl(KanbanRepository kanbanRepository, RabbitTemplate rabbitTemplate, DirectExchange directExchange) {
		this.kanbanRepository = kanbanRepository;
		this.rabbitTemplate = rabbitTemplate;
		this.directExchange = directExchange;
	}

	/**
	 * Get the Kanban Board by email id
	 *
	 * @param email The email if for the user
	 * @return The Kanban Board for that user
	 */
	@Override
	public Kanban getKanbanByEmail(String email) {
		return this.kanbanRepository.findKanbanByEmail(email);
	}

	/**
	 * Save the Kanban Board
	 *
	 * @param kanban The Kanban Board to save
	 * @return The saved Kanban Board
	 */
	@Override
	public Kanban saveKanban(Kanban kanban) {
		return this.kanbanRepository.save(kanban);
	}

	/**
	 * Update the Kanban Board
	 *
	 * @param kanban The Kanban Board to update
	 * @return The updated Kanban Board
	 */
	@Override
	public Kanban updateKanbanBoard(Kanban kanban) {
//        Kanban kanbanByEmail = this.getKanbanByEmail(kanban.getEmail());
//        if (kanbanByEmail != null) {
//            kanbanByEmail.setBoards(kanban.getBoards());
//            return this.kanbanRepository.save(kanbanByEmail);
//        }
		return this.kanbanRepository.save(kanban);
	}

	/**
	 * Delete the Kanban Board by email id
	 *
	 * @param email The email id for the user
	 */
	@Override
	public void deleteKanbanBoardByEmail(String email) {
		this.kanbanRepository.deleteById(email);
	}

    @Override
    public MessageDTO sendMessage(MessageDTO messageDTO) {
        if (this.kanbanRepository.existsById(messageDTO.getEmail())) {
            producer.sendMessage(messageDTO);
        }
		return messageDTO;
	}

	@Override
	public String addMemberToBoardByEmail(Kanban kanban, String email) {
		Kanban kanbanByEmail = this.kanbanRepository.findKanbanByEmail(email);
		if (kanbanByEmail != null) {
			List<Board> boards = kanban.getBoards();
			for (Board board : boards) {
				if (board.getMembers().contains(email)) {
					if (kanbanByEmail.getBoards().contains(board)) {
						continue;
					}
					board.getMembers().add(kanban.getEmail());
					kanbanByEmail.getBoards().add(board);
					int index = kanban.getBoards().indexOf(board);
					kanban.getBoards().get(index).getMembers().add(kanbanByEmail.getEmail());
					this.kanbanRepository.save(kanban);
					this.kanbanRepository.save(kanbanByEmail);
				}
			}
		}
		return "Member added to board";
	}
}
