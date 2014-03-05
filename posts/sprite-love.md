{
"title" : "On accepting privilege",
"date": "2013-11-16",
"tag": "aa"
}

JavaScript 示例：

```
function fdddib(n) {
  var a = 1, b = 1;
  var tmp;
  while (--n >= 0) {
    tmp = a;
    a += b;
    b = tmp;
  }
  return a;
}
```