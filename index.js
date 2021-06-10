const express = require("express");
const app = express();
// app.use(express.json);
const {
  addNews,
  getAllNews,
  getNewsByAuthor,
  getNewsByCity,
  getNewsByState,
  getNewsByStatetypeNews,
  getNewsByCitytypeNews,
  getNewsByAuthortypeNews,
  getNewsByStateHighlight,
  getNewsByCityHighlight,
  getNewsByAuthorHighlight,
  updateNewsDescription,
  updateNewsTitle,
  updatedNewsHighlight,
  deleteNews,
} = require("./dynamodb");

app.use(express.json());

//CREATE
app.post('/addNews',async(req,res) => {
  const news = req.body;
  try{
    const add = await addNews(news);
    res.json(add);
  }catch(error){
    console.error(error);
    res.status(500).json({ err: "Something went wrong" });
  }
})

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
  const { author } = req.params;
  try {
    const newsByAuthor = await getNewsByAuthor(author);
    res.json(newsByAuthor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: "Something went wrong" });
  }
});

app.get("/newsState/:state", async (req, res) => {
  const { state } = req.params;
  try {
    const newsByState = await getNewsByState(state);
    res.json(newsByState);
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: "Something went wrong" });
  }
});

app.get("/newsStateType/:state/:typeNews", async (req, res) => {
  try {
    const newsByState = await getNewsByStatetypeNews(
      req.params.state,
      req.params.typeNews
    );
    res.json(newsByState);
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: "Something went wrong" });
  }
});

app.get("/newsCityType/:city/:typeNews", async (req, res) => {
  try {
    const newsByCity = await getNewsByCitytypeNews(
      req.params.city,
      req.params.typeNews
    );
    res.json(newsByCity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: "Something went wrong" });
  }
});

app.get("/newsAuthorType/:author/:typeNews", async (req, res) => {
  try {
    const newsByAuthor = await getNewsByAuthortypeNews(
      req.params.author,
      req.params.typeNews
    );
    res.json(newsByAuthor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: "Something went wrong" });
  }
});

app.get("/newsCityHighlight/:city", async (req, res) => {
  const { city } = req.params;
  try {
    const newsByCity = await getNewsByCityHighlight(city);
    res.json(newsByCity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: "Something went wrong" });
  }
});

app.get("/newsStateHighlight/:state", async (req, res) => {
  const { state } = req.params;
  try {
    const newsByState = await getNewsByStateHighlight(state);
    res.json(newsByState);
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: "Something went wrong" });
  }
});

app.get("/newsAuthorHighlight/:author", async (req, res) => {
  const { author } = req.params;
  try {
    const newsByAuthor = await getNewsByAuthorHighlight(author);
    res.json(newsByAuthor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: "Something went wrong" });
  }
});

//   UPDATE
app.put("/newsUpdateTitle/:newsID/:title", async (req, res) => {
  try {
    const newsUpdate = await updateNewsTitle(req.params.newsID, req.params.title);
    res.json(newsUpdate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: "Something went wrong" });
  }
});

app.put("/newsUpdateDescription/:newsID/:description", async (req, res) => {
  try {
    const newsUpdate = await updateNewsDescription(
      req.params.newsID,
      req.params.description
    );
    res.json(newsUpdate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: "Something went wrong" });
  }
});

app.put("/newsUpdateHighlight/:newsID", async (req, res) => {
  try {
    const newsUpdate = await updatedNewsHighlight(req.params.newsID);
    res.json(newsUpdate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: "Something went wrong" });
  }
});

//   DELETE
app.delete("/newsDelete/:newsID", async (req, res) => {
  try {
    const newsUpdate = await deleteNews(req.params.newsID);
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


// {
//   "author": "Shefali",
//   "city": "Kanpur",
//   "description": "Covid news",
//   "highlight": 0,
//   "newsID": "",
//   "reportReason": [
//       "NA"
//   ],
//   "state": "UP",
//   "timeStamp": "",
//   "title": "Elections",
//   "typeNews": "GEN"
// }