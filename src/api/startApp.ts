import dotenv from 'dotenv';
import dbConnect from './dbConnect';
import app from './app';

dotenv.config();

const PORT = process.env.PORT || 3000;

/** Makes sure that the server only starts if mongoose is successfully connected */
dbConnect()
  .then(() => {
    app.listen(PORT, () => console.log(`Server started in ${PORT}!`));
  })
  .catch((error: any) => console.log(error));
