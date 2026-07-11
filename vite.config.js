import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import * as babel from '@babel/core'
import plasticPreset from '@plastic-js/babel-preset-plastic'

const plasticJsx = ()=> ({
	name: 'plastic-jsx',
	async transform(code, id){
		if (!(/\.jsx$/).test(id)){ return null }
		const result = await babel.transformAsync(code, {
			filename: id,
			babelrc: false,
			configFile: false,
			sourceMaps: true,
			parserOpts: { plugins: ['jsx'] },
			presets: [plasticPreset],
		})
		return result ? { code: result.code, map: result.map } : null
	},
})

export default defineConfig(({ command })=> {
	const isDev = command === 'serve'

	return {
		root: isDev ? resolve(__dirname, 'showcase') : __dirname,
		publicDir: isDev ? false : undefined,
		cacheDir: resolve(__dirname, '.vite-cache'),
		plugins: [plasticJsx()],
		build: isDev
			? undefined
			: {
				minify: false,
				sourcemap: true,
				target: 'esnext',
				lib: {
					entry: resolve(__dirname, 'src/index.js'),
					formats: ['es'],
					fileName: 'index',
				},
				rollupOptions: {
					external: [
						/^@plastic-js\/plastic(?:\/.*)?$/,
						/^@plastic-js\/ark(?:\/.*)?$/,
						/^@emotion\/css(?:\/.*)?$/,
						/^@zag-js\/combobox(?:\/.*)?$/,
						/^alien-signals(?:\/.*)?$/,
					],
					output: {
						preserveModules: true,
						preserveModulesRoot: 'src',
						entryFileNames: '[name].js',
						chunkFileNames: 'chunks/[name].js',
						assetFileNames: 'assets/[name][extname]',
					},
				},
			},
		esbuild: {
			include: /\.[jt]sx?$/,
			exclude: /\.jsx$/,
		},
		resolve: {
			dedupe: ['@plastic-js/plastic', '@plastic-js/ark', 'alien-signals'],
		},
		optimizeDeps: {
			noDiscovery: true,
			include: [],
		},
		server: {
			port: 4455,
			open: true,
		},
	}
})
