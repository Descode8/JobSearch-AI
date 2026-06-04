Axios Guide
===========

What is Axios?
--------------

Axios is a JavaScript library used to send HTTP requests from your client to a server API.

In React, Axios is commonly used to:
- Get data from a server
- Send form data to a server
- Update records
- Delete records
- Communicate with Express, Flask, Django, etc.

Example:
React client  --->  Axios request  --->  Express server/API


Install Axios
-------------

Run this inside your React client folder:

cd client
npm install axios


Import Axios
------------

Inside a React component, import Axios like this:

import axios from "axios";



Basic GET Request
-----------------

A GET request is used to retrieve data from a server.

Example:
```jsx
import axios from "axios";
import { useEffect, useState } from "react";

function FoodsList() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/foods")
      .then((response) => {
        setFoods(response.data);
      })
      .catch((error) => {
        console.error("Error fetching foods:", error);
      });
  }, []);

  return (
    <div>
      <h2>Foods</h2>

      {foods.map((food) => (
        <p key={food.id}>{food.name}</p>
      ))}
    </div>
  );
}

export default FoodsList;
```

What is happening?
------------------
```jsx
axios.get("http://localhost:5000/api/foods")

This sends a GET request to the server.

.then((response) => {
  setFoods(response.data);
})

{/* This runs if the request succeeds.
{/* response.data contains the data sent back from the server.
setFoods(response.data) stores the server data inside React state.

.catch((error) => {
  console.error("Error fetching foods:", error);
})

{/* This runs if the request fails.
```

Basic POST Request
------------------

A POST request is used to send new data to the server.

Example:
```jsx
import axios from "axios";
import { useState } from "react";

function AddFood() {
  const [foodName, setFoodName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/foods", {
        name: foodName
      });

      console.log("Food added:", response.data);
      setFoodName("");
    } catch (error) {
      console.error("Error adding food:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={foodName}
        onChange={(event) => setFoodName(event.target.value)}
        placeholder="Enter food name"
      />

      <button type="submit">Add Food</button>
    </form>
  );
}

export default AddFood;
```

Benefits of Axios
-----------------

1. Easier syntax than fetch

Axios:
```jsx
axios.get("http://localhost:5000/api/foods")

Fetch:

fetch("http://localhost:5000/api/foods")
  .then((response) => response.json())
```
Axios automatically converts JSON data for you.

2. Better error handling

Axios makes it easier to catch request errors.

Example:
```jsx
try {
  const response = await axios.get("http://localhost:5000/api/foods");
  console.log(response.data);
} catch (error) {
  console.error(error);
}
```

3. Good for React apps

Axios works well with:

- useEffect
- useState
- forms
- login systems
- server APIs


4. Can send GET, POST, PUT, PATCH, and DELETE requests

Examples:
```jsx
axios.get("/api/foods");

axios.post("/api/foods", {
  name: "Pizza"
});

axios.put("/api/foods/1", {
  name: "Updated Pizza"
});

axios.delete("/api/foods/1");
```

Common HTTP Request Types
-------------------------

GET:
Used to get data.

POST:
Used to create new data.

PUT:
Used to replace/update existing data.

PATCH:
Used to partially update existing data.

DELETE:
Used to delete data.


Axios with async and await
--------------------------

This is a common modern way to use Axios.

Example:
```jsx
import axios from "axios";
import { useEffect, useState } from "react";

function FoodsList() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const getFoods = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/foods");
        setFoods(response.data);
      } catch (error) {
        console.error("Error getting foods:", error);
      }
    };

    getFoods();
  }, []);

  return (
    <div>
      <h2>Foods</h2>

      {foods.map((food) => (
        <p key={food.id}>{food.name}</p>
      ))}
    </div>
  );
}

export default FoodsList;
```

Important Notes
---------------

If your React app is running on:

http://localhost:5173

And your Express server is running on:

http://localhost:5000

Then your Axios request may look like this:

axios.get("http://localhost:5000/api/foods");


React runs on one port.
Express runs on another port.
Axios connects them.


Common Error
------------

If you see a CORS error, your Express server may need CORS enabled.

Install CORS in the server:

cd server
npm install cors

Then in server/server.js:
```js
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/foods", (req, res) => {
  res.json([
    { id: 1, name: "Pizza" },
    { id: 2, name: "Burger" },
    { id: 3, name: "Tacos" }
  ]);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
```

Simple Full Example
-------------------

server:

cd server
node server.js

client:

cd client
npm run dev

Axios request in React:
```jsx
axios.get("http://localhost:5000/api/foods")
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
```

Summary
-------

Axios is used to send requests from your React client to your server server.

Use Axios when your React app needs to:
- Load data
- Submit forms
- Login users
- Register users
- Update data
- Delete data
- Talk to an Express, Flask, Django, or other server API