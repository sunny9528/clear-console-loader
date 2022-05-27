# clear-console-loader

`clear-console-loader` is webpack loader, can clear `console` in files;

## options

| options | type      | default | desc                                        |
| ------- | --------- | ------- | ------------------------------------------- |
| ignore  | string[\] | []      | you need to be string or variable to ignore |

## example

```js
// webpack.config.js
{
 module: {
 rules: [
  test: /\.js(x?)$/,
  exclude: /node_modules/,
  use: [
  {
   loader: 'clear-console-loader',
   options: {
    ignore: ["err", "error"]
   }
  }]
 }
}
```

## issues

[issues](https://github.com/sunny1011111/clear-console-loader/issues)
