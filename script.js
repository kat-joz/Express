'use strict'

const buttonCreate = document.getElementById("btnCreate");
const buttonReadAll = document.getElementById("btnReadAll");
const buttonReadOne = document.getElementById("btnReadOne");
const buttonDelete = document.getElementById("btnDelete");

const inputCreate = document.getElementById("createInput");
const inputReadOne = document.getElementById("readInput");
const inputDelete = document.getElementById("deleteInput");

const outputReadAll = document.getElementById("readAllOutput");
const outputReadOne = document.getElementById("readOneOutput");

// CREATE
buttonCreate.onclick =() => {

    fetch('http://localhost:9000/api', {method: 'post',
        headers: {
            'Content-type':'application/json'
        },
        body: JSON.stringify({
            name : inputCreate.value
        })
    })
        .then( res => res.json() )
        .then( data => console.log(data) )
        .catch( err => console.error(err) )

}

// READ one
buttonReadOne.onclick =()=> {
    fetch(`http://localhost:9000/api/${inputReadOne.value}`, {method: 'get'})
        .then( res => res.json() )
        .then( data => outputReadOne.innerText = JSON.stringify(data) )
        .catch( err => console.error(err) )
}

// READ all
buttonReadAll.onclick =()=> {
    fetch('http://localhost:9000/api', {method: 'get'})
        .then( res => res.json() )
        .then( data => {
            for (let item of data){
                let listItem = document.createElement('li');
                listItem.innerText = JSON.stringify(item);
                outputReadAll.append(listItem);
            }
        })
        .catch( err => console.error(err) )
}

//Delete
buttonDelete.onclick =()=> {
    fetch(`http://localhost:9000/api/${inputDelete.value}`, {method: 'delete'})
        .then(res => console.log((res)))
        .catch( err => console.error(err) )
}
