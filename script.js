function calculateAge() {
  //User's Input
  const day = parseInt(document.querySelector("#day").value);
  const month = parseInt(document.querySelector("#month").value);
  const year = parseInt(document.querySelector("#year").value);

  let dayValid = false;
  let monthValid = false;
  let yearValid = false;

  const date = new Date();

  //Function for input checking
  function check(value, date, max) {
    const red = getComputedStyle(document.body).getPropertyValue("--Light-red");

    const grey = getComputedStyle(document.body).getPropertyValue("--Light-grey");

    const smockey = getComputedStyle(document.body).getPropertyValue("--Smokey-grey");

    let text = "Must be a valid ";

    if (isNaN(value)) { //Check if it is a number
      document.querySelector(`label[for="${date}"]`).style.color = red;

      document.querySelector(`#${date}`).style.borderColor = red;

      document.querySelector(`#${date[0]}`).style.display = "block";
    } else if (value > max || value < 1) { //Check if it is valid d/m/y
      document.querySelector(`label[for="${date}"]`).style.color = red;

      document.querySelector(`#${date}`).style.borderColor = red;

      document.querySelector(`#${date[0]}`).innerHTML = date === "year" ? "Must be in the past" : `Must be a valid ${date}`;

      document.querySelector(`#${date[0]}`).style.display = "block";
    } else { //Default colors if valid
      document.querySelector(`label[for="${date}"]`).style.color = smockey;

      document.querySelector(`#${date}`).style.borderColor = grey;

      document.querySelector(`#${date[0]}`).style.display = "none";

      valid = true;

      if (date === "month") {
        monthValid = true;
      } else if (date === "year") {
        yearValid = true;
      }
    }
  }

  //Check each one
  check(day, "day", 31);

  check(month, "month", 12);

  check(year, "year", date.getFullYear());

  const red = getComputedStyle(document.body).getPropertyValue("--Light-red");

  //Check if day is valid for every month
  if (((month === 4 || month === 6 || month === 9 || month === 11) && day > 30) || (month === 2 && year % 4 === 0 && day > 29) || (month === 2 && year % 4 !== 0 && day > 28) || (month === (date.getMonth() + 1) && year === date.getFullYear() && day > date.getDate())) {
    document.querySelector('label[for="day"]').style.color = red;

    document.querySelector('#day').style.borderColor = red;

    document.querySelector('#d').innerHTML = "Must be a valid date";

    document.querySelector('#d').style.display = "block";

    dayValid = false;
  } else {
    dayValid = true;
  }

  //Check if month is before today's date
  if (year === date.getFullYear() && month > (date.getMonth() + 1)) {
    document.querySelector('label[for="month"]').style.color = red;

    document.querySelector('#month').style.borderColor = red;

    document.querySelector('#m').innerHTML = "Must be a valid date";

    document.querySelector('#m').style.display = "block";

    monthValid = false;
  } else {
    monthValid = true;
  }

  //Calculate Age
  if (dayValid && monthValid && yearValid) {
    document.querySelector("#days").innerHTML = day >= date.getDate() && month >= date.getMonth() ? Math.abs(day - date.getDate()) : Math.abs(day - date.getDate() - 1);

    document.querySelector("#months").innerHTML = month < date.getMonth() ? date.getMonth() + 1 - month : month === date.getMonth() + 1 ? 0 : date.getMonth() + 1 + 12 - month;

    document.querySelector("#years").innerHTML = date.getFullYear() - year;
  }
}
