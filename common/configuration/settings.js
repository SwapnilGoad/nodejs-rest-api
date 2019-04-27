module.exports = {
  ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 5000,
  URL: process.env.BASE_URL || "http://localhost:5000",
  MONGODB_URI:
    process.env.MONGODB_URI ||
    "mongodb://swapnil-goad.documents.azure.com:10255/customer-api",
  COSMOSDB_USER: process.env.COSMOSDB_USER || 'swapnil-goad',
  COSMOSDB_PWD: process.env.COSMOSDB_PWD || '5x2Ux0kNqFb4mWOLaxAUUfE7vziQW2Ci9XOLO5ksZqDkpDkE5HlWJnVzB8faG0YjTqYXAsJfXWioKpdzae5Pyw=='
};
