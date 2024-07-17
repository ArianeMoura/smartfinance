document.addEventListener('DOMContentLoaded', () => {
    const transactionForm = document.getElementById('transaction-form');
    const transactionList = document.getElementById('transaction-list');
    const balanceElement = document.getElementById('balance');

    let transactions = [];

    transactionForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const description = document.getElementById('transaction-description').value;
        const amount = parseFloat(document.getElementById('transaction-amount').value);
        const type = document.getElementById('transaction-type').value;

        const transaction = {
            id: generateId(),
            description,
            amount,
            type
        };

        transactions.push(transaction);
        updateUI();
        transactionForm.reset();
    });

    function generateId() {
        return Math.floor(Math.random() * 1000000);
    }

    function updateUI() {
        transactionList.innerHTML = '';
        let balance = 0;

        transactions.forEach(transaction => {
            const transactionItem = document.createElement('li');
            transactionItem.classList.add(transaction.type);
            transactionItem.innerHTML = `
                ${transaction.description} <span>${transaction.type === 'income' ? '+' : '-'} R$ ${transaction.amount.toFixed(2)}</span>
                <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">x</button>
            `;

            transactionList.appendChild(transactionItem);

            balance += transaction.type === 'income' ? transaction.amount : -transaction.amount;
        });

        balanceElement.textContent = `R$ ${balance.toFixed(2)}`;
    }

    window.deleteTransaction = function(id) {
        transactions = transactions.filter(transaction => transaction.id !== id);
        updateUI();
    }
});
