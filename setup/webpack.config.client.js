const path = require('path')
const webpack = require('webpack')
const CURRENT_WORKING_DIR = process.cwd()

const config = {
    name: "browser",
    mode: "development",
    devtool: 'eval-source-map', // specifies how source maps are generated
    entry: [
        'webpack-hot-middleware/client?reload=true',
        path.join(CURRENT_WORKING_DIR, 'client/main.js')
    ], // the entry file where Webpack starts bundling ie main js file in client folder
    output: {
        path: path.join(CURRENT_WORKING_DIR , '/dist'),
        filename: 'bundle.js',
        publicPath: '/dist/' 
    }, // specifies the output path for the bundled code
    module: { // sets the regex rule for the file extension to be used for transpilation
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader'] // transpilation tool
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // enables hot module replacement for react-hot-loader
        new webpack.NoEmitOnErrorsPlugin() // allows skipping emitting when there are compile errors
    ],
    resolve: {
        alias: { // points react-dom references to the @hot-loader/react-dom
            'react-dom': '@hot-loader/react-dom'
        }
    }
}

module.exports = config

// source map provides a way of mapping code within a compressed file back to its original position in a source file to aid debugging