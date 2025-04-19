import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import helmet from 'helmet';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import recipeRoutes from './routes/recipeRoutes';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import http from 'http';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(morgan('tiny',{stream: fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'})}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, maxAge: 3600000,secure:false, sameSite: 'lax' } 
}));



app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,              
}));


app.use('/uploads', express.static(path.join(__dirname+'./uploads/')));
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);



// app.use(bodyParser.json());
app.use(express.json());
const server = http.createServer(app);

app.get('/', (req, res) => {
  res.send('API is running...');
}
);


mongoose.connect(process.env.MONGO_URI || '')
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('Mongo Error:', err));
