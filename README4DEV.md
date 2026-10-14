# 发布步骤

## 人为更新版本号

```sh
# 确保所有修改都已提交，然后明确指定完整版本号；不要使用 patch/minor/major 自动递增
npm version 1.2.3

# 推送 master 提交和 npm version 创建的 v1.2.3 tag
git push origin master --follow-tags
```

## GitHub Actions 自动发布

GitHub Actions 监听 `v*` tag。
发布前会检查 tag 版本与 `package.json` 完全一致，安装锁定依赖，运行已配置的测试（若有）、typecheck、lint 和 build，然后发布 npm 包。npm 的 `prepublishOnly` 还会再次运行 lint 和 build。

发布步骤使用 npm trusted publishing 和 provenance。
**首次使用前**，需要在 npm 包的 **Trusted publishing** 设置中添加 GitHub Actions publisher，仓库为 `nuteu/web-utils`，workflow 文件为 `.github/workflows/publish.yml`，environment 留空。仓库不需要保存 npm token。

成功发布后，`release-it` 与 Conventional Commits 插件会为该 tag 创建 GitHub Release，并将变更日志作为 release notes；版本号、git commit 和 tag 都不会由 workflow 自动修改。
