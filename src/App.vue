<template>
  <div id="app">
    <div class="admin-table" v-show="ishiden">
      <div class="titel">
        欢迎来到管理员界面
      </div>
      <div class="login" style="width: 50%;
        margin: 30px auto;">
        <el-form :model="ruleForm2" ref="ruleForm2" class="demo-ruleForm">
          <el-form-item prop="username">
            <el-input v-model="ruleForm2.username" auto-complete="off" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="ruleForm2.password" auto-complete="off" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(ruleForm2.username,ruleForm2.password)">提交</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div @click='testDemo()'>点击</div>
    </div>

    <div class="user-table" v-show="!ishiden">
      <div class="titel">
        欢迎来到用户管理界面
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          label="昵称">
          <template scope="scope">
            <el-icon name="user"></el-icon>
            <span style="margin-left: 10px">{{ scope.row.user }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="账号">
          <template scope="scope">
            <el-icon name="time"></el-icon>
            <span style="margin-left: 10px">{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="密码">
          <template scope="scope">
            <el-icon name="time"></el-icon>
            <span style="margin-left: 10px">{{ scope.row.password }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="收藏">
          <template scope="scope">
            <el-button
              size="small"
              type="success"
              @click="handleLove(scope.$index, scope.row)">查看收藏
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template scope="scope">
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="user-love">
      <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
        <el-table :data="gridData">
          <el-table-column property="comicName" label="漫画名"></el-table-column>
          <el-table-column property="comicType" label="类别"></el-table-column>
          <el-table-column property="comicArea" label="地区"></el-table-column>
        </el-table>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        ishiden: true,
        ruleForm2: {
          username: '',
          password: '',
          love: Array
        },
        tableData: [],
        gridData: [],
        dialogTableVisible: false,
        dialogFormVisible: false,
      };
    },
    methods: {
      testDemo() {
        this.$ajax.post('http://csweb.wbaobei.com.cn/html/pgb/lh_etxlxwscb6_yd.html')
       .then(function (data) {
         console.log(data)
        }) 
        .catch(function (err) {
          if (err) {
            console.log(err)
          }
        });
      },
      submitForm(name, user) {
        var _this = this;
        let params = {
          username: name + "",
          password: user,
        }
        this.$ajax.post(//用户注册
          '/findadmin',
          params,
          {
            hander: {
              'Content-Type': 'application/x-www-form-urlencoded',
            }
          }
        ).then(function (res) {
          if (res.data.length > 0) {
            _this.$message({
              message: '恭喜你，登录成功',
              type: 'success'
            });
            _this.getUsers();
            _this.ishiden = false;
          } else {
            _this.$message.error('检查下账号和密码！');
          }
        }).catch(function (err) {
          if (err) {
            console.log(err)
          }
        });
//          this.$notify.error({
//            title: '错误',
//            message: '这是一条错误的提示消息'
//          });
      },
      getUsers() {
        var _this = this;
        let params = {}
        this.$ajax.post(//用户注册
          '/finduser',
          params,
          {
            hander: {
              'Content-Type': 'application/x-www-form-urlencoded',
            }
          }
        ).then(function (res) {
          if (res.data.length > 0) {
            _this.tableData = res.data;
          }
        }).catch(function (err) {
          if (err) {
            console.log(err)
          }
        });
      },
      resetForm(formName){
        this.$refs[formName].resetFields();
      },
      handleLove(index, row) {
        this.dialogTableVisible = true
        var _this = this;
        let params = {
          user: row.user
        }
        this.$ajax.post(//用户注册
          '/findlove',
          params,
          {
            hander: {
              'Content-Type': 'application/x-www-form-urlencoded',
            }
          }
        ).then(function (res) {
          _this.gridData = res.data;
        }).catch(function (err) {
          if (err) {
            console.log(err)
          }
        });
      },
      handleDelete(index, row) {
        var _this = this;
        let params = {
          user: row.user
        }
        this.$ajax.post(//用户注册
          '/deleuser',
          params,
          {
            hander: {
              'Content-Type': 'application/x-www-form-urlencoded',
            }
          }
        ).then(function (res) {
          if (res.data.ok === 1) {
            _this.$message({
              message: '删除成功',
              type: 'success'
            });
            _this.getUsers();
          }
        }).catch(function (err) {
          if (err) {
            console.log(err)
          }
        });
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  #app {
    .user-table {
      .titel {
        font-size: 40px;
        font-weight: bold;
        text-align: center;
        margin-top: 50px;
      }
      .login {
        width: 50%;
        margin: 30px auto;
        .el-form-item__content {
          margin-left: 5px;
          margin-right: 5px;
        }
      }
    }
    .admin-table {
      .titel {
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        margin-top: 50px;
        margin-bottom: 30px;
      }
    }
    .el-dialog--small {
      width: 70%;
    }
  }
</style>
