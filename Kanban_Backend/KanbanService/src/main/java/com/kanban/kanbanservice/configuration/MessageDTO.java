package com.kanban.kanbanservice.configuration;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class MessageDTO {
    private String email;
    private String message;
}
