const express = require("express");
const post = express.Router();
const PostModel = require("../models/postmodel");

post.get("/posts", async (req, res) => {
  const { page = 1, pageSize = 15 } = req.query;
  try {
    const posts = await PostModel.find()
      .populate("author")
      .limit(Number(pageSize))
      .skip((Number(page) - 1) * Number(pageSize));

    const totalPost = await PostModel.count();

    res.status(200).send({
      statusCode: 200,
      currentPage: Number(page),
      totalPages: Math.ceil(totalPost / Number(pageSize)),
      totalPost,
      posts,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Errore interno del server",
    });
  }
});

post.post("/posts/create", async (req, res) => {
  const newPost = new PostModel({
    image: req.body.image,
    description: req.body.description,
    author: req.body.author,
  });
  try {
    const post = await newPost.save();

    res.status(201).send({
      statusCode: 201,
      message: "Post save succesfully",
      payload: post,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Errore interno del server",
      error,
    });
  }
});

post.delete("/posts/delete/:postId", async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await PostModel.findByIdAndDelete(postId);
    if (!post) {
      return res.status(404).send({
        statusCode: 404,
        message: "Post già eliminato",
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: "Eliminato con successo!",
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Errore interno del server",
    });
  }
});

module.exports = post;
