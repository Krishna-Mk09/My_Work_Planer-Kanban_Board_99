package com.kanban.kanbanservice.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Task {
    private String name;
    private String description;
    private String priority;
    private String status;
    private Date startDate;
    private Date dueDate;
    private String assigneeEmail;
}
