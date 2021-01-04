const path = require('path');

module.exports = env => {
    return {
        mode: env,
        watch: true,
        entry: './src/App.jsx',
        output: {
            path: path.resolve(__dirname, 'public'),
            filename: './js/main.js',
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                cacheDirectory: true,
                            },
                        },
                    ],
                }, {
                    test: /\.(ts)x?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'ts-loader'
                    },
                },
                {
                    // Preprocess your sass and scss files

                    test: /\.s[ac]ss$/i,
                    use: [
                        'style-loader',
                        'css-loader',
                        'sass-loader',
                    ],
                },
                {
                    // Preprocess your css files
                    test: /\.css$/,
                    exclude: /node_modules/,
                    use: [
                        'style-loader',
                        'css-loader'
                    ],
                }
            ],
        }
    }
}