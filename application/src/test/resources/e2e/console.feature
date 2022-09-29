Feature: 控制台页面


  @login
  Scenario: 已经登录后进入控制台
    When 当打开 "首页"
    Then 页面标题是 "ERP"

  Scenario: 如果没有登录进入登录
    Given 没有登录
    When 当打开 "首页"
    Then 看到登录页面
