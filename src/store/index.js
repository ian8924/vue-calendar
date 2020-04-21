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
      let result = {};
      // 宣告以日期為 key 的 Array
      listData.forEach(item => {
        result[moment(item).format("YYYY-MM-DD")] = [];
      });
      // 假ａｐｉ資料
      let response = {
        available: [
          { start: "2020-04-22T02:00:00Z", end: "2020-04-22T03:00:00Z" },
          { start: "2020-04-22T04:30:00Z", end: "2020-04-22T05:00:00Z" },
          { start: "2020-04-23T01:00:00Z", end: "2020-04-23T01:30:00Z" },
          { start: "2020-04-23T04:30:00Z", end: "2020-04-23T05:00:00Z" },
          { start: "2020-04-23T06:00:00Z", end: "2020-04-23T06:30:00Z" },
          { start: "2020-04-24T01:00:00Z", end: "2020-04-24T08:00:00Z" }
        ],
        booked: [
          { start: "2020-04-21T10:30:00Z", end: "2020-04-21T16:00:00Z" },
          { start: "2020-04-22T03:00:00Z", end: "2020-04-22T04:30:00Z" },
          { start: "2020-04-22T05:00:00Z", end: "2020-04-22T07:30:00Z" },
          { start: "2020-04-22T08:00:00Z", end: "2020-04-22T15:00:00Z" },
          { start: "2020-04-23T01:30:00Z", end: "2020-04-23T04:30:00Z" },
          { start: "2020-04-23T05:00:00Z", end: "2020-04-23T06:00:00Z" },
          { start: "2020-04-23T06:30:00Z", end: "2020-04-23T07:30:00Z" },
          { start: "2020-04-24T08:00:00Z", end: "2020-04-24T14:00:00Z" }
        ]
      };
      //
      response.available.forEach(item => {
        let date = moment(item.start).format("YYYY-MM-DD");
        let start = moment(item.start);
        let end = moment(item.end);
        let range = moment.range(start, end);
        let times = Array.from(range.by("hour", { step: 0.5 }));
        let acc = times.map(m => m.format("HH:mm"));
        acc.forEach(item => {
          result[date].push({ date: item, available: true });
          result[date] = result[date].sort(function(a, b) {
            return a.date > b.date ? 1 : -1;
          });
        });
      });
      response.booked.forEach(item => {
        let date = moment(item.start).format("YYYY-MM-DD");
        let start = moment(item.start);
        let end = moment(item.end);
        let range = moment.range(start, end);
        let times = Array.from(range.by("hour", { step: 0.5 }));
        let acc = times.map(m => m.format("HH:mm"));
        acc.forEach(item => {
          result[date].push({ date: item, available: false });
          result[date] = result[date].sort(function(a, b) {
            return a.date > b.date ? 1 : -1;
          });
        });
      });
      // result = result.sort(function(a, b) {
      //   return a.date > b.date ? 1 : -1;
      // });
      return Object.assign({}, result);
    }
  },
  modules: {}
});
