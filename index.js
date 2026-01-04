import express from 'express';
import connect from './db/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/users.js';
import ticketRoutes from './routes/tickets.js';
import { inngest } from "./inngest/client.js";
import { onSignup } from "./inngest/functions/on-signup.js";
import { onTicketCreated } from "./inngest/functions/on-ticket-create.js";
import { serve } from "inngest/express";
import cookieParser from 'cookie-parser';


dotenv.config();
// const PORT =  3000;

const app = express();


app.use(cors({
  // allows the origin to access the backend resources
  // origin:'http://localhost:5173',
  origin: process.env.ORIGIN,
  
  // allows the credentials to come from the origin 
  credentials:true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use("/api/auth", userRoutes)
app.use("/api/tickets", ticketRoutes)


app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions: [onSignup, onTicketCreated],
  })
);



app.get('/', (req, res) => {
  res.send('server is running');
});


app.listen(3000, () => {
   console.log(`Server is running on port 3000`);
   connect();
});
