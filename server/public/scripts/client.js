var myApp = angular.module('BookApp', []);

myApp.controller('BookController', ['$http', function($http){
console.log('the controller was loaded');
var self = this;
self.bookList = [];
self.newBook = {};

getBooks();

function getBooks(){
  $http({
    method: 'GET',
    url: '/books'
  }).then(function(response){
    console.log(response.data);
    self.bookList = response.data;
  });
} //end of get request

self.addBook = function(){
  $http({
    method: 'POST',
    url: '/books/new',
    data: self.newBook
  }).then(function(response){
    console.log(response);
    getBooks();
    self.newBook = {};
  });
}

self.deleteBook = function(bookId){
  $http({
    method: 'DELETE',
    url: '/books/delete/' + bookId
  }).then(function(response){
    console.log(response.data);
    getBooks();
  })
}

self.saveBook = function(bookObject){
  $http({
    method: 'PUT',
    url: '/books/save/' + bookObject.id,
    data: bookObject
  }).then(function(response){
    console.log(response.data);
    getBooks();
  })
}



}]); //end of myApp controller
