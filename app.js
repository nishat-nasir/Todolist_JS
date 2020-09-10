const spanDate = document.getElementById("date");
const spanMonth = document.getElementById("month");
const spanYear = document.getElementById("year");
const spanWeekday = document.getElementById("weekday");
const timeWithSec = document.getElementById("timeWithSec");

function loadbody() {
    // console.log('body is loaded');
    const date = new Date();
    const month = date.toLocaleString('default', { month: 'long' });
    const myDate = date.getDate();
    const year = date.getFullYear();
    const day = date.toLocaleDateString('default', { weekday: 'long' });

    // console.log(`${date}    |||   ${month}    |||   ${myDate}    |||   ${year}    |||   ${day}`)

    spanDate.innerText = myDate;
    spanMonth.innerText = month;
    spanYear.innerText = year;
    spanWeekday.innerText = day

    
}

const timetable = startTime=> {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();

    m = checkTime(m);
    s = checkTime(s);
    var x = timeWithSec.innerHTML =
    `<div style="display:flex;"> <div class="timeColor">${h} : ${m} : </div>  <span class="timeColor" style="display:float; margin-left:5px;">${s}</span></div>`
    var t = setTimeout(startTime, 500);
  }
  function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }
timetable()




// signup
const signupForm = document.getElementById("signup-form");
signupForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = signupForm['name'].value;
    const email = signupForm['email'].value;
    const password = signupForm['password'].value;
     console.log(name, email, password);
    signupForm.reset();
    auth.createUserWithEmailAndPassword(email, password).then((cred) => {
        // console.log(cred);
        return db.collection('users').doc(cred.user.uid).set({
            Name: name,
            Email: email,
            Password: password
        }).then(() => {
            //  console.log('success');
            location = "login.html";
        }).catch(err => {
            //  console.log(err.message);
            const signupError = document.getElementById('signupError');
            signupError.innerText = err.message;
        })
    }).catch(err => {
        //  console.log(err.message);
        const signupError2 = document.getElementById('signupError2');
        signupError2.innerText = err.message;
    })
})




