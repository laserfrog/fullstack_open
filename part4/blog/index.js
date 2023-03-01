const app = require('./app')



const PORT = 3003
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} at http://localhost:${PORT}`)
})