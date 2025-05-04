// 根据角色动态生成路由
import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/login",
    method: "post",
    response: ({ body }) => {
      if (body.username === "admin") {
        return {
          success: true,
          data: {
            avatar: "https://avatars.githubusercontent.com/u/44761321",
            username: "admin",
            nickname: "小铭",
            // 一个用户可能有多个角色
            roles: ["admin"],
            // 按钮级别权限
            permissions: ["*:*:*"],
            accessToken: "eyJhbGciOiJIUzUxMiJ9.admin",
            refreshToken: "eyJhbGciOiJIUzUxMiJ9.adminRefresh",
            expires: "2030/10/30 00:00:00"
          }
        };
      } else {
        return {
          success: true,
          data: {
            avatar: "https://avatars.githubusercontent.com/u/52823142",
            username: "common",
            nickname: "小林",
            roles: ["common"],
            permissions: ["permission:btn:add", "permission:btn:edit"],
            accessToken: "eyJhbGciOiJIUzUxMiJ9.common",
            refreshToken: "eyJhbGciOiJIUzUxMiJ9.commonRefresh",
            expires: "2030/10/30 00:00:00"
          }
        };
      }
    }
  },
  {
    url: "/auth/token",
    method: "post",
    response: ({ body }) => { 
       console.log(body)
        return {
          success: true,
          data: {
            identityId: "1428975711003615234",
            token: "eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50SWQiOiIxNDI4OTc1NzExMDAzNjE1MjMzIiwiaWRlbnRpdHlUeXBlIjoiMTAiLCJkZXB0SWQiOiIxNDI4OTc1NzEwNzgxMzE3MTIxIiwidGVuYW50Q29kZSI6IkFPTElOIiwiZGF0YVNjb3BlIjoiMSIsInVzZXJJZCI6IjE0Mjg5NzU3MTEwMDM2MTUyMzQiLCJkZXB0Q29kZSI6IkEwMDEiLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzQ2MzM4Mzg0LCJuYmYiOjE3NDYzMzgzODQsImV4cCI6MTc0NjM4MTU4NH0.34zRWrVDhpXsL0vF0ds94v_UQ0G07gbn-GZ0pRniLz8", 
            refreshToken: "eyJhbGciOiJIUzI1NiJ9.eyJ1c2V",
            expire: 43200,
            expiration:"2030/10/30 00:00:00"
          }
        }; 
      }
  }
  ,
  {
    url: "/auth/user-info",
    method: "post",
    response: ({ body }) => { 
      console.log(body)
        return {
          success: true,
          data: { 
              avatar: "https://avatars.githubusercontent.com/u/52823142",
              /** 用户名 */
              username: "common",
              /** 昵称 */
              nickname: "common",
              /** 当前登录用户的角色 */
              roles:["common"],
              roleIds: ["common"],
              roleListIds: ["common"]
              
          }
        }; 
      }
  }
  
]);
