// E:\djangoChannels-GameSite\gamesBox\ticTacToe\webpack.config.js
const path = require('path');

module.exports = {
    entry: './static/ticTacToe/js/main.js',  // Path to your main.js
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'static', 'ticTacToe', 'js'),  // Output path
    },
    mode: 'development',  // Set the build mode to 'development' or 'production'
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
        ],
    },
};
