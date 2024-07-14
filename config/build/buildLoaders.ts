import { ModuleOptions } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import type { BuildOptions } from './types/build.types';

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
	const isDev = options.mode === 'development';

	const tsLoader = {
		test: /\.tsx?$/,
		use: 'ts-loader',
		exclude: /node_modules/
	};

	const cssLoader = {
		loader: 'css-loader',
		options: {
			modules: {
				auto: (resPath: string) => Boolean(resPath.includes('.module.')),
				namedExport: false,
				localIdentName: isDev ? '[path][name]__[local]--[hash:base64:5]' : '[hash:base64:8]'
			}
		}
	};

	const stylesLoader = {
		test: /\.s[ac]ss$/i,
		use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, cssLoader, 'sass-loader']
	};

	return [tsLoader, stylesLoader];
}
