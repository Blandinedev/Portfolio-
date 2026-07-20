function toggleMenu() {
  document.getElementById("sidebar").classList.toggle("active");
}

function register() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;
  if (!user || !pass) { alert("Fenoy daholo!"); return; }
  localStorage.setItem("user", user);
  localStorage.setItem("pass", pass);
  alert("Inscription réussie");
}

function login() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;
  let savedUser = localStorage.getItem("user");
  let savedPass = localStorage.getItem("pass");
  if (user === savedUser && pass === savedPass) {
    document.getElementById("auth").style.display = "none";
    document.getElementById("app").style.display = "block";
    loadExpenses();
  } else { alert("Erreur login"); }
}

function logout() {
  document.getElementById("auth").style.display = "block";
  document.getElementById("app").style.display = "none";
}

let expenses = [];

function addExpense() {
  let desc = document.getElementById("desc").value;
  let amount = document.getElementById("amount").value;
  if (!desc || !amount) return;
  expenses.push({ desc, amount: parseInt(amount) });
  saveExpenses();
  displayExpenses();
}

function displayExpenses() {
  let list = document.getElementById("list");
  let total = 0;
  list.innerHTML = "";
  expenses.forEach((e, index) => {
    total += e.amount;
    let li = document.createElement("li");
    li.textContent = `${e.desc} - ${e.amount} Ar`;
    li.onclick = () => { expenses.splice(index, 1); saveExpenses(); displayExpenses(); };
    list.appendChild(li);
  });
  document.getElementById("total").textContent = total;
}

function saveExpenses() { localStorage.setItem("expenses", JSON.stringify(expenses)); }
function loadExpenses() { let data = localStorage.getItem("expenses"); if (data) { expenses = JSON.parse(data); displayExpenses(); } }
