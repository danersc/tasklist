(function () {
  'use strict';

  angular
    .module('tasklist')
    .controller('TaskController', TaskController);

  TaskController.$inject = ['$scope', '$uibModal', '_', 'TaskService'];

  /* @ngInject */
  function TaskController($scope, $uibModal, _,  TaskService) {

    loadTasks();

    $scope.todo = [];
    $scope.doing = [];
    $scope.done = [];
    $scope.models = {
      selected: null
    };

    $scope.dragEvent = function(task, type){
      task.type = type;

      if(type === "DONE"){
          task.completed = true;
      }else{
          task.completed = false;
      }

      TaskService.updateTask(task).then(function(response){
        loadTasks();
      });
    };

    $scope.task = {};

    $scope.showForm = false;

    $scope.setVisibleForm = function(){
      $scope.showForm = true;
    };

    $scope.hideForm = function(){
        $scope.showForm = false;
    };

    $scope.addTask = function(){
      if($scope.task.title && $scope.task.description){
          TaskService.addTask($scope.task).then(function(response){
              $scope.todo.push(response.data);
          });
          $scope.task = {};
      }
    };

    $scope.detail = function(task){
        $scope.task = task;
        $scope.openModalDetail();
    };

    $scope.delete = function(task){
      $scope.task = task;
      $scope.openModalDelete();
    };

    $scope.confirmDelete = function(){
        TaskService.deleteTask($scope.task.id).then(function(response){
            loadTasks();
        });
    };

    $scope.openModalDetail = function(){
        $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title-top',
            ariaDescribedBy: 'modal-body-top',
            templateUrl: 'views/detail.html',
            size: 'sm',
            scope: $scope
        }).result.then(function(){}, function(res){});
    };

    $scope.openModalForm = function(){
      $scope.task = {};
      $scope.modalForm = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title-top',
          ariaDescribedBy: 'modal-body-top',
          templateUrl: 'views/form.html',
          size: 'sm',
          scope: $scope
      }).result.then(function(){}, function(res){}).finally(function(){

      });
    };

    $scope.openModalDelete = function(){
      $scope.modalDelete = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title-top',
          ariaDescribedBy: 'modal-body-top',
          templateUrl: 'views/delete.html',
          size: 'sm',
          scope: $scope
      }).result.then(function(){}, function(res){}).finally(function(){
          console.log('Modal closed');
      });
    };

    function loadTasks(){
      TaskService.loadAll().then(function(response){
          $scope.allTasks = response.data;
          separateTasks();
      });
    }

    function separateTasks(){
        $scope.todo = _.filter($scope.allTasks, function(task){ return task.type === "TODO"; });
        $scope.doing = _.filter($scope.allTasks, function(task){ return task.type === "DOING"; });
        $scope.done = _.filter($scope.allTasks, function(task){ return task.type === "DONE"; });
    }

  }
})();