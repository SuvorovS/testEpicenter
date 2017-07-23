const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const session = require('express-session');
const cors = require('cors');
const MongoStore = require('connect-mongo')(session);

const User = require('./models/user').User;

const server = express();

server.use(bodyParser.json());
// server.use( cors({ origin: "*" }) );

server.use(cookieParser());
server.use(session({
   secret : 'mmm',
   key : 'rrr',
   cookie : {
        'expires' : 1000 * 60 * 20      // время жизни куки на клиенте
   },
   store : new MongoStore({ 
        url: 'mongodb://localhost/Food',  //подключение к mongodb
        ttl : 2 * 24 * 60 *60 //время жизни сессии в базе (2 дня)
    })
}));

// ==============================================================================

server.get('/', (req, res)=>{
    console.log(req.body);
    res.send('connect') ;
});


//============запрос на login
server.post('/api/login', function (req, res) {
    
    console.log('\n\n------- ЗАПРОС на /api/login', new Date().getHours(), new Date().getMinutes(), new Date().getSeconds()); console.log('');
    if (req.session.user) {                             //в куки-сессии есть user
        console.log('user c id:', req.session.user);
        User.findOne({'_id': req.session.user}, (err, data)=>{
            if (err) throw err
            let responseData = {};
            responseData.userName = data.userName;
            responseData.foodStorage = data.foodStorage;
            responseData.created = data.created;
            responseData.bodyData = data.bodyData;
            res.send(responseData);
        });      
    }
    else if(req.body.data.userName && req.body.data.password){ // пришли логин и пароль
        console.log('логин есть, пароль есть - проверим по ним');
        User.findOne({userName: req.body.data.userName})
        .then(user => {
            if (user) {   // есть такой пользователь
                if (user.checkPassword(req.body.data.password)) {  //пароль проверен
                    console.log('user проверен');
                    req.session.user = user._id;
                    
                    let responseData = {};
                    responseData.userName = user.userName;
                    responseData.foodStorage = user.foodStorage;
                    responseData.created = user.created;
                    responseData.bodyData = user.bodyData;

                    console.log('\n\n responseData', responseData);

                    res.send(responseData)
                }
                else {
                    console.log('inkorect password');
                     res.send('inkorect password')
                }  //checkPassword
            }
            else {
                console.log('no such user');
                res.send('no such user')
            }
                           
        })
        .catch(err => {res.send(err)
        })
    }
    else {
        console.log('ответ: в сессии нет пользователя, дайте логин + пароль \n --- \n---');
        res.send('в сессии нет пользователя, дайте логин + пароль');
    }
});
//============ конец запроса на login

//============запрос на logout
server.post('/api/logout', function (req, res) {
    console.log('============== ЗАПРОС post на logout');   
    console.log(req.body.data);
    if(req.body.data === 'LOGOUT'){
        req.session.user = undefined;
        res.send('logout');
    }
});
//================конец запроса на logout ==================

//============запрос на регистрацию
server.post('/api/registration', function (req, res) {
    console.log('============== ЗАПРОС post на /api/registration');   
    console.log('==============', req.body);
    if(req.body.data.type === 'REGISTRATION'){
        User.findOne({userName: req.body.data.userName})
            .then(user => {
                if (user) {   // есть такой пользователь
                    console.log('====пользователь====', user.userName, 'занят');
                    res.send('логин занят')
                }
                else {
                    console.log('login свободен');
                    let newUser = new User({
                        userName :req.body.data.userName,
                        password : req.body.data.password
                    });
                    console.log('new User', newUser);
                    
                    newUser.save(function (err, new_User) {
                        if (err) console.log('!!! --- error ---!!!', err);
                        console.log('!!! --- save new user ---!!!');
                        // console.log(new_User);
                        req.session.user = newUser._id;
                        res.send(new_User)
                    })
                }
            })
            .catch(err => {res.send(err)
            })
    }
    else if(req.body.type === 'CHECK_BUSY_USER'){
        User.findOne({userName: req.body.data})
            .then(user => {
                if (user) {   // есть такой пользователь
                    console.log('====пользователь====', user.userName, 'занят');
                    res.send(true)
                }
                else { // логин свободен
                    console.log('login свободен');
                    res.send(false)
                }
            })
            .catch(err => {res.send(err)}
        )
        // res.send('логин занят');
    }
});

//============ конец запроса на регистрацию


//================ запрос на добавление данных об употребленной еды ==================
server.post('/api/addToUsedFood', function (req, res) {
    console.log('\n \n =========данные с клиента ======= \n\n', req.body);
    // тест работы API
    // console.log('\n\n', 'user-id', req.session.user);
    User.findByIdAndUpdate(req.session.user, { "foodStorage.usedFood" : req.body.usedFood}, (err, data)=>{
            if (err) {throw err};
            console.log('\n \n ================ запрос выполнен');
        }); 

    res.send(req.body);
});

//================ конец запроса на добавление данных об употребленной еды  ==================

//================ запрос на получение данных чата ==================
server.post('/api/getChatData', function (req, res) {
    console.log('\n \n =========данные с клиента ======= \n\n', req.body, '\n =========данные с клиента ======= \n\n');
    
    User.findOne({'_id' : req.session.user}, (err, data)=>{
            if (err) {throw err};
            console.log(data.chat);
            
            console.log('\n \n ================ запрос выполнен');

            // let users = data.map((item, index)=>{return {userName : item.userName, id : item._id}});
            res.send(data.chat);
        }); 

});

//================ конец на получение юзеров  ==================


server.listen(3005, ()=>{console.log('app:3005');});
