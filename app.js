import express from 'express'
import connectDB from './DB/connection.js'
import * as indexRouter from './routes/index.route.js'
const app = express()
const port = 3000
const baseUrl='/api/v1'
app.use(express.json())
//app.use(`${baseUrl}/uploads` , express.static('./uploads'))
app.use(`${baseUrl}/auth`, indexRouter.authRouter)
app.use(`${baseUrl}/user`, indexRouter.userRouter)
app.use(`${baseUrl}/blog`, indexRouter.BlogRouter)


app.use('*', (req, res) => res.send('In-valid Routing'))
connectDB()
app.listen(port, () => console.log(`Example app listening on port ${port}!`))