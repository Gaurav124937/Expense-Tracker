const addExpenseButton = document.querySelector(".add-expense-button");

const expenseForm = document.querySelector(".expense-form");

addExpenseButton.addEventListener("click", function showExpenseForm() {
  expenseForm.classList.toggle("form-hidden");
});

const expenses = [];
getData();

expenses.forEach((expense) => {
  const expenseList = document.querySelector(".expense-list");
  const expenseElement = document.createElement("div");
  expenseElement.id= expense.id;
  expenseElement.className = "expense-display-card";
  expenseElement.innerHTML = `
    <p>${expense.description}</p>
    <p>₹${expense.expense}</p>
    <p>${expense.category}</p>
    <p>${expense.date}</p>
    <button class="delete-card">delete</button>
  `;
  expenseList.appendChild(expenseElement);

const deleteCard = expenseElement.querySelector(".delete-card");
  deleteCard.addEventListener("click", function () {
    expenseElement.remove();
    const index = expenses.findIndex(
      (expense) => expense.id === expenseElement.id,
    );
    if (index !== -1) {
      expenses.splice(index, 1);
    }
    storingData();
  });
   
});

let total = totalExpense();
const totalSub = document.querySelector(".total-value");
  totalSub.innerHTML = `<p>TOTAL EXPENSE: ${total}</p>`;




const expenseListSubmit = document.querySelector(".expense-list-submit");

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

  storingData();
  expenseForm.reset();
  

  function renderExpense()
  const expenseElement = document.createElement("div");
  expenseElement.id = expense.id;

  expenseElement.innerHTML = `
    <p>${expense.description}</p>
    <p>₹${expense.expense}</p>
    <p>${expense.category}</p>
  <p>${expense.date}</p>
  <button class="delete-expense-button">Delete</button>

`;
  expenseListSubmit.appendChild(expenseElement);


  let totalValue = totalExpense();

  const totalAmount = document.querySelector(".total-expense");
  totalAmount.innerHTML = `<p>TOTAL EXPENSE: ${totalValue}</p>`;

  const deleteExpense = expenseElement.querySelector(".delete-expense-button");
  deleteExpense.addEventListener("click", function () {
    expenseElement.remove();
    const index = expenses.findIndex(
      (expense) => expense.id === expenseElement.id,
    );
    if (index !== -1) {
      expenses.splice(index, 1);
    }

    storingData();

    totalValue = totalExpense();
    totalAmount.innerHTML = `<p>TOTAL EXPENSE: ${totalValue}</p>`;
  });
});


function totalExpense() { 
  const totalExpense = expenses.reduce((total, expense) => {
    return total + expense.expense;
  }, 0);
  return totalExpense;
}

function storingData() {
  const expenseArrayString = JSON.stringify(expenses);
  localStorage.setItem("array", expenseArrayString);
}

function getData() {
  const expensesArray = JSON.parse(localStorage.getItem("array"));
  if (expensesArray !== null) {
    expenses.push(...expensesArray);
  }

  console.log(expensesArray);
}
