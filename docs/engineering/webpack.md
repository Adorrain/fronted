# Webpack 基础与实践

Webpack 是一个现代 JavaScript 应用程序的静态模块打包工具。当 webpack 处理应用程序时，它会在内部构建一个依赖图，映射项目所需的每个模块，然后生成一个或多个 bundle。

## Webpack 核心概念

### 1. 入口(Entry)

入口起点指示 webpack 应该使用哪个模块作为构建其内部依赖图的开始。webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。

```javascript
// webpack.config.js
module.exports = {
  entry: './src/index.js'
};
```

也可以配置多个入口：

```javascript
module.exports = {
  entry: {
    main: './src/index.js',
    vendor: './src/vendor.js'
  }
};
```

### 2. 输出(Output)

output 属性告诉 webpack 在哪里输出它所创建的 bundle，以及如何命名这些文件。

```javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};
```

对于多个入口点，可以使用占位符来确保每个文件具有唯一的名称：

```javascript
module.exports = {
  entry: {
    app: './src/app.js',
    search: './src/search.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
};
// 写入到硬盘：./dist/app.js, ./dist/search.js
```

### 3. 加载器(Loaders)

webpack 只能理解 JavaScript 和 JSON 文件，这是 webpack 开箱可用的自带能力。loader 让 webpack 能够去处理其他类型的文件，并将它们转换为有效模块，以供应用程序使用，以及被添加到依赖图中。

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};
```

### 4. 插件(Plugins)

插件可以用于执行范围更广的任务，包括：打包优化、资源管理和注入环境变量。

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  plugins: [
    new CleanWebpackPlugin(), // 在每次构建前清理 /dist 文件夹
    new HtmlWebpackPlugin({
      title: '我的应用',
      template: './src/index.html'
    })
  ]
};
```

### 5. 模式(Mode)

通过选择 `development`, `production` 或 `none` 之中的一个，来设置 `mode` 参数，你可以启用 webpack 内置在相应环境下的优化。

```javascript
module.exports = {
  mode: 'production'
};
```

## Webpack 基本配置

一个完整的基本配置示例：

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // 入口
  entry: './src/index.js',
  
  // 输出
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js'
  },
  
  // 模式
  mode: 'development',
  
  // 开发服务器
  devServer: {
    contentBase: './dist',
    hot: true,
    port: 3000
  },
  
  // 模块规则
  module: {
    rules: [
      // JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      
      // CSS
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      
      // SASS/SCSS
      {
        test: /\.s[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      
      // 图片
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      
      // 字体
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      }
    ]
  },
  
  // 插件
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './src/favicon.ico'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    })
  ],
  
  // 优化
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
};
```

## 开发环境配置

开发环境下，我们通常需要：

1. Source Map 以便于调试
2. 开发服务器(webpack-dev-server)
3. 热模块替换(HMR)

```javascript
// webpack.dev.js
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
    port: 3000
  }
});
```

## 生产环境配置

生产环境下，我们通常需要：

1. 代码压缩和优化
2. 提取 CSS 到单独文件
3. 资源优化

```javascript
// webpack.prod.js
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin()
    ]
  }
});
```

## 常用 Loader

### 1. babel-loader

用于将 ES6+ 代码转换为 ES5 代码。

```bash
npm install -D babel-loader @babel/core @babel/preset-env
```

```javascript
{
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env']
    }
  }
}
```

### 2. css-loader 和 style-loader

css-loader 解析 CSS 文件中的 `@import` 和 `url()`，style-loader 将 CSS 注入到 DOM 中。

```bash
npm install -D css-loader style-loader
```

```javascript
{
  test: /\.css$/,
  use: ['style-loader', 'css-loader']
}
```

### 3. sass-loader

处理 SASS/SCSS 文件。

```bash
npm install -D sass-loader sass
```

```javascript
{
  test: /\.s[ac]ss$/,
  use: ['style-loader', 'css-loader', 'sass-loader']
}
```

### 4. postcss-loader

使用 PostCSS 处理 CSS。

```bash
npm install -D postcss-loader postcss autoprefixer
```

```javascript
// postcss.config.js
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
};
```

```javascript
{
  test: /\.css$/,
  use: ['style-loader', 'css-loader', 'postcss-loader']
}
```

### 5. file-loader 和 url-loader

处理图片和字体等文件。

```bash
npm install -D file-loader url-loader
```

```javascript
{
  test: /\.(png|svg|jpg|jpeg|gif)$/i,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 8192, // 小于 8kb 的图片转为 base64
        name: 'images/[name].[hash:8].[ext]'
      }
    }
  ]
}
```

## 常用插件

### 1. HtmlWebpackPlugin

生成 HTML 文件，并自动注入打包后的 JS 文件。

```bash
npm install -D html-webpack-plugin
```

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    })
  ]
};
```

