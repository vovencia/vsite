const ENV = process.env.NODE_ENV || 'development';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

function _path(...args) { args.unshift(__dirname); return path.normalize( path.join(...args) ); }

module.exports = {
	mode: 'development',
	entry: _path("source/index.tsx"),
	output: {
		filename: "app/[name].js",
		path: _path("docs/"),
		// publicPath: '/',
	},

	// Enable sourcemaps for debugging webpack's output.
	devtool: "source-map",

	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: [".ts", ".tsx", ".js", ".json"]
	},

	node: {
		dgram: 'empty',
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
		child_process: 'empty',
		__dirname : true,
	},

	module: {
		rules: [
			// All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
			{
				test: /\.tsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: "awesome-typescript-loader",
				options: {
					configFileName: _path('./tsconfig.json')
				}
			},

			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: [
							["babel-plugin-styled-components", {
								"displayName": true,
								"fileName": true
							}]
						]
					}
				}
			},

			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
			{
				enforce: "pre",
				test: /\.js$/,
				loader: "source-map-loader"
			},
			{
				test: /\.styl$/,
				use: [
				  'style-loader',
				  'css-loader',
				  {
					loader: 'stylus-loader',
					options: {
						import: _path('source', 'mixins', 'stylus.styl')
					},
				  },
				],
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
					},
				],
			},
			{
				test: /\.pug$/,
				use : [{
					loader: 'pug-loader'
				}]
			}
		]
	},

	plugins: [
		new CleanWebpackPlugin([_path('docs', 'app')]),
		// Generates an `index.html` file with the <script> injected.
		new HtmlWebpackPlugin({
			inject: 'body',
			template: _path( 'source', 'layout', 'default.pug'),
		}),
		// This is necessary to emit hot updates (currently CSS only):
		// new webpack.HotModuleReplacementPlugin(),
		// Watcher doesn't work well if you mistype casing in a path so we use
		// a plugin that prints an error when you attempt to do this.
		// See https://github.com/facebookincubator/create-react-app/issues/240
		new CaseSensitivePathsPlugin(),
		// Moment.js is an extremely popular library that bundles large locale files
		// by default due to how Webpack interprets its code. This is a practical
		// solution that requires the user to opt into importing specific locales.
		// https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
		// You can remove this if you don't use Moment.js:
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
	],

	// When importing a module whose path matches one of the following, just
	// assume a corresponding global variable exists and use that instead.
	// This is important because it allows us to avoid bundling all of our
	// dependencies, which allows browsers to cache those libraries between builds.
	// externals: {
	// 	"react": "React",
	// 	"react-dom": "ReactDOM"
	// },

	optimization: {
		runtimeChunk: 'single',
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all'
				}
			}
		}
	}
}