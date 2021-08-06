import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from './../webpack.config.client.js'

// initialize Webpack to compile the client-side code when the server is run.

const compile = (app) => {
    if(process.env.NODE_ENV === "development") {
        const compiler = webpack(webpackConfig)
        const middleware = webpackMiddleware(compiler, {
            publicPath: webpackConfig.output.publicPath
        })
        app.use(middleware)
        app.use(webpackHotMiddleware(compiler))
    }
}

// compile method takes the Express app and configures it to use the Webpack middleware 
// to compile, bundle, and serve code, as well as enable hot reloading in development mode

export default {
    compile
}