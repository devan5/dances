# dances

## 响应 AMD 模块的javascript库

### 核心构架

+ amd
+ dom
+ http
+ javascript
+ pattern
+ plguins

### amd
异步模块加载与定义. .amd 是 dances 核心. 

+ dances.add
+ dances.define
+ dances.require

### dom(bom)
和浏览器相关实现.

// 选择器
+ dances.hunt

// node 位置操作
+ dances.append .etc

// node UI
+ dances.css
+ dances.height
+ dances.weight
+ dances.offset

// 断言
+ dances.uAgent
+ dances.contains

// 事件
+ dances.evt
+ dances.eAdd
+ dances.eErase
+ dances.eOn
+ dances.eOff

// 其他
+ dances.addCss

### http
与数据发送相关的实现.

+ dances.cookie

+ dances.storage

// 引入 deferred 遵循 CommonJs Promises/A
+ dances.ajax
+ dances.get
+ dances.post
+ dances.jsonp

### javascript
专注于javascript 语言本身

+ dances.json

+ dances.trim

+ dances.stan
+ dances.extend
+ dances.merge
+ dances.copy


+ dances.random

+ dances.namespace
+ dances.type

### pattern
javascript 一定高度的模式集合封装.

+ dances.class

+ dances.queue

+ dances.effect

+ dances.subscribe