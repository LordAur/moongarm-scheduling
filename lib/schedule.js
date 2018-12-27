const cron = require('node-cron');
const request = require('request');

const helper = require('./helpers');

class Schedule {
  constructor() {
    this.status = null;
    this.callFunction = null;
    this.getUrl = null;
    this.postUrl = null;
    this.putUrl = null;
    this.timezone = 'Asia/Jakarta';
    this.scheduleArr = ['*', '*', '*', '*', '*'];
    this.schedule = '* * * * *';
  }

  timezone(timezone) {
    this.timezone = timezone;
    return this;
  }

  call(callFunction) {
    this.callFunction = callFunction;
    return this;
  }

  get(apiUrl) {
    this.getUrl = apiUrl;
    return this;
  }

  post(apiUrl) {
    this.postUrl = apiUrl;
    return this;
  }

  cron(customSchedule) {
    this.schedule = customSchedule;
    return this;
  }

  everyMinutes() {
    this.schedule = '* * * * *';
    this.status = 'every minutes';
    return this;
  }

  everyFiveMinutes() {
    this.scheduleArr[0] = '*/5';
    this.schedule = this.scheduleArr.join(' ');
    this.status = 'every five minutes';
    return this;
  }

  everyTenMinutes() {
    this.scheduleArr[0] = '*/10';
    this.schedule = this.scheduleArr.join(' ');
    this.status = 'every ten minutes';
    return this;
  }

  everyFifteenMinutes() {
    this.scheduleArr[0] = '*/15';
    this.schedule = this.scheduleArr.join(' ');
    this.status = 'every fifteen minutes';
    return this;
  }

  everyThirtyMinutes() {
    this.scheduleArr[0] = '*/30';
    this.schedule = this.scheduleArr.join(' ');
    this.status = 'every thirty minutes';
    return this;
  }

  hourly() {
    this.scheduleArr[0] = '0';
    this.schedule = this.scheduleArr.join(' ');
    this.status = 'every hourly';
    return this;
  }

  hourlyAt(minute) {
    this.scheduleArr[0] = minute;
    this.schedule = this.scheduleArr.join(' ');
    this.status = `every hourly at ${minute}`;
    return this;
  }

  daily() {
    this.scheduleArr[0] = '0';
    this.scheduleArr[1] = '0';
    this.schedule = this.scheduleArr.join(' ');
    this.status = 'everyday';
    return this;
  }

  dailyAt(time) {
    const timeArr = time.split(':');
    const hour = helper.oneDigitInteger(timeArr[0]);
    const minute = helper.oneDigitInteger(timeArr[1]);

    this.scheduleArr[0] = minute;
    this.scheduleArr[1] = hour;
    this.schedule = this.scheduleArr.join(' ');
    this.status = `everyday at ${time}`;
    return this;
  }

  twiceDaily(oneTime, twoTime) {
    this.scheduleArr[0] = '0';
    this.scheduleArr[1] = `${oneTime},${twoTime}`;
    this.schedule = this.scheduleArr.join(' ');
    this.status = `everyday at ${oneTime}:00 and ${twoTime}:00`;
    return this;
  }

  weekly() {
    this.scheduleArr[0] = '0';
    this.scheduleArr[1] = '0';
    this.scheduleArr[4] = '0';
    this.schedule = this.scheduleArr.join(' ');
    this.status = 'everyweek';
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
    this.status = `everyweek on day ${day} at ${time}`;
    return this;
  }

  monthly() {
    this.scheduleArr[0] = '0';
    this.scheduleArr[1] = '0';
    this.scheduleArr[2] = '1';
    this.schedule = this.scheduleArr.join(' ');
    this.status = 'every month';
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
    this.status = `every month on ${date} at ${time}`;
    return this;
  }

  quarterly() {
    this.scheduleArr[0] = '0';
    this.scheduleArr[1] = '0';
    this.scheduleArr[2] = '1';
    this.scheduleArr[3] = '*/3';
    this.schedule = this.scheduleArr.join(' ');
    this.status = 'every quarter';
    return this;
  }

  yearly() {
    this.scheduleArr[0] = '0';
    this.scheduleArr[1] = '0';
    this.scheduleArr[2] = '1';
    this.scheduleArr[3] = '1';
    this.schedule = this.scheduleArr.join(' ');
    this.status = 'every year';
    return this;
  }

