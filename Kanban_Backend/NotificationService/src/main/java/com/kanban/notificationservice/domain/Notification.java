/*
 * Author Name : M.Krishna.
 * Date: 30-12-2022
 * Created With: IntelliJ IDEA Community Edition
 *
 */


package com.kanban.notificationservice.domain;

import java.util.List;

public class Notification {
    private String email;
    private List<String> message;

    public Notification() {
    }

    public Notification(String email, List<String> message) {
        this.email = email;
        this.message = message;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<String> getMessage() {
        return message;
    }

    public void setMessage(List<String> message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "Notification{" +
                "email='" + email + '\'' +
                ", message=" + message +
                '}';
    }
}
