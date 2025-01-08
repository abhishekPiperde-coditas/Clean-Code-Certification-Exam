const axios = require("axios");

const fetchNews = async (category = "general", query = "") => {
  const apiKey = process.env.NEWS_API_KEY;
  const url = `https://newsapi.org/v2/top-headlines?category=${category}&q=${query}&apiKey=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status !== "ok") {
      throw new Error("Error fetching news data");
    }
    return response.data.articles.map((article) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      publishedAt: article.publishedAt,
      source: article.source.name,
    }));
  } catch (error) {
    throw new Error("Error fetching news: " + error.message);
  }
};

module.exports = fetchNews;
