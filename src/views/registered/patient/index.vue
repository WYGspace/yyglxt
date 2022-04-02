<!--患者管理与导诊-->
<template>
  <div>
    <div>
      <h3>患者资料</h3>
    </div>
    <el-row :gutter="15">
      <el-form ref="mainForm" :model="mainForm"
        :rules="rules" size="medium" label-width="100px"
      >
        <el-col :span="12">
          <el-form-item label="卡号" prop="card">
            <el-input v-model="mainForm.card" placeholder="请输入卡号" clearable :disabled="mainFormDisabled" :style="{ width: '100%' }"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="姓名" prop="pName">
            <el-input v-model="mainForm.pName" placeholder="请输入姓名" clearable :disabled="mainFormDisabled" :style="{ width: '100%' }"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别" prop="pSex">
            <el-radio-group v-model="mainForm.pSex" size="medium" :disabled="mainFormDisabled">
              <el-radio v-for="(item, index) in pSexOptions" :key="index" :label="item.value" :disabled="item.disabled">{{ item.label }}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出生日期" prop="birthDate">
            <el-date-picker v-model="mainForm.birthDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" :style="{ width: '100%' }" placeholder="请选择出生日期" clearable :disabled="mainFormDisabled"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="身份证号" prop="idCard">
            <el-input v-model="mainForm.idCard" placeholder="请输入身份证号" :disabled="mainFormDisabled"
              show-word-limit clearable :maxlength="18" :style="{ width: '100%' }"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="mainForm.phone" placeholder="请输入手机号" clearable :disabled="mainFormDisabled"
              :maxlength="11" show-word-limit :style="{ width: '100%' }">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="联系地址" prop="address">
            <el-input v-model="mainForm.address" placeholder="请输入联系地址" :disabled="mainFormDisabled"
              clearable :style="{ width: '100%' }"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="过敏药物" prop="drugAllergyId">
            <el-select v-model="mainForm.drugAllergyId" placeholder="请输入过敏药物" multiple :disabled="mainFormDisabled"
              filterable clearable :style="{ width: '100%' }">
              <el-option v-for="(item, index) in drugAllergyOptions"
                :key="index" :label="item.dName" :value="item.id" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="本院职工" prop="worker">
            <el-switch v-model="mainForm.worker" :disabled="mainFormDisabled"></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item size="large">
            <el-button v-show="!(insertShow || updateShow)" type="primary" @click="dialogTable()">查询</el-button>
            <el-button v-show="!insertShow && !updateShow" type="info" @click="insertBtn">新增</el-button>
            <el-button v-show="!insertShow && !updateShow" type="warning" @click="updateBtn">修改</el-button>
            <el-button v-show="insertShow || updateShow" type="success" @click="saveBtn">保存</el-button>
            <el-button v-show="!(insertShow || updateShow)" type="danger">删除</el-button>
            <el-button v-show="insertShow || updateShow" @click="resetForm">重置</el-button>
            <el-button v-show="insertShow || updateShow" @click="cancel">取消</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    
    <el-dialog title="患者资料" :visible.sync="dialogTableVisible">
      <el-form ref="selectForm" :inline="true" :model="selectForm"  class="demo-form-inline">
        <el-form-item label="卡号" prop="card">
          <el-input v-model="selectForm.card" placeholder="卡号" clearable></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="pName">
          <el-input v-model="selectForm.pName" placeholder="姓名" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getDialogTable()">查询</el-button>
          <el-button @click="resetForm2">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" height="250" border highlight-current-row v-loading="loading" @row-dblclick="rowDblclick">
        <el-table-column type="index" label="序号" width="50" fixed align="center"></el-table-column>
        <el-table-column property="card" label="卡号" width="120"></el-table-column>
        <el-table-column property="pName" label="姓名" width="100" fixed></el-table-column>
        <el-table-column property="pSex" label="性别" width="50"></el-table-column>
        <el-table-column property="birthDate" label="出生日期" width="100"></el-table-column>
        <el-table-column property="idCard" label="身份证号" width="180"></el-table-column>
        <el-table-column property="phone" label="手机号" width="120"></el-table-column>
        <el-table-column property="drugAllergyIdStr" label="过敏药物" width="150"></el-table-column>
        <el-table-column property="worker" label="本院职工" width="80"></el-table-column>
        <el-table-column property="address" label="联系地址" width="200"></el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalData">
        </el-pagination>
      </div>
      <span class="demonstration">注：双击数据，则自动回填数据</span>
      <!-- <el-button :loading="loading" @click="loading1()">测试</el-button> -->
    </el-dialog>
  </div>
