# Moongarm Task Scheduling - NodeJS Library
NodeJS library for crontab task scheduling. Inspired by Laravel task scheduling.

# Features
- API like Laravel task scheduling
- Can use REST API url
- Custom timezone

# Installation
```
npm install moongarm-scheduling
```

# How to use
### Defining Schedules
You may define all of your scheduled tasks. To get started, let's look at an example of scheduling a task. In this example, we will schedule a function to be called every minutes.

```javascript
const scheduled = require('moongarm-scheduling');

scheduled
  .call(() => {
    console.log('Tester call schedule task')
  })
  .everyMinutes()
  .run((response) => {
    console.log(response);
  });
```

### Defining Schedules with REST API
You can also define all of your scheduled tasks with calling your REST API. To get started, let's look at an example of scheduling a task with calling REST API. In this example, we will schedule REST API with method GET, PUT and POST to be called every minutes.

#### With ```GET``` method
```javascript
const scheduled = require('moongarm-scheduling');

scheduled
  .get('http://127.0.0.1/call/task')
  .everyMinutes()
  .run((response) => {
    console.log(response);
  });
```

#### With ```POST``` method
```javascript
const scheduled = require('moongarm-scheduling');

scheduled
  .post('http://127.0.0.1/call/task')
  .everyMinutes()
  .run((response) => {
    console.log(response);
  });
```

#### With ```PUT``` method
```javascript
const scheduled = require('moongarm-scheduling');

scheduled
  .put('http://127.0.0.1/call/task')
  .everyMinutes()
  .run((response) => {
    console.log(response);
  });
```

#Schedule Frequency Options
Of course, there are a variety of schedules you may assign to your task:

| Method | Description |
|--|--|
| ```.cron('* * * * *')``` | Run the task on a custom Cron schedule |
| ```.everyMinutes()``` | Run the task every minute |
| ```.everyFiveMinutes()``` | Run the task every five minutes |
| ```.everyTenMinutes()``` | Run the task every ten minutes |
| ```.everyFifteenMinutes()``` | Run the task every fifteen minutes |
| ```.everyThirtyMinutes()``` | Run the task every thirty minutes |
| ```.hourly()``` | Run the task every hour |
| ```.hourlyAt(9)``` | Run the task every hour at 9 mins past the hour |
| ```.daily()``` | Run the task every day at midnight |
| ```.dailyAt('13:00')``` | Run the task every day at 13:00 |
| ```.twiceDaily(1, 13)``` | Run the task daily at 1:00 & 13:00 |
| ```.weekly()``` | Run the task every week |
| ```.weeklyOn(1, '8:00')``` | Run the task every week on Monday at 8:00 |
| ```.monthly()``` | Run the task every month |
| ```.monthlyOn(4, '15:00')``` | Run the task every month on the 4th at 15:00 |
| ```.quarterly()``` | Run the task every quarter |
| ```.yearly()``` | Run the task every year |
| ```.timezone('Asia/Jakarta')``` | Set the timezone |

These methods may be combined with additional constraints to create even more finely tuned schedules that only run on certain days of the week. For example, to schedule a command to run weekly on Monday at 09:00AM:

```javascript
const scheduled = require('moongarm-scheduling');

scheduled
  .put('http://127.0.0.1/call/task')
  .weekly()
  .mondays()
  .at('09:00')
  .run((response) => {
    console.log(response);
  });
```

| Method | Description |
|--|--|
| ```.weekdays()``` | Limit the task to weekdays |
| ```.weekends()``` | Limit the task to weekends |
| ```.sundays()``` | Limit the task to Sunday |
| ```.mondays()``` | Limit the task to Monday |
| ```.tuesdays()``` | Limit the task to Tuesday |
| ```.wednesdays()``` | Limit the task to Wednesday |
| ```.thursdays()``` | Limit the task to Thursday |
| ```.fridays()``` | Limit the task to Friday |
| ```.saturdays()``` | Limit the task to Saturday |
| ```.between('12:00', '14:00')``` | Limit the task to run between start and end times |
