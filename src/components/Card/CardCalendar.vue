<template>
  <el-card class="box-card">
    <!-- 授課日期title -->
    <h3>{{ title }}</h3>
    <div style="display:flex;justify-content:space-between">
      <div>
        <!-- 往前往後按鈕 -->
        <el-button-group>
          <el-button
            type="info"
            icon="el-icon-arrow-left"
            size="mini"
            :disabled="changeIndex === 0"
            @click="changeWeek('pre')"
          ></el-button>
          <el-button
            type="info"
            size="mini"
            icon="el-icon-arrow-right"
            @click="changeWeek('next')"
          >
          </el-button>
        </el-button-group>
        <!-- 日期期間 -->
      </div>
    </div>
    <div style="margin-top:10px" class="h5-front">
      {{ listDate[0].format("YYYY/MM/DD") }} -
      {{ listDate[6].format("YYYY/MM/DD") }}
    </div>
    <!-- 當前時區標準時間 -->
    <div class="h5-front">*時間以 {{ timeZone }} 顯示</div>
    <div style="width:90%">
      <ul class="box-card-ul">
        <li
          v-for="(item, index) in listDate"
          :key="index"
          :class="{ disable: beforeToday(listDate[index]) }"
        >
          <!-- 星期幾 -->
          {{ listDate[index].format("dd") }}
          <div class="date-style">
            <!-- 日期 -->
            {{ listDate[index].format("DD") }}
          </div>
          <!-- 時間 -->
          <div v-if="!beforeToday(listDate[index])">
            <div
              v-for="item2 in avaiables[listDate[index].format('YYYY-MM-DD')]"
              :key="item2.index"
              style="margin-bottom:2px;"
              :class="{ active: item2.available, noActive: !item2.available }"
            >
              {{ item2.date }}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </el-card>
</template>

<script>
import moment from "moment";
export default {
  name: "CardCalendar",
  props: {
    lanuage: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      changeIndex: 0, //改變周次計數
      daySubtract: 0, //與當週日差幾天
      listDate: [], //存一週內的日期
      avaiables: {} //  { "2020-04-19" : [ {date:"5:30",available:true} ] }
    };
  },
  computed: {
    // 授課時間標題
    title() {
      return this.$t("teachTime");
    },
    // 取得 LocalTimezone
    timeZone() {
      var split = new Date().toString().split(" ");
      var timeZoneFormatted =
        split[split.length - 2] + " " + split[split.length - 1];
      return timeZoneFormatted;
    }
  },
  watch: {
    lanuage() {
      this.getLastSunday();
    }
  },
  async created() {
    this.getLastSunday();
    this.avaiables = await this.$store.dispatch("getAPI", this.listDate);
  },
  methods: {
    // 取得當週禮拜天日期 ＆ 設定當週日期
    getLastSunday() {
      let locale = this.$i18n.locale === "tw" ? "zh-tw" : "";
      moment.locale(locale);
      let day = moment().format("dd");
      let daySubtract = 0;
      if (day === "Mo" || day === "一") {
        daySubtract = 1;
      } else if (day === "Tu" || day === "二") {
        daySubtract = 2;
      } else if (day === "We" || day === "三") {
        daySubtract = 3;
      } else if (day === "Th" || day === "四") {
        daySubtract = 4;
      } else if (day === "Fr" || day === "五") {
        daySubtract = 5;
      } else if (day === "Sa" || day === "六") {
        daySubtract = 6;
      } else if (day === "Su" || day === "日") {
        daySubtract = 7;
      }
      this.daySubtract = daySubtract;
      // listDate存一週內的日期
      for (let i = 0; i <= 6; i++) {
        this.$set(
          this.listDate,
          i,
          moment()
            .subtract(this.daySubtract, "days")
            .add(i, "days")
        );
      }
    },
    // 改變周次
    changeWeek(val) {
      if (val === "pre") {
        this.changeIndex--;
      } else {
        this.changeIndex++;
      }
      for (let i = 0; i <= 6; i++) {
        this.$set(
          this.listDate,
          i,
          moment()
            .subtract(this.daySubtract, "days")
            .add(i + 7 * this.changeIndex, "days")
        );
        // 切換後打API
        // this.avaiables = this.$store.dispatch("getAPI", this.listDate);
      }
    },
    // 當天日期判斷
    beforeToday(val) {
      // 今天以前都是true
      let select = val.valueOf();
      let now = moment()
        .subtract(1, "days")
        .valueOf();
      return select <= now;
    }
  }
};
</script>

<style></style>
