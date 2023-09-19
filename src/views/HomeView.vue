<template>
  <div>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
    >
      <!-- 用户名 -->
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" placeholder="请输入用户名" />
      </el-form-item>
      <!-- 密码 -->
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="ruleForm.password"
          type="password"
          placeholder="请输入密码"
          show-password
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          登录
        </el-button>
        <el-button @click="resetForm" type="info">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 登录 -->
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { loginApi } from "@/api";
import { useRouter } from "vue-router";

interface RuleForm {
  username: string;
  password: string;
}

const formSize = ref("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
  username: "",
  password: "",
});
// 正则验证
const rules = reactive<FormRules<RuleForm>>({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" },
    { min: 5, max:20, message: '您输入的用户名字符要在5-20位之间', trigger: 'blur' },],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 3, max: 6, message: '密码在3-6位之间', trigger: 'blur' },
  ],
});
// 登录
let router = useRouter();
const submitForm = async (formEl: FormInstance | undefined) => {
  if (ruleForm.username == "" && ruleForm.password == "") {
    ElMessage.error("用户名或密码错误");
  }
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
      loginApi({
        username: ruleForm.username,
        password: ruleForm.password,
      }).then((res: any) => {
        console.log(res);
        if (res.data.meta.status == 200) {
          localStorage.setItem("token", res.data.data.token);
          ElMessage({
            message: res.data.meta.msg,
            type: "success",
          });
          router.push("/welcome");
        } else {
          ElMessage.error(res.data.meta.msg);
        }
      });
    } else {
      console.log("error submit!", fields);
    }
  });
};
// 重置
let resetForm = () => {
  ruleForm.username = "";
  ruleForm.password = "";
};
</script>
<style lang="scss" scoped></style>
