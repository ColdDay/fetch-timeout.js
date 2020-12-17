# fetch-timeout.js
# 一个真正支持timeout的fetch，超时直接把请求cancel

详细了解fetch 用法请参考 MDN https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch

## fetch-timeout基于浏览器原生fetch进行包装。主要修改如下2点

1.增加timeout超时参数
```
fetchTimeout(url, {
    timeout: 5000
})
```
2.增加dataType数据响应类型，舍弃原生fetch处理返回数据格式操作，fetch-timeout内部通过dataType参数自动处理

```
fetchTimeout(url, {
    dataType: 'json'
})
// .then(response => response.json())   // 不需要这个处理
.then(data => {
    
})
```
3.原生fetch在http状态码404或者500的情况下仍然会resolve，fetch-timeout做了小的变更，错误状态码或者请求超时，统一走catch

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

