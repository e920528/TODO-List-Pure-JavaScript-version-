var listArray = [];

class List {
  constructor(title){
    this._title = title;
    this._unfinishedNum = 0;
    this._doneNum = 0;
    this.items = [];
  }
  get title() {
    return this._title;
  }
  set title(input) {
    this._title = input;
  }
  get unfinishedNum() {
    return this._unfinishedNum;
  }
  set unfinishedNum(input) {
    this._unfinishedNum = input;
  }
  get doneNum() {
    return this._doneNum;
  }
  set doneNum(input) {
    this._doneNum = input;
  }
}

class Item {
  constructor(title) {
    this._title = title;
    this._status = false;
  }
  get title() {
    return this._title;
  }
  set title(input) {
    this._title = input;
  }
  get status() {
    return this._status;
  }
  set status(input) {
    this._status = input;
  }
}
//update item
function updateItem(index) {
  var node = document.getElementById("myUL");
  while (node.hasChildNodes()) {
    node.removeChild(node.firstChild);
  }
  for (let i = 0; i < listArray[index].items.length; i++) {
    var li = document.createElement("li");
    var title = listArray[index].items[i].title;
    var t = document.createTextNode(title);
    li.appendChild(t);
    var checkButton = document.createElement("BUTTON");
    var txt = document.createTextNode("\u2713");
    checkButton.className = "check";
    checkButton.appendChild(txt);
    checkButton.id = i;
    li.appendChild(checkButton);
    var editButton = document.createElement("BUTTON");
    var txt = document.createTextNode("\u270E");
    editButton.className = "edit";
    editButton.appendChild(txt);
    li.appendChild(editButton);
    var deleteButton = document.createElement("BUTTON");
    var txt = document.createTextNode("\u00D7");
    deleteButton.className = "close";
    deleteButton.appendChild(txt);
    li.appendChild(deleteButton);
    if(listArray[currentList].items[i].status){
      li.className = "checked"
    }
    else{
      li.className = "";
    }
    node.appendChild(li);
  }
  //check button
  var check = document.getElementsByClassName("check");
  for (let i = 0; i < check.length; i++) {
    document.getElementById(i).addEventListener("click",function () {
    if(listArray[currentList].items[i].status){
      listArray[currentList].items[i].status = false;
    }
    else{
      listArray[currentList].items[i].status = true;
    }
    updateItem(currentList);
    })
  }
  //close button
  var close = document.getElementsByClassName("close");
  for (let i = 0; i < close.length; i++) {
    close[i].addEventListener("click",function () {
    listArray[index].items.splice(i,1);
    updateItem(index);
    })
  }
  //edit button
  var editList = document.getElementsByClassName("edit");
  for (let i = 0; i < editList.length; i++) {
    editList[i].addEventListener("click",function() {
      var newTitle = prompt("請輸入新的標題", listArray[index].items[i].title);
      if (newTitle != null) {
        listArray[index].items[i].title = newTitle;
        updateItem(index);
      }
    })
  }
  //amout
  listArray[index].unfinishedNum = 0;
  for (let i = 0; i < listArray[index].items.length; i++) {
    if(!listArray[index].items[i].status)
      listArray[index].unfinishedNum ++;
  }
  listArray[index].doneNum = 0;
  for (let i = 0; i < listArray[index].items.length; i++) {
    if(listArray[index].items[i].status)
    listArray[index].doneNum ++;
  }
  document.getElementById("unfinishNum").innerHTML = "未完成數量：" + listArray[index].unfinishedNum;
  document.getElementById("finishNum").innerHTML = "完成數量：" + listArray[index].doneNum;
  
}
var currentList = -1;
function newItem() {
  let title = document.getElementById("NewItem").value;
  document.getElementById("NewItem").value = '';
  let item = new Item(title);
  listArray[currentList].items.push(item);
  updateItem(currentList);
}     

