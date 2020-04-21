<template>
  <el-card class="box-card">
    <h3>{{ title }}</h3>
    <div style="display:flex;justify-content:space-between">
      <el-button-group>
        <el-button
          type="info"
          icon="el-icon-arrow-left"
          size="mini"
          disabled
        ></el-button>
        <el-button type="info" size="mini" icon="el-icon-arrow-right">
        </el-button>
      </el-button-group>
      <div class="h5-front">*時間以 {{ timeZone }} 顯示</div>
    </div>
    <div style="width:90%">
      <ul class="box-card-ul">
        <li class="disable">日</li>
        <li>
          一
          <div class="date-style">12</div>
          <div>5:00</div>
          <div>5:00</div>
          <div>6:00</div>
          <div>7:00</div>
          <div>5:00</div>
          <div>5:00</div>
          <div>5:00</div>
        </li>
        <li>二</li>
        <li>三</li>
        <li>四</li>
        <li>五</li>
        <li class="disable">六</li>
      </ul>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "CardCalendar",
  computed: {
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
  methods: {
    getDate() {
      console.log(this.DateTime);
    }
  }
};
</script>

<style>
h3 {
  color: #02cab9;
}
h5-front {
  display: block;
  font-size: 0.83em;
  font-weight: bold;
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
</style>
