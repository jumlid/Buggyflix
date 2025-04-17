const express = require('express')
const cors = require('cors')
const port = 8000
const fs = require('fs')
const a = express()

a.use(cors())
a.use(express.json())
//let data = JSON.parse(fs.readFileSync('./data.json', 'utf8'))
let users;
let check;
a.get('/users', (req, res) => {



    res.json(users)
    return res.json({ "status": "success" })
})
users = fs.readFileSync('./users.json', 'utf8')

a.post('/already', (req, res) => {

    console.log('check')
    check = JSON.parse(users)
    if (req.body.name in check) {
        console.log('name', req.body.name, "exist")
        console.log(typeof (req.body.password))
        console.log(check)
        console.log(typeof (check[req.body.name].password))
        // console.log(check[req.body.name].password === req.body.password)

        if (check[req.body.name].password === req.body.password) {
            console.log('password matched')
            res.status(500)

        }
        if (check[req.body.name].password != req.body.password) {
            console.log('password not matched')
            res.status(501)

        }



    }
    if (!req.body.name in check) {
        res.status(200)

    }

    return res.json({ "status": "work" })
})

a.post('/users', (req, res) => {
    console.log('store')
    users = JSON.parse(users)
    users[req.body.name] = { "password": req.body.password }
    users = JSON.stringify(users)
    console.log(typeof (users))
    fs.writeFileSync('./users.json', users)




    return res.json({ "status": "success" })
})




/*

a.get('/movie', (req, res) => {
    return res.json(data)
})
a.post('/movie', (req, res) => {
    let api = `https://api.themoviedb.org/3`
    switch (req.body.method) {
        case "search":
            query = req.body.others
            api = api + req.body.subfix + `${query}` + `&api_key=${apikey}`
            console.log(api)
            console.log('search')
            start()
            break;
        case "getfromid":
            subfix = req.body.subfix
            console.log('getfromid')
            break;
        case "get_page":
            subfix = req.body.subfix
            console.log('get_page')
            break;
        case "trending":
            api = api + req.body.subfix + `&api_key=${apikey}`
            console.log(api)
            console.log('trending')
            start()


        default:
            console.log(404)
            break;
    }
    let data = {}
    function start() {

        fetch(api)
            .then(data => data.json())
            .then(d => {
                let i
                for (i = 1; i != d.results.length; i++) {
                    data[d.results[i].original_title] = d.results[i]
                    console.log(i)


                    //   JSON.parse(data)

                }
                if (i => 19) {
                    console.log("wa")
                    data = JSON.stringify(data)
                    console.log(data)
                    fs.writeFileSync('./data.', data)


                }
                //  console.log(data.length)

                //  data = JSON.stringify(data)

                //    fs.writeFileSync('./data.json', data)





            })
        //  


    }





    res.sendStatus(200)

})
*/


a.listen(port, () => {
    console.log('server started at ', port)
})