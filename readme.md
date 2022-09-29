#目录结构
- application 后端主应用
- domains 后端业务领域代码
- webreact 前端页面

# 前端命令
- yarn test 运行所有测试
- yarn test:coverage 带覆盖率测试
- yarn build 编译静态文件到application

# 服务器编译测试
  增加webdriver参数用来控制使用哪种浏览器做测试。local: 本地Chrome浏览器。docker: 自动启动docker来做浏览器
```
./gradlew check
./gradlew -Dwebdriver=local check
```
