
const express = require('express') 
const app = express() 
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const morgan = require('morgan')
const path = require('node:path')
const dotenv = require('dotenv')
dotenv.config({ path: path.join(__dirname, '.env'), quiet: true })
const Novel = require('./models/Novel')
const connectToTheDataBase = require('./dp')

// Middleware
app.use(express.static('public')); //all static files are in the public folder
app.use(express.urlencoded({ extended: false })); // this will allow us to see the data being sent in the POST or PUT
app.use(methodOverride('_method'))
app.use(morgan('dev'))


app.get('/', (req, res) => {
    res.render('homepage.ejs')
})

app.get('/test', (req, res) => {
    res.json({ status: 'ok' })
})


app.get('/novelBook/addNovel', (req, res) => {
    res.redirect('/novels/new')
})




app.get('/novels/new', (req, res) => {
    res.render('create-novel.ejs')
})


app.post('/novels', async (req, res) => {
    req.body.gere = typeof req.body.gere === 'string' ? req.body.gere.split(',').map(genre => genre.trim()).filter(Boolean) : []

    const createdNovel = await Novel.create({
        name: req.body.name,
        description: req.body.description,
        poplishYear: req.body.poplishYear,
        gere: req.body.gere,
        image: req.body.image
    })

    res.redirect('/novels/')
})


app.get('/novels', async (req, res) => {
    const allNovels = await Novel.find().sort({ createdAt: -1 })
    res.render('novel-list.ejs', { novels: allNovels })
})


app.get('/novels/:novelId', async (req, res) => {
    const foundNovel = await Novel.findById(req.params.novelId)
    if(!foundNovel){
        return res.status(404).render('error.ejs', { message: 'Novel not found.' })
    }
    res.render('novel-details.ejs', { novel: foundNovel })
})


app.get('/novels/:novelId/edit', async (req, res) => {
    const foundNovel = await Novel.findById(req.params.novelId)
    if(!foundNovel){
        return res.status(404).render('error.ejs', { message: 'Novel not found.' })
    }
    res.render('edit-novel.ejs', { novel: foundNovel, errors: [] })
})


app.put('/novels/:novelId', async (req, res) => {
    req.body.gere = typeof req.body.gere === 'string' ? req.body.gere.split(',').map(genre => genre.trim()).filter(Boolean) : []
    res.locals.formView = 'edit-novel.ejs'
    res.locals.formData = { novel: { ...req.body, _id: req.params.novelId } }

    const updatedNovel = await Novel.findByIdAndUpdate(req.params.novelId, {
        name: req.body.name,
        description: req.body.description,
        poplishYear: req.body.poplishYear,
        gere: req.body.gere,
        image: req.body.image
    }, { returnDocument: 'after', runValidators: true }) 

    if(!updatedNovel){
        return res.status(404).render('error.ejs', { message: 'Novel not found.' })
    }
    res.redirect('/novels/' + updatedNovel._id)
})


app.delete('/novels/:novelId', async (req, res) => {
    const deletedNovel = await Novel.findByIdAndDelete(req.params.novelId)
    if(!deletedNovel){
        return res.status(404).render('error.ejs', { message: 'Novel not found.' })
    }
    res.redirect('/novels')
})


app.listen(3000,()=>{
    console.log("Listening on port " + 3000)
})