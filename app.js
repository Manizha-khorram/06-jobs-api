require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

const authRouter = require ('./routes/auth')
const ArtCollectiblesRouter = require ('./routes/ArtCollectibles')


app.use(express.json());
// extra packages
//connectDb

const connectDB = require('./db/connect')
const authenticateUser = require('./middleware/authentication')
//routes
app.use('/api/v1/auth' , authRouter)       //full path of api/v1
app.use('/api/v1/ArtCollectibles' ,authenticateUser , ArtCollectiblesRouter) // we put out authenticateUser before our routes so all our routes would be protected.

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');



app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
