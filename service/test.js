function observer(value, cb) {
    Object.keys(value).forEach((key) => defineReactive(value, key, value[key] , cb))
}

function defineReactive (obj, key, val, cb) {
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: ()=>{
            /*....依赖收集等....*/
            /*Github:https://github.com/answershuto*/
        },
        set:newVal=> {
            cb();/*订阅者收到消息的回调*/
        }
    })
}

var obj = {
    name: 123
};
observer(obj, console.log('收到'));

obj.name= 999;
