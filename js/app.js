'use strict';

//helper functions
//random number generator, in order to include 24 in the generated randoms, the max must be 25
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//name extractor
function getName(email) {
  let str=`${email}`;
  let nameMatch = str.match(/^([^@]*)@/);
  let extractedName = nameMatch ? nameMatch[1] : null;
  console.log('extracted', extractedName);
  return extractedName;
}

//id counter 
let id = 0;


//constructor object

function Student(email, mobileNum, tuition) {
  this.name = getName(`${email}`);
  this.email = email;
  this.mobileNum = mobileNum;
  this.age = getRndInteger(18, 25);
  this.tuition = tuition;
  Student.all.push(this);
}
Student.all = [];

Student.prototype.render = function(){
  // const student = Object.values(retrieve[i]);
  // console.log('new1', student);
  // const newStudent = new Student(student[1], student[2], student[4]);
  // console.log('new2', newStudent);
  console.log(this);
  const tableEl = document.getElementById('table');
  const rowEl = document.createElement('tr');
  tableEl.appendChild(rowEl);
  
  id++;
  const tdEl = document.createElement('td');
  rowEl.appendChild(tdEl);
  tdEl.textContent = id;
  
  for (let i = 0; i < this.length; i++) {
    const tdEl = document.createElement('td');
    rowEl.appendChild(tdEl);
    tdEl.textContent = this[i].value;
  }
};



//form
const form = document.getElementById('form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const email = event.target.email.value;
  const mobileNum = event.target.number.value;
  const tuition = event.target.tuition.value;
  const student = new Student(email, mobileNum, tuition);
  console.log(student);
  console.log(Student.all);
  localStorage.setItem('students', JSON.stringify(Student.all));
  student.render();
  form.reset();
}

//render on page reload
function reloadRender () {
  localStorage.removeItem('randid');
  if(localStorage.length > 0){
    const retrieve = JSON.parse(localStorage.getItem('students'));
    console.log('retrieve', retrieve);
    
    for (let i = 0; i < retrieve.length; i++) {
      const student = Object.values(retrieve[i]);
      // console.log('new1', student);
      // const newStudent = new Student(student[1], student[2], student[4]);
      // console.log('new2', newStudent);
      
      const tableEl = document.getElementById('table');
      const rowEl = document.createElement('tr');
      tableEl.appendChild(rowEl);
      
      id++;
      const tdEl = document.createElement('td');
      rowEl.appendChild(tdEl);
      tdEl.textContent = id;
      
      for (let i = 0; i < student.length; i++) {
        const tdEl = document.createElement('td');
        rowEl.appendChild(tdEl);
        tdEl.textContent = student[i];
      }
    }
  }
}
reloadRender();
