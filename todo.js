/* 
    * 다음처럼 동작하는 프로그래밍을 만든다.
    
    * 할일관리하는 프로그램이며, 다음의 기능이 있다.
    
    * 할일을 추가할 수 있다.
    * 할일이 추가되면 id 값을 생성하고 결과를 알려준다.
    * 상태는 3가지로 관리된다.todo, doing, done.
    * 각 일(task)는 상태값을 가지고 있고, 그 상태값을 변경할 수 있다.
    * 각 상태에 있는 task는 show함수를 통해서 볼 수 있다.
    * 명령어를 입력시 '$'를 구분자로 사용해서 넣는다.
    * 이번 미션역시 대화형 프로그래밍을 위해서 nodejs에서 제공하는 방법을 구현한다.
    
    * 참고 : https://nodejs.org/api/readline.html
*/

const STATES = {
  todo: 0,
  doing: 0,
  done: 0
}

const TODO = [{
    id: 1,
    task: "자바스크립트 공부하기",
    states: "todo"
  },
  {
    id: 2,
    task: "그래픽스공부",
    states: "doing"
  },
  {
    id: 3,
    task: "블로그쓰기",
    states: "doing"
  },
  {
    id: 4,
    task: "운동하기",
    states: "done"
  }
]

let MSG = {
  add: " 항목이 새로 추가됐습니다."
}


const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const init = (task) => {
  rl.question('명령어를 입력하세요: ', (task) => {

    const command = task.split("$")[0];
    const message = task.split("$")[1];

    addTodo(command, message);
    showStates(command, message);
    updateTodo(command)
    againCommand(command);
  });
}


const addTodo = (command, message) => {
  let id = TODO.length + 1;
  if (command === 'add') {
    TODO.push({
      "id": id++,
      "task": message,
      "states": "todo"
    });
    console.log(message + MSG.add);
    // console.log(TODO);
  }
}


const showStates = (command, message) => {
  if (command === 'show') {
    declareState(message)
  }
}


const declareState = (stateVal) => {
  for (let elem in TODO) {
    if (TODO[elem].states === stateVal) {
      console.log(TODO[elem].id + ", " + TODO[elem].task);
    }
  }
}


const updateTodo = (command) => {
  let todo = 0;
  let doing = 0;
  let done = 0;
  if (command === 'update') {
    updateSates(todo, doing, done);
  }
}


const updateSates = (todo, doing, done) => {
  for (let elem in TODO) {
    let status = TODO[elem].states
    if (status === 'todo') {
      todo++;
    } else if (status === 'doing') {
      doing++;
    } else if (status === 'done') {
      done++;
    }
  }
  console.log("todo: " + todo + "개,", "doing: " + doing + "개,", "done: " + done + "개");
}


const againCommand = (command) => {
  rl.question('또 입력할까요? ', (answer) => {
    if (answer === '네') {
      init();
    } else if (answer === '아니요') {
      rl.close();
    }
  })
}

init();