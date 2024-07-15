import { ModuleOptions } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshTypeScript from 'react-refresh-typescript';

import type { BuildOptions } from './types/build.types';
import { buildBabelLoader } from './babel/buildBabelLoader';

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
	const isDev = options.mode === 'development';

	const babelLoader = buildBabelLoader(options);

	const tsLoader = {
		test: /\.tsx?$/,
		exclude: /node_modules/,
		use: [
			{
				loader: 'ts-loader',
				options: {
					transpileOnly: isDev,
					getCustomTransformers: () => ({
						before: [isDev && ReactRefreshTypeScript()].filter(Boolean)
					})
				}
			}
		]
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

	const assetsLoader = {
		test: /\.(png|jpg|jpeg|gif)$/i,
		type: 'asset/resource'
	};

	const svgrLoader = {
		test: /\.svg$/i,
		issuer: /\.[jt]sx?$/,
		use: [
			{
				loader: '@svgr/webpack',
				options: {
					icon: true,
					svgoConfig: {
						plugins: [
							{
								name: 'convertColors',
								params: {
									currentColor: true
								}
							}
						]
					}
				}
			}
		]
	};

	return [
		babelLoader,
		// tsLoader,
		stylesLoader,
		assetsLoader,
		svgrLoader
	];
}
