// Clean code

const Addtodolist = document.querySelector("form button");
const section = document.querySelector("section ");

Addtodolist.addEventListener("click", (e) => {
  e.preventDefault(); // 技術債
  let Form = e.target.parentElement;
  let Todotext = Form.children[0].value; // 技術債 nodeList => DOM Document Object Modal
  if (Todotext === "") {
    alert("訊息不能為空");
  }

  const Todo = document.createElement("div");
  Todo.classList.add("incompleted");

  let Text = document.createElement("p");
  Text.classList.add("todo-text");
  Text.innerText = Todotext;
  Todo.appendChild(Text);
  section.appendChild(Todo);

  const completeButton = document.createElement("button");
  completeButton.classList.add("complete");
  completeButton.innerHTML = '<i class="fa-solid fa-check"></i>';
  completeButton.addEventListener("click", (e) => {
    const completeFunction = e.target.parentElement;
    completeFunction.classList.toggle("completed");
  });

  const trashButton = document.createElement("button");
  trashButton.classList.toggle("trash");
  trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  trashButton.addEventListener("click", (e) => {
    let text = Todo.children[0].innerText;
    let myListArray = JSON.parse(localStorage.getItem("list2")); // 技術債
    myListArray.forEach((item, index) => {
      if (text === item.Todotext) {
        myListArray.splice(index, 1);
        localStorage.setItem("list2", JSON.stringify(myListArray));
      }
    });
    const trashFunction = e.target.parentElement;
    trashFunction.remove();
  });

  Todo.appendChild(completeButton);
  Todo.appendChild(trashButton);

  Form.children[0].value = "";
  let storagelist = {
    Todotext: Todotext,
  };

  let mylist = localStorage.getItem("list2");
  if (mylist == null) {
    localStorage.setItem("list2", JSON.stringify([storagelist]));
  } else {
    let mylistarray = JSON.parse(mylist);
    mylistarray.push(storagelist);
    localStorage.setItem("list2", JSON.stringify(mylistarray));
  }
});

const list = section.childNodes;
const select = document.querySelector("select");

select.addEventListener("change", (e) => {
  list.forEach(function (check) {
    // map filter 技術債
    switch (e.target.value) {
      case "all":
        check.style.display = "flex";
        break;
      case "completed":
        if (check.classList.contains("completed")) {
          check.style.display = "flex";
        } else {
          check.style.display = "none";
        }
        break;
      case "incompleted":
        if (!check.classList.contains("completed")) {
          check.style.display = "flex";
        } else {
          check.style.display = "none";
        }
        break;
    }
  });
});

const mylist = localStorage.getItem("list2");
if (mylist !== null) {
  const myListArray = JSON.parse(mylist);
  myListArray.forEach((item) => {
    const todo = document.createElement("div");

    todo.classList.add("incompleted");
    const text = document.createElement("p");
    text.innerText = item.Todotext;
    todo.appendChild(text);

    const completeButton = document.createElement("button");
    completeButton.classList.add("complete");
    completeButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    completeButton.addEventListener("click", (e) => {
      const completeFunction = e.target.parentElement;
      completeFunction.classList.toggle("completed");
    });
    const trashButton = document.createElement("button");
    trashButton.classList.toggle("trash");
    trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    trashButton.addEventListener("click", (e) => {
      const text = todo.children[0].innerText;
      const myListArray = JSON.parse(localStorage.getItem("list2"));
      myListArray.forEach((item, index) => {
        if (text === item.Todotext) {
          myListArray.splice(index, 1);
          localStorage.setItem("list2", JSON.stringify(myListArray));
        }
      });
      const trashFunction = e.target.parentElement;
      trashFunction.remove();
    });
    todo.appendChild(completeButton);
    todo.appendChild(trashButton);
    section.appendChild(todo);
  });
}
