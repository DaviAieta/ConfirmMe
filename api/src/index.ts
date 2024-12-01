import express from 'express'
import eventosRoutes from './routes/eventos.routes'
import guestRoutes from './routes/guests.routes'
import cors from 'cors'

const app = express()
const port = 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/events', eventosRoutes)
app.use('/guests', guestRoutes)

app.listen(port, () => {
    console.log('Servidor rodando: http://localhost:5000')
})