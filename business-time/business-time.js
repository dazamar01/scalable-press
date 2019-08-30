/*
time is a Date object
duration is an integer number of seconds, positive or negative
holiday is an object: {start: <Date>, end: <Date>}
*/

function convertToDate(dateTime) {
  return new Date(dateTime.getFullYear(),dateTime.getMonth() , dateTime.getDate());
}

function addBusinessTime(holiday, time, duration) {
  let businessTimeDate;

  duration = duration * 1000
  
  if ( convertToDate(time) >= convertToDate(holiday.start) && convertToDate(time) <= convertToDate(holiday.end)  ){
    if (duration < 0){
      businessTimeDate = new Date( holiday.start.getTime() + duration);
    }else{
      businessTimeDate = new Date( holiday.end.getTime() + duration);
    }
  }else{
    // console.log('fisrt case', time);
    businessTimeDate = new Date( time.getTime() + duration );
  }
  
  // Returns a Date object
  return businessTimeDate;
  // return '--------';
}

const holiday = {
  start: new Date('2019-12-24T21:00:00'),
  end: new Date('2019-12-25T21:00:00')
};

console.log(
  addBusinessTime(holiday, new Date('2019-12-01T00:00:00'), 60 * 60) // returns 2019-12-01T01:00:00
)

console.log(
  addBusinessTime(holiday, new Date('2019-12-24T21:00:00'), 1) // returns 2019-12-25T21:00:01
)
console.log(
  addBusinessTime(holiday, new Date('2019-12-24T20:30:00'), 60 * 60) // returns 2019-12-25T21:30:00
)
console.log(
  addBusinessTime(holiday, new Date('2019-12-25T00:00:00'), 1) // returns 2019-12-25T21:00:01
)
console.log(
  addBusinessTime(holiday, new Date('2019-12-25T00:00:00'), -1) // returns 2019-12-24T20:59:59
)