package com.rmit.cloud.ordermicroservice.service;

import com.rmit.cloud.ordermicroservice.model.Order;
import com.rmit.cloud.ordermicroservice.repository.OrderRepository;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    public Order saveOrder(Order newOrder) {
        return orderRepository.save(newOrder);
    }

    public List<Order> saveOrders(Iterable<Order> newOrders) {
        return (List<Order>) orderRepository.saveAll(newOrders);
    }

    public List<Order> getOrders() {
        return (List<Order>) orderRepository.findAll();
    }

    public List<Order> getOrdersByItemName(String itemName) {
        return orderRepository.findAllByItemName(itemName);
    }

    public Order getOrderById(Long id) {
        return orderRepository.getById(id);
    }

    public List<Order> getOrdersByUsername(String username) {
        return orderRepository.findAllByUsername(username);
    }

    public String deleteOrderById(Long id) {
        orderRepository.deleteById(id);
        return "Order removed Id: " + id;
    }
}
