import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

/**Use qs parser to support nested objects, more information in http://expressjs.com/pt-br/api.html#express.urlencoded */
app.use(express.urlencoded({extended: true}));
/**Express built-in body parser */
app.use(express.json());

/**Routes */

/**Check if server is up*/
app.get('/ping', (_req, res) => res.status(200).json({message: "pong"}));

/**Error middleware */

export default app;