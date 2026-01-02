const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogpost.controller");

// Create blog post
router.post("/", blogController.createBlogPost);

// Get all blog posts
router.get("/", blogController.getBlogPosts);

// Get single blog post by ID
router.get("/:id", blogController.getBlogPost);

// Update blog post by ID
router.patch("/:id", blogController.updateBlogPost);

// Delete blog post by ID
router.delete("/:id", blogController.deleteBlogPost);

module.exports = router;
