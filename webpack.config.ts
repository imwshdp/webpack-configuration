import path from 'path';
import webpack from 'webpack';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

interface EnvVariablesType {
	mode?: 'production' | 'development';
	port?: number;
}

export default (env: EnvVariablesType) => {
	const isDev = env.mode === 'development';
	const isProd = env.mode === 'production';

	const config: webpack.Configuration = {
		mode: env.mode ?? 'development',

		entry: path.resolve(__dirname, 'src', 'index.tsx'),
		output: {
			path: path.resolve(__dirname, 'build'),
			filename: '[name].[contenthash].js',
			clean: true
		},

		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/
				},
				{
					test: /\.s[ac]ss$/i,
					use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
				}
			]
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js']
		},

		plugins: [
			new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') }),
			isDev && new webpack.ProgressPlugin(),
			isProd &&
				new MiniCssExtractPlugin({
					filename: 'styles/[name].[contenthash:8].css',
					chunkFilename: 'styles/[name].[contenthash:8].css'
				})
		].filter(Boolean),

		devtool: isDev && 'inline-source-map',
		devServer: isDev
			? {
					port: env.port ?? 3000,
					open: true
			  }
			: undefined
	};

	return config;
};
