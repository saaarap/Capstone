const express = require("express");
const comment = express.Router();
const commentModel = require("../models/commentmodel");

comment.get("/comment", async (req, res) => {
  try {
    const comments = await commentModel.find();
    res.status(200).send({
      statusCode: 200,
      comments,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Errore interno del server",
    });
  }
});

comment.post("/comment/create", async (req, res) => {
  const newComment = new commentModel({
    comments: req.body.comments,
  });
  try {
    const comment = await newComment.save();

    res.status(201).send({
      statusCode: 201,
      message: "Comment save succesfully",
      payload: comment,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Errore interno del server",
      error,
    });
  }
});

comment.patch("/comment/update/:commentId", async (req, res) => {
  const { commentId } = req.params;
  const commentExist = await commentModel.findById(commentId);
  if (!commentExist) {
    return res.status(404).send({
      statusCode: 404,
      message: "Questo commento non esiste",
    });
  }
  try {
    const commentToUpdate = req.body;
    const optionComment = { new: true };
    const result = await commentModel.findByIdAndUpdate(
      commentId,
      commentToUpdate,
      optionComment
    );
    res.status(200).send({
      statusCode: 200,
      message: "commento modificato con successo",
      result,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Errore interno del server",
    });
  }
});

comment.delete("/comment/delete/:commentId", async (req, res) => {
  const { commentId } = req.params;

  try {
    const comment = await commentModel.findByIdAndDelete(commentId);
    if (!comment) {
      return res.status(404).send({
        statusCode: 404,
        message: "Commento già eliminato",
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

module.exports = comment;
