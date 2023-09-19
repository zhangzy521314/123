import http from "./http";
// 登录
interface login{
    username:string,
    password:string
}
export let loginApi=(params:login)=>http.post('/login',params)
// 左侧菜单权限
export let menuListApi=(params:any)=>http.get('/menus',{params})
// 列表
interface splist{
    query:string,
    pagenum:number,
    pagesize:number
}
export let splbListApi=(params:splist)=>http.get('/goods',{params})
// 添加
export let tjListApi=(params:any)=>http.post('/goods',params)



