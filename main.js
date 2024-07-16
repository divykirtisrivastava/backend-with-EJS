const express = require('express')
const mysql = require('mysql')
const multer = require('multer')
const path = require('path')
const bodyParser = require('body-parser')

let app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.static('assets'))
app.use(express.static('uploads'))
app.use(bodyParser.urlencoded({extended: true}))


// database connection
let db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"1234",
    database:"user"
})
db.connect((err)=>{
    if(err) throw err
    else{
        console.log("database connected")
    }
})


// multer setup

let storage = multer.diskStorage({
    destination: './uploads',
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

let upload  =  multer({storage: storage})



app.get('/', (req, res)=>{
    res.render('home')
})

app.post('/', upload.single('image'), (req, res)=>{
    let name = req.body.name
    let email = req.body.email
    let age = req.body.age
    let image = req.file.filename

    let value = [[name, email, age, image]]
    let sql = "insert into ejs(name, email, age, image) values ?"

    db.query(sql, [value], (err, result)=>{
        if(err) throw err
        else{
            res.redirect("/clientdata")
        }
    })
    
})


app.get('/clientdata', (req, res)=>{

    let sql = 'select * from ejs'

    db.query(sql, (err, result)=>{
        if(err) throw err
        else{
            console.log(result)
            res.render('ClientData', {data: result})
        }
    })
})

app.listen(3000, ()=>{
    console.log("server is running... ")
})