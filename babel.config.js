const babelConfig = {
    presets: [                      //它的功能相当于是下面plugins的一个集合，即插件集。有了它我们不用在plugins中一个一个的配置插件了
        ["@babel/preset-env", {
            useBuiltIns: "entry",    //如果用了@babel/polyfill的话，配置这个属性可以将@babel/polyfill按需引入
            corejs: 2
        }], '@babel/preset-react'
    ],
    plugins: ['@babel/plugin-syntax-dynamic-import', ['@babel/plugin-transform-runtime']]
}
module.exports = babelConfig
