package com.kanban.kanbanservice.service;

import com.kanban.kanbanservice.domain.Kanban;

import java.util.List;

public interface KanbanService {
	/**
	 * This method get the Kanban Board by email id
	 *
	 * @param email The email if for the user
	 * @return The Kanban Board for that user
	 */
	Kanban getKanbanByEmail(String email);

	/**
	 * This method save the Kanban Board
	 *
	 * @param kanban The Kanban Board to save
	 * @return The saved Kanban Board
	 */
	Kanban saveKanban(Kanban kanban);

	/**
	 * This method updates each kanban board in all respective members
	 *
	 * @param kanban The Kanban Board to update
	 * @return The updated Kanban Board
	 */
	Kanban updateKanban(Kanban kanban);

	/**
	 * This method delete the Kanban Board by email id
	 *
	 * @param email The email id for the user
	 */
	void deleteKanbanByEmail(String email);

	/**
	 * This method adds a member to the kanban board
	 *
	 * @param kanban The Kanban Board to update
	 * @param email  The email id of the member to add
	 * @return The updated Kanban Board
	 */
	Kanban addMemberToBoardByEmail(Kanban kanban, String email);

	/**
	 * This method fetched all the email ids of the members in a kanban board
	 *
	 * @param email     The email id of the user
	 * @param boardName The name of the board
	 * @return The list of email ids of the members
	 */
	List<String> getAllEmailsInBoard(String email, String boardName);
}
