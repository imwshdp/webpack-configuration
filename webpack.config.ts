import path from 'path';
import webpack from 'webpack';

import { buildWebpack } from './config/build/buildWebpack';
import { BuildPaths } from './config/build/types/build.types';

interface EnvVariablesType {
	mode?: 'production' | 'development';
	port?: number;
	analyzer?: boolean;
}

export default (env: EnvVariablesType) => {
	const paths: BuildPaths = {
		entry: path.resolve(__dirname, 'src', 'index.tsx'),
		html: path.resolve(__dirname, 'public', 'index.html'),
		output: path.resolve(__dirname, 'build'),
		src: path.resolve(__dirname, 'src')
	};

	const config: webpack.Configuration = buildWebpack({
		mode: env.mode ?? 'development',
		paths,
		port: env.port ?? 3000,
		analyzer: env.analyzer ?? false
	});

	return config;
};
