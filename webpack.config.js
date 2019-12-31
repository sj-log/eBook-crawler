var webpack = require(`webpack`)

module : {
    loaders: [
        {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['stage-0', 'es2015', 'react']
            }
        }
    ]
}