  weekdays() {
    this.scheduleArr[0] = '0';
    this.scheduleArr[1] = '0';
    this.scheduleArr[4] = '1-5';
    this.schedule = this.scheduleArr.join(' ');
    this.status = 'everyweek days';
    return this;
  }

  weekends() {
    this.scheduleArr[0] = '0';
    this.scheduleArr[1] = '0';
    this.scheduleArr[4] = '6,0';
    this.schedule = this.scheduleArr.join(' ');
    this.status = 'everyweek ends';
    return this;
  }

  sundays() {
    this.scheduleArr[0] = '0';
    this.scheduleArr[1] = '0';
    this.scheduleArr[4] = 'SUN';
    this.schedule = this.scheduleArr.join(' ');
    this.status = 'every sunday';
    return this;
  }

  mondays() {
    this.scheduleArr[0] = '0';
    this.scheduleArr[1] = '0';
    this.scheduleArr[4] = 'MON';
    this.schedule = this.scheduleArr.join(' ');
    this.status = 'every monday';
    return this;
  }

  tuesdays() {
    this.scheduleArr[0] = '0';
    this.scheduleArr[1] = '0';
    this.scheduleArr[4] = 'TUE';
    this.schedule = this.scheduleArr.join(' ');
    this.status = 'every tuesday';
    return this;
  }

  wednesdays() {
    this.scheduleArr[0] = '0';
    this.scheduleArr[1] = '0';
    this.scheduleArr[4] = 'WED';
    this.schedule = this.scheduleArr.join(' ');
    this.status = 'every wednesday';
    return this;
  }

  thursdays() {
    this.scheduleArr[0] = '0';
    this.scheduleArr[1] = '0';
    this.scheduleArr[4] = 'THU';
    this.schedule = this.scheduleArr.join(' ');
    this.status = 'every thursday';
    return this;
  }

  fridays() {
    this.scheduleArr[0] = '0';
    this.scheduleArr[1] = '0';
    this.scheduleArr[4] = 'FRI';
    this.schedule = this.scheduleArr.join(' ');
    this.status = 'every friday';
    return this;
  }

  saturdays() {
    this.scheduleArr[0] = '0';
    this.scheduleArr[1] = '0';
    this.scheduleArr[4] = 'SAT';
    this.schedule = this.scheduleArr.join(' ');
    this.status = 'every saturday';
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
    this.status = `${this.status} between ${start} - ${end}`;
    return this;
  }

  at(time) {
    const timeArr = time.split(':');
    const hour = helper.oneDigitInteger(timeArr[0]);
    const minute = helper.oneDigitInteger(timeArr[1]);

    this.scheduleArr[0] = minute;
    this.scheduleArr[1] = hour;
    this.schedule = this.scheduleArr.join(' ');
    this.status = `${this.status} at ${time}`;
    return this;
  }

  run(callback) {
    if (this.getUrl !== null) {
      cron.schedule(this.schedule, () => {
        request
          .get(this.getUrl)
          .on('response', () => {
            callback(`Running rest api from ${this.getUrl} ${this.status} success.`);
          })
          .on('error', (error) => {
            callback(`Running rest api from ${this.getUrl} ${this.status} failed with error message: ${error}`);
          });
      }, {
        scheduled: true,
        timezone: this.timezone,
      });
    }

    if (this.postUrl !== null) {
      cron.schedule(this.schedule, () => {
        request
          .post(this.postUrl)
          .on('response', () => {
            callback(`Running rest api from ${this.postUrl} ${this.status} success.`);
          })
          .on('error', (error) => {
            callback(`Running rest api from ${this.postUrl} ${this.status} failed with error message: ${error}`);
          });
      }, {
        scheduled: true,
        timezone: this.timezone,
      });
    }

    if (this.putUrl !== null) {
      cron.schedule(this.schedule, () => {
        request
          .put(this.putUrl)
          .on('response', () => {
            callback(`Running rest api from ${this.putUrl} ${this.status} success.`);
          })
          .on('error', (error) => {
            callback(`Running rest api from ${this.putUrl} ${this.status} failed with error message: ${error}`);
          });
      }, {
        scheduled: true,
        timezone: this.timezone,
      });
    }

    if (this.callFunction !== null) {
      cron.schedule(this.schedule, () => {
        callback.apply(this.callFunction);
        callback(`Running call function ${this.status} success`);
      }, {
        scheduled: true,
        timezone: this.timezone,
      });
    }
  }
}

module.exports = new Schedule();
