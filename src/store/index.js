import Vue from "vue";
import Vuex from "vuex";
import Moment from "moment";
import { extendMoment } from "moment-range";
const moment = extendMoment(Moment);

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    getAPI(context, listData) {
      // 假ａｐｉ response 資料
      let response = {
        available: [
          { start: "2020-04-23T07:00:00Z", end: "2020-04-23T08:00:00Z" },
          { start: "2020-04-23T12:00:00Z", end: "2020-04-23T13:00:00Z" },
          { start: "2020-04-23T14:00:00Z", end: "2020-04-23T16:00:00Z" },
          { start: "2020-04-24T04:30:00Z", end: "2020-04-24T05:00:00Z" },
          { start: "2020-04-24T07:00:00Z", end: "2020-04-24T08:00:00Z" },
          { start: "2020-04-24T09:00:00Z", end: "2020-04-24T16:00:00Z" },
          { start: "2020-04-25T04:00:00Z", end: "2020-04-25T06:00:00Z" },
          { start: "2020-04-25T07:00:00Z", end: "2020-04-25T09:00:00Z" },
          { start: "2020-04-25T11:00:00Z", end: "2020-04-25T14:00:00Z" }
        ],
        booked: [
          { start: "2020-04-23T06:30:00Z", end: "2020-04-23T07:00:00Z" },
          { start: "2020-04-23T08:00:00Z", end: "2020-04-23T09:00:00Z" },
          { start: "2020-04-23T10:00:00Z", end: "2020-04-23T12:00:00Z" },
          { start: "2020-04-23T13:00:00Z", end: "2020-04-23T14:00:00Z" },
          { start: "2020-04-24T04:00:00Z", end: "2020-04-24T04:30:00Z" },
          { start: "2020-04-24T05:00:00Z", end: "2020-04-24T07:00:00Z" },
          { start: "2020-04-24T08:00:00Z", end: "2020-04-24T09:00:00Z" },
          { start: "2020-04-25T06:00:00Z", end: "2020-04-25T07:00:00Z" },
          { start: "2020-04-25T09:00:00Z", end: "2020-04-25T11:00:00Z" }
        ]
      };
      let result = {};
      // result內個別宣告以日期為 key 的 Array
      listData.forEach(item => {
        result[moment(item).format("YYYY-MM-DD")] = [];
      });
      // 可預約時間處理
      response.available.forEach(item => {
        let date = moment(item.start).format("YYYY-MM-DD");
        let start = moment(item.start);
        let end = moment(item.end);
        let range = moment.range(start, end);
        let times = Array.from(
          // 結尾時間不保留
          range.by("hour", { step: 0.5, exclusive: true })
        );
        let acc = times.map(m => m.format("HH:mm"));
        acc.forEach(item => {
          // set result
          result[date].push({ date: item, available: true });
          // 時間重新排序
          result[date] = result[date].sort(function(a, b) {
            return a.date > b.date ? 1 : -1;
          });
        });
      });
      // 不可預約時間處理
      response.booked.forEach(item => {
        let date = moment(item.start).format("YYYY-MM-DD");
        let start = moment(item.start);
        let end = moment(item.end);
        let range = moment.range(start, end);
        let times = Array.from(
          // 結尾時間不保留
          range.by("hour", {
            step: 0.5,
            exclusiveEnd: false
          })
        );
        let acc = times.map(m => m.format("HH:mm"));
        acc.forEach(item => {
          // set result
          result[date].push({ date: item, available: false });
          // 時間重新排序
          result[date] = result[date].sort(function(a, b) {
            return a.date > b.date ? 1 : -1;
          });
        });
      });
      return Object.assign({}, result);
    }
  },
  modules: {}
});
