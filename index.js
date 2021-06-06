const express = require("express");
const app = express();
// app.use(express.json);
const {
  addNews,
  getAllNews,
  getNewsByAuthor,
  getNewsByCity,
  getNewsByCityAuthor,
  updateNewsDescription,
  updateNewsTitle,
  deleteNews,
} = require("./dynamodb");

app.use(express.json());


// READ
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/news", async (req, res) => {
  try {
    const allNews = await getAllNews();
    res.json(allNews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: "Something went wrong" });
  }
});

app.get("/newsCity/:city", async (req, res) => {
    console.log("city", req.params);
    const { city } = req.params;
    try {
      const newsByCity = await getNewsByCity(city);
      res.json(newsByCity);
    } catch (error) {
      console.error(error);
      res.status(500).json({ err: "Something went wrong" });
    }
  });

app.get("/newsAuthor/:author", async (req, res) => {
    const {author} = req.params
    try {
      const newsByAuthor = await getNewsByAuthor(author);
      res.json(newsByAuthor);
    } catch (error) {
      console.error(error);
      res.status(500).json({ err: "Something went wrong" });
    }
  });

  app.get("/newsCityAuthor/:city/:author", async (req, res) => {
    
    try {
      const newsCityAuthor = await getNewsByCityAuthor(req.params.city,req.params.author);
      res.json(newsCityAuthor);
    } catch (error) {
      console.error(error);
      res.status(500).json({ err: "Something went wrong" });
    }
  });


//   UPDATE
  app.put("/newsUpdateTitle/:id/:title", async (req, res) => {
    
    try {
      const newsUpdate = await updateNewsTitle(req.params.id,req.params.title);
      res.json(newsUpdate);
    } catch (error) {
      console.error(error);
      res.status(500).json({ err: "Something went wrong" });
    }
  });

  app.put("/newsUpdateDescription/:id/:description", async (req, res) => {
    
    try {
      const newsUpdate = await updateNewsDescription(req.params.id,req.params.description);
      res.json(newsUpdate);
    } catch (error) {
      console.error(error);
      res.status(500).json({ err: "Something went wrong" });
    }
  });

//   DELETE
  app.delete("/newsDelete/:id", async (req, res) => {
    
    try {
      const newsUpdate = await deleteNews(req.params.id);
      res.json(newsUpdate);
    } catch (error) {
      console.error(error);
      res.status(500).json({ err: "Something went wrong" });
    }
  });


const port = process.env.PORT || 8800;

app.listen(port, () => {
  console.log(`Running on port - ${port}`);
});
