var express = require('express');
var router = express.Router();
const user = require('../model/index');
const Usermodels = user.getModels('user');4

const utility = require('utility');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/userStatus',(req, res, next) => {
  res.send({
    code: 1
  });
});

router.get('/list',(req, res, next) => {
  Usermodels.find({},(err, doc) => {
    return res.json(doc);
  })
});

router.post('/Info',(req, res, next) => {
  res.send({
    code: 1
  });
});

router.post('/login', (req, res, next) => {
    const { userName, password } = req.body;
    console.log(userName, md5Psd(password));
    Usermodels.findOne({userName, password: md5Psd(password)}, (err, doc) => {
      if(err) return ;
      if(!doc) {
        return res.send({
            code: 1,
            msg: '用户名或密码啊不存在'
        }) 
      } else {
        res.send({
          code: 0,
          msg: '登陆成功',
          data: doc
        })
      }
    })
})

router.post('/register', (req, res, next) => {
    const { userName, password, cPassword, type }  = req.body;
    console.log(userName); 
    Usermodels.findOne({ userName }, (err, doc) => {
      if (doc) {
          res.json({
            code: 1,
            msg: 'Duplicate username'
          });
          return;
      } else {
        Usermodels.create({ userName, password:  md5Psd(password), cPassword, type }, (e, d) => {
          if(e) {
            return res.json({code: 1, msg: 'error'});
          };
          res.json({
            code: 0, msg: 'Register success!'
          })
        });
      }
    })
})
function md5Psd(password) {
  // 加盐 salt
  let salt = 'sA.w%321sa1_%!?=^&@323!~';
  return utility.md5(utility.md5(password + salt));
}

module.exports = router;
