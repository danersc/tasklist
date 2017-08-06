package br.com.challenge.tasklist.repository;

import br.com.challenge.tasklist.model.Task;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by danerdosreis on 04/08/17.
 */

@Transactional
public interface TaskRepository extends CrudRepository<Task, Long> {
}
