import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import { babel } from '@rollup/plugin-babel';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import styles from "rollup-plugin-styles";
import json from "@rollup/plugin-json";
const publicPath = '/local/ascension-dashboard'; 

export default {
  input: "src/index.js",
  output: {
    file: "dist/ascension-dashboard.js",
    format: "esm",
    intro: `const __PUBLIC_PATH__ = "${publicPath}";`,
    inlineDynamicImports: true
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    nodeResolve({
      extensions: ['.js', '.jsx']
    }),
    babel({ 
      babelHelpers: 'bundled', 
      presets: [ ["@babel/preset-react", {"runtime": "automatic"}] ], 
      exclude: "node_modules/**" 
    }),
    commonjs({ sourceMap: false, include: ['node_modules/**'] }, ),
    styles({autoModules: true}),
    json()
    // image(),
    // serve({
    //   open: true,
    //   verbose: true,
    //   contentBase: ["public"],
    //   host: "0.0.0.0",
    //   port: 3000,
    //   allowCrossOrigin: true,
    //   headers: {
    //     "Access-Control-Allow-Origin": "*",
    //   },
    // }),
    // livereload({ watch: "dist" }),
  ]
};