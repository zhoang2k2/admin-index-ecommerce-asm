// docment Addevent -> domCotentloader để localStorage product
// Tạo 1 mảng rỗng, Khai báo key cho product

// function loaddata => newproduct = {...product , keyNew }
// Mảng rỗng push newproduct
// ;local setitem stringify products
// renderDomProduct

// function renderDomProduct để map trả lại
// data cho tableBody (đoạn này gần giống react để return về `` và nối chuỗi)
// return này có innerHtml cho body

// render image bằng cách add event cho img
// let url
// e target.files
// Create object url <= hàm if khi dòng trên đúng
// product = {..., image : url}


// addevent cho btn


// const data = parse
// renderDom(data)

// function render (data) {
// data.map (item => {
// return parent += `<div> ${} </div>`
// })


const table = document.getElementById('table-id');
const tableItem = [];

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

// JSON
function setLocalStorage() {
    localStorage.setItem('items', JSON.stringify(tableItem))
};

function getLocalStorage() {
    const loadData = JSON.parse(localStorage.getItem('items'));
    tableItem.forEach(data => {
        tableItem.push(...loadData)
        createRow(data)
    })
};

function createRow() {
    const tRow = document.createElement("tr");
    table.appendChild(tRow);

    return tRow;
}

saveBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // PREVENT BLANK INPUT
    // if (idInput.value === ""
    //     || nameInput.value === ""
    //     || priceInput.value === ""
    //     || infoInput.value === ""
    //     || detailInput.value === ""
    //     || imageInput.value === ""
    //     || manufactorInput.value === ""
    //     || categoryInput.value === ""
    // ) {
    //     window.alert("You are missing some input!");
    //     return;
    // };

    const tRow = createRow();

    // --------------------CREATE TD--------------------
    const idData = document.createElement("td");
    idData.textContent = idInput.value;
    tRow.appendChild(idData);

    const nameData = document.createElement("td");
    nameData.textContent = nameInput.value;
    tRow.appendChild(nameData);

    const priceData = document.createElement("td");
    priceData.textContent = priceInput.value;
    tRow.appendChild(priceData);

    const infoData = document.createElement("td");
    infoData.textContent = infoInput.value;
    tRow.appendChild(infoData);

    const detailData = document.createElement("td");
    detailData.textContent = detailInput.value;
    tRow.appendChild(detailData);

    const imageData = document.createElement("td");
    imageData.textContent = imageInput.value;
    tRow.appendChild(imageData);

    const manufactorData = document.createElement("td");
    manufactorData.textContent = manufactorInput.value;
    tRow.appendChild(manufactorData);

    const categoryData = document.createElement("td");
    categoryData.textContent = categoryInput.value;
    tRow.appendChild(categoryData);

    // --------------------CREATE BTN--------------------
    // EDIT BTN
    const editBtn = document.createElement("button");
    editBtn.id = 'editBtn';
    editBtn.textContent = 'Edit';

    const tDataOfEditBtn = document.createElement("td");
    tDataOfEditBtn.appendChild(editBtn);
    tRow.appendChild(tDataOfEditBtn);

    // DEL BTN
    const delBtn = document.createElement("button");
    delBtn.id = 'delBtn';
    delBtn.textContent = 'Delete';

    const tDataOfDelBtn = document.createElement("td");
    tDataOfDelBtn.appendChild(delBtn);
    tRow.appendChild(tDataOfDelBtn);

    // -----------------------NEW ITEM-----------------------

    const newRowData = {
        id: idInput.value,
        name: nameInput.value,
        price: priceInput.value,
        info: infoInput.value,
        detail: detailInput.value,
        image: imageInput.value,
        manufactor: manufactorInput.value,
        category: categoryInput.value,
    };

    tableItem.push(newRowData);

    setLocalStorage()

    idInput.value = "";
    nameInput.value = "";
    priceInput.value = "";
    infoInput.value = "";
    detailInput.value = "";
    imageInput.value = "";
    manufactorInput.value = "";
    categoryInput.value = "";
})

getLocalStorage()