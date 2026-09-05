const addExpenseButton = document.querySelector(".add-expense-button");

const expenseForm = document.querySelector(".expense-form");

const values = document.querySelector(".expense-form").value;


const saveExpenseButton = document.querySelector(".save-expense-button");

addExpenseButton.addEventListener("click",function showExpenseForm(){
        expenseForm.classList.toggle("form-hidden");

})

expenseForm.addEventListener("submit", function (event){
    event.preventDefault();
    console.log(values);

})
