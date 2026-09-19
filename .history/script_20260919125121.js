const addExpenseButton = document.querySelector(".add-expense-button");

const expenseForm = document.querySelector(".expense-form");

addExpenseButton.addEventListener("click", function showExpenseForm() {
  expenseForm.classList.toggle("form-hidden");
});

const expenses = [];
getData();

expenses.forEach((expense) => {
  renderExpense(expense);
});

let editingExpenseId = null;

expenseForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const amount = Number(document.querySelector("#expense").value);
  const descript = document.querySelector("#description").value;
  const category = document.querySelector("#category").value;
  const date = document.querySelector("#date").value;

  if (amount <= 0 || descript.trim() === "" || category == "" || date === "") {
    alert("please enter all details carefully");
    return;
  }
  const expense = {
    id: crypto.randomUUID(),
    expense: amount,
    description: descript,
    category: category,
    date: date,
  };
  if (editingExpenseId == null) {
    expenses.push(expense);
    storingData();
  expenseForm.reset();

  renderExpense(expense);
  }
  else{
    const index = expenses.findIndex(
      (expense) => expense.id === editingExpenseId.id,
    );
    const 
    if (index !== -1) {
      expenseToSave = 

  }
}
  
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

function renderExpense(expense) {
  const expenseList = document.querySelector(".expense-list");

  const expenseElement = document.createElement("div");
  expenseElement.classList.add("expense-display-card");
  expenseElement.id = expense.id;

  const infoDiv = document.createElement("div");
  infoDiv.classList.add("expense-info");
  infoDiv.innerHTML = `
    <p class="expense-text-styling expense-description ">${expense.description}</p>
    <p class="expense-text-styling">₹${expense.expense}</p>
    <p class="expense-text-styling">${expense.category}</p>
  <p class="expense-text-styling">${expense.date}</p>
  `;
  expenseElement.appendChild(infoDiv);

  const actionDiv = document.createElement("div");
  actionDiv.classList.add("expense-actions");
  actionDiv.innerHTML = `
  <button class="delete-expense-button">Delete</button>
  <button class="edit-expense-button">Edit</button>
  `;

  expenseElement.appendChild(actionDiv);

  expenseList.appendChild(expenseElement);
  const descriptionElement = expenseElement.querySelector(
    ".expense-description",
  );
  descriptionElement.addEventListener("click", () => {
    descriptionElement.classList.toggle("expanded");
  });

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


  
  const editExpense = expenseElement.querySelector(".edit-expense-button");
  editExpense.addEventListener("click", function () {
    const index = expenses.findIndex(
      (expense) => expense.id === expenseElement.id,
    );
    if (index !== -1) {
      const expenseToEdit = expenses[index];

      editingExpenseId = expenseToEdit.id;

      document.querySelector("#expense").value = expenseToEdit.expense;
      document.querySelector("#description").value = expenseToEdit.description;
      document.querySelector("#category").value = expenseToEdit.category;
      document.querySelector("#date").value = expenseToEdit.date;
    }
  });
}
