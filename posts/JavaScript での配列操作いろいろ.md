#[[JavaScript]]

## unique

```javascript
const ary = [2, 1, 3, 4, 3, 2, 5];

ary.filter((data, i, self) => self.indexOf(data) === i);
```

`filter()` で最初に見つかったものだけにする感じ。
