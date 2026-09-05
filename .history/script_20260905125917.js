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
    expense: amount,
    description: descript,
    category: category,
    date: date,
  };
  expenses.push(expense);

  const expenseElement = document.createElement("div");

  expenseElement.innerHTML = `
    <p>${expense.description}</p>
    <p>₹${expense.expense}</p>
    <p>${expense.category}</p>
  <p>${expense.date}</p>
  <button>Delete</button>

`;

  expenseList.appendChild(expenseElement);

  
});
