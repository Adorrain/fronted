# Git 工作流

Git 是当今最流行的版本控制系统，它允许开发团队协同工作，跟踪代码变更，并在需要时回滚到之前的版本。本文将介绍 Git 的基本概念、常用命令以及几种流行的工作流模型，帮助团队更高效地协作开发。

## Git 基础概念

### 1. 仓库（Repository）

仓库是 Git 用来存储项目版本历史的地方。可以是本地仓库，也可以是远程仓库（如 GitHub、GitLab 等托管的仓库）。

### 2. 工作区、暂存区和版本库

- **工作区（Working Directory）**：你当前看到的目录，即实际持有文件的地方
- **暂存区（Staging Area/Index）**：临时存储你的改动，等待被提交
- **版本库（Repository）**：存储所有提交的历史版本

### 3. 分支（Branch）

分支是从主线开发中分离出来的独立线路，可以在不影响主线的情况下进行开发。

- **master/main**：主分支，通常用于存储稳定版本的代码
- **feature branches**：功能分支，用于开发新功能
- **hotfix branches**：热修复分支，用于修复生产环境中的紧急问题

### 4. 提交（Commit）

提交是对仓库修改的保存点，每个提交都有一个唯一的 ID（SHA-1 哈希值）。

### 5. 合并（Merge）与变基（Rebase）

- **合并**：将一个分支的更改整合到另一个分支中
- **变基**：将一系列提交移动或合并到新的基础提交上

## 常用 Git 命令

### 基本操作

```bash
# 初始化仓库
git init

# 克隆远程仓库
git clone <repository-url>

# 查看仓库状态
git status

# 添加文件到暂存区
git add <file>  # 添加指定文件
git add .       # 添加所有更改

# 提交更改
git commit -m "提交信息"

# 查看提交历史
git log
git log --oneline  # 简洁模式
git log --graph    # 图形化显示

# 查看文件差异
git diff           # 工作区与暂存区的差异
git diff --staged  # 暂存区与最新提交的差异
```

### 分支操作

```bash
# 查看分支
git branch         # 列出本地分支
git branch -r      # 列出远程分支
git branch -a      # 列出所有分支

# 创建分支
git branch <branch-name>

# 切换分支
git checkout <branch-name>
git switch <branch-name>  # Git 2.23+ 新命令

# 创建并切换分支
git checkout -b <branch-name>
git switch -c <branch-name>  # Git 2.23+ 新命令

# 合并分支
git merge <branch-name>  # 将指定分支合并到当前分支

# 变基
git rebase <branch-name>  # 将当前分支变基到指定分支上

# 删除分支
git branch -d <branch-name>  # 删除已合并的分支
git branch -D <branch-name>  # 强制删除分支
```

### 远程操作

```bash
# 添加远程仓库
git remote add <name> <url>

# 查看远程仓库
git remote -v

# 从远程仓库获取更新
git fetch <remote>

# 拉取远程更新并合并
git pull <remote> <branch>

# 推送到远程仓库
git push <remote> <branch>

# 推送并设置上游分支
git push -u <remote> <branch>
```

### 撤销与回滚

```bash
# 撤销工作区的修改
git checkout -- <file>
git restore <file>  # Git 2.23+ 新命令

# 撤销暂存区的修改
git reset HEAD <file>
git restore --staged <file>  # Git 2.23+ 新命令

# 修改最近的提交
git commit --amend

# 回滚到指定提交
git reset --soft <commit>  # 保留工作区和暂存区的更改
git reset --mixed <commit>  # 默认，保留工作区的更改
git reset --hard <commit>  # 丢弃所有更改

# 创建回滚提交（推荐用于已推送的提交）
git revert <commit>
```

### 标签操作

```bash
# 列出标签
git tag

# 创建标签
git tag <tag-name>  # 轻量标签
git tag -a <tag-name> -m "标签信息"  # 附注标签

# 查看标签信息
git show <tag-name>

# 推送标签到远程
git push <remote> <tag-name>
git push <remote> --tags  # 推送所有标签
```

