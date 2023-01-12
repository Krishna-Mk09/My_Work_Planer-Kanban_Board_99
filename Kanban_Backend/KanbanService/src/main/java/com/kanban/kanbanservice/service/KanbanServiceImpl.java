package com.kanban.kanbanservice.service;

import com.kanban.kanbanservice.domain.Board;
import com.kanban.kanbanservice.domain.Kanban;
import com.kanban.kanbanservice.repository.KanbanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KanbanServiceImpl implements KanbanService {
	private final KanbanRepository KANBAN_REPOSITORY;
	private final MongoTemplate mongoTemplate;

	@Autowired
	public KanbanServiceImpl(KanbanRepository KANBAN_REPOSITORY, MongoTemplate mongoTemplate) {
		this.KANBAN_REPOSITORY = KANBAN_REPOSITORY;
		this.mongoTemplate = mongoTemplate;
	}

	/**
	 * Get the Kanban Board by email id
	 *
	 * @param email The email if for the user
	 * @return The Kanban Board for that user
	 */
	@Override
	public Kanban getKanbanByEmail(String email) {
		return this.KANBAN_REPOSITORY.findKanbanByEmail(email);
	}

	/**
	 * Save the Kanban Board
	 *
	 * @param kanban The Kanban Board to save
	 * @return The saved Kanban Board
	 */
	@Override
	public Kanban saveKanban(Kanban kanban) {
		return this.KANBAN_REPOSITORY.save(kanban);
	}

	/**
	 * Update the Kanban Board
	 *
	 * @param kanban The Kanban Board to update
	 * @return The updated Kanban Board
	 */
	@Override
	public Kanban updateKanban(Kanban kanban) {
		List<Board> kanbanBoards = kanban.getBoards();
		for (Board board : kanbanBoards) {
			if (!board.getMembers().isEmpty()) {
				List<String> boardMembers = board.getMembers();
				for (String members : boardMembers) {
					Kanban kanbanByEmail = this.KANBAN_REPOSITORY.findKanbanByEmail(members);
					if (kanbanByEmail != null) {
						List<Board> kanbanByEmailBoards = kanbanByEmail.getBoards();
						for (Board kanbanByEmailBoard : kanbanByEmailBoards) {
							if (kanbanByEmailBoard.getBoardName().equals(board.getBoardName())) {
								kanbanByEmailBoard.setBoardName(board.getBoardName());
								kanbanByEmailBoard.setColumns(board.getColumns());
								kanbanByEmailBoard.setMembers(board.getMembers());
								this.KANBAN_REPOSITORY.save(kanbanByEmail);
							}
						}
					}
				}
			}
		}
		return this.KANBAN_REPOSITORY.save(kanban);
	}

	/**
	 * Delete the Kanban Board by email id
	 *
	 * @param email The email id for the user
	 */
	@Override
	public void deleteKanbanByEmail(String email) {
		this.KANBAN_REPOSITORY.deleteById(email);
	}

	@Override
	public Kanban addMemberToBoardByEmail(Kanban kanban, String email) {
		Kanban kanbanByEmail = this.KANBAN_REPOSITORY.findKanbanByEmail(email);
		if (kanbanByEmail != null) {
			List<Board> boards = kanban.getBoards();
			for (Board board : boards) {
				if (board.getMembers().contains(email)) {
					if (kanbanByEmail.getBoards().contains(board)) {
						continue;
					}
					board.getMembers().add(kanban.getEmail());
					kanbanByEmail.getBoards().add(board);
					this.KANBAN_REPOSITORY.save(kanban);
					this.KANBAN_REPOSITORY.save(kanbanByEmail);
//					this.updateKanban(kanban);
				}
			}
		}
		return kanban;
	}


	@Override
	public List<String> getAllEmailsInBoard(String email, String boardName) {
		Query query = new Query(Criteria.where("email").is(email).and("boards.boardName").is(boardName));
		return mongoTemplate.find(query, Kanban.class).get(0).getBoards().get(0).getMembers();
	}
}
