const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
module.exports = {
    mode: 'development',            //此行表示我们webpack打包环境是开发环境
    optimization: {        //添加抽离公共代码插件的配置
        splitChunks: {
            cacheGroups: {
                //打包公共模块
                commons: {
                    chunks: 'initial', //initial表示提取入口文件的公共部分
                    minChunks: 2, //表示提取公共部分最少的文件数
                    minSize: 0, //表示提取公共部分最小的大小
                    name: 'commons' //提取出来的文件命名
                }
            }
        },
    },
    entry: './src/index.js',        //项目的入口文件，是我们新建的index.js文件，它的路径是相对于项目根路径的，所以此处我们写的是“./src”，而不是“../src”
    output: {                       //配置输出信息
        filename: 'bundle.js',      //打包输出的文件名称，这里是一个写死的名称，后期可以改成按一定规则动态生成
        path: path.resolve(__dirname, '../dist')     //输出的路径，这里的路径针对的是当前目录，所以我们写成了"../dist"，而不是"./dist"
    },
    devServer:{
        open:true,
        hot: true,// 开启热更新HMR，只能跟新css。js和图片需要手动更新

    },
    plugins: [                             //然后新建一个plugins属性来实例化这个依赖插件
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            chunkFilename: '[id].[contenthash].css'
        }),
        new HtmlWebpackPlugin({             //实例化Html模板模块
            template: path.resolve(__dirname, '../index.html')
        }),
        new ESLintWebpackPlugin({
            exclude:'node_modules',
            context: path.resolve(__dirname, '../src'),
            extensions: ['js','jsx','ts','tsx'],
            emitError: true,
            emitWarning: true,
            failOnWarning:true
        })
    ],
    module: {       //通过module属性配置babel-loader
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react']
                        }
                    }
                ],
                include: path.join(__dirname, '../src')
            },
            {                                             //最后添加这个依赖插件的配置信息
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    'css-loader',
                ]
            },
            {                                                 //此处再添加一条rules，用于配置css预处理器信息
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader'
                    }, {
                        loader: 'css-loader'
                    }, {
                        loader: 'less-loader'
                    }
                ]
            },
            {                                       //配置多媒体资源的打包信息
                test: /\.(mp4|webm|ogg|mp3|wav)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'media/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
            {                                       //配置图片静态资源的打包信息
                test: /\.(jpg|png|jpeg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'img/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            pages: path.join(__dirname, '../src/pages'),
            components: path.join(__dirname, '../src/components'),
            actions: path.join(__dirname, '../src/redux/actions'),
            reducers: path.join(__dirname, '../src/redux/reducers'),
            images: path.join(__dirname, '../src/images')
        }
    },
};