// public/js/script.js
// Mini Expense Tracker - localStorage + chart + top-form toggle + delete fix
const LS_KEY = 'expenses_v1';

// DOM
const showAddBtn = document.getElementById('show-add-btn');
const topFormContainer = document.getElementById('top-form');
const formPanel = document.getElementById('form-panel');
const form = document.getElementById('expense-form');
const titleInput = document.getElementById('title');
const amountInput = document.getElementById('amount');
const dateInput = document.getElementById('date');
const resetBtn = document.getElementById('reset-btn');
const submitBtn = document.getElementById('submit-btn');
const filterYearSelect = document.getElementById('filter-year');
const expensesList = document.getElementById('expenses-list');
const emptyState = document.getElementById('empty-state');

let expenses = [];
let chart = null;

function loadFromStorage() {
  const raw = localStorage.getItem(LS_KEY);
  expenses = raw ? JSON.parse(raw) : [];
}
function saveToStorage() {
  localStorage.setItem(LS_KEY, JSON.stringify(expenses));
}
function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2,7); }
function formatDate(iso) { return new Date(iso).toLocaleDateString(); }

// show/hide top form and swap Add button visibility
function openTopForm() {
  topFormContainer.classList.remove('hidden');
  showAddBtn.style.display = 'none';
  formPanel.style.display = 'block';
  formPanel.setAttribute('aria-hidden', 'false');
  setTimeout(()=> titleInput && titleInput.focus(), 160);
  validateForm();
}
function closeTopForm() {
  topFormContainer.classList.add('hidden');
  showAddBtn.style.display = 'inline-block';
  formPanel.style.display = 'none';
  formPanel.setAttribute('aria-hidden', 'true');
  form.reset();
}

// validate form and update submit button state
function validateForm() {
  const isTitleValid = titleInput.value.trim().length > 0;
  const isAmountValid = amountInput.value && Number(amountInput.value) > 0;
  const isDateValid = dateInput.value.length > 0;
  const isFormValid = isTitleValid && isAmountValid && isDateValid;
  
  submitBtn.disabled = !isFormValid;
}

// wire Add button and Cancel inside form
showAddBtn.addEventListener('click', openTopForm);
resetBtn.addEventListener('click', closeTopForm);

// listen for input changes and validate
titleInput.addEventListener('input', validateForm);
amountInput.addEventListener('input', validateForm);
dateInput.addEventListener('change', validateForm);

// year dropdown builder
function renderYearOptions() {
  const yearSet = new Set(expenses.map(e => new Date(e.date).getFullYear()));
  yearSet.add(new Date().getFullYear());
  const years = Array.from(yearSet).sort((a,b)=>b-a);
  const prev = Number(filterYearSelect.value) || new Date().getFullYear();

  filterYearSelect.innerHTML = '';
  years.forEach(y => {
    const opt = document.createElement('option');
    opt.value = String(y);
    opt.textContent = String(y);
    filterYearSelect.appendChild(opt);
  });

  filterYearSelect.value = years.includes(prev) ? String(prev) : String(years[0]);
}

// filtering & rendering
function getFilteredByYear(yearNumber) {
  return expenses.filter(e => new Date(e.date).getFullYear() === Number(yearNumber));
}
function renderList(filtered) {
  expensesList.innerHTML = '';
  if (!filtered || filtered.length === 0) {
    emptyState.style.display = 'block';
    return;
  } else {
    emptyState.style.display = 'none';
  }

  filtered.sort((a,b) => new Date(b.date) - new Date(a.date));

  filtered.forEach(e => {
    const item = document.createElement('div');
    item.className = 'list-group-item d-flex';

    const leftWrap = document.createElement('div');
    leftWrap.style.display = 'flex';
    leftWrap.style.alignItems = 'center';

    const dateBox = document.createElement('div');
    dateBox.className = 'expense-date';
    const d = new Date(e.date);
    dateBox.innerHTML = `<div style="font-size:0.85rem">${d.toLocaleString('default', { month: 'long' })}</div>
                         <div style="font-size:0.75rem; opacity:0.9">${d.getFullYear()}</div>
                         <div style="font-size:1.05rem; font-weight:700; margin-top:6px;">${d.getDate()}</div>`;

    const meta = document.createElement('div');
    meta.innerHTML = `<div style="font-size:1.05rem; font-weight:700; margin-bottom:4px;">${e.title}</div>
                      <div class="expense-meta">${formatDate(e.date)}</div>`;

    leftWrap.appendChild(dateBox);
    leftWrap.appendChild(meta);

    const rightWrap = document.createElement('div');
    rightWrap.style.display = 'flex';
    rightWrap.style.alignItems = 'center';
    rightWrap.innerHTML = `<div class="amount-badge">MYR ${Number(e.amount).toFixed(2)}</div>
                           <button class="btn btn-sm btn-outline-danger ms-3" data-id="${String(e.id)}" title="Delete">Delete</button>`;

    item.appendChild(leftWrap);
    item.appendChild(rightWrap);
    expensesList.appendChild(item);
  });
}

