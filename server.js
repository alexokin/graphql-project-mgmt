const express = require("express");
const colors = require("colors");
const cors = require("cors");
const path = require("path");

require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./server/schema/schema");
const connectDB = require("./server/config/db");

const port = process.env.PORT || 5000;

const app = express();

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:5000', 'http://localhost:5000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}

// Connect to database
connectDB();



app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})


app.listen(port, console.log(`Server is running on port ${port}`));
