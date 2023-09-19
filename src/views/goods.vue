<template>
  <div>

    <el-input v-model="input" placeholder="Please input" /> <el-button type="primary" @click="tj">添加商品</el-button><br>
    <el-table :data="sp.list" border style="width: 100%">
      <el-table-column type="index" label="#" />
      <el-table-column prop="goods_name" label="商品名称" />
      <el-table-column prop="goods_price" label="商品价格" />
      <el-table-column prop="goods_weight" label="商品重量" />
      <el-table-column prop="add_time" label="创建时间" />
      <el-table-column label="操作" width="200">
        <template #default>
          <el-button type="primary" :icon="Edit" />
          <el-button type="danger" :icon="Delete" />
        </template>
      </el-table-column>


    </el-table>

  </div>
</template>
<script setup lang='ts'>
import { ref, reactive } from 'vue';
import { splbListApi } from '@/api'
let input = ref('')
let sp = reactive({
  list: []
})
let ro = useRouter()
let tj = () => {
  ro.push('/goodsAdd')
}
import {
  Document,
  Menu as IconMenu,
  Edit,
  Delete,
} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
splbListApi({
  query: input.value,
  pagenum: 1,
  pagesize: 10
}).then((res: any) => {
  console.log(res);
  sp.list = res.data.data.goods
})
</script>
<style lang='scss' scoped></style>