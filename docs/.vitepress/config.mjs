export default {
  title: "前端工程师进阶指南",
  description: "专业前端开发技术博客，涵盖HTML、CSS、JavaScript、React等前端技术",
  outDir: '.vitepress/dist',  
  base: '/fronted/',  // 设置基础路径为仓库名称
  lang: 'zh-CN',
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: '首页', link: '/' },
      { 
        text: 'HTML/CSS', 
        items: [
          { text: 'HTML基础', link: '/html-css/html-basics.html' },
          { text: 'CSS基础', link: '/html-css/css-basics.html' },
          { text: 'CSS布局', link: '/html-css/css-layout.html' },
          { text: 'CSS动画', link: '/html-css/css-animation.html' },
        ] 
      },
      { 
        text: 'JavaScript', 
        items: [
          { text: 'JS基础', link: '/javascript/js-basics.html' },
          { text: '异步编程', link: '/javascript/async-programming.html' },
          { text: 'ES6+特性', link: '/javascript/es6-features.html' },
        ] 
      },
      { 
        text: 'React', 
        items: [
          { text: 'React基础', link: '/react/react-basics.html' },
          { text: 'React Hooks', link: '/react/react-hooks.html' },
          { text: 'React组件', link: '/react/react-components.html' },
        ] 
      },
      { 
        text: '前端工程化', 
        items: [
          { text: 'Webpack', link: '/engineering/webpack.html' },
          { text: 'Babel', link: '/engineering/babel.html' },
          { text: 'ESLint', link: '/engineering/eslint.html' },
          { text: 'Git工作流', link: '/engineering/git-workflow.html' },
          { text: '性能优化', link: '/engineering/performance-optimization.html' },
        ] 
      },
      { text: '关于', link: '/about' }
    ],
    sidebar: {
      '/html-css/': [
        {
          text: 'HTML/CSS',
          items: [
            { text: 'HTML基础', link: '/html-css/html-basics.html' },
            { text: 'CSS基础', link: '/html-css/css-basics.html' },
            { text: 'CSS布局', link: '/html-css/css-layout.html' },
            { text: 'CSS动画', link: '/html-css/css-animation.html' },
          ]
        }
      ],
      '/javascript/': [
        {
          text: 'JavaScript',
          items: [
            { text: 'JS基础', link: '/javascript/js-basics.html' },
            { text: '异步编程', link: '/javascript/async-programming.html' },
            { text: 'ES6+特性', link: '/javascript/es6-features.html' },
          ]
        }
      ],
      '/react/': [
        {
          text: 'React',
          items: [
            { text: 'React基础', link: '/react/react-basics.html' },
            { text: 'React Hooks', link: '/react/react-hooks.html' },
            { text: 'React组件', link: '/react/react-components.html' },
          ]
        }
      ],
      '/engineering/': [
        {
          text: '前端工程化',
          items: [
            { text: 'Webpack', link: '/engineering/webpack.html' },
            { text: 'Babel', link: '/engineering/babel.html' },
            { text: 'ESLint', link: '/engineering/eslint.html' },
            { text: 'Git工作流', link: '/engineering/git-workflow.html' },
            { text: '性能优化', link: '/engineering/performance-optimization.html' },
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-username/fronted' }
    ],
    footer: {
      message: '用心分享前端技术',
    },
    search: {
      provider: 'local'
    },
    lastUpdatedText: '最后更新',
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    outline: {
      label: '本页目录'
    }
  }
}