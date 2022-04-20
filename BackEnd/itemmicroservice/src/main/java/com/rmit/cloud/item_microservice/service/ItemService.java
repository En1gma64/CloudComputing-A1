package com.rmit.cloud.item_microservice.service;

import com.rmit.cloud.item_microservice.model.Item;
import com.rmit.cloud.item_microservice.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {
    @Autowired
    private ItemRepository itemRepository;

    public Item saveItem(Item newItem) {
        return itemRepository.save(newItem);
    }

    public List<Item> saveItems(Iterable<Item> newItems) {
        return (List<Item>) itemRepository.saveAll(newItems);
    }

    public List<Item> getItems() {
        return (List<Item>) itemRepository.findAll();
    }

    public Item getItemByName(String itemName) {
        return itemRepository.findByItemName(itemName);
    }

    public List<Item> getItemsByCategory(String category) {
        return (List<Item>) itemRepository.findAllByCategory(category);
    }

    public List<Item> getItemsByColour(String colour) {
        return (List<Item>) itemRepository.findAllByColour(colour);
    }

    public List<Item> getItemsBySex(String sex) {
        return (List<Item>) itemRepository.findAllBySex(sex);
    }

    public Item getItemByID(Long id) {
        return itemRepository.getById(id);
    }

    public String deleteItemByID(Long id) {
        itemRepository.deleteById(id);
        return "Item removed. ID: " + id;
    }

    public String deleteItemByItemName(String itemName) {
        itemRepository.removeByItemName(itemName);
        return "Item removed. Name: " + itemName;
    }
}
