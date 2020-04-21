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
        <div style="margin-top:10px" class="h5-front">
          {{ listDate[0].format("YYYY/MM/DD") }} -
          {{ listDate[6].format("YYYY/MM/DD") }}
        </div>
      </div>
      <!-- 當前時區標準時間 -->
      <div class="h5-front">*時間以 {{ timeZone }} 顯示</div>
    </div>
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
      daysubtract: 0, //與上週日差幾天
      listDate: [], //存一週內的日期
      avaiables: {}
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
    getLastSunday() {
      let locale = this.$i18n.locale === "tw" ? "zh-tw" : "";
      moment.locale(locale);
      let day = moment().format("dd");
      let daysubtract = 0;
      if (day === "Mo" || day === "一") {
        daysubtract = 1;
      } else if (day === "Tu" || day === "二") {
        daysubtract = 2;
      } else if (day === "We" || day === "三") {
        daysubtract = 3;
      } else if (day === "Th" || day === "四") {
        daysubtract = 4;
      } else if (day === "Fr" || day === "五") {
        daysubtract = 5;
      } else if (day === "Sa" || day === "六") {
        daysubtract = 6;
      } else if (day === "Su" || day === "日") {
        daysubtract = 7;
      }
      this.daysubtract = daysubtract;
      // listDate存一週內的日期
      for (let i = 0; i <= 6; i++) {
        this.$set(
          this.listDate,
          i,
          moment()
            .subtract(this.daysubtract, "days")
            .add(i, "days")
        );
      }
    },
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
            .subtract(this.daysubtract, "days")
            .add(i + 7 * this.changeIndex, "days")
        );
      }
    },
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

<style>
h3 {
  color: #02cab9;
}
.h5-front {
  display: block;
  font-size: 14px;
  font-weight: bold;
}
.box-card {
  justify-items: center;
  width: 60%;
  min-width: 400px;
}

.box-card-ul {
  display: flex;
  font-weight: 700;
  justify-content: space-between;
}

.box-card-ul li {
  width: 12%;
  margin: 3px;
  padding-top: 20px;
  list-style: none;
  border-top: #02cab9 4px solid;
}

.box-card .disable {
  width: 12%;
  margin: 3px;
  padding-top: 20px;
  list-style: none;
  color: #c4caca;
  border-top: #c4caca 4px solid !important;
}

.timelist-li {
  list-style: none;
}

.date-style {
  margin: 10px 0 10px 0;
}
.active {
  color: #02cab9;
}

.noActive {
  color: #c4caca;
}
</style>
