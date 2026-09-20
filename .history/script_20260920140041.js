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

// FUNCTION WORKS ON SUBMITTING THE FORM
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

  //IMPLEMENTATION OF EDIT EXPENSE WORKING

  if (editingExpenseId == null) {
    expenses.push(expense);
    storingData();
    expenseForm.reset();

    renderExpense(expense);
  } else {
    const index = expenses.findIndex(
      (expense) => expense.id === editingExpenseId,
    );
    const expenseToSave = expenses[index];
    if (index !== -1) {
      expenseToSave.expense = amount;
      expenseToSave.description = descript;
      expenseToSave.category = category;
      expenseToSave.date = date;
    }

    storingData();
    expenseForm.reset();
    const expenseElement = document.getElementById(editingExpenseId);
    const infoDiv = expenseElement.querySelector(".expense-info");
    infoDiv.innerHTML = `
    <p class="expense-text-styling expense-description ">${expenseToSave.description}</p>
    <p class="expense-text-styling">₹${expenseToSave.expense}</p>
    <p class="expense-text-styling">${expenseToSave.category}</p>
  <p class="expense-text-styling">${expenseToSave.date}</p>
  `;
    document.querySelector(".total-expense").innerHTML =
      `<p>TOTAL EXPENSE: ${totalExpense()}</p>`;

    editingExpenseId = null;
  }
});

//FUNCTION TO FIND TOTAL EXPENSE
function totalExpense() {
  const totalExpense = expenses.reduce((total, expense) => {
    return total + expense.expense;
  }, 0);
  return totalExpense;
}

// FUNCTIONS TO STORE AND GET DATA
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

//FUNCTION TO DISPLAY EXPENSE ON DISPLAY
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

  updateTotal();

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

    updateTotal();
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
    expenseForm.classList.toggle("form-hidden");
  });
}

const searchInput = document.querySelector(".expense-search");
searchInput.addEventListener("input", filterExpenses);

const categoryFilter = document.querySelector(".category-filter");
categoryFilter.addEventListener("change", filterExpenses);

//FUNCTION FOR FILTER EXPENSES
function filterExpenses() {
  const searchText = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.description
      .toLowerCase()
      .includes(searchText);

    const matchesCategory =
      selectedCategory === "all" ||
      expense.category.toLowerCase() === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const expenseList = document.querySelector(".expense-list");
  expenseList.innerHTML = "";

  if (filteredExpenses.length === 0) {
    expenseList.innerHTML = "<p>No expenses found.</p>";
    return;
  }

  filteredExpenses.forEach((expense) => {
    renderExpense(expense);
  });
}

//FUNCTION FOR UPDATING TOTAL
function updateTotal() {
  const totalAmount = document.querySelector(".total-expense");

  totalAmount.innerHTML = `<p>TOTAL EXPENSE: ${totalExpense()}</p>`;
}

//CLEARING FILTER
const clearFiltersButton = document.querySelector(".clear-filters");

clearFiltersButton.addEventListener("click", function () {
  searchInput.value = "";
  categoryFilter.value = "all";

  filterExpenses();
});

const sortExpenses = document.querySelector(".sort-expenses");
sortExpenses.addEventListener("change", function () {
  const selectedSort = sortExpenses.value;

  const sortedExpenses = [...expenses];
  let newSortedExpenses =[];

  if (selectedSort === "highest") {
     newSortedExpenses = sortedExpenses.sort((a, b) => b.expense - a.expense);
  }

  newSortedxpenses.forEach()
  console.log(sortedExpenses);
});