### 临时存储

```bash
# 保存当前工作进度
git stash

# 查看存储列表
git stash list

# 应用最近的存储
git stash apply
git stash apply stash@{n}  # 应用指定的存储

# 应用并删除最近的存储
git stash pop

# 删除存储
git stash drop stash@{n}
git stash clear  # 删除所有存储
```

## 常见 Git 工作流模型

### 1. 集中式工作流（Centralized Workflow）

最简单的工作流，类似于 SVN。所有开发者直接在 master 分支上工作。

**优点**：简单，易于理解
**缺点**：容易产生冲突，不适合并行开发

**适用场景**：小型项目，团队成员较少

```
      A---B---C---D  master
```

### 2. 功能分支工作流（Feature Branch Workflow）

每个新功能都在专门的分支上开发，完成后合并回主分支。

**优点**：隔离功能开发，减少冲突
**缺点**：可能导致分支过多，管理复杂

**适用场景**：中小型项目，需要并行开发多个功能

```
      A---B---C---F---G  master
           \     /
            D---E        feature
```

### 3. Git Flow 工作流

一个更加结构化的分支模型，定义了严格的分支用途和合并规则。

**主要分支**：
- **master**：存储正式发布的版本
- **develop**：开发分支，包含最新的开发代码
- **feature**：功能分支，用于开发新功能
- **release**：发布分支，用于准备新版本发布
- **hotfix**：热修复分支，用于修复生产环境中的问题

**优点**：结构清晰，适合版本化发布
**缺点**：相对复杂，对于持续部署不够灵活

**适用场景**：大型项目，有明确的版本发布计划

```
      A---B---C---D---E---F  master
       \           /     /
        G---H---I---J---K     develop
            \     /
             L---M           feature
                  \
                   N---O     release
                        \
                         P   hotfix
```

### 4. GitHub Flow 工作流

简化版的 Git Flow，更适合持续部署的项目。

**主要步骤**：
1. 从 main 分支创建功能分支
2. 在功能分支上开发并提交
3. 创建 Pull Request
4. 代码审查
5. 部署测试
6. 合并到 main 分支

**优点**：简单，适合持续部署
**缺点**：对版本管理支持不足

**适用场景**：Web 应用，持续部署的项目

```
      A---B---C---F---G  main
           \     /
            D---E        feature
```

### 5. GitLab Flow 工作流

结合了 Git Flow 和 GitHub Flow 的优点，增加了环境分支的概念。

**主要分支**：
- **main**：主开发分支
- **production**：生产环境分支
- **pre-production**：预生产环境分支
- **feature**：功能分支

**优点**：灵活，适合不同部署策略
**缺点**：需要团队良好的协作

**适用场景**：需要多环境部署的项目

```
      A---B---C---D---E  main
           \       \
            \       F---G  pre-production
             \           \
              H---I---J---K  production
```

## 最佳实践

### 提交规范

