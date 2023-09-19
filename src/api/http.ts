import axios from "axios";
import { ElLoading } from "element-plus";
let config={
    baseURL:'http://shiyansong.cn:8888/api/private/v1'
}
class login{
    http:any
    constructor(config:any){
        this.http=axios.create(config)
        this.http.interceptors.request.use( (config:any)=> {
            // 在发送请求之前做些什么
            const loading = ElLoading.service({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)',
              })
              let token=localStorage.getItem('token')
              if(token){
                config.headers.Authorization=token
              }
            return config;
          })
          this.http.interceptors.response.use( (response:any)=> {
            // 2xx 范围内的状态码都会触发该函数。
            // 对响应数据做点什么
            const loading = ElLoading.service({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)',
              })
              setTimeout(() => {
                loading.close()
              }, 500)
            return response;
          })
    }
    get(url:string,params?:any){
        return this.http.get(url,params)
    }
    post(url:string,params:any){
        return this.http.post(url,params)
    }
    put(url:string,params?:any){
        return this.http.put(url,params)
    }
    delete(url:string,params?:any){
        return this.http.delete(url,params)
    }


}
export default new login(config)