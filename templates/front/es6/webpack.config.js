var path = require("path");
var webpack = require("webpack");

module.exports = function(env) {

	var pack = require("./package.json");
	var MiniCssExtractPlugin = require("mini-css-extract-plugin");

	var production = !!(env && env.production === "true");
	var asmodule = !!(env && env.module === "true");

	var babelSettings = {
		extends: path.join(__dirname, '/.babelrc')
	};

	var config = {
		mode: production ? "production" : "development",
		entry: {
			app: "./sources/app.js"
		},
		output: {
			path: path.join(__dirname, "codebase"),
			publicPath:"/codebase/",
			filename: "[name].js",
			library: "{{appStrictID}}",
			libraryTarget : "umd"
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					use: "babel-loader?" + JSON.stringify(babelSettings)
				},
				{
					test: /\.(svg|png|jpg|gif)$/,
					use: "url-loader?limit=25000"
				},
				{{#if handlebars}}
				{
					test: /\.(handlebars)$/,
					use: "handlebars-loader"
				},
				{{/if}}
				{{#if less}}
				{
					test: /\.less$/,
					use: [ MiniCssExtractPlugin.loader, "css-loader", "less-loader" ]
				}
				{{else}}
				{{#if sass}}
				{
					test: /\.scss$/,
					use: [ MiniCssExtractPlugin.loader, "css-loader", "sass-loader" ]
				}
				{{else}}
				{
					test: /\.(css)$/,
					use: [ MiniCssExtractPlugin.loader, "css-loader" ]
				}
				{{/if}}
				{{/if}}
			]
		},
		resolve: {
			extensions: [".js"],
			modules: ["./sources", "node_modules", "./codebase"],
			alias:{
				"jet-views":path.resolve(__dirname, "sources/views"),
				"jet-locales":path.resolve(__dirname, "sources/locales")
			}
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename:"[name].css"
			}),
			new webpack.DefinePlugin({
				VERSION: `"${pack.version}"`,
				APPNAME: `"${pack.name}"`,
				PRODUCTION : production
			})
		],
		devServer:{
			stats:"errors-only"
		}
	};

	if (!production){
		config.devtool = "inline-source-map";
	}

	if (asmodule){
		config.externals = config.externals || {};
		config.externals = [ "webix-jet" ];
	}

	return config;
}