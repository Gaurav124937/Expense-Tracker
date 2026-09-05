const addExpenseButton = document.querySelector(".add-expense-button");

const expenseForm = document.querySelector(".expense-form");




const saveExpenseButton = document.querySelector(".save-expense-button");

addExpenseButton.addEventListener("click",function showExpenseForm(){
        expenseForm.classList.toggle("form-hidden");

})

expenseForm.addEventListener("submit", function(event){
    event.preventDefault();
    const amount = document.querySelector("#expense").value;
    const description = document.querySelector("#description").value;
    const category = document.querySelector("#category").value;
    const date = document.querySelector("#date").value;



    console.log(amount"\n",description"\n",category,date);

})
