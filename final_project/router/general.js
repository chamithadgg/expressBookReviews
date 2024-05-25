const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
      if (!doesExist(username)) {
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});
      }
    }
    return res.status(404).json({message: "Unable to register user."});
  });

  const doesExist = (username)=>{
    let userswithsamename = users.filter((user)=>{
      return user.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
  }

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve(JSON.stringify(books,null,4))
    },6000)})
    myPromise.then((successMessage) => {
        res.send(successMessage)
      })
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve(books[isbn])
    },6000)})
    myPromise.then((successMessage) => {
        res.send(successMessage)
      })
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const authorName = req.params.author;
    let book = Object.values(books);
    let filtered_books = book.filter((result) => result.author === authorName);
    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve(filtered_books)
    },6000)})
    myPromise.then((successMessage) => {
        res.send(successMessage)
      })
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const titleName = req.params.title;
    let book = Object.values(books);
    let filtered_books = book.filter((result) => result.title === titleName);
    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve(filtered_books)
    },6000)})
    myPromise.then((successMessage) => {
        res.send(successMessage)
      })
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn].reviews)
});

module.exports.general = public_users;
