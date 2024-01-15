const table = document.getElementById('table-id');
let tableItem = JSON.parse(localStorage.getItem('items')) || [];

const idInput = document.getElementById('id');
const nameInput = document.getElementById('name');
const priceInput = document.getElementById('price');
const infoInput = document.getElementById('info');
const detailInput = document.getElementById('detail');
const imageInput = document.getElementById('image');
const manufactorInput = document.getElementById('manufactor');
const categoryInput = document.getElementById('category');

const saveBtn = document.getElementById('sav-btn');
const resetBtn = document.getElementById('res-btn');

document.addEventListener("DOMContentLoaded", () => {
    renderDomElement(tableItem)
})

saveBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addElement()

});

function setLocalStorage() {
    localStorage.setItem('items', JSON.stringify(tableItem))
};

imageInput.addEventListener('change', (e) => {
    let url;

    if (e.target.files.length > 0) {
        const file = e.target.files[0];
        url = URL.createObjectURL(file)
    }
    item = { ...item, image: url }
})

function renderDomElement(tableItem) {
    table.innerHTML = "";
    tableItem.map(item => {
        const tRow = document.createElement('tr')
        tRow.id = item.id
        tRow.innerHTML = `
            <th>${item.id}</th>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>${item.info}</td>
            <td>${item.detail}</td>
            <td><img style="width: 100px; height: 100px" src="${item.image}"}</td>
            <td>${item.manufactor}</td>
            <td>${item.category}</td>
            <td><button>Edit</button></td>
            <td><button id="del-btn" onClick="delElement(${item.id})">Delete</button></td>
        `;
        table.appendChild(tRow)
    })
}

// ADD ELEMENT
function addElement() {
    // if () {}

    // RENDER DOM
    const item = {
        id: Math.floor(Math.random() * 1000),
        name: nameInput.value,
        price: priceInput.value,
        info: infoInput.value,
        detail: detailInput.value,
        image: imageInput.value,
        manufactor: manufactorInput.value,
        category: categoryInput.value
    };

    const newTableItem = [...tableItem, item];
    renderDomElement(newTableItem);

    // PUSH LOCAL STORAGE
    const newItem = {
        id: item.id,
        name: item.name,
        price: item.price,
        info: item.info,
        detail: item.detail,
        image: item.image,
        manufactor: item.manufactor,
        category: item.category
    }

    tableItem.push(newItem);
    setLocalStorage();

    clearInput()
}

// DELETE ELEMENT
function delElement(id) {
    tableItem = tableItem.filter(item => item.id !== id)
    setLocalStorage();
    renderDomElement(tableItem)
}

// EDIT ELEMENT


// CLEAR INPUT
function clearInput() {
    idInput.value = "";
    nameInput.value = "";
    priceInput.value = "";
    infoInput.value = "";
    detailInput.value = "";
    imageInput.value = "";
    manufactorInput.value = "";
    categoryInput.value = ""
}