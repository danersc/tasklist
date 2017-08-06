(function () {
    'use strict';

    angular
        .module('tasklist')
        .service('TaskService', TaskService);

    TaskService.$inject = ['$http', '$q', 'API_URL'];

    /* @ngInject */
    function TaskService($http, $q, API_URL) {
        var service = {
            loadAll: loadAll,
            addTask: addTask,
            deleteTask: deleteTask,
            updateTask: updateTask
        };

        return service;

        ////////////////

        function loadAll(){
            return $http.get(API_URL+"task");
        }

        function addTask(task){
            return $http.post(API_URL+"task", task);
        }

        function deleteTask(id){
            return $http.delete(API_URL+"task/"+id);
        }

        function updateTask(task){
            return $http.patch(API_URL+"task/"+task.id, task);
        }

    }

})();
