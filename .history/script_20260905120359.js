const addExpenseButton = document.querySelector(".add-expense-button");

const expenseForm = document.querySelector(".expense-form");




const saveExpenseButton = document.querySelector(".save-expense-button");

addExpenseButton.addEventListener("click",function showExpenseForm(){
        expenseForm.classList.toggle("form-hidden");

})

const expenses=[];

expenseForm.addEventListener("submit", function(event){
    event.preventDefault();
    

    const amount = d(ocument.querySelector("#expense").value;
    const descript = document.querySelector("#description").value;
    const category = document.querySelector("#category").value;
    const date = document.querySelector("#date").value;

    const expense = { expense:amount, description: descript, category: category, date: date};
    expenses.push(expense);

    console.log(expenses);



    
})

