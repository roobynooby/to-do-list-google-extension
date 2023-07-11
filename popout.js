
// create new item function
document.querySelector('.create-todo').addEventListener('click', function(){
    document.querySelector('.new-item').style.display='block';
});

// onclick, retrieves value entered in input field by user, if value is orginally not empty, retreives 
// value from local storage and adds new item to array, fetchitems() is to update list of items
// status:0 is part of the array which means that task is not completed and shouldnt be striked out
// if status:1, task should be striked out by a line across it
// ps: check local storage to see arrays and list after adding tasks
document.querySelector('.new-item button').addEventListener('click', function(){
    var itemName = document.querySelector('.new-item input').value;
    if(itemName != ''){
    // storing into local storage
        var itemsStorage = localStorage.getItem('todo-items');
        var itemsArr = JSON.parse(itemsStorage);
        itemsArr.push({"item":itemName, "status":0});
        saveItems(itemsArr);
        fetchItems();
        document.querySelector('.new-item input').value='';
        document.querySelector('.new-item').style.display='none';
    }
});


function fetchItems() {
    const itemsList = document.querySelector('ul.todo-items');
    itemsList.innerHTML = '';
    var newItemHTML = '';
    try {
        var itemsStorage = localStorage.getItem('todo-items');
        var itemsArr = JSON.parse(itemsStorage);

        for (var i = 0; i < itemsArr.length; i++) {
            var status = '';
            if(itemsArr[i].status == 1){
                status = 'class="done"'; 
            }            
            // basically after a user adds a new tasks it is inputted into a list format with the ✔️🗑️ buttons
            newItemHTML += `<li data-itemindex="${i}" ${status}>
            <span class="item">${itemsArr[i].item}</span> 
            <div><span class="itemComplete">✔️</span><span class="itemDelete">🗑️</span></div>
            </li>`;
        }

        itemsList.innerHTML = newItemHTML;

        var itemsListUL = document.querySelectorAll('ul li');
        for (var i = 0; i < itemsListUL.length; i++) { 
            itemsListUL[i].querySelector('.itemComplete').addEventListener('click', function(){

            var index = this.parentNode.parentNode.dataset.itemindex;
            itemComplete(index);
            });
            itemsListUL[i].querySelector('.itemDelete').addEventListener('click', function(){

            var index = this.parentNode.parentNode.dataset.itemindex;
            itemDelete(index);
            });   
        }
    } catch (e) {
        }
    }


function itemComplete(index){
    var itemsStorage = localStorage.getItem('todo-items');
    var itemsArr = JSON.parse(itemsStorage);
    itemsArr[index].status = 1;
    saveItems(itemsArr);
    document.querySelector('ul.todo-items li[data-itemindex="'+index+'"]').className='done';
}

function itemDelete(index){
    var itemsStorage = localStorage.getItem('todo-items');
    var itemsArr = JSON.parse(itemsStorage);
    itemsArr.splice(index, 1);
    saveItems(itemsArr);
    document.querySelector('ul.todo-items li[data-itemindex="'+index+'"]').remove();
}

// this function is to convert our array into a json string and store into local storage
function saveItems(obj) {
    var string = JSON.stringify(obj);
    localStorage.setItem('todo-items', string);
}

// function call to fetch and display all initial set of to do items from local storage when 
// page originally loads
fetchItems();