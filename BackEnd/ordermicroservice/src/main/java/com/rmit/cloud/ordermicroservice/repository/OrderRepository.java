package com.rmit.cloud.ordermicroservice.repository;

import com.rmit.cloud.ordermicroservice.model.Order;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface OrderRepository extends CrudRepository<Order, Long> {
    List<Order> findAllByUsername(String username);
    List<Order>  findAllByItemName(String itemName);
    Order getById(Long id);
    int deleteByItemName(String itemName);
}
