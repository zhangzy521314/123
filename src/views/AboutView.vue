<template>
  <div>
    <el-container>
      <el-header class="head">
        <h2>公司logo</h2>
        <el-button @click="tc" class="btn">登出</el-button>
      </el-header>
      <el-container>
        <el-aside width="200px" hight="600px">
          <el-menu
          
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            default-active="2"
            text-color="#fff"
            router
          >
            <el-sub-menu :index=item.id v-for="(item, index) in menu.list" :key="index">
              <template #title>
                <el-icon><location /></el-icon>
                <span>{{ item.authName }}</span>
              </template>
              <el-menu-item :index=i.path v-for="(i, index) in item.children" :key="index">{{ i.authName }}</el-menu-item>
         
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-main><router-view /></el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import { menuListApi } from "@/api";
import { ElMessage } from "element-plus";
import { reactive } from "vue";
import { useRouter } from "vue-router";
let menu = reactive<any>({
  list: [],
});
menuListApi({}).then((res: any) => {
  console.log(res);
  menu.list = res.data.data;
  ElMessage({
    message: "获取菜单列表成功",
    type: "success",
  });
});
// 退出
let router=useRouter()
let tc=()=>{
  localStorage.removeItem('token')
  router.push('/')
}
</script>
<style lang="scss" scoped>
.head{
  display: flex;
  justify-content: space-between;
  background-color: #363c42;
  .btn{
    margin-top: 20px;
  }
  h2{
    margin-top: 20px;

  }
}
.el-menu-vertical-demo{
  height: 510px;
}
</style>
