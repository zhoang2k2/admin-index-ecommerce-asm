document.addEventListener("DOMContentLoaded", loadData)

const cardList = document.getElementById('product-list')
// const cardImg = document.getElementsByClassName('product-img');
// const cardName = document.getElementsByClassName('card-name');
// const cardManufactor = document.getElementsByClassName('manufactor');
// const cardPrice = document.getElementsByClassName('price');

function loadData() {
    const data = JSON.parse(localStorage.getItem('items'));
    console.log('data', data);
    renderProductItem(data)
}

function renderProductItem(data) {
    data.map((product) => {
        cardList.innerHTML += `
            <div class="col-3 product-card" key="${product.id}">
                <div class="product-img">
                    <img src="${product.image}" alt="product">
                </div>
                <div class="text">
                    <h3 class="card-name">${product.name}</h3>
                    <p class="manufactor">${product.manufactor}</p>
                    <div class="rate">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star-half"></i>
                        <div class="price">
                            ${product.price}
                            <i class="fa-solid fa-cart-shopping"></i>
                        </div>
                    </div>
                </div>
            </div>
            `
    })
}