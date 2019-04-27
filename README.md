# nodejs-rest-api

A sample Rest API Using NodeJS, Restify, Mongoose, and Azure Cosmos DB

To Run in Development use:
\$npm run dev

To Run in Production use:
\$npm start

# Development URI's:

1. Register a User:
   post http://localhost:5000/register
   payload: {name,email,password}

2. Authenticate User:
   post http://localhost:5000/auth
   payload: {email,password}
   testdata: {"email" : "testuser@gmail.com", "password" : "P@ssword" }

3. Get a list of customers
   get http://localhost:5000/api/customers
   info: Add Token obtained from step 2 as an Authorization header

4. Get a customer by id
   get http://localhost:5000/api/customers/{id}
   info: Add Token obtained from step 2 as an Authorization header

5. Update a customer
   put http://localhost:5000/api/customers/{id}
   info: Add Token obtained from step 2 as an Authorization header

6. Delete a customer
   put http://localhost:5000/api/customers/{id}
   info: Add Token obtained from step 2 as an Authorization header

7. Add a customer
   post http://localhost:5000/api/customers
   payload: {name,email,balance}
   info: Add Token obtained from step 2 as an Authorization header
