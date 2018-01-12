var path = require("path");
var webpack = require("webpack");

module.exports = function(env) {

	var pack = require("./package.json");
	var ExtractTextPlugin = require("extract-text-webpack-plugin");
	var production = !!(env && env.production === "true");
<% if (typescript === "No"){ %>
	var babelSettings = {
		extends: path.join(__dirname, '/.babelrc')
	};
	var loader= "babel-loader?" + JSON.stringify(babelSettings);
	var extensions = [".js"];
<% } else { %>
	var loader = "ts-loader";
	var extensions = [".ts", ".js"];
<% } %>

	var config = {
		entry: "./sources/myapp.${fileExt}",
		output: {
			path: path.join(__dirname, "codebase"),
			publicPath:"/codebase/",
			filename: "myapp.js"
		},
		devtool: "inline-source-map",
		module: {
			rules: [
				{
					loader,
					test:  /\.${fileExt}$/
				},
				{
					test: /\.(svg|png|jpg|gif)$/,
					loader: "url-loader?limit=25000"
				},
				{
					test: /\.(less|css)$/,
					loader: ExtractTextPlugin.extract("css-loader!less-loader")
				}
			]
		},
		resolve: {
			extensions,
			modules: ["./sources", "node_modules"],
			alias:{
				"jet-views":path.resolve(__dirname, "sources/views"),
				"jet-locales":path.resolve(__dirname, "sources/locales")
			}
		},
		devServer: {
			open: true,
			openPage: "index.html"
		},
		plugins: [
			new ExtractTextPlugin("./myapp.css"),
			new webpack.DefinePlugin({
				VERSION: '"'+pack.version+'"',
				APPNAME: '"'+pack.name+'"',
				PRODUCTION : production
			})
		]
	};

	if (production) {
		config.plugins.push(
			new  webpack.optimize.UglifyJsPlugin({
				test: /\.js$/
			})
		);
	}

	return config;
}