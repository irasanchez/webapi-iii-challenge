const express = require("express");
const router = express.Router();
const db = require("./../data/helpers/postDb");

// get
// /api/posts
// get(): calling find returns a promise that resolves to an array of all the resources contained in the database.
router.get("/", async (req, res) => {
  try {
    res.status(200).json(req.body);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "There was an error while getting the posts."
    });
  }
});

// get
// /api/posts/:id
// getById(): takes an id as the argument and returns a promise that resolves to the resource with that id if found.
router.get("/:id", async (req, res) => {
  try {
    const post = await db.getById(req.params.id);
    if (post) {
      res.status(200).json(post);
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "The post information could not be retrieved." });
  }
});

// post
// /api/posts
// insert(): calling insert passing it a resource object will add it to the database and return the new resource.
router.post("/", async (req, res) => {
  try {
    const post = await db.insert(req.body);
    if (req.body.text && req.body.user_id) {
      res.status(201).json(post);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "There was an error while saving the post to the database"
    });
  }
});

// put
// /api/posts/:id
// update(): accepts two arguments, the first is the id of the resource to update and the second is an object with the changes to apply. It returns the count of updated records. If the count is 1 it means the record was updated correctly.
router.put("/:id", async (req, res) => {
  try {
    const post = await db.update(req.params.id, req.body);
    if (req.body.text && req.body.id) {
      res.status(200).json(req.body);
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "The post information could not be modified" });
  }
});

// delete
// /api/posts/:id
// remove(): the remove method accepts an id as its first parameter and, upon successfully deleting the resource from the database, returns the number of records deleted.
router.delete("/:id", async (req, res) => {
  console.log(req);
  try {
    const postId = req.params.id;
    const content = await db.getById(postId);
    const post = await db.remove(postId);

    if (post > 0) {
      res
        .status(200)
        .json({ message: "This post has been successfully deleted" });
    }
  } catch (error) {
    console.log(req.params);
    res.status(404).json({ error: "The post could not be deleted." });
  }
});

module.exports = router;