//update list name/amount
function updateList() {
  document.getElementById("myDIV").innerHTML = '<h2>TODO List</h2> <p class="num" id="unfinishNum"></p><p class="num" id="finishNum"></p><input type="text" id="NewList" placeholder="List Title"><button onclick="newList()" class="addBtn" id="addButton">Add</button>'
  var node = document.getElementById("myUL");
  while (node.hasChildNodes()) {
    node.removeChild(node.firstChild);
  }
  for (let i = 0; i < listArray.length; i++) {
    var li = document.createElement("li");
    var title = listArray[i].title;
    var t = document.createTextNode(title);
    li.appendChild(t);
    var num = "未完成數量：" + listArray[i].unfinishedNum + "   完成數量：" + listArray[i].doneNum;
    var pNode = document.createElement("P");
    var numNode = document.createTextNode(num);
    pNode.appendChild(numNode);
    li.appendChild(pNode);
    var showItemButton = document.createElement("BUTTON");
    var itemText = "進入list" + listArray[i].title;
    var itemNode = document.createTextNode(itemText);
    showItemButton.appendChild(itemNode);
    showItemButton.className = "show";
    li.appendChild(showItemButton);
    var editButton = document.createElement("BUTTON");
    var txt = document.createTextNode("\u270E");
    editButton.className = "edit";
    editButton.appendChild(txt);
    li.appendChild(editButton);
    var deleteButton = document.createElement("BUTTON");
    var txt = document.createTextNode("\u00D7");
    deleteButton.className = "close";
    deleteButton.appendChild(txt);
    li.appendChild(deleteButton);
    node.appendChild(li);
  }
  //showitems(有點暴力@@)
  var show = document.getElementsByClassName("show");
  for (let i = 0; i < show.length; i++) {
    
    show[i].addEventListener("click", function(){
      var node = document.getElementById("myUL");
      while (node.hasChildNodes()) {
        node.removeChild(node.firstChild);
      }
      currentList = i;
      document.getElementById("myDIV").innerHTML = '<h2 id="listTitle"></h2> <p class="num" id="unfinishNum"></p><p class="num" id="finishNum"></p><input type="text" id="NewItem" placeholder="Item Title"><button onclick="newItem()" class="addBtn" id="addItemButton">Add</button><button onclick="updateList()" id="home" class="home">回首頁</button>'
      document.getElementById("listTitle").innerHTML = "List" + listArray[i].title;
      document.getElementById("unfinishNum").innerHTML = "未完成數量：" + listArray[i].unfinishedNum;
      document.getElementById("finishNum").innerHTML = "完成數量：" + listArray[i].doneNum;
      updateItem(i);
    });
  }
  //close button
  var close = document.getElementsByClassName("close");
  for (let i = 0; i < close.length; i++) {
    close[i].addEventListener("click",function () {
    listArray.splice(i,1);
    updateList();
    })
  }
  //edit button
  var editList = document.getElementsByClassName("edit");
  for (let i = 0; i < editList.length; i++) {
    editList[i].addEventListener("click",function() {
      var newTitle = prompt("請輸入新的標題", listArray[i].title);
      if (newTitle != null) {
        listArray[i].title = newTitle;
        updateList();
      }
    })
  }
  //amout
  var unfinishNum = 0;
  for (let i = 0; i < listArray.length; i++) {
    unfinishNum += listArray[i].unfinishedNum;
  }
  var finishNum = 0;
  for (let i = 0; i < listArray.length; i++) {
    finishNum += listArray[i].doneNum;
  }
  document.getElementById("unfinishNum").innerHTML = "未完成數量：" + unfinishNum;
  document.getElementById("finishNum").innerHTML = "完成數量：" + finishNum;

  
}




//create new list
function newList() {
  let title = document.getElementById("NewList").value;
  document.getElementById("NewList").value = '';
  let list = new List(title);
  listArray.push(list);
  updateList();
}