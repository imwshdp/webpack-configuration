import path from 'path';
import webpack from 'webpack';
import { Configuration } from 'webpack';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import type { BuildOptions } from './types/build.type';

export function buildPlugins({ mode, paths }: BuildOptions): Configuration['plugins'] {
	const isDev = mode === 'development';
	const isProd = mode === 'production';

	const plugins: Configuration['plugins'] = [new HtmlWebpackPlugin({ template: paths.html })];

	if (isDev) {
		plugins.push(new webpack.ProgressPlugin());
	}

	if (isProd) {
		plugins.push(
			new MiniCssExtractPlugin({
				filename: 'styles/[name].[contenthash:8].css',
				chunkFilename: 'styles/[name].[contenthash:8].css'
			})
		);
	}

	return plugins;
}
