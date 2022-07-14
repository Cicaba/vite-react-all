// @ts-ignore
// * No declaration file for less-vars-to-js
import lessToJS from "less-vars-to-js";
import { UserConfigExport, ConfigEnv, loadEnv } from 'vite'
import reactRefresh from "@vitejs/plugin-react-refresh";
import { ViteAliases } from "vite-aliases";
import Inspect from "vite-plugin-inspect";
import reactJsx from "vite-react-jsx";
import { resolve } from "path";
import fs from "fs";
import visualizer from "rollup-plugin-visualizer";
import { viteMockServe } from 'vite-plugin-mock'


const pathResolver = (path: string) => resolve(__dirname, path);
const themeVariables = lessToJS(
  fs.readFileSync(pathResolver("./config/variables.less"), "utf8")
);

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const prodMock = false;
  return {
    base: "./",
    publicDir: 'public',
    plugins: [
      Inspect(),
      ViteAliases({}),
      reactJsx(),
      reactRefresh(),
      viteMockServe({
        // ↓解析根目录下的mock文件夹
        mockPath: "mock",
        localEnabled: command === 'serve',// 开发打包开关
        prodEnabled: command !== 'serve' && prodMock,// 生产打包开关
        supportTs: true, // 打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件。
        watchFiles: true, // 监视文件更改
      }),
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: themeVariables,
        },
      },
    },
    build: {
      sourcemap: false,
      outDir: 'dist', //指定输出路径
      rollupOptions: {
        output: {
          manualChunks: {
            'base': ['redux', 'redux-persist'],
            'react': ['react', 'react-dom', 'react-redux', 'react-router-dom'],
            'antd': ['antd'],
            'ant-icons': ['@ant-design/icons'],
          }
        }
      },
      chunkSizeWarningLimit: 600,
      // brotliSize: false, // 不统计
      // target: 'esnext',
      // minify: 'esbuild' // 混淆器，terser构建后文件体积更小
    },
    // resolve: {
    //   alias: [{
    //     find: '@',
    //     replacement: path.resolve(__dirname, 'src')
    //   }],
    // },
  }
};
