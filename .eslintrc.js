module.exports = {
  root: true,
  env: {
    node: true,
    webextensions: true
  },
  parser: '@typescript-eslint/parser',
  // parser: '@babel/eslint-parser',
  plugins: ['@typescript-eslint', 'eslint-plugin-react'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    // parser: '@typescript-eslint/parser',
    parser: '@babel/eslint-parser',
    ecmaVersion: 2019,
    sourceType: 'module',
    // 开启实验属性
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      // 修饰器
      experimentalDecorators: true,
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect' // Tells eslint-plugin-react to automatically detect the version of React to use
    }
  },
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': ['off'],
    // fix: require statement  not part of import statement
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-unused-vars': 1,
    // 优先使用 interface 而不是 type
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],

    'no-undef': 'off',
    'no-console': 'off',
    // 'no-unused-vars': 1,
    'newline-before-return': 'error',
    'no-var': 'error',
    'space-comment': 0, // 展示不要有空格
    'use-isnan': 2, //禁止比较时使用NaN，只能用isNaN()

    // ~~ prettier 的lint冲突会被ESlint当成错误处理 ，只是如果关闭了，就无法使用prettier 进行格式化了 。。。。 是这样么？？？？
    // 'prettier/prettier': 'off',

    // 不允许在变量定义之前使用它们
    'no-use-before-define': 0,
    // 禁止或强制在单行代码块中使用空格(禁用)
    'block-spacing': [1, 'never'],

    // 强制使用一致的换行风格
    'linebreak-style': [2, 'unix'],
    //在JSX中强制布尔属性符号
    'react/jsx-boolean-value': 2,
    //在JSX中验证右括号位置
    // "react/jsx-closing-bracket-location": 1,
    //在JSX属性和表达式中加强或禁止大括号内的空格。
    'react/jsx-curly-spacing': [
      2,
      {
        when: 'never',
        children: true
      }
    ],
    //在数组或迭代器中验证JSX具有key属性
    'react/jsx-key': 2,
    // 限制JSX中单行上的props的最大数量
    'react/jsx-max-props-per-line': [
      1,
      {
        maximum: 5
      }
    ],
    //防止在JSX中重复的props
    'react/jsx-no-duplicate-props': 2,
    //  //防止使用未包装的JSX字符串
    // "react/jsx-no-literals": 0,
    //在JSX中禁止未声明的变量
    'react/jsx-no-undef': 2,
    //为用户定义的JSX组件强制使用PascalCase
    'react/jsx-pascal-case': 0,
    //防止反应被错误地标记为未使用
    'react/jsx-uses-react': 2,
    //防止在JSX中使用的变量被错误地标记为未使用
    'react/jsx-uses-vars': 2,
    //防止在componentDidMount中使用setState
    'react/no-did-mount-set-state': 2,
    //防止在componentDidUpdate中使用setState
    'react/no-did-update-set-state': 2,
    //防止使用未知的DOM属性
    'react/no-unknown-property': 2,
    //为React组件强制执行ES5或ES6类
    'react/prefer-es6-class': 2,
    //防止在React组件定义中丢失props验证
    // "react/prop-types": 1,
    //使用JSX时防止丢失React
    'react/react-in-jsx-scope': 'off',
    //防止没有children的组件的额外结束标签
    'react/self-closing-comp': 0,
    //禁止不必要的bool转换
    // "no-extra-boolean-cast": 0,
    //防止在数组中遍历中使用数组key做索引
    // "react/no-array-index-key": 0,
    //不使用弃用的方法
    'react/no-deprecated': 2,
    //在JSX属性中强制或禁止等号周围的空格
    'react/jsx-equals-spacing': 2,
    'react/jsx-filename-extension': [
      'off',
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    ]
  }
}
