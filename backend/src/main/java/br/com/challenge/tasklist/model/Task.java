package br.com.challenge.tasklist.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

/**
 * Created by danerdosreis on 04/08/17.
 */

@Entity
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long Id;
    @NotNull
    private String title;
    @NotNull
    private String description;
    private String type;
    private boolean completed;
    private Date createdAt;
    private Date updatedAt;
    @Column(nullable = true)
    private Date completedAt;


    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Date getCompletedAt() {
        return completedAt;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setCompletedAt(Date completedAt) {
        this.completedAt = completedAt;
    }

    @PrePersist
    void createdAt() {
        Date currentDate = new Date();
        this.createdAt = currentDate;
        this.updatedAt = currentDate;
    }

    @PreUpdate
    void updatedAt() {
        this.updatedAt = new Date();
    }

}
