const express = require("express");
const request = require("request-promise");

const app = express();
const PORT = process.env.PORT || 5000;

const apikey = "c5ae1bfa47fd575047c30439f3618a5b";
const baseurl = `http://api.scraperapi.com?api_key=${apikey}&autoparse=true`;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Amazon Scraper API");
});

//Get Product Details
app.get("/products/:productId", async (req, res) => {
  const { productId } = req.params;

  try {
    const response = await request(
      `${baseurl}&url=https://amazon.com/dp/${productId}`
    );

    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
