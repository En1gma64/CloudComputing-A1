package com.rmit.cloud.item_microservice.web;

import com.rmit.cloud.item_microservice.model.Item;
import com.rmit.cloud.item_microservice.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/items")
public class ItemController {
    @Autowired
    private ItemService itemService;

    @PostMapping("/addItem")
    public ResponseEntity<Item> createNewItem(@RequestBody Item item) {
        Item newItem = itemService.saveItem(item);
        return new ResponseEntity<>(newItem, HttpStatus.CREATED);
    }

    @PostMapping("/addItems")
    public ResponseEntity<List<Item>> createNewItems(@RequestBody List<Item> items) {
        List<Item> newItems = itemService.saveItems(items);
        return new ResponseEntity<>(newItems, HttpStatus.CREATED);
    }

    @GetMapping("/findItems")
    public List<Item> findItems() {
        List<Item> returnList = itemService.getItems();
        Collections.reverse(returnList);
        return returnList;
    }

    @GetMapping("/findItemByName/{itemName}")
    public Item findItemByName(@PathVariable String itemName) {
        return itemService.getItemByName(itemName);
    }

    @GetMapping("/findItemsByCategory/{category}")
    public List<Item> findItemByCategory(@PathVariable String category) {
        List<Item> returnList = itemService.getItemsByCategory(category);
        return returnList;
    }

    @GetMapping("/findItemsByColour/{colour}")
    public List<Item> findItemByColour(@PathVariable String colour) {
        return itemService.getItemsByColour(colour);
    }

    @GetMapping("/findItemsBySex/{sex}")
    public List<Item> findItemBySex(@PathVariable String sex) {
        return itemService.getItemsBySex(sex);
    }

    @DeleteMapping("/deleteByID/{id}")
    public String deleteById(@PathVariable Long id) {
        return itemService.deleteItemByID(id);
    }

    @DeleteMapping("/deleteByName/{itemName}")
    public String deleteByName(@PathVariable String itemName) {
        return itemService.deleteItemByItemName(itemName);
    }
}
