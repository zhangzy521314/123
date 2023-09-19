<template>
  <div>
    <!-- 头部 -->
    <el-steps :space="200" :active="active" finish-status="success">
      <el-step title="基本信息" @click="next" />
      <el-step title="商品参数" @click="next" />
      <el-step title="商品属性"  @click="next"/>
      <el-step title="商品图片" @click="next" />
      <el-step title="商品内容"  @click="next"/>
      <el-step title="完成" @click="next" />
    </el-steps>
    <!-- <el-button style="margin-top: 12px" @click="next">Next step</el-button> -->
    <el-tabs
      :tab-position="tabPosition"
      style="height: 510px"
      class="demo-tabs"
      @tab-click="next"
    >
      <el-tab-pane label="基本信息">
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          label-width="120px"
          class="demo-ruleForm"
          :size="formSize"
          status-icon
        >
          <el-form-item label="商品名称">
            <el-input
              v-model="ruleForm.username"
              placeholder="请输入商品名称"
            />
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="ruleForm.price" placeholder="请输入商品价格" />
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="ruleForm.zl" placeholder="请输入商品重量" />
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="ruleForm.num" placeholder="请输入商品数量" />
          </el-form-item>
          
          <el-form-item label="商品分类">
            <el-select
              v-model="ruleForm.classfly"
              placeholder="请输入商品分类"
              @change="ll"
            >
              <el-option
                :label="item.goods_name"
                :value="item.goods_id"
                v-for="(item, index) in sp.list"
                :key="index"
              />
            </el-select>
          </el-form-item>
         
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品参数" @tab-click="tz">
        国产/进口
        <el-checkbox-group v-model="checkList" default="gg">
          <el-checkbox label="国产" />
          <el-checkbox label="进口" />
        </el-checkbox-group>
        <!--  -->
        <el-checkbox-group v-model="checkList">
          适用灶具

          <el-checkbox label="燃气炉" />
          <el-checkbox label="燃气灶酒精炉" />
          <el-checkbox label="电磁炉" />
          <el-checkbox label="电陶炉" />
        </el-checkbox-group>
      </el-tab-pane>
      <el-tab-pane label="商品属性" @click="tz">
        <p>产品产地</p>
        <el-input v-model="ruleForm.cd" placeholder="请输入商品产地" />
      </el-tab-pane>
      <el-tab-pane label="商品图片" @click="tz">
        <el-upload
          v-model:file-list="fileList"
          class="upload-demo"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          multiple
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :limit="3"
          :on-exceed="handleExceed"
        >
          <el-button type="primary">Click to upload</el-button>
          <template #tip>
            <div class="el-upload__tip">
              只能上传jpg/png文件,且不能超过500kb
            </div>
          </template>
        </el-upload>
      </el-tab-pane>
      <el-tab-pane label="商品属性" @change="tz">
        <el-input
    v-model="textarea"
    :rows="12"
    type="textarea"
    placeholder="请输入内容"
  />    
  <el-form-item >
            <el-button @click="add" type="Primary">确认</el-button>
          </el-form-item>
      </el-tab-pane>
    </el-tabs>
    <!--  -->

 
    
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { splbListApi, tjListApi } from "@/api";

const tabPosition = ref("left");
const active = ref(0);

const next = () => {
  if (active.value++ > 4) active.value = 0;
};

// 表单
const checkList = ref(["selected and disabled", "Option A"]);
let ll = () => {
  console.log("88");
};
let tz = () => {
    if(active.value=0)active.value=0
  if (active.value++ > 4) active.value = 0;
  console.log("88");

  //     if(ll==true){
  //         console.log('88');
};
let textarea=ref('')
// }
// 图片
import { ElMessageBox } from "element-plus";

import type { UploadProps, UploadUserFile } from "element-plus";

import { useRouter } from "vue-router";

const fileList = ref<UploadUserFile[]>([
  {
    name: "element-plus-logo.svg",
    url: "https://element-plus.org/images/element-plus-logo.svg",
  },
  {
    name: "element-plus-logo2.svg",
    url: "https://element-plus.org/images/element-plus-logo.svg",
  },
]);

const handleRemove: UploadProps["onRemove"] = (file, uploadFiles) => {
  console.log(file, uploadFiles);
};

const handlePreview: UploadProps["onPreview"] = (uploadFile) => {
  console.log(uploadFile);
};

const handleExceed: UploadProps["onExceed"] = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${
      files.length + uploadFiles.length
    } totally`
  );
};

const beforeRemove: UploadProps["beforeRemove"] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
    `Cancel the transfer of ${uploadFile.name} ?`
  ).then(
    () => true,
    () => false
  );
};
// 表单
const formSize = ref("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<any>({
  username: "",
  classfly: "",
  num: "",
  price: "",
  zl: "",
});
//
let sp = reactive<any>({
  list: [],
});
// 渲染
let aa = () => {
  splbListApi({
    query: "",
    pagenum: 1,
    pagesize: 10,
  }).then((res: any) => {
    console.log(res);
    sp.list = res.data.data.goods;
  });
};
aa();
// 添加
let router=useRouter()
let add = () => {
  tjListApi({
    goods_name: ruleForm.username,
    goods_cat: ruleForm.classfly,
    goods_price: ruleForm.price,
    goods_number: ruleForm.num,
    goods_weight: ruleForm.zl,
    goods_introduce:textarea.value
  }).then((res: any) => {
    console.log(res);
    aa();
    router.push('/goods')
  });
};
</script>
<style lang="scss" scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
  height: 100%;
}
</style>
