<template>
  <div class="home">
    {{ message }}
    <Select v-model="lanuage" :options="lanuageList"></Select>
    <CardCalendar :lanuage="lanuage"></CardCalendar>
  </div>
</template>

<script>
import Select from "@/components/base/select";
import CardCalendar from "@/components/Card/CardCalendar";

export default {
  name: "Home",
  components: { Select, CardCalendar },
  data() {
    return {
      lanuage: "tw" // 初始語言
    };
  },
  computed: {
    message() {
      return this.$t("message");
    },
    // 可選語言
    lanuageList() {
      return [
        { label: "中文", value: "tw" },
        { label: "ENGLISH", value: "en" }
      ];
    }
  },
  watch: {
    // 切換語言
    lanuage(val) {
      this.$i18n.locale = val;
    }
  }
};
</script>
