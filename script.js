import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSetting = {
    databaseURL: "https://champions-b5776-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSetting)
const database = getDatabase(app)
const championsListInDB = ref(database, "championsList")

let inputEl = document.querySelector('#input-el')
let publishBtn = document.querySelector('#publish-btn')
let championList = document.querySelector('#champion-list')


function getInput() {
    let resultText = inputEl.value
    if (resultText) {
        push(championsListInDB, resultText)
    }
    else {
        alert("Please enter something")
    }
    clearInput()
}


function clearInput() {
    inputEl.value = ''
}

onValue(championsListInDB, function (snapshot) {
    if (snapshot.exists()) {
        let itemArray = Object.entries(snapshot.val())
        clearChampionList()
        for (let i = 0; i < itemArray.length; i++) {
            let currentItem = itemArray[i]
            let currentItemId = currentItem[0]
            let currentItemValue = currentItem[1]
            appendItemToChampionList(currentItem)
        }
    } else {
        championList.innerHTML = "No items here...yet"
    }
})

function clearChampionList() {
    championList.innerHTML = ""
}

function appendItemToChampionList(item) {
    let itemId = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")
    newEl.textContent = itemValue
    newEl.addEventListener("dblclick", function () {
        let exactLocationOfItemInDB = ref(database, `championsList/${itemId}`)

        remove(exactLocationOfItemInDB)
    })

    championList.append(newEl)
}

publishBtn.addEventListener("click", getInput)

