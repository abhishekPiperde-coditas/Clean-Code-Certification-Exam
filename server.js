require("dotenv").config();
const express = require("express");
const fetchNews = require("./fetchNews");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/news", async (req, res) => {
    const category = req.query.category || "general";
    try {
        const articles = await fetchNews(category);
        res.json(articles);
    } catch (error) {
        console.error('News fetch error:', error);
        res.status(500).json({ error: "Failed to fetch news" });
    }
});

app.get("/search", async (req, res) => {
    const query = req.query.query || "";
    const category = req.query.category || "general";
    try {
        const articles = await fetchNews(category, query);
        res.json(articles);
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ error: "Failed to search news" });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});