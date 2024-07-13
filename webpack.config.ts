import path from 'path';
import webpack from 'webpack';

import { buildWebpack } from './config/build/buildWebpack';
import { BuildPaths } from './config/build/types/build.type';

interface EnvVariablesType {
	mode?: 'production' | 'development';
	port?: number;
}

export default (env: EnvVariablesType) => {
	const paths: BuildPaths = {
		entry: path.resolve(__dirname, 'src', 'index.tsx'),
		html: path.resolve(__dirname, 'public', 'index.html'),
		output: path.resolve(__dirname, 'build')
	};

	const config: webpack.Configuration = buildWebpack({
		mode: env.mode ?? 'development',
		paths,
		port: env.port ?? 3000
	});

	return config;
};
