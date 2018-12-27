const cron = require('node-cron');
const request = require('request');

const helper = require('./helpers');

class Schedule {
  constructor() {
    this.getUrl = null;
    this.timezone = 'Asia/Jakarta';
    this.schedule = '* * * * *';
  }

  timezone(timezone) {
    this.timezone = timezone;
    return this;
  }

  get(apiUrl) {
    this.getUrl = apiUrl;
    return this;
  }

  cron(customSchedule) {
    this.schedule = customSchedule;
    return this;
  }

  everyMinutes() {
    this.schedule = '* * * * *';
    return this;
  }

  everyFiveMinutes() {
    this.schedule = '*/5 * * * *';
    return this;
  }

  everyTenMinutes() {
    this.schedule = '*/10 * * * *';
    return this;
  }

  everyFifteenMinutes() {
    this.schedule = '*/15 * * * *';
    return this;
  }

  everyThirtyMinutes() {
    this.schedule = '*/30 * * * *';
    return this;
  }

  hourly() {
    this.schedule = '0 * * * *';
    return this;
  }

  hourlyAt(minute) {
    this.schedule = `${minute} * * * *`;
    return this;
  }

  daily() {
    this.schedule = '0 0 * * *';
    return this;
  }

  dailyAt(time) {
    const timeArr = time.split(':');
    const hour = helper.oneDigitInteger(timeArr[0]);
    const minute = helper.oneDigitInteger(timeArr[1]);

    this.schedule = `${minute} ${hour} * * *`;
    return this;
  }

  twiceDaily(oneTime, twoTime) {
    this.schedule = `0 ${oneTime},${twoTime} * * *`;
    return this;
  }

  weekly() {
    this.schedule = '0 0 * * 0';
    return this;
  }

  weeklyOn(day, time) {
    const timeArr = time.split(':');
    const hour = helper.oneDigitInteger(timeArr[0]);
    const minute = helper.oneDigitInteger(timeArr[1]);

    this.schedule = `${minute} ${hour} ${day} * *`;
    return this;
  }

  monthly() {
    this.schedule = '0 0 1 * *';
    return this;
  }

  monthlyOn(date, time) {
    const timeArr = time.split(':');
    const hour = helper.oneDigitInteger(timeArr[0]);
    const minute = helper.oneDigitInteger(timeArr[1]);

    this.schedule = `${minute} ${hour} ${date} * *`;
    return this;
  }

  quarterly() {
    this.schedule = '0 0 1 */3 *';
    return this;
  }

  yearly() {
    this.schedule = '0 0 1 1 *';
    return this;
  }

  weekdays() {
    this.schedule = '0 0 * * 1-5';
    return this;
  }

  weekends() {
    this.schedule = '0 0 * * 6,0';
    return this;
  }

  sundays() {
    this.schedule = '0 0 * * SUN';
    return this;
  }

  mondays() {
    this.schedule = '0 0 * * MON';
    return this;
  }

  tuesdays() {
    this.schedule = '0 0 * * TUE';
    return this;
  }

  wednesdays() {
    this.schedule = '0 0 * * WED';
    return this;
  }

  thursdays() {
    this.schedule = '0 0 * * THU';
    return this;
  }

  fridays() {
    this.schedule = '0 0 * * FRI';
    return this;
  }

  saturdays() {
    this.schedule = '0 0 * * SAT';
    return this;
  }

  run(callback) {
    if (this.getUrl !== null) {
      cron.schedule(this.schedule, () => {
        request
          .get(this.getUrl)
          .on('response', () => {
            callback(`Running rest api from ${this.getUrl} every minutes success.`);
          })
          .on('error', (error) => {
            callback(`Running rest api from ${this.getUrl} every minutes failed with error message: ${error}`);
          });
      }, {
        scheduled: true,
        timezone: this.timezone,
      });
    }
  }
}

module.exports = new Schedule();
