// BASIC CRUD OPT.

const AWS = require("aws-sdk");
require("dotenv").config();

AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "newsDemoAPI";
const INDEX_NAME_1 = "city-author-index";
const INDEX_NAME_2 = "author-index";

// CREATE
const addNews = async (news) => {
    const params = {
      TableName: TABLE_NAME,
      Item: news,
    };
    const newNews = await dynamoClient.put(params).promise();
    console.log(newNews);
    return newNews;
  };

// READ
const getAllNews = async () => {
  const params = {
    TableName: TABLE_NAME,
  };
  const news = await dynamoClient.scan(params).promise();
  console.log(news);
  return news;
};

const getNewsByCity = async (city) => {
  const params = {
    TableName: TABLE_NAME,
    IndexName: INDEX_NAME_1,
    KeyConditionExpression: "city = :city ",
    ExpressionAttributeValues: {
      ":city": city,
    },
  };
  const cityWiseNews = await dynamoClient.query(params).promise();
  console.log(cityWiseNews);
  return cityWiseNews;
};

const getNewsByCityAuthor = async (city, author) => {
  const params = {
    TableName: TABLE_NAME,
    IndexName: INDEX_NAME_1,
    KeyConditionExpression: "city = :city and author = :author",
    ExpressionAttributeValues: {
      ":city": city,
      ":author": author,
    },
  };
  const cityWiseNews = await dynamoClient.query(params).promise();
  console.log(cityWiseNews);
  return cityWiseNews;
};

const getNewsByAuthor = async (author) => {
    const params = {
      TableName: TABLE_NAME,
      IndexName: INDEX_NAME_2,
      KeyConditionExpression: "author = :author",
      ExpressionAttributeValues: {
        ":author": author,
      },
    };
    const authorWiseNews = await dynamoClient.query(params).promise();
    console.log(authorWiseNews);
    return authorWiseNews;
  };

// UPDATE

const updateNewsTitle = async (id,title) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
        id,
    },
    UpdateExpression: "SET title = :title",
    ExpressionAttributeValues: {
      ":title": title,
    },
  };
  const updatedNewsTitle = await dynamoClient.update(params).promise();
  console.log(updatedNewsTitle);
  return updatedNewsTitle;
};

const updateNewsDescription = async (id,description) => {
    const params = {
      TableName: TABLE_NAME,
      Key: {
          id,
      },
      UpdateExpression: "SET description = :description",
      ExpressionAttributeValues: {
        ":description": description,
      },
    };
    const updateNewsDescription = await dynamoClient.update(params).promise();
    console.log(updateNewsDescription);
    return updateNewsDescription;
  };


// DELETE
const deleteNews = async (id) => {
    const params = {
      TableName: TABLE_NAME,
      Key: {
          id,
      },
    }
    return await dynamoClient.delete(params).promise();  
};



module.exports = {
    dynamoClient,
    addNews,
    getAllNews,
    getNewsByAuthor,
    getNewsByCity,
    getNewsByCityAuthor,
    updateNewsDescription,
    updateNewsTitle,
    deleteNews
}