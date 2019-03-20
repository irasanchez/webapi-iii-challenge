const express = require("express");
const router = express.Router();
const db = require("./../data/helpers/userDb");

// get
// /api/users
// get(): calling find returns a promise that resolves to an array of all the resources contained in the database.
router.get("/", async (req, res) => {
  try {
    users = await db.get(req.query);
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "There was an error while getting the users."
    });
  }
});

// get
// /api/users/:id
// getById(): takes an id as the argument and returns a promise that resolves to the resource with that id if found.
router.get("/:id", async (req, res) => {
  try {
    const user = await db.getById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "The user information could not be retrieved." });
  }
});

// user
// /api/users
// insert(): calling insert passing it a resource object will add it to the database and return the new resource.
router.post("/", async (req, res) => {
  try {
    const user = await db.insert(req.body);
    if (req.body.name) {
      res.status(201).json(user);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "There was an error while saving the user to the database"
    });
  }
});

// put
// /api/users/:id
// update(): accepts two arguments, the first is the id of the resource to update and the second is an object with the changes to apply. It returns the count of updated records. If the count is 1 it means the record was updated correctly.
router.put("/:id", async (req, res) => {
  try {
    const user = await db.update(req.params.id, req.body);
    if (req.body.name) {
      res.status(200).json(req.body);
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "The user information could not be modified" });
  }
});

// delete
// /api/users/:id
// remove(): the remove method accepts an id as its first parameter and, upon successfully deleting the resource from the database, returns the number of records deleted.
router.delete("/:id", async (req, res) => {
  console.log(req);
  try {
    const userId = req.params.id;
    const content = await db.getById(userId);
    const user = await db.remove(userId);

    if (user > 0) {
      res
        .status(200)
        .json({ message: "This user has been successfully deleted" });
    }
  } catch (error) {
    res.status(404).json({ error: "The user could not be deleted." });
  }
});

// get
// /api/users/:id
//The userDb.js helper includes an extra method called getUserPosts() that when passed a user's id, returns a list of all the posts for the user.
router.get("/:id/posts", async (req, res) => {
  try {
    const userId = req.params.id;
    const userPosts = await db.getUserPosts(userId);

    if (userPosts) {
      res.status(200).json(userPosts);
    } else {
      res
        .status(404)
        .json({ message: "This user doesn't seem to have any posts." });
    }
  } catch (err0r) {
    res.status(404).json({ error: "The user's posts could not be found." });
  }
});

module.exports = router;
