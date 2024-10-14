const express = require('express')
const mongoose = require('mongoose')
const articleRouter = require('./routes/articles')
const app = express()
const methodOverride = require('method-override')
const Article = require('./models/article')

mongoose.connect('mongodb://localhost/blog')

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))


app.get('/', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc'})
    res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(4100)


//app.use for midleware, global middleware, path specific
//and for mounting routers 

//app.set for application level configuration such as
//configuring ejs as view engine

//router is a tool for modular routing, can define routes
//in a seperate file

//Can combine with app.use() to mount the router in app

//app.use() to prefix articleRouter routes with /articles