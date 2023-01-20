package com.kanban.kanbanservice.configuration;

import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Component
public class Producer {
    private final RabbitTemplate RABBIT_TEMPLATE;
    private final DirectExchange DIRECT_EXCHANGE;

    public Producer(RabbitTemplate RABBIT_TEMPLATE, DirectExchange DIRECT_EXCHANGE) {
        this.RABBIT_TEMPLATE = RABBIT_TEMPLATE;
        this.DIRECT_EXCHANGE = DIRECT_EXCHANGE;
    }

    /**
     * This method sends the message to the queue for the respective user
     *
     * @param messageDTO The message to send
     */
    public void sendMessage(MessageDTO messageDTO) {
        RABBIT_TEMPLATE.convertAndSend(DIRECT_EXCHANGE.getName(), MessageConfig.MESSAGE_KEY, messageDTO);
    }

}
