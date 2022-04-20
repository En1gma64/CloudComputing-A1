package com.rmit.cloud.item_microservice.repository;

import com.rmit.cloud.item_microservice.model.Item;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ItemRepository extends CrudRepository<Item, Long> {
    List<Item> findAllByCategory(String category);
    Item findByItemName(String itemName);
    Item getById(Long id);
    List<Item> findAllByColour(String colour);
    List<Item> findAllBySex(String sex);

    int removeByItemName(String itemName);

}
