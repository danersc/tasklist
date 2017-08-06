package br.com.challenge.tasklist.controller;

import br.com.challenge.tasklist.model.Task;
import br.com.challenge.tasklist.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

/**
 * Created by danerdosreis on 04/08/17.
 */

@RestController
@CrossOrigin(origins = "http://localhost:8090")
public class TaskController {

    @Autowired
    private TaskRepository repository;

    @ResponseBody
    @RequestMapping(value = "/task", method = RequestMethod.GET)
    Iterable<Task> list(){
        return repository.findAll();
    }

    @ResponseBody
    @RequestMapping(value = "/task", method = RequestMethod.POST)
    Task create(@RequestBody Task task){
        task.setType("TODO");
        repository.save(task);
        return task;
    }

    @ResponseBody
    @RequestMapping(value = "/task/{id}", method = RequestMethod.PATCH)
    Task update(@PathVariable Long id, @RequestBody Task task){
        Task dbTask = repository.findOne(id);
        if(dbTask != null){

            dbTask.setTitle(task.getTitle());
            dbTask.setDescription(task.getDescription());
            dbTask.setCompleted(task.isCompleted());
            dbTask.setType(task.getType());

            if(task.isCompleted()){
                dbTask.setCompleted(task.isCompleted());
                dbTask.setCompletedAt(new Date());
            }else{
                dbTask.setCompleted(false);
                dbTask.setCompletedAt(null);
            }

            repository.save(dbTask);
        }
        return dbTask;
    }

    @ResponseBody
    @RequestMapping(value = "/task/{id}", method = RequestMethod.DELETE)
    Boolean destroy(@PathVariable Long id){
        Task dbTask = repository.findOne(id);
        if(dbTask != null){
            repository.delete(dbTask);
            return true;
        }
        return false;
    }

}