// chart helpers
function getMonthlyTotals(yearNumber) {
  const months = new Array(12).fill(0);
  expenses.forEach(e => {
    const d = new Date(e.date);
    if (d.getFullYear() === Number(yearNumber)) months[d.getMonth()] += Number(e.amount);
  });
  return months;
}
function buildBarColors(dataArr) {
  return dataArr.map(v => v > 0 ? 'rgba(109,42,165,0.95)' : 'rgba(217,195,245,0.6)');
}
function renderChart(yearNumber) {
  const ctx = document.getElementById('monthlyChart').getContext('2d');
  const labels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const data = getMonthlyTotals(yearNumber);
  const bgColors = buildBarColors(data);

  if (chart) {
    chart.data.datasets[0].data = data;
    chart.data.datasets[0].backgroundColor = bgColors;
    chart.options.plugins.title.text = `Monthly Total (MYR) - ${yearNumber}`;
    chart.update();
    return;
  }

  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'MYR',
        data,
        backgroundColor: bgColors,
        borderRadius: 12,
        barThickness: 22
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false }, title: { display: true, text: `Monthly Total (MYR) - ${yearNumber}`, color: '#3a2a5a' } },
      scales: { y: { beginAtZero: true }, x: { ticks: { color: '#6b4b8a' } } }
    }
  });
}

// refresh UI
function refreshUI() {
  renderYearOptions();
  const year = Number(filterYearSelect.value) || new Date().getFullYear();
  const filtered = getFilteredByYear(year);
  renderList(filtered);
  renderChart(year);
}

// add expense submit
form.addEventListener('submit', ev => {
  ev.preventDefault();
  
  let errorMsg = '';
  
  if (!titleInput.value.trim()) {
    titleInput.classList.add('is-invalid');
    errorMsg += 'Title is required.\n';
  } else {
    titleInput.classList.remove('is-invalid');
  }
  
  if (!amountInput.value || Number(amountInput.value) <= 0) {
    amountInput.classList.add('is-invalid');
    errorMsg += 'Amount must be greater than 0.\n';
  } else {
    amountInput.classList.remove('is-invalid');
  }
  
  if (!dateInput.value) {
    dateInput.classList.add('is-invalid');
    errorMsg += 'Date is required.\n';
  } else {
    dateInput.classList.remove('is-invalid');
  }
  
  if (errorMsg) {
    alert('Please Follow the requirement\n\n' + errorMsg);
    return;
  }

  const newExpense = {
    id: String(uid()),
    title: titleInput.value.trim(),
    amount: Number(amountInput.value).toFixed(2),
    date: dateInput.value
  };

  expenses.push(newExpense);
  saveToStorage();

  // keep top form visible; select new year immediately
  renderYearOptions();
  filterYearSelect.value = String(new Date(newExpense.date).getFullYear());

  form.reset();
  refreshUI();
});

// delete event
expensesList.addEventListener('click', ev => {
  const btn = ev.target.closest('button[data-id]');
  if (!btn) return;
  const id = btn.getAttribute('data-id');
  if (!id) return;
  if (!confirm('Delete this expense?')) return;

  const beforeLen = expenses.length;
  expenses = expenses.filter(e => String(e.id) !== String(id));
  if (expenses.length === beforeLen) {
    alert('Could not find expense to delete.');
    return;
  }
  saveToStorage();
  refreshUI();
});

// year change
filterYearSelect.addEventListener('change', () => {
  const year = Number(filterYearSelect.value);
  renderList(getFilteredByYear(year));
  renderChart(year);
});

// init
(function init(){
  loadFromStorage();
  if (topFormContainer) topFormContainer.classList.add('hidden');
  showAddBtn.style.display = 'inline-block';
  renderYearOptions();
  refreshUI();
})();
