import webpack from 'webpack';

import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildDevServer } from './buildDevServer';
import { buildResolvers } from './buildResolvers';

import type { BuildOptions } from './types/build.types';

export function buildWebpack(options: BuildOptions): webpack.Configuration {
	const { paths, mode } = options;
	const isDev = mode === 'development';

	return {
		mode: mode ?? 'development',

		entry: paths.entry,
		output: {
			path: paths.output,
			filename: '[name].[contenthash].js',
			clean: true
		},

		resolve: buildResolvers(),
		module: {
			rules: buildLoaders(options)
		},

		plugins: buildPlugins(options),

		devtool: isDev && 'inline-source-map',
		devServer: isDev ? buildDevServer(options) : undefined
	};
}
