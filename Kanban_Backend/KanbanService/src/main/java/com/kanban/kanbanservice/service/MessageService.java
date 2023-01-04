/*
 * Author Name: Aditya Chaurasia
 * Date: 04-01-2023
 * Created With: IntelliJ IDEA Ultimate
 * Profile: github.com/ChaurasiaAditya
 * Website: ChaurasiaAditya.in
 */
package com.kanban.kanbanservice.service;

import com.kanban.kanbanservice.configuration.MessageDTO;

public interface MessageService {
	MessageDTO sendMessage(MessageDTO messageDTO);
}
