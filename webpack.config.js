const path = require('path');

module.exports = env => {
    return {
        mode: env,
        entry: './src/app.js',
        output: {
            path: path.resolve(__dirname, 'public'),
            filename: './js/bundle.js',
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                cacheDirectory: true,
                            },
                        },
                    ],
                },
            ],
        }
    }
}