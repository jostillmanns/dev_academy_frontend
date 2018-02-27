const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
	filename: 'vue-todo.js',
    },
    module: {
	rules: [
	    {
		test: /\.vue$/,
		loader: 'vue-loader',
	    },
	    {
		test: /\.js$/,
		loader: 'babel-loader',
	    },
	],
    },
    devServer: {
	hot: true,
	host: '127.0.0.1',
	port: 8081,
    },
    plugins: [
	new webpack.HotModuleReplacementPlugin(),
    ],
}
