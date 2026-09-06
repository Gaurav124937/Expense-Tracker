const { createElement } = require("react");

const addExpenseButton = document.querySelector(".add-expense-button");

const expenseForm = document.querySelector(".expense-form");

const saveExpenseButton = document.querySelector(".save-expense-button");

addExpenseButton.addEventListener("click", function showExpenseForm() {
  expenseForm.classList.toggle("form-hidden");
});

const expenses = [];
const expenseList = document.querySelector(".expense-list");

expenseForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const amount = Number(document.querySelector("#expense").value);
  const descript = document.querySelector("#description").value;
  const category = document.querySelector("#category").value;
  const date = document.querySelector("#date").value;
  const expense = {
    id: crypto.randomUUID(),
    expense: amount,
    description: descript,
    category: category,
    date: date,
  };
  expenses.push(expense);
  console.log(expenses);

  const expenseElement = document.createElement("div");
  expenseElement.id = expense.id;

  expenseElement.innerHTML = `
    <p>${expense.description}</p>
    <p>₹${expense.expense}</p>
    <p>${expense.category}</p>
  <p>${expense.date}</p>
  <button class="delete-expense-button">Delete</button>

`;
  expenseList.appendChild(expenseElement);

   let totalExpense=totalExpense();

  const deleteExpense = expenseElement.querySelector(".delete-expense-button");
  deleteExpense.addEventListener("click", function () {
    expenseElement.remove();
    const index = expenses.findIndex(
      (expense) => expense.id === expenseElement.id,
    );
    if (index !== -1) {
      expenses.splice(index, 1);
    }
    totalExpense = totalExpense();
    console.log(expenses);
  });
  
  const totalAmount = document.querySelector(".total-expense");
  totalAmount.addEventListener("click", function(){
    const amount = createElement("p")
  })
});



function totalExpense() {
  const totalExpense = expenses.reduce((total, expense) => {
    return total + expense.expense;
  }, 0);
  console.log(totalExpense);
}
