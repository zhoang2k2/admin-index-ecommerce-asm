const table = document.getElementById('table-id');
let tableItem = [];

const idInput = document.getElementById('id');
const nameInput = document.getElementById('name');
const priceInput = document.getElementById('price');
const infoInput = document.getElementById('info');
const detailInput = document.getElementById('detail');
const ratingStarInput = document.getElementById('ratingStar');
const imageInput = document.getElementById('image');
const manufactorInput = document.getElementById('manufactor');
const categoryInput = document.getElementById('category');

const saveBtn = document.getElementById('sav-btn');
const resetBtn = document.getElementById('res-btn');
const closeBtn = document.getElementById('close-btn');
const loadBtn = document.getElementById('load-btn');

const modalAddNewEl = document.getElementById("modal-add-new");
const modalAddNew = new bootstrap.Modal(modalAddNewEl);
const modalBody = document.querySelector(".modal-body");
const modalTitle = document.querySelector(".modal-title");

let isSaved = false;
let countId = 0;

function setLocalStorage(key, value) {
    return localStorage.setItem(key, JSON.stringify(value))
};

function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

// AUTHORIZATION API
let headers = new Headers();
let username = 'Username1';
let password = '123456';

function authorization() {
    headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
    headers.set('Accept', 'application/json');
    headers.set('Content-Type', 'application/json')
}

async function getData() {
    authorization();
    const response = await fetch("http://localhost:8080/api/v1/products", { headers });
    const data = await response.json();
    return data
}

async function postData(data) {
    authorization();
    const response = await fetch("http://localhost:8080/api/v1/products", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            name: data.name,
            price: data.price,
            info: data.info,
            detail: data.detail,
            ratingStar: data.ratingStar,
            imageName: "Reno7NEW.jpg",
            manufacturerId: "4",
            categoryId: "4"
        })
    })
    const responseData = await response.json();
    return responseData;
}

function deleteData(dataId) {
    authorization();
    fetch(`http://localhost:8080/api/v1/products/${dataId}`, {
        method: "GET",
        headers: headers,
    }).then(data => {
        console.log(data);
        console.log(dataId);
    })

    fetch(`http://localhost:8080/api/v1/products/${dataId}`, {
        method: "DELETE",
        headers: headers,
    }).then(data => {
        console.log(data);
        const delItem = document.getElementById(dataId);
        const items = getLocalStorage("items");
        delItem.remove()
        const removedItem = items.filter(item => item.id !== dataId);
        setLocalStorage("items", removedItem);
        renderDomElement(removedItem)
    })
}

document.addEventListener("DOMContentLoaded", () => {
    renderDomElement(tableItem)
})

loadBtn.addEventListener('click', async () => {
    try {
        const data = await getData();
        if (Array.isArray(data.content)) {
            renderDomElement(data.content);
        } else {
            console.log("Error");
        }
    } catch (error) {
        console.log("error");
    }
});

// ADD BTN
saveBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    await addElement();
    modalAddNew.hide()
});

// RESET BTN
resetBtn.addEventListener('click', () => {
    clearInput()
})

imageInput.addEventListener('change', (e) => {
    let url;
    let item = {};

    if (e.target.files.length > 0) {
        const file = e.target.files[0];
        url = URL.createObjectURL(file)
    };
    item = { ...item, imageName: url };
    const previewImage = document.getElementById('preview-image');
    previewImage.src = url;
})

// RENDER ELEMENT
function renderDomElement(tableItem) {
    table.innerHTML = "";
    tableItem.map((item, index) => {
        const tRow = document.createElement('tr');
        tRow.id = item.id;
        tRow.innerHTML = `
                <th>${index + 1}</th>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>${item.info}</td>
                <td>${item.detail}</td>
                <td>${item.ratingStar}</td>
                <td><img style="width: 100px; height: 100px" src="${item.imageName}" alt="pic"></td>
                <td>${item.manufacturerId}</td>
                <td>${item.categoryId}</td>
                <td><button class="edit-btn" onClick="editElement(${item.id})">Edit</button></td>
                <td><button class="del-btn" onClick="deleteData(${item.id})">Delete</button></td>
            `;
        table.appendChild(tRow)
    })
}

// CREATE ELEMENT
async function addElement() {
    const item = {
        name: nameInput.value,
        price: priceInput.value,
        info: infoInput.value,
        detail: detailInput.value,
        ratingStar: ratingStarInput.value,
        imageName: imageInput.value,
        manufacturerId: manufactorInput.value,
        categoryId: categoryInput.value
    };

    try {
        const response = await postData(item);
        console.log(response);
    } catch (error) {
        console.log("Error");
    }

    const newTableItem = [...tableItem, item];
    renderDomElement(newTableItem);
    clearInput()
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
        ratingStarInput.value = selected.ratingStar;
        imageInput.value = selected.imageName;
        manufactorInput.value = selected.manufacturerId;
        categoryInput.value = selected.categoryId
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