package com.rmit.cloud.ordermicroservice.web;

import com.rmit.cloud.ordermicroservice.model.Order;
import com.rmit.cloud.ordermicroservice.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("api/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping("/addOrder")
    public ResponseEntity<Order> createNewOrder(@RequestBody Order order) {
        Order newOrder = orderService.saveOrder(order);
        return new ResponseEntity<>(newOrder, HttpStatus.CREATED);
    }

    @PostMapping("/addOrders")
    public ResponseEntity<List<Order>> createNewItems(@RequestBody List<Order> orders) {
        List<Order> newItems = orderService.saveOrders(orders);
        return new ResponseEntity<>(newItems, HttpStatus.CREATED);
    }

    @GetMapping("/findOrderByUsername/{username}")
    public List<Order> findOrdersByUsername(@PathVariable String username) {
        return orderService.getOrdersByUsername(username);
    }

    @GetMapping("/findOrdersByItemName/{itemName}")
    public List<Order> findOrdersByItemName(@PathVariable String itemName) {
        return orderService.getOrdersByItemName(itemName);
    }

    @DeleteMapping("/deleteById/{id}")
    public String deleteOrderById(@PathVariable Long id) {
        return orderService.deleteOrderById(id);
    }
}
