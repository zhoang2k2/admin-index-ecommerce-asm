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
const closeBtn = document.getElementById('close-btn');

const modalAddNewEl = document.getElementById("modal-add-new");
const modalAddNew = new bootstrap.Modal(modalAddNewEl);
const modalBody = document.querySelector(".modal-body");
const modalTitle = document.querySelector(".modal-title");

let isSaved = false;
let countId = 0;


document.addEventListener("DOMContentLoaded", () => {
    renderDomElement(tableItem)
})

// ADD BTN
saveBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addElement()
    modalAddNew.hide()
});

// RESET BTN
resetBtn.addEventListener('click', () => {
    clearInput()
})

function setLocalStorage() {
    localStorage.setItem('items', JSON.stringify(tableItem))
};


imageInput.addEventListener('change', (e) => {
    let url;

    if (e.target.files.length > 0) {
        const file = e.target.files[0];
        url = URL.createObjectURL(file)
    };
    item = { ...item, image: url };
})

// RENDER ELEMENT
function renderDomElement(tableItem) {
    table.innerHTML = "";
    tableItem.map((item, index) => {
        const tRow = document.createElement('tr')
        tRow.id = item.id
        tRow.innerHTML = `
            <th>${index + 1}</th>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>${item.info}</td>
            <td>${item.detail}</td>
            <td><img style="width: 100px; height: 100px" src="${item.image}"}</td>
            <td>${item.manufactor}</td>
            <td>${item.category}</td>
            <td><button onClick="editElement(${item.id})">Edit</button></td>
            <td><button id="del-btn" onClick="delElement(${item.id})">Delete</button></td>
        `;
        table.appendChild(tRow)
    })
}

// CREATE ELEMENT
function addElement() {
    // if () {}

    // RENDER DOM
    const item = {
        id: ++countId,
        name: nameInput.value,
        price: priceInput.value,
        info: infoInput.value,
        detail: detailInput.value,
        image: imageInput.value,
        manufactor: manufactorInput.value,
        category: categoryInput.value
    };

    fetch("http://localhost:3000/product", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
    }).then(data => {
        console.log("data", data);
    })

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

    fetch(`http://localhost:3000/product/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(data => {
        console.log("data", data);
    })
}

// EDIT ELEMENT
function editElement(id) {
    modalAddNew.show()

    const selected = tableItem.find(item => item.id === id)

    if (selected) {
        idInput.value = id;
        nameInput.value = selected.name;
        priceInput.value = selected.price;
        infoInput.value = selected.info;
        detailInput.value = selected.detail;
        imageInput.value = selected.image;
        manufactorInput.value = selected.manufactor;
        categoryInput.value = selected.category
    }

    isSaved = false;

    saveBtn.addEventListener('click', () => {
        isSaved = true;
        clickSaveBtn(id);
    });

}

// AFTER EDIT
function clickSaveBtn(id) {
    if (isSaved) {
        tableItem = tableItem.filter(item => item.id !== id);
    }
    setLocalStorage()
    renderDomElement(tableItem)
}


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