</template>
<script>
import { parseTime } from '@/utils';
import axios from "axios";

export default {
  components: {},
  props: [],
  data() {
    return {
      // mainForm表单输入框禁用状态
      mainFormDisabled: true,
      // 新增按钮切换
      insertShow: false,
      // 修改按钮切换
      updateShow: false,
      // 加载层
      loading: false,
      // 临时的主要的表单
      mainFormTemporary: {},
      // 主要的表单
      mainForm: {
        card: "",
        pName: undefined,
        pSex: "",
        birthDate: null,
        idCard: "",
        phone: "",
        address: undefined,
        drugAllergyId: [],
        worker: false,
      },
      // 校验数据
      rules: {
        card: [
          {
            required: true,
            message: "请输入卡号",
            trigger: "blur",
          },
        ],
        pName: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur",
          },
        ],
        pSex: [
          {
            required: true,
            message: "性别不能为空",
            trigger: "change",
          },
        ],
        birthDate: [
          {
            required: true,
            message: "请选择出生日期",
            trigger: "change",
          },
        ],
        idCard: [
          {
            required: true,
            message: "请输入身份证号",
            trigger: "blur",
          },
        ],
        phone: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          },
        ],
        address: [],
        drugAllergyId: [],
      },
      // 单选宽
      pSexOptions: [
        {
          label: "男",
          value: "男",
        },
        {
          label: "女",
          value: "女",
        },
      ],
      // 过敏药物下拉框数据
      drugAllergyOptions: [],
      // 表格数据
      tableData: [],
      // 打开患者资料弹窗
      dialogTableVisible: false,
      // 筛选表格数据的表单
      selectForm: {
        card: "",
        pName: "",
      },
      // 总数
      totalData: 0,
      // 当前页数
      currentPage: 1,
      // 每页条数
      pageSize: 5,
      // 每页条数数组
      pageSizes: [5, 10, 15, 20]

    };
  },
  computed: {},
  watch: {},
  created() {},
  // 数据初始化
  mounted() {//这里 有问题
    axios.post('/api/patients/selectData').then(
      Response => {
        // 初始化下拉框--过敏药物
        this.drugAllergyOptions = Response.data;
      },
      error => {
        console.log("请求失败",error);
      }
    )
  },
  methods: {
    // 提交
    submitForm() {
      this.$refs["mainForm"].validate((valid) => {
        if (!valid) return;
        // TODO 提交表单
      });
    },
    // 重置
    resetForm() {
      this.$refs["mainForm"].resetFields();
    },
    // 重置
    resetForm2() {
      this.$refs["selectForm"].resetFields();
    },
    // 切换每页条数
    handleSizeChange(val) {
      // 赋值
      this.pageSize = val;
      // 打开表格加载层
      this.loading = true;
      axios.post(`/api/patients/tableData?card=${this.selectForm.card}&pName=${this.selectForm.pName}&page=${this.currentPage}&limit=${val}`).then(
        Response => {
          // 处理请求返回的数据
          this.processDataReq(Response.data);
          this.tableData = Response.data;
          // 模拟网络请求
          setTimeout(()=>{
            // 关闭表格加载层
            this.loading = false;
          },500)
          // console.log(Response.data);
        },
        error => {
          console.log("请求失败");
        }
      )
      // console.log(`每页 ${val} 条`);
    },
    // 切换当前页数
    handleCurrentChange(val) {
      // 赋值
      this.currentPage = val;
      // 打开表格加载层
      this.loading = true;
      axios.post(`/api/patients/tableData?card=${this.selectForm.card}&pName=${this.selectForm.pName}&page=${val}&limit=${this.pageSize}`).then(
        Response => {
          // 处理请求返回的数据
          this.processDataReq(Response.data);
          this.tableData = Response.data;
          // 模拟网络请求
          setTimeout(()=>{
            // 关闭表格加载层
            this.loading = false;
          },500)
          // console.log(Response.data);
        },
        error => {
          console.log("请求失败");
        }
      )
      // console.log(`当前页: ${val}`);
    },
    // 打开弹窗
    dialogTable(){
      // 获取服务请求的表格数据
      this.getDialogTable();
      // 打开弹窗
      this.dialogTableVisible = true;
    },
    // 获取服务请求的表格数据
    getDialogTable(){
      // 打开表格加载层
      this.loading = true;
      axios.post(`/api/patients/tableCount?card=${this.selectForm.card}&pName=${this.selectForm.pName}`).then(
        Response => {
          // 赋值：表格总数据
          this.totalData = Response.data;
          axios.post(`/api/patients/tableData?card=${this.selectForm.card}&pName=${this.selectForm.pName}&page=${this.currentPage}&limit=${this.pageSize}`).then(
            Response => {
              // 处理请求返回的数据
              this.processDataReq(Response.data);
              this.tableData = Response.data;
              // 模拟网络请求
              setTimeout(()=>{
                // 关闭表格加载层
                this.loading = false;
              },500)
              // console.log(Response.data);
            },
            error => {
              console.log("请求失败");
            }
          )
        },
        error => {
          console.log("请求失败");
        }
      )
    },
    // 处理请求返回的数据
    processDataReq(data){
      data.forEach(list => {
        if(list.pSex == 1){
          list.pSex = '男';
        } else if(list.pSex == 0) {
          list.pSex = '女';
        }
        if(list.worker == 1){
          list.worker = true;
        } else if(list.worker == 0) {
          list.worker = false;
        }
        list.birthDate = parseTime(list.birthDate,"{y}-{m}-{d}");
        if(list.drugAllergyId != null){
          list.drugAllergyId = list.drugAllergyId.split(",").map(Number);
          // 创建一个用于存储过敏药物的字符串类型的字段
          list.drugAllergyIdStr = '';
          // 从已有的过敏药物的数据中过滤指定的数据
          this.drugAllergyOptions.forEach(str => {
            // 若存在，则添加
            if(list.drugAllergyId.indexOf(str.id) != -1){
              list.drugAllergyIdStr += str.dName + "，";
            }
          })
          // 使用正则去掉最后的符号“，”
          list.drugAllergyIdStr = list.drugAllergyIdStr.replace(/，$/,"");
        }
      })
    },
    // 表格双击事件
    rowDblclick(row, column, event){
      // 回填数据
      this.mainForm = row;
      // 关闭弹窗
      this.dialogTableVisible = false;
    },
    // 新增按钮 
    insertBtn(){
      this.mainFormTemporary = {...this.mainForm};
      // this.mainFormTemporary = JSON.parse(JSON.stringify(this.mainForm));
      this.insertShow = !this.insertShow;
      this.resetForm();
      this.mainFormDisabled = !this.mainFormDisabled;
    },
    // 修改按钮
    updateBtn(){
      this.mainFormTemporary = {...this.mainForm};
      this.updateShow = !this.updateShow;
      // this.resetForm();
      this.mainFormDisabled = !this.mainFormDisabled;
    },
    // 保存按钮
    saveBtn(){
      if(this.insertShow){
        this.insertShow = !this.insertShow;
      }
      if(this.updateShow){
        this.updateShow = !this.updateShow;
      }
      this.mainFormDisabled = !this.mainFormDisabled;
    },
    // 取消按钮
    cancel(){
      if(this.insertShow){
        this.insertShow = !this.insertShow;
      }
      if(this.updateShow){
        this.updateShow = !this.updateShow;
      }
      this.mainFormDisabled = !this.mainFormDisabled;
      this.mainForm = this.mainFormTemporary;
    }
  },
};
</script>
<style>
</style>
