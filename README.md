# 📝 Blog API

This is a backend project where I built a **Blog API** using Node.js, Express, and MongoDB.
It handles authentication, blog creation, likes, comments, search, pagination, and image uploads using Cloudinary.

---

## 🚀 What this project can do

* Users can register and login securely (JWT)
* Create, update, and delete blog posts
* Like and unlike blogs
* Add, edit, and delete comments
* Upload blog images (stored in Cloudinary)
* Search blogs by title
* Filter blogs by user 
* Pagination (load blogs page by page)
* Basic security (rate limiting, hashed passwords)
* Centralized error handling

---

## 🛠️ Tech used

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT (Authentication)
* bcrypt (Password hashing)
* Multer (File upload)
* Cloudinary (Image storage)

---


## 📡 API Routes (Simple Overview)

### Auth

* POST `/register`
* POST `/login`

### Blogs

* POST `/addblogs` → create blog (with image)
* GET `/blogs` → get all blogs (pagination + search)
* GET `/getblogs/:blogsId` → get single blog
* PUT `/updateblogs/:blogsId` → update blog
* DELETE `/deleteblogs/:blogsId` → delete blog

### Likes

* POST `/likes/:blogsId` → like/unlike blog
* GET `/like/:blogsId` → get total likes

### Comments

* POST `/comment/:blogsId` → a

```
/blogs?page=1&limit=10&search=tea&user=john
```

---

## 🔒 Security

* Passwords are hashed using bcrypt
* JWT is used for authentication
* Protected routes using middleware
* Rate limiting to prevent abuse

---

## 🎯 Why I built this

This project helped me understand:

* How authentication works in real apps
* How APIs are structured professionally
* How to handle files and cloud storage
* How to write clean and scalable backend code

---

## 👨‍💻 Author

Kishor Gharti

