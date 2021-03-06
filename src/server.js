import express from 'express';
import dotenv from 'dotenv';
import handlebars from 'express-handlebars';
import Routes from './routes';
import bodyParser from 'body-parser';
import fileupload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(bodyParser.json());
app.use(
  fileupload({
    useTempFiles: true
  })
);

app.engine('.hbs', handlebars({ defaultLayout: 'main', extname: '.hbs' }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));

Routes(app);

app.get('/', (req, res) =>
  res.status(200).json({
    message: 'Welcome'
  })
);

app.listen(port, _ => {
  console.log('App starting in development mode');
});

app.use((req, res) =>
  res.status(404).json({
    status: 404,
    error: `Route ${req.url} Not found`
  })
);
/*
app.use((error, req, res) =>
  res.status(500).json({
    status: 500,
    error
  })
);
 */

export { app };
