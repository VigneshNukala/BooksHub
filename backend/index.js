const express = require('express')
const cors = require('cors');
const path = require('path')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const {open} = require('sqlite')
const sqlite3 = require('sqlite3')

const app = express()
app.use(express.json())
app.use(cors());

const dbPath = path.join(__dirname, 'books.db')

let db = null;


const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3001, () => {
      console.log(`Server Running at http://localhost:3001`)
    })
  } catch (e) {
    console.log(`DB Error ${e.message}`)
  }
}

initializeDBAndServer()

//register
app.post('/register/', async (req, res) => {
    const {username, password, name, gender} = req.body
    const checkUserQuery = `SELECT * FROM user WHERE username = '${username}';`
    const dbUser = await db.get(checkUserQuery)
  
    if (dbUser !== undefined) {
      res.status(400)
      res.json('User already exists')
    } else {
      if (password.length < 6) {
        res.status(400)
        res.json('Password is too short')
      } else {
        const hashedPassword = await bcrypt.hash(password, 10)
        // console.log(hashedPassword)
        const query1 = `INSERT INTO user (username,password,name,gender) VALUES('${username}','${hashedPassword}','${name}','${gender}');`
        await db.run(query1)
        res.status(200)
        res.json('User created successfully')
      }
    }
  })

  //login
app.post('/login/', async (req, res) => {
    console.log(req.body);
    const {username, password} = req.body
    const checkUserQuery = `SELECT * FROM user WHERE username = '${username}';`
    const dbUser = await db.get(checkUserQuery)
    // console.log(dbUser)
    if (dbUser === undefined) {
      res.status(400)
      res.json('Username or Password is Invalid')
    } else {
    //   console.log(password,dbUser.password);
      const isPasswordMatched = await bcrypt.compare(password, dbUser.password)
    //   console.log(isPasswordMatched);
      if (isPasswordMatched === true) {
        const payload = {
          username: username
        }
        const jwtToken = jwt.sign(payload, 'SECRET')
        res.json(jwtToken)
      } else {
        res.status(400)
        res.json('Username or Password is Invalid')
      }
    }
  })