import { Configuration } from 'webpack';
import { BuildOptions } from './types/build.types';

export function buildResolvers({ paths }: BuildOptions): Configuration['resolve'] {
	return {
		extensions: ['.tsx', '.ts', '.js'],
		alias: {
			'@': paths.src
		}
	};
}
