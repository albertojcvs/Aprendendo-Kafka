import express from 'express'

const app = express()

app.get('/', (request, response) => {
    response.send('Serve Two')
})

app.listen(3334, () => {
    console.log('Serve two is running');
})