### 2. MiniCssExtractPlugin

将 CSS 提取到单独的文件中。

```bash
npm install -D mini-css-extract-plugin
```

```javascript
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    })
  ]
};
```

### 3. CleanWebpackPlugin

在每次构建前清理 /dist 文件夹。

```bash
npm install -D clean-webpack-plugin
```

```javascript
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  plugins: [
    new CleanWebpackPlugin()
  ]
};
```

### 4. CopyWebpackPlugin

将单个文件或整个目录复制到构建目录。

```bash
npm install -D copy-webpack-plugin
```

```javascript
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/assets', to: 'assets' }
      ]
    })
  ]
};
```

### 5. DefinePlugin

允许在编译时创建全局常量。

```javascript
const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'API_URL': JSON.stringify('https://api.example.com')
    })
  ]
};
```

## 代码分割

代码分割是 webpack 中最引人注目的特性之一。此特性能够把代码分离到不同的 bundle 中，然后可以按需加载或并行加载这些文件。

### 1. 入口点分割

```javascript
module.exports = {
  entry: {
    app: './src/app.js',
    vendor: './src/vendor.js'
  }
};
```

### 2. 动态导入

```javascript
// 使用动态导入
button.addEventListener('click', () => {
  import(/* webpackChunkName: "print" */ './print').then(module => {
    const printMe = module.default;
    printMe();
  });
});
```

### 3. SplitChunksPlugin

```javascript
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
};
```

## 性能优化

### 1. 减小打包体积

- 使用 `production` 模式
- 使用 Tree Shaking 移除未使用的代码
- 代码分割
- 压缩代码

```javascript
module.exports = {
  mode: 'production',
  optimization: {
    usedExports: true, // Tree Shaking
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true // 移除 console
          }
        }
      })
    ]
  }
};
```

### 2. 缓存

使用内容哈希确保浏览器能够缓存文件，并且只在文件内容变化时更新缓存。

```javascript
module.exports = {
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

### 3. 懒加载

```javascript
// 路由懒加载示例
const Home = () => import(/* webpackChunkName: "home" */ './Home');
const About = () => import(/* webpackChunkName: "about" */ './About');

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About }
];
```

### 4. 分析打包结果

使用 webpack-bundle-analyzer 可视化分析打包结果。

```bash
npm install -D webpack-bundle-analyzer
```

```javascript
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
};
```

## 实际项目配置示例

以下是一个实际项目中可能使用的 webpack 配置：

```javascript
// webpack.common.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]'
              },
              sourceMap: true
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024 // 8kb
          }
        },
        generator: {
          filename: 'images/[name].[hash:8][ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[hash:8][ext]'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { 
          from: 'public', 
          to: '', 
          globOptions: {
            ignore: ['**/index.html', '**/favicon.ico']
          }
        }
      ]
    })
  ],
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
};
```

```javascript
// webpack.dev.js
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
    port: 3000,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        pathRewrite: { '^/api': '' },
        changeOrigin: true
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'API_URL': JSON.stringify('http://localhost:8080/api')
    })
  ]
});
```

```javascript
// webpack.prod.js
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true
          }
        }
      }),
      new CssMinimizerPlugin()
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'API_URL': JSON.stringify('https://api.example.com')
    }),
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ],
  performance: {
    hints: 'warning',
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
});
```

## 总结

Webpack 是一个功能强大的模块打包工具，它可以处理项目中的各种资源，并将它们打包成适合在浏览器中运行的格式。通过合理配置 webpack，可以大幅提高前端开发效率和应用性能。

主要优势包括：

1. 模块化开发：支持 ES6 模块、CommonJS 和 AMD
2. 资源处理：可以处理 CSS、图片、字体等非 JavaScript 资源
3. 代码分割：实现按需加载，减少初始加载时间
4. 开发体验：提供热模块替换，加快开发速度
5. 性能优化：通过各种插件和配置优化生产环境的代码

随着前端工程化的发展，webpack 已经成为现代前端开发不可或缺的工具之一。掌握 webpack 的配置和使用，对于提高前端开发效率和应用性能至关重要。