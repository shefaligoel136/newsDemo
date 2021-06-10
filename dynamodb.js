// BASIC CRUD OPT.

const AWS = require("aws-sdk");
require("dotenv").config();

const monotonicFactory = require("ulid").monotonicFactory;
const ulid = monotonicFactory();

AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "newsDemoAPI";
const STATE_INDEX = "state-typeNews-index";
const CITY_INDEX = "city-typeNews-index";
const AUTHOR_INDEX = "author-typeNews-index";

// CREATE
const addNews = async (news) => {
  news.newsID = ulid();
  news.timeStamp = new Date().getTime();
  const params = {
    TableName: TABLE_NAME, 
    Item: news,
  };
  const newNews = await dynamoClient.put(params).promise();
  console.log(newNews);
  return newNews;
};

// READ - ALL
const getAllNews = async () => {
  const params = {
    TableName: TABLE_NAME,
    ScanIndexForward: true,
  };
  const news = await dynamoClient.scan(params).promise();
  console.log(news);
  return news;
};

// for LATEST NEWS -READ
const getNewsByCity = async (city) => {
  const params = {
    TableName: TABLE_NAME,
    IndexName: CITY_INDEX,
    KeyConditionExpression: "city = :city ",
    ExpressionAttributeValues: {
      ":city": city,
    },
    ScanIndexForward: false,
  };
  const cityWiseNews = await dynamoClient.query(params).promise();
  console.log(cityWiseNews);
  return cityWiseNews;
};

const getNewsByAuthor = async (author) => {
  const params = {
    TableName: TABLE_NAME,
    IndexName: AUTHOR_INDEX,
    KeyConditionExpression: "author = :author",
    ExpressionAttributeValues: {
      ":author": author,
    },
    ScanIndexForward: false,
  };
  const authorWiseNews = await dynamoClient.query(params).promise();
  console.log(authorWiseNews);
  return authorWiseNews;
};

const getNewsByState = async (state) => {
  const params = {
    TableName: TABLE_NAME,
    IndexName: STATE_INDEX,
    KeyConditionExpression: "state = :state",
    ExpressionAttributeValues: {
      ":state": state,
    },
    ScanIndexForward: false,
  };
  const stateWiseNews = await dynamoClient.query(params).promise();
  console.log(stateWiseNews);
  return stateWiseNews;
};

// FOR TRENDING NEWS - READ

const getNewsByStateHighlight = async (state) => {
  const params = {
    TableName: TABLE_NAME,
    IndexName: STATE_INDEX,
    KeyConditionExpression: "#state = :state",
    FilterExpression: 'highlight >= :val',
    ExpressionAttributeNames: {
      "#state": "state",
      
    },
    ExpressionAttributeValues: {
      ":state": state,
      ":val": 1
    },
    ScanIndexForward: false,
  };
  const stateWiseHighlight = await dynamoClient.query(params).promise();
  console.log(stateWiseHighlight);
  return stateWiseHighlight;
};

const getNewsByCityHighlight = async (city) => {
  const params = {
    TableName: TABLE_NAME,
    IndexName: CITY_INDEX,
    KeyConditionExpression: "city = :city",
    FilterExpression: 'highlight >= :val',
    ExpressionAttributeValues: {
      ":city": city,
      ":val": 1
    },
    ScanIndexForward: false,
  };
  const cityWiseHighlight = await dynamoClient.query(params).promise();
  console.log(cityWiseHighlight);
  return cityWiseHighlight;
};

const getNewsByAuthorHighlight = async (author) => {
  const params = {
    TableName: TABLE_NAME,
    IndexName: AUTHOR_INDEX,
    KeyConditionExpression: "author = :author",
    FilterExpression: 'highlight >= :val',
    ExpressionAttributeValues: {
      ":author": author,
      ":val": 1
    },
    ScanIndexForward: false,
  };
  const authorWiseHighlight = await dynamoClient.query(params).promise();
  console.log(authorWiseHighlight);
  return authorWiseHighlight;
};

// FOR TYPE NEWS - READ
const getNewsByStatetypeNews = async (state, typeNews) => {
  const params = {
    TableName: TABLE_NAME,
    IndexName: STATE_INDEX,
    KeyConditionExpression:
      "#state = :state  and begins_with(typeNews, :typeNews)",
    ExpressionAttributeNames: {
      "#state": "state",
    },
    ExpressionAttributeValues: {
      ":state": state,
      ":typeNews": typeNews,
    },
    ScanIndexForward: false,
  };
  const stateWiseTypeNews = await dynamoClient.query(params).promise();
  console.log(stateWiseTypeNews);
  return stateWiseTypeNews;
};

const getNewsByCitytypeNews = async (city, typeNews) => {
  const params = {
    TableName: TABLE_NAME,
    IndexName: CITY_INDEX,
    KeyConditionExpression:
      "city = :city  and begins_with(typeNews, :typeNews)",
    ExpressionAttributeValues: {
      ":city": city,
      ":typeNews": typeNews,
    },
    ScanIndexForward: false,
  };
  const cityWiseTypeNews = await dynamoClient.query(params).promise();
  console.log(cityWiseTypeNews);
  return cityWiseTypeNews;
};

const getNewsByAuthortypeNews = async (author, typeNews) => {
  const params = {
    TableName: TABLE_NAME,
    IndexName: AUTHOR_INDEX,
    KeyConditionExpression:
      "author = :author  and begins_with(typeNews, :typeNews)",
    ExpressionAttributeValues: {
      ":author": author,
      ":typeNews": typeNews,
    },
    ScanIndexForward: false,
  };
  console.log(author);
  const authorWiseTypeNews = await dynamoClient.query(params).promise();
  console.log(authorWiseTypeNews);
  return authorWiseTypeNews;
};

// UPDATE

const updateNewsTitle = async (newsID, title) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      newsID,
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

const updateNewsDescription = async (newsID, description) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      newsID,
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

const updatedNewsHighlight = async (newsID) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      newsID,
    },
    UpdateExpression: "SET highlight = highlight + :val",
    ExpressionAttributeValues: {
      ":val": 1
    },
  };
  const updatedNewsHighlight = await dynamoClient.update(params).promise();
  console.log(updatedNewsHighlight);
  return updatedNewsHighlight;
}

// DELETE
const deleteNews = async (newsID) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      newsID,
    },
  };
  return await dynamoClient.delete(params).promise();
};

module.exports = {
  dynamoClient,
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
};
