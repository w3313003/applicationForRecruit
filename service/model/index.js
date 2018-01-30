const express = require('express');

const mongo = require('mongoose');
const DB_URL = 'mongodb://127.0.0.1:27017/userDB';
mongo.connect(DB_URL);
mongo.connection.on('connected', () => {
    console.log('okkkkkkk')
})

const models = {
    user: {
        'userName': {
            'type': String,
            'require': true
        },
        'password': {
            'type': String,
            'require': true
        },
        'cPassword': {
            'type': String,
            'require': true
        },
        'type': {
            'type': String,
            'require': true
        },
        'avatar': {
            'type': String
        },
        'description': {
            'type': String
        },
        //  意向职位
        'Intention': {
            'type': String
        },
        //  BOSS专享
        'company': {
            'type': String,
            'require': true
        },
        'salary': {
            'type': String
        }, 
        'requirement': {
            'type': String
        },
        'title': {
            'type': String
        }
    },
    chat: {
        'from': {
            'type': String,
            'require': true
        },
        'to': {
            'type': String,
            'require': true
        },
        'content': {
            'type': String,
            'require': true,
            'default': ''
        },
        'create_time': {
            'type': String          
        },
        'chatId': {
            'type': String,
            'require': true
        },
        'isRead': {
            'type': Boolean,
            'default': false
        }
    }
};
Object.entries(models).forEach(v => {
    mongo.model(v[0], new mongo.Schema(v[1]));
});


module.exports = {
    getModels(name) {
        return mongo.model(name);
    }
}
