// javascript

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js"

import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-9620f-default-rtdb.firebaseio.com"
}

const app = initializeApp(appSettings)



const database = getDatabase(app)
const endorsementListInDB = ref(database, "endorsementList")


const inputFieldEl = document.getElementById("input-field")
const publishBtnEl = document.getElementById("publish-btn")
const endorsementListEl = document.getElementById("endorsement-list")

publishBtnEl.addEventListener("click", function(){
    let inputValue = inputFieldEl.value
    
    clearEndorsementListEl()
    
    appendItemToEndorsementListEl(inputValue)
    
    push(endorsementListInDB, inputValue)

    clearInputFieldEl()
})

onValue(endorsementListInDB, function(snapshot){
   let itemsArray = Object.entries(snapshot.val())
    
    clearEndorsementListEl()
    
    for (let i=0; i<itemsArray.length; i++){
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemToEndorsementListEl(currentItem)
    }
})
  
function clearEndorsementListEl(){
    endorsementListEl.innerHTML = ""
}

function clearInputFieldEl(){
    inputFieldEl.value=""
}

function appendItemToEndorsementListEl(item){
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    newEl.textContent = itemValue
    endorsementListEl.append(newEl)
}

