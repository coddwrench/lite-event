import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import sourceMaps from "rollup-plugin-sourcemaps";

export default {
	input: "dist/index.js",
	output: [
		{ file: "dist/index.umd.js", name: "index", format: "umd", exports: "named" },
	],
	external: [],
	watch: {
		include: "dist/**",
	},
	plugins: [commonjs(), resolve(), sourceMaps()]
};