采用规范的提交信息格式，如 [Conventional Commits](https://www.conventionalcommits.org/)：

```
<type>(<scope>): <subject>

<body>

<footer>
```

**类型（type）**：
- **feat**：新功能
- **fix**：修复 bug
- **docs**：文档更新
- **style**：代码风格修改（不影响代码运行）
- **refactor**：重构代码
- **perf**：性能优化
- **test**：添加或修改测试
- **chore**：构建过程或辅助工具的变动

**示例**：
```
feat(auth): add login functionality

Implement user login with JWT authentication.

Closes #123
```

### 分支命名规范

```
<type>/<description>
```

**类型（type）**：
- **feature**：新功能
- **bugfix**：修复 bug
- **hotfix**：紧急修复
- **release**：发布准备
- **refactor**：代码重构
- **docs**：文档更新

**示例**：
```
feature/user-authentication
bugfix/login-validation
hotfix/security-vulnerability
```

### 代码审查（Code Review）

1. **小批量提交**：保持提交小而集中，便于审查
2. **明确的描述**：清晰描述变更的目的和影响
3. **自我审查**：提交前自我检查代码
4. **及时反馈**：及时回应审查意见
5. **使用工具**：利用自动化工具进行代码质量检查

### 持续集成（CI）

将 Git 工作流与 CI/CD 工具（如 Jenkins、GitHub Actions、GitLab CI）集成，实现：

1. **自动构建**：每次提交后自动构建
2. **自动测试**：运行单元测试、集成测试
3. **代码质量检查**：运行 ESLint、Prettier 等工具
4. **自动部署**：将代码部署到测试或生产环境

## 常见问题与解决方案

### 1. 合并冲突

**问题**：当两个分支修改了同一文件的同一部分时，合并时会产生冲突。

**解决方案**：
1. 使用 `git status` 查看冲突文件
2. 打开冲突文件，手动解决冲突
3. 使用 `git add` 标记冲突已解决
4. 使用 `git commit` 完成合并

### 2. 大文件管理

**问题**：Git 不适合管理大型二进制文件。

**解决方案**：
1. 使用 `.gitignore` 忽略大文件
2. 使用 Git LFS（Large File Storage）管理大文件
3. 将大文件存储在外部系统，仅在 Git 中保存引用

### 3. 敏感信息泄露

**问题**：不小心将密码、密钥等敏感信息提交到仓库。

**解决方案**：
1. 使用 `git filter-branch` 或 BFG Repo-Cleaner 从历史记录中删除敏感信息
2. 使用 `.gitignore` 忽略包含敏感信息的文件
3. 使用环境变量或专门的密钥管理工具存储敏感信息

### 4. 提交历史混乱

**问题**：提交历史杂乱无章，难以理解。

**解决方案**：
1. 使用 `git rebase -i` 交互式变基，整理提交历史
2. 遵循提交规范，保持提交信息清晰
3. 定期合并小的相关提交

## 高级 Git 技巧

### 1. Git Hooks

Git 钩子是在特定事件发生时触发的脚本，可以用来自动化工作流程。

**常用钩子**：
- **pre-commit**：提交前运行，可用于代码检查
- **commit-msg**：检查提交信息格式
- **pre-push**：推送前运行，可用于运行测试

**示例（pre-commit 钩子）**：
```bash
#!/bin/sh
# .git/hooks/pre-commit

# 运行 ESLint
npm run lint

# 如果 ESLint 失败，阻止提交
if [ $? -ne 0 ]; then
  echo "ESLint 检查失败，请修复错误后再提交"
  exit 1
fi
```

### 2. Git Submodules 和 Git Subtree

用于在一个仓库中包含其他仓库的代码。

**Git Submodules**：
```bash
# 添加子模块
git submodule add <repository-url> <path>

# 初始化子模块
git submodule init

# 更新子模块
git submodule update
```

**Git Subtree**：
```bash
# 添加子树
git subtree add --prefix=<path> <repository-url> <branch> --squash

# 更新子树
git subtree pull --prefix=<path> <repository-url> <branch> --squash
```

### 3. Git Bisect

二分查找法定位引入 bug 的提交。

```bash
# 开始二分查找
git bisect start

# 标记当前版本有问题
git bisect bad

# 标记已知的好版本
git bisect good <commit>

# Git 会检出中间的提交，测试后标记
git bisect good  # 如果当前版本没问题
git bisect bad   # 如果当前版本有问题

# 找到问题提交后，结束查找
git bisect reset
```

### 4. Git Worktree

允许在同一个仓库中同时检出多个分支。

```bash
# 创建新的工作树
git worktree add <path> <branch>

# 列出所有工作树
git worktree list

# 删除工作树
git worktree remove <path>
```

## 总结

Git 工作流是现代软件开发中不可或缺的一部分。选择合适的工作流模型，遵循最佳实践，可以显著提高团队协作效率和代码质量。不同的项目可能需要不同的工作流模型，关键是找到适合团队和项目的方式，并保持一致性。

随着项目的发展，工作流也可能需要调整。定期回顾和改进工作流程，确保它继续满足团队的需求，是保持高效开发的重要环节。