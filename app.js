class Product {
    constructor(name, price, year) {
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

class UI {

    addProduct(product) {
        const productList = document.getElementById('product-list');
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card text-start mb-3">
            <div class="card-body">
                <strong>Product:</strong> ${product.name}
                <strong>Price:</strong> ${product.price}
                <strong>Year:</strong> ${product.year}
                <a href="#!" class="btn btn-danger btn-sm float-end" name="delete">Delete</a>
            </div>
        </div>`;
        productList.appendChild(div);

    }

    deleteProduct(element) {
        if (element.name === 'delete') {
            element.parentElement.parentElement.parentElement.remove();
        }
    }

    showMessage(message, cssClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass}`;
        div.appendChild(document.createTextNode(message));
        // showing in DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#app');
        container.insertBefore(div, app);
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 1500);
    }

    resetForm() {
        document.getElementById('product-form').reset();
    }
}

// DOM Events
document.getElementById('product-form')
    .addEventListener('submit', (e) => {
        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;
        const year = document.getElementById('year').value;
        const product = new Product(name, price, year);
        const ui = new UI();
        if (name === '' || price === '' || year === '') {
            ui.showMessage('Missing data!', 'warning');
        } else {
            ui.addProduct(product);
            ui.resetForm();
            ui.showMessage('Added succesfully', 'success');
        }



        e.preventDefault(); //Cancela el refresh de la pagina onSubmit()
    });

document.getElementById('product-list')
    .addEventListener('click', (e) => {
        const ui = new UI();
        ui.deleteProduct(e.target);
        ui.showMessage(`Deleted succesfully`, 'danger');
    });