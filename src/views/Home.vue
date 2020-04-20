<template>
  <div class="home">
    {{ message }}
    <Select v-model="lanuage" :options="lanuageList"></Select>
  </div>
</template>

<script>
import Select from "@/components/base/select";
export default {
  name: "Home",
  components: { Select },
  data() {
    return {
      lanuage: "tw"
    };
  },
  computed: {
    message() {
      return this.$t("message");
    },
    lanuageList() {
      return [
        { label: "中文", value: "tw" },
        { label: "ENGLISH", value: "en" }
      ];
    }
  },
  watch: {
    lanuage(val) {
      this.$i18n.locale = val;
    }
  }
};
</script>
