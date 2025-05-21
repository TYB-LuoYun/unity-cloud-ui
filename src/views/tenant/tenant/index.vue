<script setup>
import { ref, reactive, watch, onMounted } from "vue";
import * as constants from "./js/constants";
import { pageList, get, update, del, add } from "@/api/tenant/tenant";
import { menuTemplateList } from "@/api/tenant/menu";
import { ElMessage, ElMessageBox } from "element-plus"; // 需要 Element Plus 支持

// 校验手机号函数
const validatePhone = (rule, value, callback) => {
  const reg =
    /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/;
  if (!value) {
    callback(new Error("请输入手机号"));
  } else if (!reg.test(value)) {
    callback(new Error("手机号格式错误"));
  } else {
    callback();
  }
};

// state
const tableConstants = constants;
const total = ref(0);
const showSearch = ref(true);

const listQuery = reactive({
  tenantCode: undefined,
  menuTemplateId: undefined,
  tenantName: undefined,
  keyword: undefined,
  pageNo: 1,
  pageSize: 10
});

const loading = ref(false);
const list = ref([]);
const selectionList = ref([]);
const open = ref(false);
const form = reactive({});
const title = ref("添加租户");
const menuTemplateData = reactive({});

// 表单校验规则
const rules = reactive({
  tenantName: [
    { required: true, message: "租户名称不能为空", trigger: "blur" }
  ],
  tenantCode: [
    { required: true, message: "租户编码不能为空", trigger: "blur" }
  ],
  username: [{ required: true, message: "管理账号不能为空", trigger: "blur" }],
  password: [{ required: true, message: "登录密码不能为空", trigger: "blur" }],
  level: [{ required: true, message: "租户等级不能为空", trigger: "blur" }],
  menuTemplateId: [
    { required: true, message: "菜单模板不能为空", trigger: "blur" }
  ],
  mobile: [{ required: true, validator: validatePhone, trigger: "blur" }]
});

// 表单 ref，用于调用validate等方法
const formRef = ref(null);

// 方法区
const selectionChange = val => {
  console.log("selectionChange", val);
  selectionList.value = val;
};

const selectionAll = val => {
  console.log("selectionAll", val);
  selectionList.value = val;
};

const handleSizeChange = val => {
  console.log("handleSizeChange", val);
  listQuery.pageNo = 1;
  listQuery.pageSize = val;
  pageListApi();
};

const handleCurrentChange = val => {
  console.log("handleCurrentChange", val);
  listQuery.pageNo = val;
  pageListApi();
};

const pageListApi = async () => {
  loading.value = true;
  try {
    const response = await pageList(listQuery);
    list.value = response.data.records;
    total.value = response.data.total;
  } finally {
    loading.value = false;
  }
};

const handleQuery = () => {
  pageListApi();
};

const resetQuery = () => {
  Object.assign(listQuery, {
    tenantCode: undefined,
    menuTemplateId: undefined,
    tenantName: undefined,
    keyword: undefined,
    pageNo: 1,
    pageSize: 10
  });
  pageListApi();
};

const handleAdd = () => {
  title.value = "新增租户";
  open.value = true;
  resetForm();
};

const handleUpdate = async row => {
  resetForm();
  try {
    const response = await get(row.id);
    Object.assign(form, response.data);
    form.level = form.level + "";
    title.value = "修改租户";
    open.value = true;
  } catch (err) {
    console.error(err);
  }
};

const submitForm = () => {
  formRef.value.validate(async valid => {
    if (valid) {
      try {
        if (form.id !== undefined) {
          await update(form);
          ElMessage.success("修改成功");
        } else {
          await add(form);
          ElMessage.success("新增成功");
        }
        open.value = false;
        pageListApi();
      } catch (err) {
        console.error(err);
      }
    }
  });
};

const handleDelete = row => {
  ElMessageBox.confirm(
    `是否确认删除名称为【${row.tenantName}】的数据项?`,
    "警告",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    }
  )
    .then(async () => {
      await del(row.id);
      ElMessage.success("删除成功");
      pageListApi();
    })
    .catch(() => {});
};

const cancel = () => {
  open.value = false;
  resetForm();
};

const resetForm = () => {
  Object.assign(form, { id: undefined });
  formRef.value && formRef.value.resetFields();
};

const menuTemplateListApi = async () => {
  try {
    const response = await menuTemplateList();
    Object.assign(menuTemplateData, response.data);
  } catch (err) {
    console.error(err);
  }
};

// 组件挂载后加载数据
onMounted(() => {
  pageListApi();
  menuTemplateListApi();
});
</script>

<template>
  
</template>

<style scoped>
:deep(.el-tabs__nav-wrap)::after {
  height: 1px;
}

:deep(.el-tabs__nav-next),
:deep(.el-tabs__nav-prev) {
  font-size: 16px;
  color: var(--el-text-color-primary);
}

:deep(.el-tabs__nav-next.is-disabled),
:deep(.el-tabs__nav-prev.is-disabled) {
  opacity: 0.5;
}
</style>
