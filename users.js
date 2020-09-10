const spanDate = document.getElementById("date");
const spanMonth = document.getElementById("month");
const spanYear = document.getElementById("year");
const spanWeekday = document.getElementById("weekday");
const todoContainer = document.getElementById('todo-container');
const timeWithSec = document.getElementById("timeWithSec");

function loadbody() {
    // console.log('body is loaded');
    const date = new Date();
    const month = date.toLocaleString('default', { month: 'long' });
    const myDate = date.getDate();
    const year = date.getFullYear();
    const day = date.toLocaleDateString('default', { weekday: 'long' });

    spanDate.innerText = myDate;
    spanMonth.innerText = month;
    spanYear.innerText = year;
    spanWeekday.innerText = day;

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






// checking if user is signed in or not
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('user is signed in at users.html');
    }
    else {
        alert('your login session has expired or you have logged out, login again to continue');
        location = "login.html";
    }
})




// retriving username
auth.onAuthStateChanged(user => {
    
    if (user) {
        const username = document.getElementById('username');
        fs.collection('users').doc(user.uid).get().then((snapshot) => {
           
            username.innerText = snapshot.data().Name;
        })
    }
    else {
         console.log('user is not signed in to retrive username');
    }
})




// retriving todos
function renderData(individualDoc) {

    // parent div
    let parentDiv = document.createElement("div");
    parentDiv.className = "container todo-box";
    parentDiv.setAttribute('data-id', individualDoc.id);

    // todo div
    let todoDiv = document.createElement("div");
    todoDiv.textContent = individualDoc.data().todos;

    // button
    let trash = document.createElement("button");

    let i = document.createElement("i");
    i.className = "fas fa-trash";

    // appending
    trash.appendChild(i);

    parentDiv.appendChild(todoDiv);
    parentDiv.appendChild(trash);

    todoContainer.appendChild(parentDiv);

    // trash clicking event
    trash.addEventListener('click', e => {
        let id = e.target.parentElement.parentElement.getAttribute('data-id');
        auth.onAuthStateChanged(user => {
            if (user) {
                fs.collection(user.uid).doc(id).delete();
                console.log(fs.collection(user.uid).doc(id))
            }
        })
    })
}





// adding todos to firestore database
const form = document.getElementById('form');
let date = new Date();
let time = date.getTime();
let counter = time;
form.addEventListener('submit', e => {
    e.preventDefault();
    const todos = form['todos'].value;
    // console.log(todos);
    let id = counter += 1;
    form.reset();
    auth.onAuthStateChanged(user => {
        if (user) {
            fs.collection(user.uid).doc('_' + id).set({
                id: '_' + id,
                todos
                
            }).then(() => {
                console.log("---" + id + "---" + todos)
                console.log('todo added');
            }).catch(err => {
                console.log(err.message);
            })
        }
        else {
            // console.log('user is not signed in to add todos');
        }
    })
})




// logout
function logout() {
    auth.signOut();
}




// realtime listners
auth.onAuthStateChanged(user => {
    if (user) {
        fs.collection(user.uid).onSnapshot((snapshot) => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                if (change.type == "added") {
                    renderData(change.doc);
                }
                else if (change.type == 'removed') {
                    let li = todoContainer.querySelector('[data-id=' + change.doc.id + ']');
                    todoContainer.removeChild(li);
                }
            })
        })
    }
})