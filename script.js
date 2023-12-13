document.addEventListener('DOMContentLoaded', function () {
    const checkboxes = document.querySelectorAll('.checkbox');
    const counters = {};
    const cartItems = document.getElementById('cart-items');
    const totalSpan = document.getElementById('total');

    checkboxes.forEach(function (checkbox, index) {
        const productId = `product${index + 1}`;
        const counterId = `counter${index + 1}`;
        counters[counterId] = 0;

        checkbox.addEventListener('change', function () {
            const product = this.parentElement.parentElement;
            const productName = product.querySelector('p').innerText;
            const productImage = product.querySelector('img').src;
            const productPrice = getProductPrice(productId);
            const counterValue = counters[counterId];

            if (this.checked && counterValue > 0) {
                
                const cartItem = document.createElement('li');
                cartItem.innerHTML = `
                    <img src="${productImage}" alt="${productName}" style="max-width: 50px; margin-right: 10px;">
                    <span>${productName} (x${counterValue})</span>
                    <span style="margin-left: auto;">R$${(productPrice * counterValue).toFixed(2)}</span>
                `;
                cartItems.appendChild(cartItem);
            } else {
                
                const cartItemsList = cartItems.children;
                for (let i = 0; i < cartItemsList.length; i++) {
                    const item = cartItemsList[i];
                    const itemName = item.querySelector('span').innerText;
                    if (itemName.includes(productName)) {
                        cartItems.removeChild(item);
                        break;
                    }
                }
            }

            
            const cartTotal = calculateCartTotal(cartItems);
            totalSpan.textContent = `R$${cartTotal.toFixed(2)}`;
        });
    });

    function getProductPrice(productId) {
        switch (productId) {
            case 'product1':
                return 7.50;
            case 'product2':
                return 7.50;
            case 'product3':
                return 8.87;
            case 'product4':
                return 65.00;
            case 'product5':
                return 6.00;
            default:
                return 0.00;
        }
    }

    window.decrementCounter = function(counterId) {
        counters[counterId] = Math.max(counters[counterId] - 1, 0);
        updateCounterValue(counterId);
    }

    window.incrementCounter = function(counterId) {
        counters[counterId]++;
        updateCounterValue(counterId);
    }

    function updateCounterValue(counterId) {
        const counterElement = document.getElementById(counterId);
        counterElement.textContent = counters[counterId];
    }

    function calculateCartTotal(cartItems) {
        let total = 0;
        const cartItemsList = cartItems.children;
        for (let i = 0; i < cartItemsList.length; i++) {
            const item = cartItemsList[i];
            const itemPrice = parseFloat(item.lastElementChild.textContent.replace('R$', ''));
            total += itemPrice;
        }
        return total;
    }
});