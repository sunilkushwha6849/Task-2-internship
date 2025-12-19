// FORM
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', e=>{
  e.preventDefault();

  let ok = true;
  document.querySelectorAll('.error').forEach(e=>e.textContent='');

  if(!name.value.trim()){
    document.getElementById('err-name').textContent='Name required';
    ok=false;
  }
  if(!email.value.includes('@')){
    document.getElementById('err-email').textContent='Valid email required';
    ok=false;
  }
  if(!message.value.trim()){
    document.getElementById('err-message').textContent='Message required';
    ok=false;
  }

  if(ok){
    status.textContent='Form submitted successfully!';
    form.reset();
  }
});

document.getElementById('resetBtn').onclick=()=>form.reset();


// TODO
let tasks = JSON.parse(localStorage.getItem('tasks')||'[]');
const list = document.getElementById('todoList');
const count = document.getElementById('taskCount');

function render(){
  list.innerHTML='';
  tasks.forEach((t,i)=>{
    const div=document.createElement('div');
    div.className='task'+(t.done?' done':'');
    div.innerHTML=`
      <span>${t.title}</span>
      <div>
        <button onclick="toggle(${i})">✔</button>
        <button onclick="del(${i})">🗑</button>
      </div>`;
    list.appendChild(div);
  });
  count.textContent=tasks.length+' tasks';
  localStorage.setItem('tasks',JSON.stringify(tasks));
}

function toggle(i){tasks[i].done=!tasks[i].done;render()}
function del(i){tasks.splice(i,1);render()}

document.getElementById('addTaskBtn').onclick=()=>{
  const v=newTask.value.trim();
  if(v){
    tasks.unshift({title:v,done:false});
    newTask.value='';
    render();
  }
};

document.getElementById('clearAll').onclick=()=>{
  tasks=[];
  render();
};

render();
