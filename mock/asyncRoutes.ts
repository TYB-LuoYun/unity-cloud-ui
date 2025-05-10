// 模拟后端动态生成路由
import { defineFakeRoute } from "vite-plugin-fake-server/client";
import { system, monitor, permission, frame, tabs } from "@/router/enums";

/**
 * roles：页面级别权限，这里模拟二种 "admin"、"common"
 * admin：管理员角色
 * common：普通角色
 */




const permissionRouter = {
  path: "/permission",
  meta: {
    "title": "租户配置",
    "icon": "table",
    "breadcrumb": true,
    "noCache": false
  },
  children: [
    {
      "path": "emp",
      "name": "员工管理",
      "component": "personnel/emp/index",
      "meta": {
        "title": "员工管理",
        "icon": "",
        "breadcrumb": true,
        "noCache": false
      },
      "hidden": false,
      "alwaysShow": false,
      "sortValue": 1
    },
    {
      path: "/permission/button",
      meta: {
        title: "menus.purePermissionButton",
        roles: ["admin", "common"]
      },
      children: [
        {
          path: "/permission/button/router",
          component: "permission/button/index",
          name: "PermissionButtonRouter",
          meta: {
            title: "menus.purePermissionButtonRouter"
          }
        },
        {
          path: "/permission/button/login",
          component: "permission/button/perms",
          name: "PermissionButtonLogin",
          meta: {
            title: "menus.purePermissionButtonLogin"
          }
        }
      ]
    }
  ]
};



export default defineFakeRoute([
  {
    url: "/auth/menu-resource",
    method: "get",
    response: () => {
      return {
        success: true,
        data: {
          routerVos: [
            {
              "path": "/monitor",
              "name": "系统监控",
              "component": "Layout",
              "meta": {
                "title": "系统监控",
                "icon": "example",
                "breadcrumb": true,
                "noCache": false
              },
              "hidden": false,
              "alwaysShow": true,
              "sortValue": 50,
              "children": [
                {
                  "path": "http://180.163.77.39:3000/",
                  "name": "Grafana入口",
                  "component": "grafana",
                  "meta": {
                    "title": "Grafana入口",
                    "icon": null,
                    "breadcrumb": true,
                    "noCache": false
                  },
                  "hidden": false,
                  "alwaysShow": false,
                  "sortValue": 10
                }
              ]
            }
          ]
        }
      };
    }
  }
]);
