# fetch-timeout.js
一个真正支持timeout的fetch
详细了解fetch 用法请参考mdn https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch

# fetch-timeout基于浏览器原生fetch进行包装。主要修改如下

1.增加timeout超时参数
```
fetch(url, {
    timeout: 5000
})
```
2.增加dataType数据响应类型

```
fetch(url, {
    dataType: 'json'
})
```
3.舍弃原生fetch处理返回数据格式操作，fetch-timeout内部通过dataType参数自动处理
```
fetchTimeout(url, {
    dataType: 'json'
})
// .then(response => response.json())   // 不需要这个处理
.then(data => {
    
})
```
4.不在需要考虑reject，接口请求成功会resolve，如http状态码500、404或者其它错误码，以及接口请求超时timeout，统一走catch

## GET 请求
```
fetchTimeout(url, {
    timeout: 5000
})
.then(data => {
    // 请求成功
})
.catch(error => {
    // 请求异常或超时
})
```

## POST 请求
```
fetchTimeout(url, {
    method: 'POST',
    body: '',
    dataType: 'json',
    timeout: 5000
})
.then(htmlStr => {
    // 请求成功
})
.catch(error => {
    // 请求异常或超时
})
```