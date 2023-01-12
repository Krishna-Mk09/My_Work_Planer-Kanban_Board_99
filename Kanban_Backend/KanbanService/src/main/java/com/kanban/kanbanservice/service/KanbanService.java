package com.kanban.kanbanservice.service;

import com.kanban.kanbanservice.domain.Kanban;

import java.util.List;

public interface
KanbanService {
	/**
	 * Get the Kanban Board by email id
	 *
	 * @param email The email if for the user
	 * @return The Kanban Board for that user
	 */
	Kanban getKanbanByEmail(String email);

	/**
	 * Save the Kanban Board
	 *
	 * @param kanban The Kanban Board to save
	 * @return The saved Kanban Board
	 */
	Kanban saveKanban(Kanban kanban);

	/**
	 * Update the Kanban Board
	 *
	 * @param kanban The Kanban Board to update
	 * @return The updated Kanban Board
	 */
	Kanban updateKanban(Kanban kanban);

	/**
	 * Delete the Kanban Board by email id
	 *
	 * @param email The email id for the user
	 */
	void deleteKanbanByEmail(String email);

	Kanban addMemberToBoardByEmail(Kanban kanban, String email);

	List<String> getAllEmailsInBoard(String email, String boardName);
}
