const cron = require('node-cron');
const request = require('request');

const helper = require('./helpers');

class Schedule {
  constructor() {
    this.getUrl = null;
    this.timezone = 'Asia/Jakarta';
    this.scheduleArr = ['*', '*', '*', '*', '*'];
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
    this.scheduleArr[0] = '*/5';
    this.schedule = this.scheduleArr.join(' ');
    return this;
  }

  everyTenMinutes() {
    this.scheduleArr[0] = '*/10';
    this.schedule = this.scheduleArr.join(' ');
    return this;
  }

  everyFifteenMinutes() {
    this.scheduleArr[0] = '*/15';
    this.schedule = this.scheduleArr.join(' ');
    return this;
  }

  everyThirtyMinutes() {
    this.scheduleArr[0] = '*/30';
    this.schedule = this.scheduleArr.join(' ');
    return this;
  }

  hourly() {
    this.scheduleArr[0] = '0';
    this.schedule = this.scheduleArr.join(' ');
    return this;
  }

  hourlyAt(minute) {
    this.scheduleArr[0] = minute;
    this.schedule = this.scheduleArr.join(' ');
    return this;
  }

  daily() {
    this.scheduleArr[0] = '0';
    this.scheduleArr[1] = '0';
    this.schedule = this.scheduleArr.join(' ');
    return this;
  }

  dailyAt(time) {
    const timeArr = time.split(':');
    const hour = helper.oneDigitInteger(timeArr[0]);
    const minute = helper.oneDigitInteger(timeArr[1]);

    this.scheduleArr[0] = minute;
    this.scheduleArr[1] = hour;
    this.schedule = this.scheduleArr.join(' ');
    return this;
  }

  twiceDaily(oneTime, twoTime) {
    this.scheduleArr[0] = '0';
    this.scheduleArr[1] = `${oneTime},${twoTime}`;
    this.schedule = this.scheduleArr.join(' ');
    return this;
  }

  weekly() {
    this.scheduleArr[0] = '0';
    this.scheduleArr[1] = '0';
    this.scheduleArr[4] = '0';
    this.schedule = this.scheduleArr.join(' ');
    return this;
  }

  weeklyOn(day, time) {
    const timeArr = time.split(':');
    const hour = helper.oneDigitInteger(timeArr[0]);
    const minute = helper.oneDigitInteger(timeArr[1]);

    this.scheduleArr[0] = minute;
    this.scheduleArr[1] = hour;
    this.scheduleArr[2] = day;
    this.schedule = this.scheduleArr.join(' ');
    return this;
  }

  monthly() {
    this.scheduleArr[0] = '0';
    this.scheduleArr[1] = '0';
    this.scheduleArr[2] = '1';
    this.schedule = this.scheduleArr.join(' ');
    return this;
  }

  monthlyOn(date, time) {
    const timeArr = time.split(':');
    const hour = helper.oneDigitInteger(timeArr[0]);
    const minute = helper.oneDigitInteger(timeArr[1]);

    this.scheduleArr[0] = minute;
    this.scheduleArr[1] = hour;
    this.scheduleArr[2] = date;
    this.schedule = this.scheduleArr.join(' ');
    return this;
  }

  quarterly() {
    this.scheduleArr[0] = '0';
    this.scheduleArr[1] = '0';
    this.scheduleArr[2] = '1';
    this.scheduleArr[3] = '*/3';
    this.schedule = this.scheduleArr.join(' ');
    return this;
  }

  yearly() {
    this.scheduleArr[0] = '0';
    this.scheduleArr[1] = '0';
    this.scheduleArr[2] = '1';
    this.scheduleArr[3] = '1';
    this.schedule = this.scheduleArr.join(' ');
    return this;
  }

  weekdays() {
    this.scheduleArr[0] = '0';
    this.scheduleArr[1] = '0';
    this.scheduleArr[4] = '1-5';
    this.schedule = this.scheduleArr.join(' ');
    return this;
  }

  weekends() {
    this.scheduleArr[0] = '0';
    this.scheduleArr[1] = '0';
    this.scheduleArr[4] = '6,0';
    this.schedule = this.scheduleArr.join(' ');
    return this;
  }

  sundays() {
    this.scheduleArr[0] = '0';
    this.scheduleArr[1] = '0';
    this.scheduleArr[4] = 'SUN';
    this.schedule = this.scheduleArr.join(' ');
    return this;
  }

  mondays() {
    this.scheduleArr[0] = '0';
    this.scheduleArr[1] = '0';
    this.scheduleArr[4] = 'MON';
    this.schedule = this.scheduleArr.join(' ');
    return this;
  }

  tuesdays() {
    this.scheduleArr[0] = '0';
    this.scheduleArr[1] = '0';
    this.scheduleArr[4] = 'TUE';
    this.schedule = this.scheduleArr.join(' ');
    return this;
  }

  wednesdays() {
    this.scheduleArr[0] = '0';
    this.scheduleArr[1] = '0';
    this.scheduleArr[4] = 'WED';
    this.schedule = this.scheduleArr.join(' ');
    return this;
  }

  thursdays() {
    this.scheduleArr[0] = '0';
    this.scheduleArr[1] = '0';
    this.scheduleArr[4] = 'THU';
    this.schedule = this.scheduleArr.join(' ');
    return this;
  }

  fridays() {
    this.scheduleArr[0] = '0';
    this.scheduleArr[1] = '0';
    this.scheduleArr[4] = 'FRI';
    this.schedule = this.scheduleArr.join(' ');
    return this;
  }

  saturdays() {
    this.scheduleArr[0] = '0';
    this.scheduleArr[1] = '0';
    this.scheduleArr[4] = 'SAT';
    this.schedule = this.scheduleArr.join(' ');
    return this;
  }

  between(start, end) {
    const startTimeArr = start.split(':');
    const startHour = helper.oneDigitInteger(startTimeArr[0]);
    const startMinute = helper.oneDigitInteger(startTimeArr[1]);

    const endTimeArr = end.split(':');
    const endHour = helper.oneDigitInteger(endTimeArr[0]);
    const endMinute = helper.oneDigitInteger(endTimeArr[1]);

    this.scheduleArr[0] = `${startMinute},${endMinute}`;
    this.scheduleArr[1] = `${startHour},${endHour}`;
    this.schedule = this.scheduleArr.join(' ');
    return this;
  }

  at(time) {
    const timeArr = time.split(':');
    const hour = helper.oneDigitInteger(timeArr[0]);
    const minute = helper.oneDigitInteger(timeArr[1]);

    this.scheduleArr[0] = minute;
    this.scheduleArr[1] = hour;
    this.schedule = this.scheduleArr.join(' ');
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
