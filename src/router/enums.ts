// 完整版菜单比较多，将 rank 抽离出来，在此方便维护

const home = 0, // 平台规定只有 home 路由的 rank 才能为 0 ，所以后端在返回 rank 的时候需要从非 0 开始
  
  table = 6,
  form = 7,   
  frame = 11, 
  permission = 13,
  system = 14,
  monitor = 15,
  tabs = 16,    
  formdesign = 22 ;

export {
  home,  
  table,
  form,   
  frame, 
  permission,
  system,
  monitor,
  tabs,    
  formdesign 
};
