<template>
  <el-select v-model="select" :placeholder="placeholder" @change="change">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    placeholder: {
      type: String,
      default: "請選擇"
    },
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      select: null
    };
  },
  mounted() {
    this.select = this.value;
  },
  methods: {
    change() {
      this.$emit("input", this.select);
    }
  }
};
</script>
