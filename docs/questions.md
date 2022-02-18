### 项目现存问题

#### 未触发 eslint 校验，只触发了 ts 校验

应该关闭 vscode 的 settings.json 中的 "typescript.validate.enable" ,交由 eslint 进行校验
可能的解决方案：
查看 vscode 的 OUTPUT 修复 eslint.js 中 文件的错误
