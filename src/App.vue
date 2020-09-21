<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
.table-bg{
  background-color: #fff;
  padding: 10px;
  margin: 20px 0;
}
.el-dialog__header{
  border-bottom: 1px solid #ccc!important;
}
</style>
