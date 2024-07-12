const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')

let app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
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




app.get('/', (req, res)=>{
    res.render('home')
})

app.post('/saveClient', (req, res)=>{
    let name = req.body.name
    let email = req.body.email
    let age = req.body.age

    let value = [[name, email, age]]
    let sql = "insert into ejs(name, email, age) values ?"

    db.query(sql, [value], (err, result)=>{
        if(err) throw err
        else{
            res.send("data submited")
        }
    })
    
})

app.get('/data', (req, res)=>{
    res.render('ClientData')
})

app.listen(3000, ()=>{
    console.log("server is running... ")
})