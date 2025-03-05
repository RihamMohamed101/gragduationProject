
import express from 'express'
const app = express()
const port = process.env.PORT || 3000
app.use(cors())
app.use(express.json())
app.use(express.static('uploads'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))