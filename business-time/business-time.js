/*
time is a Date object
duration is an integer number of seconds, positive or negative
holiday is an object: {start: <Date>, end: <Date>}
*/

function convertToDate(dateTime) {
  return new Date(dateTime.getFullYear(),dateTime.getMonth() , dateTime.getDate());
}

// REFACTOR AT THE END
// time = time
function addBusinessTime(holiday, time, duration) {
  let fc, spendedSeconds, pendingSeconds,  businessTimeDate = null;

  duration = duration * 1000;

  fc = new Date(time.getTime() + duration);

  if (time <= holiday.start ){
    if ( fc <= holiday.start ){
      businessTimeDate = new Date(fc);
    }else{
      if ( fc > holiday.start ){
        spendedSeconds = (holiday.start.getTime() - time.getTime());
        pendingSeconds = duration - spendedSeconds;
        businessTimeDate = new Date(holiday.end.getTime() + pendingSeconds);
      }
    }
  }else{
    if ( fc <= holiday.end ){
      if (duration >= 0){
        businessTimeDate = new Date ( holiday.end.getTime() + duration );
      }else{
        businessTimeDate = new Date ( holiday.start.getTime() + duration );
      }
    }else{
      if ( time >= holiday.end ){
        businessTimeDate = new Date(fc);
      }else{
        spendedSeconds = fc - holiday.end;
        pendingSeconds = duration - spendedSeconds;
        fc = holiday.end.getTime() + pendingSeconds;
        businessTimeDate = new Date ( fc );
      }
    }
  }
    
  // Returns a Date object
  return businessTimeDate;
}

const holiday = {
  start: new Date('2019-12-24T21:00:00'),
  end: new Date('2019-12-25T21:00:00')
};

console.log(
  addBusinessTime(holiday, new Date('2019-12-01T00:00:00'), 60 * 60) // returns 2019-12-01T01:00:00
);

console.log(
  addBusinessTime(holiday, new Date('2019-12-24T21:00:00'), 1) // returns 2019-12-25T21:00:01
);
console.log(
  addBusinessTime(holiday, new Date('2019-12-24T20:30:00'), 60 * 60) // returns 2019-12-25T21:30:00
);

console.log(
  addBusinessTime(holiday, new Date('2019-12-25T00:00:00'), 1) // returns 2019-12-25T21:00:01
);

console.log(
  addBusinessTime(holiday, new Date('2019-12-25T00:00:00'), -1) // returns 2019-12-24T20:59:59
);