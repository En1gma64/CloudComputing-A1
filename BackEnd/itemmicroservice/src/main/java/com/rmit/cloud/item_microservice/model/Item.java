package com.rmit.cloud.item_microservice.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@Entity
@Table(name = "item")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Item name is required")
    @Column(unique = true)
    private String itemName;

    @NotBlank(message = "Item Description is required")
    @Column(unique = true)
    private String desc;

    @NotBlank(message = "Category is required")
    private String category;

    @NotBlank(message = "Price per day is required")
    private String pricePD;

    @NotBlank(message = "Size is required")
    private String size;

    @NotBlank(message = "Colour is required")
    private String colour;

    @NotBlank(message = "Sex is required")
    private String sex;

    private String imageLink;

    private String available;

    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date create_at;

    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date update_at;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getPricePD() {
        return pricePD;
    }

    public void setPricePD(String pricePD) {
        this.pricePD = pricePD;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getColour() {
        return colour;
    }

    public void setColour(String colour) {
        this.colour = colour;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getImageLink() {
        return imageLink;
    }

    public void setImageLink(String imageLink) {
        this.imageLink = imageLink;
    }

    public String getAvailable() {
        return available;
    }

    public void setAvailable(String available) {
        this.available = available;
    }

    public Date getCreate_at() {
        return create_at;
    }

    public void setCreate_at(Date create_at) {
        this.create_at = create_at;
    }

    public Date getUpdate_at() {
        return update_at;
    }

    public void setUpdate_at(Date update_at) {
        this.update_at = update_at;
    }

    @PrePersist
    protected void onCreate() {
        this.create_at = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        this.update_at = new Date();
    }
}
