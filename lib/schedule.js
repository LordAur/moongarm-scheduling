const cron = require('node-cron');
const request = require('request');

const helper = require('./helpers');

class Schedule {
  constructor() {
    this.getUrl = null;
    this.schedule = '* * * * *';
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
      });
    }
  }
}

module.exports = new Schedule();
