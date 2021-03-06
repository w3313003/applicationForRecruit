var express = require("express");
var router = express.Router();
//  数据库
const DBdata = require("../model/index");
const Usermodels = DBdata.getModels("user");
const Chatmodels = DBdata.getModels("chat");
//  加密
const utility = require("utility");
const _fitler = { password: 0, __v: 0 };

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.get("/userStatus", (req, res, next) => {
  if (!req.session.userid) {
    return res.send({
      code: 1
    });
  }
  Usermodels.findById(req.session.userid, _fitler, (err, doc) => {
    if (err) {
      res.send({
        code: 1,
        msg: err
      });
    } else {
      res.send({
        code: 0,
        msg: "ok",
        data: doc
      });
    }
  });
});

router.get("/userInfo", (req, res, next) => {
  const { type } = req.query,
    userId = req.session.userid;
  Usermodels.find({ type }, _fitler, (err, doc) => {
    if (err) {
      return res.send(err);
    }
    return res.send({
      code: 0,
      data: doc
    });
  });
});

router.post("/login", (req, res, next) => {
  const { userName, password } = req.body;
  Usermodels.findOne(
    { userName, password: md5Psd(password) },
    _fitler,
    (err, doc) => {
      if (err) return;
      if (!doc) {
        return res.send({
          code: 1,
          msg: "用户名或密码啊不存在"
        });
      } else {
        req.session.userid = doc._id;
        return res.send({
          code: 0,
          msg: "登陆成功",
          data: doc
        });
      }
    }
  );
});

router.post("/register", (req, res, next) => {
  const { userName, password, cPassword, type } = req.body;
  Usermodels.findOne({ userName }, (err, doc) => {
    if (doc) {
      return res.json({
        code: 1,
        msg: "Duplicate username"
      });
      return;
    } else {
      const userModel = new Usermodels({
        userName,
        password: md5Psd(password),
        cPassword,
        type
      });
      userModel.save((e, d) => {
        if (e) {
          return res.json({ code: 1, msg: "error" });
        }
        const { userName, type, _id } = d;
        req.session.userid = _id;
        return res.json({
          code: 0,
          msg: "Register success!",
          data: { userName, type, _id }
        });
      });
    }
  });
});
router.post("/update", (req, res, next) => {
  const userid = req.session.userid;
  if (!userid) {
    return res.send({
      code: 1
    });
  }
  Usermodels.findByIdAndUpdate(userid, req.body, (err, doc) => {
    const data = Object.assign({}, req.body, {
      userName: doc.userName,
      type: doc.type
    });
    return res.send({
      code: 0,
      data
    });
  });
});
router.delete("/", (req, res, next) => {
  delete req.session.userid;
  return res.send({
    code: 0,
    msg: "退出成功"
  });
});

router.post("/getmsglist", (req, res, next) => {
  const userId = req.session.userid;
  const chatId = [userId, req.body.targetId].sort().join('_');
  console.log(chatId);
  Usermodels.find({_id: req.body.targetId}, (e, d) => {
    let users = {};
    d.forEach(v => {
      users[v._id] = {
        name: v.userName,
        avatar: v.avatar
      };
    });
    Chatmodels.find(
      // {
      //   $or: [{from: userId} , {to: userId}]
      // },
      {
        chatId:chatId
      },
      (err, doc) => {
        if (err) {
          return;
        }
        return res.send({
          code: 0,
          data: {
            chatList: doc,
            users
          }
        });
      }
    );
  });
});
router.get('/getMyChat', (req, res, next) => {
    const userId = req.session.userid;
    Chatmodels.find(
      {
        $or:[{from: userId},{to: userId}]
      },
      (err, doc) => {
        if(err) return;
        return res.send({
          code: 0,
          data: doc
        })
      }
    )
});
router.post('/readMsg', (req, res, next) => {
    const userId = req.session.userid,
        targetId = req.body.targetId,
      chatId = [userId, targetId].sort().join('_');
    Chatmodels.update(
    {chatId}, 
    {'$set': {isRead: true}}, 
    {'multi': true},
    (err, doc) => {
      if(err) {
        return res.send({
          code: 1,
          msg: '修改失败',
        })
      };
      return res.send({
        code: 0,
        data: doc.nModified
      })
    })
})
router.get('/getUnRead', (req, res, next) => {
    const userId = req.session.userid;
    Chatmodels.find({to: userId, isRead: false}, (err, doc) => {
        if(!err) {
          return res.send({
            code: 0,
            data: doc
          });
        }
    })
});
function md5Psd(password) {
  let salt = "sA.w%321sa1_%!?=^&@323!~";
  return utility.md5(utility.md5(password + salt));
}

module.exports = router;
