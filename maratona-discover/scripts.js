 const Modal = {
    open(){
        // Abrir modal adiciona a class active do modal
        document.querySelector('.modal-overlay').classList.add('active');
    },
    close(){
        // Fechar modal remove a class active do modal
        document.querySelector('.modal-overlay').classList.remove('active');
    }
}
const Transactions = [
    { id: 0, description: 'Casa gás', amount: -9454, date: '23/01/2021' },
    { id: 1, description: 'Salário', amount: 79000, date: '23/01/2021' },
    { id: 2, description: 'Energia', amount: -24000, date: '23/01/2021' },
    { id: 3, description: 'Energia 2', amount: -24000, date: '23/01/2021' },
    { id: 4, description: 'Serviço 2', amount: 24000, date: '23/01/2021' },
]
// 1. [ ]  incomes somar as entradas
// 2. [ ]  expenses somar as saídas
// 3. [ ]  total entradas - saídas
// 4. [ ]  expenses somar as saídas
const Transaction = {
    incomes() { // 1
        let income = 0;
        // pegar todas as transações
        // para cada transação,
        Transactions.forEach(transaction => {
           // se ela for maior que 0
           if( transaction.amount > 0){
               income = income + transaction.amount;
           }
       })
        return income;
    },
    expenses(){
        let expense = 0;
        // pegar todas as transações
        // para cada transação,
        Transactions.forEach(transaction => {
            // se for menor que 0
            if( transaction.amount < 0 ){
                // income = income + transaction.amount;
                expense += transaction.amount;
            }
        })
        return expense;
    },
    total() {
        // Implementar valor se for negativo o total mudar o background
        return Transaction.incomes() + Transaction.expenses();
    }

}
const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),
    addTransaction(transaction, index){
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)
        DOM.transactionsContainer.appendChild(tr)
    },
    innerHTMLTransaction(transaction){
        const CSSclass = transaction.amount > 0 ? "income" : "expense"
        
        const amount = Utils.formatCurrency(transaction.amount)
        // const amount 
        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">R$ ${amount}</td>
            <td class="date">${transaction.date} </td>
            <td> <img src="./assets/minus.svg" alt=""> </td>
        `
        return html
    },
    updateBalance(){
        document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(Transaction.incomes())
        document.getElementById('expenseDiplay').innerHTML = Utils.formatCurrency(Transaction.expenses())
        document.getElementById('totalDisplay').innerHTML = Utils.formatCurrency(Transaction.total())
    }
}
// mais top pegou os dados do array dividiu e passau a moeda
const Utils = {
    formatCurrency(value){
        const signal = Number(value) < 0 ? "-" : ""
        value = String(value).replace(/\D/g, "")
        value = Number(value) / 100
        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })
        // console.log(signal + value)
        return signal + value
    }
}
// DOM.addTransaction(Transactions[0])
// DOM.addTransaction(Transactions[1])
// DOM.addTransaction(Transactions[2])

Transactions.forEach(function(transaction){
    DOM.addTransaction(transaction)
})

DOM.updateBalance()