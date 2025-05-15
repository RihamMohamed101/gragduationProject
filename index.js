
import express from 'express'
import { dbConnection } from './databases/dbConnection.js'

import { bootstrab } from './src/modules/bootstrab.js'
import { AppError } from './src/utils/appError.js'
import { globalError } from './src/middleware/globalError.js'
import cors from "cors"
import 'dotenv/config'

const app = express()
const port = process.env.PORT || 3000

app.use(cors({
    origin: 'https://gragduation-project.vercel.app',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'token']
  }));
  
app.options('*', cors());
  
app.use(express.json())
app.use(express.static('uploads'))
bootstrab(app)


app.use('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 409))
})

app.use(globalError)



// import cron from 'node-cron';

// cron.schedule('*/5 * * * *', () => {
//   console.log('أنا بتنفذ كل 5 دقايق 🕔');
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


