const ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
    entry: './src/index.jsx',

    output: {
        filename: 'bundle.js',
        path: './public',
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'react-hot-loader!babel-loader',
            },
            {
                test: /\.scss$/, 
                // loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'postcss-loader', 'sass-loader' ), // для сборки: вытаскивает css в отдельный файл

                loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader' ] // для разработки
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                //     options: {
                //     limit: 8192
                //     }
                // }
                // ]
            }
        ]
    },
    
    plugins: [
        new ExtractTextPlugin('style.css')
    ],
    devServer: {
        
        proxy: {
            '/api' : 'http://localhost/www/testEpicenter/handler.php' // прокси сервер для бэкэнда
        }
    },


    devtool: 'source-map',
    
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
};