// PRO-CHISTKA Business Dashboard v2
// Бренд PRO-CHISTKA всегда выводим шрифтом Orbitron.
const SHEETS_API_URL = "";
const GOOGLE_SHEET_ID = "1zjar439J_-xwZQNcgHfdHNt8oVGukq7O33OiIInoIrE";
const STORAGE_KEY = "prochistka_business_dashboard_v2";
const OLD_STORAGE_KEY = "prochistka_business_dashboard_v1";

const defaultState = {
  settings: {
    companyName: "PRO-CHISTKA",
    brandFont: "Orbitron",
    targetOrdersMonth: 20,
    targetRevenueMonth: 400000,
    minMargin: 0.35,
    targetMargin: 0.45,
    minProfitPerHour: 500,
    ownerHourCost: 1200,
    yandexBudgetMonth: 60000,
    minCheckAfterRepair: 12000,
    minCheckGeneral: 9000,
    minCheckMaintenance: 6000,
    cleanerHourRate: 350,
    brigadierHourRate: 500
  },
  dictionaries: {
    leadStatuses: ["Новая", "В работе", "Расчёт отправлен", "Согласована", "Отказ", "Отложена", "Дубль"],
    orderStatuses: ["План", "Согласована", "В работе", "Выполнена", "Оплачена", "Отменена", "Проблема"],
    services: ["После ремонта", "Генеральная", "Поддерживающая", "Мойка окон", "Химчистка мебели", "Озонирование", "Другое"],
    objectTypes: ["Квартира", "Дом", "Офис", "Магазин", "Кафе/общепит", "Парадная", "Цех", "Склад", "Другое"],
    channels: ["Яндекс Директ", "Сайт/SEO", "Повторный клиент", "Рекомендация", "Дизайнер", "Строитель/прораб", "Авито", "Соцсети", "Другое"],
    expenseCategories: ["Оплата клинерам", "Оплата бригадиру", "Химия/расходники", "Дорога", "Парковка", "Оборудование/аренда", "Реклама", "Комиссия партнёру", "Переделки", "Прочее"],
    paymentMethods: ["Наличные", "Перевод", "Расчётный счёт", "Карта", "Другое"],
    yesNo: ["Нет", "Да"],
    ratings: ["", "1", "2", "3", "4", "5"]
  },
  leads: [
    { id: 1, date: "2026-05-08", time: "10:37", client: "Полина", phone: "79650852038", source: "Яндекс Директ", partner: "", service: "После ремонта", objectType: "Квартира", area: 39, address: "-", desiredDate: "", status: "Расчёт отправлен", rejectReason: "", amount: 12000, finalAmount: 0, responsible: "", comment: "", orderId: "", nextContact: "2026-05-09" },
    { id: 2, date: "2026-05-08", time: "12:09", client: "Кристина", phone: "79062699120", source: "Яндекс Директ", partner: "", service: "После ремонта", objectType: "Квартира", area: 41, address: "проспект художников 14", desiredDate: "2026-05-10", status: "Согласована", rejectReason: "", amount: 16450, finalAmount: 19000, responsible: "", comment: "", orderId: 1, nextContact: "" },
    { id: 3, date: "2026-05-12", time: "13:10", client: "Ольга", phone: "", source: "Сайт/SEO", partner: "", service: "Генеральная", objectType: "Квартира", area: 55, address: "", desiredDate: "", status: "Новая", rejectReason: "", amount: 14000, finalAmount: 0, responsible: "", comment: "Перезвонить после 18:00", orderId: "", nextContact: "2026-05-13" }
  ],
  orders: [
    { id: 1, leadId: 2, requestDate: "2026-05-08", doneDate: "2026-05-10", client: "Кристина", phone: "79062699120", address: "проспект художников 14", service: "После ремонта", objectType: "Квартира", area: 41, channel: "Яндекс Директ", partner: "", status: "Выполнена", plannedRevenue: 16450, revenue: 19000, paid: 19000, cleaners: 1, plannedHours: 7.5, hours: 7, normHours: 7, cleanerPay: 4000, brigadierPay: 0, chemistry: 500, transport: 0, parking: 0, equipment: 0, ads: 0, partnerCommission: 0, reworkCost: 0, otherCosts: 0, ownerHours: 7, quality: 5, complaint: false, rework: false, checklist: false, photoReport: false, documents: false, comment: "" },
    { id: 2, leadId: "", requestDate: "2026-05-07", doneDate: "2026-05-07", client: "Марина", phone: "", address: "", service: "После ремонта", objectType: "Квартира", area: 70, channel: "Яндекс Директ", partner: "", status: "Выполнена", plannedRevenue: 29200, revenue: 29500, paid: 29500, cleaners: 3, plannedHours: 7.5, hours: 7, normHours: 21, cleanerPay: 14000, brigadierPay: 0, chemistry: 600, transport: 372, parking: 0, equipment: 0, ads: 0, partnerCommission: 0, reworkCost: 0, otherCosts: 0, ownerHours: 7, quality: 5, complaint: false, rework: false, checklist: false, photoReport: false, documents: false, comment: "" },
    { id: 3, leadId: "", requestDate: "2026-05-04", doneDate: "2026-05-08", client: "Ия", phone: "", address: "", service: "После ремонта", objectType: "Дом", area: 260, channel: "Яндекс Директ", partner: "", status: "Выполнена", plannedRevenue: 30000, revenue: 30000, paid: 30000, cleaners: 4, plannedHours: 9, hours: 10, normHours: 40, cleanerPay: 20000, brigadierPay: 0, chemistry: 1000, transport: 1500, parking: 0, equipment: 0, ads: 0, partnerCommission: 0, reworkCost: 0, otherCosts: 0, ownerHours: 10, quality: 5, complaint: false, rework: false, checklist: false, photoReport: false, documents: false, comment: "Низкая цена за м² — разобрать отдельно" },
    { id: 4, leadId: "", requestDate: "2026-05-12", doneDate: "2026-05-13", client: "Марина", phone: "", address: "", service: "Мойка окон", objectType: "Квартира", area: 60, channel: "Повторный клиент", partner: "", status: "Выполнена", plannedRevenue: 10000, revenue: 10000, paid: 0, cleaners: 1, plannedHours: 3, hours: 3, normHours: 3, cleanerPay: 3500, brigadierPay: 0, chemistry: 300, transport: 1000, parking: 0, equipment: 0, ads: 0, partnerCommission: 0, reworkCost: 0, otherCosts: 0, ownerHours: 3, quality: "", complaint: false, rework: false, checklist: false, photoReport: false, documents: false, comment: "" },
    { id: 5, leadId: "", requestDate: "2026-05-06", doneDate: "2026-05-16", client: "Михаил", phone: "", address: "", service: "После ремонта", objectType: "Дом", area: 170, channel: "Яндекс Директ", partner: "", status: "Согласована", plannedRevenue: 99745, revenue: 99745, paid: 0, cleaners: 8, plannedHours: 9, hours: 0, normHours: 0, cleanerPay: 0, brigadierPay: 0, chemistry: 5000, transport: 1500, parking: 0, equipment: 0, ads: 0, partnerCommission: 0, reworkCost: 0, otherCosts: 0, ownerHours: 20, quality: "", complaint: false, rework: false, checklist: false, photoReport: false, documents: false, comment: "Большой объект — держать под контролем" }
  ],
  expenses: [
    { id: 1, date: "2026-05-07", orderId: 2, category: "Оплата клинерам", amount: 14000, paymentMethod: "Перевод", comment: "Марина" },
    { id: 2, date: "2026-05-08", orderId: 3, category: "Оплата клинерам", amount: 20000, paymentMethod: "Перевод", comment: "Ия" },
    { id: 3, date: "2026-05-10", orderId: 1, category: "Оплата клинерам", amount: 4000, paymentMethod: "Перевод", comment: "Кристина" },
    { id: 4, date: "2026-05-10", orderId: 1, category: "Химия/расходники", amount: 500, paymentMethod: "Карта", comment: "Расходники" }
  ]
};

let state = loadState();
let currentView = "dashboard";
let filterState = { period: localStorage.getItem("prochistka.period") || "month", from: "", to: "", channel: "", service: "", status: "" };
let editing = { lead: null, order: null, expense: null };

const pageTitles = { dashboard: "Пульс бизнеса", leads: "Заявки", orders: "Заказы", expenses: "Расходы", analytics: "Аналитика", settings: "Настройки" };
const formatRub = new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 });
const formatNum = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 1 });
const monthNames = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];

function clone(value) { return JSON.parse(JSON.stringify(value)); }
function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return mergeState(JSON.parse(saved));
    const old = localStorage.getItem(OLD_STORAGE_KEY);
    if (old) return mergeState(JSON.parse(old));
  } catch (error) {
    console.warn("Не удалось загрузить локальные данные", error);
  }
  return clone(defaultState);
}
function mergeState(partial) {
  return {
    ...clone(defaultState),
    ...partial,
    settings: { ...defaultState.settings, ...(partial.settings || {}) },
    dictionaries: { ...defaultState.dictionaries, ...(partial.dictionaries || {}) },
    leads: Array.isArray(partial.leads) ? partial.leads : clone(defaultState.leads),
    orders: Array.isArray(partial.orders) ? partial.orders : clone(defaultState.orders),
    expenses: Array.isArray(partial.expenses) ? partial.expenses : clone(defaultState.expenses)
  };
}
function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function money(value) { return formatRub.format(Number(value || 0)); }
function pct(value) { return Number.isFinite(value) ? `${Math.round(value * 100)}%` : "—"; }
function n(value) { const number = Number(value); return Number.isFinite(number) ? number : 0; }
function today() { return new Date().toISOString().slice(0, 10); }
function monthKey(date) { return date ? String(date).slice(0, 7) : ""; }
function isDone(order) { return ["Выполнена", "Оплачена"].includes(order.status); }
function toBool(value) { return value === true || value === "Да" || value === "true"; }

function getOrderCosts(order) {
  return ["cleanerPay","brigadierPay","chemistry","transport","parking","equipment","ads","partnerCommission","reworkCost","otherCosts"]
    .reduce((sum, key) => sum + n(order[key]), 0);
}
function enrichOrder(order) {
  const revenue = n(order.revenue || order.plannedRevenue);
  const paid = order.paid === "" || order.paid == null ? revenue : n(order.paid);
  const debt = Math.max(revenue - paid, 0);
  const directCosts = getOrderCosts(order);
  const grossProfit = revenue - directCosts;
  const margin = revenue > 0 ? grossProfit / revenue : NaN;
  const normHours = n(order.normHours) || (n(order.cleaners) * n(order.hours));
  const profitPerHour = normHours > 0 ? grossProfit / normHours : NaN;
  const ownerProfit = grossProfit - n(order.ownerHours) * n(state.settings.ownerHourCost);
  const pricePerMeter = n(order.area) > 0 ? revenue / n(order.area) : NaN;
  const signal = getOrderSignal({ ...order, revenue, debt, grossProfit, margin, profitPerHour });
  return { ...order, revenue, paid, debt, directCosts, grossProfit, margin, normHours, profitPerHour, ownerProfit, pricePerMeter, signal };
}
function getOrderSignal(order) {
  if (order.status === "Отменена") return "Отменён";
  if (toBool(order.complaint) || toBool(order.rework) || n(order.reworkCost) > 0 || order.status === "Проблема") return "Проблема";
  if (order.debt > 0 && isDone(order)) return "Долг";
  if (order.revenue > 0 && Number.isFinite(order.margin) && order.margin < n(state.settings.minMargin)) return "Низкая маржа";
  if (Number.isFinite(order.profitPerHour) && order.profitPerHour > 0 && order.profitPerHour < n(state.settings.minProfitPerHour)) return "Низкая ₽/час";
  return "ОК";
}

function periodRange() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
  if (filterState.period === "all") return { from: null, to: null, label: "всё время" };
  if (filterState.period === "month") return { from: startOfMonth, to: endOfToday, label: "текущий месяц" };
  if (filterState.period === "prev") return { from: new Date(now.getFullYear(), now.getMonth()-1, 1), to: new Date(now.getFullYear(), now.getMonth(), 0, 23,59,59), label: "прошлый месяц" };
  if (filterState.period === "90") { const d = new Date(now); d.setDate(d.getDate() - 90); return { from: d, to: endOfToday, label: "90 дней" }; }
  if (filterState.period === "year") return { from: new Date(now.getFullYear(), 0, 1), to: endOfToday, label: "год" };
  if (filterState.period === "custom") return { from: filterState.from ? new Date(filterState.from) : null, to: filterState.to ? new Date(filterState.to + "T23:59:59") : null, label: "свой период" };
  return { from: null, to: null, label: "всё время" };
}
function inRange(dateString, from, to) {
  if (!dateString) return false;
  const date = new Date(dateString);
  if (from && date < from) return false;
  if (to && date > to) return false;
  return true;
}
function applyFiltersToOrders(orders) {
  const { from, to } = periodRange();
  return orders
    .map(enrichOrder)
    .filter(order => filterState.period === "all" || inRange(order.doneDate || order.requestDate, from, to))
    .filter(order => !filterState.channel || order.channel === filterState.channel)
    .filter(order => !filterState.service || order.service === filterState.service)
    .filter(order => !filterState.status || order.status === filterState.status);
}
function applyFiltersToLeads(leads) {
  const { from, to } = periodRange();
  return leads
    .filter(lead => filterState.period === "all" || inRange(lead.date, from, to))
    .filter(lead => !filterState.channel || lead.source === filterState.channel)
    .filter(lead => !filterState.service || lead.service === filterState.service)
    .filter(lead => !filterState.status || lead.status === filterState.status);
}
function applyFiltersToExpenses(expenses) {
  const { from, to } = periodRange();
  return expenses.filter(expense => filterState.period === "all" || inRange(expense.date, from, to));
}
function getVisibleOrders() { return applyFiltersToOrders(state.orders); }
function getVisibleLeads() { return applyFiltersToLeads(state.leads); }
function getVisibleExpenses() { return applyFiltersToExpenses(state.expenses); }

function getMetrics() {
  const orders = getVisibleOrders();
  const leads = getVisibleLeads();
  const expenses = getVisibleExpenses();
  const completed = orders.filter(isDone);
  const revenue = completed.reduce((sum, order) => sum + order.revenue, 0);
  const directCosts = completed.reduce((sum, order) => sum + order.directCosts, 0);
  const extraExpenses = expenses.filter(exp => !exp.orderId).reduce((sum, exp) => sum + n(exp.amount), 0);
  const grossProfit = revenue - directCosts - extraExpenses;
  const margin = revenue > 0 ? grossProfit / revenue : NaN;
  const normHours = completed.reduce((sum, order) => sum + order.normHours, 0);
  const avgCheck = completed.length ? revenue / completed.length : NaN;
  const profitPerHour = normHours > 0 ? grossProfit / normHours : NaN;
  const conversion = leads.length ? completed.length / leads.length : NaN;
  const debt = orders.reduce((sum, order) => sum + order.debt, 0);
  const problemCount = orders.filter(order => !["ОК","Отменён"].includes(order.signal)).length;
  return { leads: leads.length, completedOrders: completed.length, allOrders: orders.length, revenue, directCosts: directCosts + extraExpenses, grossProfit, margin, avgCheck, normHours, profitPerHour, conversion, debt, problemCount };
}

function channelStats() {
  const leads = getVisibleLeads();
  const orders = getVisibleOrders();
  return state.dictionaries.channels.map(name => {
    const l = leads.filter(x => x.source === name).length;
    const done = orders.filter(x => x.channel === name && isDone(x));
    const revenue = done.reduce((s,o)=>s+o.revenue,0);
    const profit = done.reduce((s,o)=>s+o.grossProfit,0);
    return { name, leads: l, orders: done.length, revenue, profit, margin: revenue ? profit / revenue : NaN, avg: done.length ? revenue / done.length : NaN, conversion: l ? done.length / l : NaN };
  }).filter(x => x.leads || x.orders || x.revenue);
}
function serviceStats() {
  const leads = getVisibleLeads();
  const orders = getVisibleOrders();
  return state.dictionaries.services.map(name => {
    const l = leads.filter(x => x.service === name).length;
    const done = orders.filter(x => x.service === name && isDone(x));
    const revenue = done.reduce((s,o)=>s+o.revenue,0);
    const profit = done.reduce((s,o)=>s+o.grossProfit,0);
    const hours = done.reduce((s,o)=>s+o.normHours,0);
    return { name, leads: l, orders: done.length, revenue, profit, margin: revenue ? profit / revenue : NaN, avg: done.length ? revenue / done.length : NaN, pph: hours ? profit / hours : NaN };
  }).filter(x => x.leads || x.orders || x.revenue);
}
function costCategoryStats() {
  const orders = getVisibleOrders().filter(isDone);
  const categories = {
    "Клинеры": orders.reduce((s,o)=>s+n(o.cleanerPay),0),
    "Бригадир": orders.reduce((s,o)=>s+n(o.brigadierPay),0),
    "Химия": orders.reduce((s,o)=>s+n(o.chemistry),0),
    "Дорога": orders.reduce((s,o)=>s+n(o.transport),0),
    "Парковка": orders.reduce((s,o)=>s+n(o.parking),0),
    "Оборудование": orders.reduce((s,o)=>s+n(o.equipment),0),
    "Реклама": orders.reduce((s,o)=>s+n(o.ads),0),
    "Комиссия": orders.reduce((s,o)=>s+n(o.partnerCommission),0),
    "Переделки": orders.reduce((s,o)=>s+n(o.reworkCost),0),
    "Прочее": orders.reduce((s,o)=>s+n(o.otherCosts),0)
  };
  return Object.entries(categories).map(([name, value]) => ({ name, value })).filter(x => x.value > 0);
}

function render() {
  renderGlobalFilters();
  renderSelectOptions();
  renderDashboard();
  renderLeads();
  renderOrders();
  renderExpenses();
  renderAnalytics();
  renderSettings();
}
function renderGlobalFilters() {
  document.querySelectorAll("#periodButtons button").forEach(btn => btn.classList.toggle("active", btn.dataset.period === filterState.period));
  document.getElementById("customRange").classList.toggle("show", filterState.period === "custom");
  document.getElementById("channelFilter").value = filterState.channel;
  document.getElementById("serviceFilter").value = filterState.service;
  document.getElementById("statusFilter").value = filterState.status;
}
function renderSelectOptions() {
  document.querySelectorAll("select[data-options]").forEach(select => {
    const key = select.dataset.options;
    const options = state.dictionaries[key] || [];
    const current = select.value;
    select.innerHTML = options.map(item => `<option value="${escapeHtml(item)}">${escapeHtml(item)}</option>`).join("");
    if (current) select.value = current;
  });
  fillFilter("channelFilter", state.dictionaries.channels, "Все каналы");
  fillFilter("serviceFilter", state.dictionaries.services, "Все услуги");
  fillFilter("statusFilter", state.dictionaries.orderStatuses, "Все статусы");
  fillFilter("leadStatusFilter", state.dictionaries.leadStatuses, "Все статусы");
  fillFilter("orderSignalFilter", ["ОК", "Долг", "Проблема", "Низкая маржа", "Низкая ₽/час", "Отменён"], "Все сигналы");
}
function fillFilter(id, values, label) {
  const select = document.getElementById(id);
  if (!select) return;
  const current = select.value;
  select.innerHTML = `<option value="">${label}</option>` + values.map(value => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join("");
  select.value = current;
}

function renderDashboard() {
  const metrics = getMetrics();
  const orders = getVisibleOrders();
  document.getElementById("heroProfit").textContent = money(metrics.grossProfit);
  document.getElementById("heroProfitHint").textContent = `${money(metrics.revenue)} выручка · ${money(metrics.directCosts)} затраты`;
  document.getElementById("heroMargin").textContent = pct(metrics.margin);
  document.querySelector(".hero-meter")?.style.setProperty("--meter", `${Math.min(Math.max((Number.isFinite(metrics.margin) ? metrics.margin : 0) * 100, 0), 100)}%`);
  document.getElementById("scopeNote").textContent = `Период: ${periodRange().label}`;

  const cards = [
    ["Заявки", metrics.leads, "в выбранном периоде"],
    ["Выполнено", metrics.completedOrders, "заказов"],
    ["Конверсия", pct(metrics.conversion), "заявка → заказ"],
    ["Средний чек", Number.isFinite(metrics.avgCheck) ? money(metrics.avgCheck) : "—", "по выполненным"],
    ["Нормо-часы", formatNum.format(metrics.normHours), "факт"],
    ["Прибыль/час", Number.isFinite(metrics.profitPerHour) ? money(metrics.profitPerHour) : "—", "ключевой показатель"],
    ["Долги", money(metrics.debt), "к оплате"],
    ["Проблемные", metrics.problemCount, "заказов с сигналом"]
  ];
  document.getElementById("metricGrid").innerHTML = cards.map(([label, value, hint]) => `<article class="metric-card"><small>${label}</small><strong>${value}</strong><small>${hint}</small></article>`).join("");
  renderFocusList(orders, metrics);
  renderMonthlyChart(orders.filter(isDone));
  renderStackedBars("channelChart", channelStats().sort((a,b)=>b.revenue-a.revenue), "name", "revenue", "profit");
  renderStackedBars("serviceChart", serviceStats().sort((a,b)=>b.revenue-a.revenue), "name", "revenue", "profit");
  renderSimpleBars("expenseChart", costCategoryStats().sort((a,b)=>b.value-a.value), "name", "value", money);
  renderFunnel();
  renderRecentOrders(orders);
}
function renderFocusList(orders, metrics) {
  const todayValue = today();
  const focus = [];
  if (metrics.debt > 0) focus.push(["Долги клиентов", money(metrics.debt)]);
  const lowMargin = orders.filter(order => order.signal === "Низкая маржа").length;
  if (lowMargin) focus.push(["Заказы с низкой маржой", lowMargin]);
  const lowHour = orders.filter(order => order.signal === "Низкая ₽/час").length;
  if (lowHour) focus.push(["Низкая прибыль/час", lowHour]);
  const overdue = getVisibleLeads().filter(lead => lead.nextContact && lead.nextContact < todayValue && !["Отказ","Дубль","Согласована"].includes(lead.status)).length;
  if (overdue) focus.push(["Просроченные контакты", overdue]);
  if (!focus.length) focus.push(["Критичных сигналов нет", "ОК"]);
  document.getElementById("focusList").innerHTML = focus.map(([title, value]) => `<div class="focus-item"><span>${escapeHtml(title)}</span><strong>${value}</strong></div>`).join("");
}

function renderMonthlyChart(doneOrders) {
  const box = document.getElementById("monthlyChart");
  if (!doneOrders.length) { box.innerHTML = `<div class="chart-empty">Нет выполненных заказов за выбранный период</div>`; return; }
  const byMonth = {};
  doneOrders.forEach(order => {
    const key = monthKey(order.doneDate);
    if (!key) return;
    byMonth[key] ||= { revenue: 0, profit: 0, margin: 0, count: 0 };
    byMonth[key].revenue += order.revenue;
    byMonth[key].profit += order.grossProfit;
    byMonth[key].count += 1;
  });
  Object.values(byMonth).forEach(m => m.margin = m.revenue ? m.profit / m.revenue : 0);
  const keys = buildMonthAxis(Object.keys(byMonth));
  const data = keys.map(key => ({ key, ...(byMonth[key] || { revenue: 0, profit: 0, margin: 0, count: 0 }) }));
  const maxValue = niceMax(Math.max(...data.map(d => Math.max(d.revenue, d.profit)), 1));
  const W = 1100, H = 330, p = { l: 62, r: 30, t: 20, b: 42 };
  const plotW = W - p.l - p.r, plotH = H - p.t - p.b;
  const band = plotW / data.length;
  const barW = Math.min(28, Math.max(10, band / 4));
  const y = v => p.t + plotH - (v / maxValue) * plotH;
  let svg = `<svg class="chart-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Выручка и прибыль по месяцам">`;
  for (let i=0;i<=4;i++) {
    const val = maxValue * i / 4;
    const yy = y(val);
    svg += `<line x1="${p.l}" x2="${W-p.r}" y1="${yy}" y2="${yy}" stroke="rgba(255,255,255,.10)"/>`;
    svg += `<text x="${p.l-10}" y="${yy+4}" text-anchor="end" fill="currentColor" opacity=".55" font-size="12">${formatCompact(val)}</text>`;
  }
  const points = [];
  data.forEach((d,i) => {
    const cx = p.l + band*i + band/2;
    const x1 = cx - barW - 2, x2 = cx + 2, y0 = y(0);
    if (d.revenue) svg += `<rect x="${x1}" y="${y(d.revenue)}" width="${barW}" height="${y0-y(d.revenue)}" rx="6" fill="var(--blue)"/>`;
    if (d.profit) svg += `<rect x="${x2}" y="${y(d.profit)}" width="${barW}" height="${y0-y(d.profit)}" rx="6" fill="var(--green)"/>`;
    const mx = cx, my = y(d.margin * maxValue);
    points.push(`${mx},${my}`);
    svg += `<text x="${cx}" y="${H-15}" text-anchor="middle" fill="currentColor" opacity=".65" font-size="12">${monthLabel(d.key)}</text>`;
    svg += `<rect x="${p.l+band*i}" y="${p.t}" width="${band}" height="${plotH}" fill="transparent" data-tip="${escapeAttr(`${monthLabel(d.key)}|Выручка: ${money(d.revenue)}|Прибыль: ${money(d.profit)}|Маржа: ${pct(d.margin)}|Заказов: ${d.count}`)}"/>`;
  });
  svg += `<polyline points="${points.join(" ")}" fill="none" stroke="var(--yellow)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;
  svg += `<text x="${W-p.r}" y="${p.t+4}" text-anchor="end" fill="var(--yellow)" font-size="12">маржа</text>`;
  svg += `</svg>`;
  box.innerHTML = svg;
  attachChartTooltips(box);
}
function buildMonthAxis(keys) {
  const sorted = keys.sort();
  if (!sorted.length) return [];
  const last = sorted[sorted.length - 1];
  const [y, m] = last.split("-").map(Number);
  const start = new Date(y, m - 12, 1);
  const axis = [];
  for (let i=0;i<12;i++) {
    axis.push(`${start.getFullYear()}-${String(start.getMonth()+1).padStart(2,"0")}`);
    start.setMonth(start.getMonth()+1);
  }
  return axis;
}
function monthLabel(key) {
  const [y,m] = key.split("-").map(Number);
  return `${monthNames[m-1]} ’${String(y).slice(2)}`;
}
function niceMax(v) {
  const exp = Math.pow(10, Math.floor(Math.log10(v)));
  const f = v / exp;
  const nice = f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10;
  return nice * exp;
}
function formatCompact(v) {
  if (Math.abs(v) >= 1000000) return `${Math.round(v/100000)/10}м`;
  if (Math.abs(v) >= 1000) return `${Math.round(v/1000)}к`;
  return String(Math.round(v));
}
function renderStackedBars(id, data, labelKey, revenueKey, profitKey) {
  const total = Math.max(...data.map(d => d[revenueKey]), 1);
  document.getElementById(id).innerHTML = data.length ? data.map(d => {
    const w1 = Math.max(d[revenueKey] / total * 100, 3);
    const w2 = d[revenueKey] ? Math.max(d[profitKey] / d[revenueKey] * w1, 0) : 0;
    return `<div class="bar-row"><div class="bar-row-header"><span>${escapeHtml(d[labelKey])}</span><strong>${money(d[revenueKey])} · прибыль ${money(d[profitKey])}</strong></div><div class="bar-track"><div class="bar-fill" style="--width:${w1}%"></div><div class="bar-fill profit" style="--width:${w2}%"></div></div></div>`;
  }).join("") : `<div class="chart-empty">Нет данных</div>`;
}
function renderSimpleBars(id, data, labelKey, valueKey, formatter) {
  const total = Math.max(...data.map(d => d[valueKey]), 1);
  document.getElementById(id).innerHTML = data.length ? data.map(d => `<div class="bar-row"><div class="bar-row-header"><span>${escapeHtml(d[labelKey])}</span><strong>${formatter(d[valueKey])}</strong></div><div class="bar-track"><div class="bar-fill" style="--width:${Math.max(d[valueKey]/total*100,3)}%"></div></div></div>`).join("") : `<div class="chart-empty">Нет расходов</div>`;
}
function renderFunnel() {
  const leads = getVisibleLeads().length;
  const agreed = getVisibleLeads().filter(l => ["Согласована"].includes(l.status)).length + getVisibleOrders().filter(o => o.status !== "Отменена").length;
  const done = getVisibleOrders().filter(isDone).length;
  const max = Math.max(leads, agreed, done, 1);
  const rows = [["Заявки", leads], ["В работе/согласовано", agreed], ["Выполнено", done]];
  document.getElementById("funnelChart").innerHTML = rows.map(([label,value]) => `<div class="funnel-step"><span>${label}</span><div class="funnel-bar"><div class="funnel-fill" style="--width:${Math.max(value/max*100,3)}%"></div></div><strong>${value}</strong></div>`).join("");
}
function attachChartTooltips(box) {
  let tip = document.querySelector(".chart-tooltip");
  if (!tip) { tip = document.createElement("div"); tip.className = "chart-tooltip"; document.body.append(tip); }
  box.querySelectorAll("[data-tip]").forEach(el => {
    el.addEventListener("pointermove", ev => {
      const parts = el.dataset.tip.split("|");
      tip.innerHTML = `<strong>${escapeHtml(parts[0])}</strong>` + parts.slice(1).map(x => {
        const [a,b] = x.split(": ");
        return `<div><span>${escapeHtml(a)}</span><b>${escapeHtml(b || "")}</b></div>`;
      }).join("");
      tip.style.left = `${ev.clientX + 14}px`;
      tip.style.top = `${ev.clientY + 14}px`;
      tip.style.display = "block";
    });
    el.addEventListener("pointerleave", () => tip.style.display = "none");
  });
}
function renderRecentOrders(orders) {
  const sorted = [...orders].sort((a,b) => String(b.doneDate).localeCompare(String(a.doneDate))).slice(0, 7);
  document.getElementById("recentOrders").innerHTML = sorted.map(order => `<article class="compact-item"><div class="compact-item-title"><span>${escapeHtml(order.client)} · ${escapeHtml(order.service)}</span>${signalBadge(order.signal)}</div><p>${order.doneDate || "без даты"} · ${money(order.revenue)} · прибыль ${money(order.grossProfit)} · ${pct(order.margin)}</p></article>`).join("") || `<p class="muted">Заказов пока нет.</p>`;
}

function renderLeads() {
  const search = document.getElementById("leadSearch")?.value?.toLowerCase() || "";
  const status = document.getElementById("leadStatusFilter")?.value || "";
  const leads = getVisibleLeads()
    .filter(lead => !status || lead.status === status)
    .filter(lead => [lead.client, lead.phone, lead.service, lead.source].join(" ").toLowerCase().includes(search))
    .sort((a,b) => String(b.date).localeCompare(String(a.date)));
  document.getElementById("leadsTable").innerHTML = leads.map(lead => `<tr><td>${lead.date || ""}</td><td><strong>${escapeHtml(lead.client)}</strong><br><span class="muted">${escapeHtml(lead.phone)}</span></td><td>${escapeHtml(lead.source)}</td><td>${escapeHtml(lead.service)}<br><span class="muted">${lead.area ? `${lead.area} м²` : ""}</span></td><td>${money(lead.finalAmount || lead.amount)}</td><td>${statusBadge(lead.status)}</td><td>${lead.nextContact || "—"}</td><td class="row-actions"><button class="mini-btn" onclick="editLead(${lead.id})">✎</button><button class="mini-btn danger" onclick="deleteLead(${lead.id})">×</button></td></tr>`).join("") || emptyRow(8, "Заявок пока нет.");
}
function renderOrders() {
  const search = document.getElementById("orderSearch")?.value?.toLowerCase() || "";
  const signal = document.getElementById("orderSignalFilter")?.value || "";
  const orders = getVisibleOrders()
    .filter(order => !signal || order.signal === signal)
    .filter(order => [order.client, order.service, order.objectType, order.channel, order.address, order.comment].join(" ").toLowerCase().includes(search))
    .sort((a,b) => String(b.doneDate).localeCompare(String(a.doneDate)));
  document.getElementById("ordersTable").innerHTML = orders.map(order => `<tr><td>${order.doneDate || ""}</td><td><strong>${escapeHtml(order.client)}</strong><br><span class="muted">${escapeHtml(order.channel)}</span></td><td>${escapeHtml(order.service)}<br><span class="muted">${order.area ? `${order.area} м² · ${Number.isFinite(order.pricePerMeter) ? money(order.pricePerMeter) + "/м²" : ""}` : escapeHtml(order.objectType)}</span></td><td class="num">${money(order.revenue)}</td><td class="num">${money(order.directCosts)}</td><td class="num"><strong>${money(order.grossProfit)}</strong></td><td>${pct(order.margin)}</td><td>${Number.isFinite(order.profitPerHour) ? money(order.profitPerHour) : "—"}</td><td>${order.debt ? money(order.debt) : "—"}</td><td>${signalBadge(order.signal)}</td><td class="row-actions"><button class="mini-btn" onclick="editOrder(${order.id})">✎</button><button class="mini-btn danger" onclick="deleteOrder(${order.id})">×</button></td></tr>`).join("") || emptyRow(11, "Заказов пока нет.");
}
function renderExpenses() {
  const expenses = getVisibleExpenses().sort((a,b) => String(b.date).localeCompare(String(a.date)));
  document.getElementById("expensesTable").innerHTML = expenses.map(exp => `<tr><td>${exp.date || ""}</td><td>${exp.orderId || "—"}</td><td>${escapeHtml(exp.category)}</td><td class="num"><strong>${money(exp.amount)}</strong></td><td>${escapeHtml(exp.paymentMethod || "")}</td><td>${escapeHtml(exp.comment || "")}</td><td class="row-actions"><button class="mini-btn" onclick="editExpense(${exp.id})">✎</button><button class="mini-btn danger" onclick="deleteExpense(${exp.id})">×</button></td></tr>`).join("") || emptyRow(7, "Расходов пока нет.");
}
function renderAnalytics() {
  const metrics = getMetrics();
  const orderTarget = n(state.settings.targetOrdersMonth);
  const revenueTarget = n(state.settings.targetRevenueMonth);
  const orderProgress = orderTarget ? Math.min(metrics.completedOrders / orderTarget, 1) : 0;
  const revenueProgress = revenueTarget ? Math.min(metrics.revenue / revenueTarget, 1) : 0;
  document.getElementById("planFact").innerHTML = `<div class="plan-line"><strong>Заказы</strong><span>${metrics.completedOrders} / ${orderTarget}</span></div><div class="plan-track"><div class="plan-fill" style="--width:${orderProgress*100}%"></div></div><div class="plan-line"><strong>Выручка</strong><span>${money(metrics.revenue)} / ${money(revenueTarget)}</span></div><div class="plan-track"><div class="plan-fill" style="--width:${revenueProgress*100}%"></div></div>`;
  renderStatsTable("channelTable", ["Канал","Заявки","Заказы","Конверсия","Выручка","Прибыль","Маржа","Средний чек"], channelStats(), row => [row.name, row.leads, row.orders, pct(row.conversion), money(row.revenue), money(row.profit), pct(row.margin), Number.isFinite(row.avg) ? money(row.avg) : "—"]);
  renderStatsTable("serviceTable", ["Услуга","Заявки","Заказы","Выручка","Прибыль","Маржа","₽/час","Средний чек"], serviceStats(), row => [row.name, row.leads, row.orders, money(row.revenue), money(row.profit), pct(row.margin), Number.isFinite(row.pph) ? money(row.pph) : "—", Number.isFinite(row.avg) ? money(row.avg) : "—"]);
}
function renderStatsTable(id, headers, rows, mapper) {
  document.getElementById(id).innerHTML = `<thead><tr>${headers.map(h=>`<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.map(row => `<tr>${mapper(row).map((cell, i) => `<td class="${i>0 ? "num" : ""}">${cell}</td>`).join("")}</tr>`).join("") || `<tr><td colspan="${headers.length}" class="muted">Нет данных</td></tr>`}</tbody>`;
}
function renderSettings() {
  const fields = [
    ["companyName", "Название компании", "text"],
    ["brandFont", "Шрифт бренда", "text"],
    ["targetOrdersMonth", "Цель заказов в месяц", "number"],
    ["targetRevenueMonth", "Цель выручки в месяц", "number"],
    ["minMargin", "Минимальная маржа", "number", "0.01"],
    ["targetMargin", "Целевая маржа", "number", "0.01"],
    ["minProfitPerHour", "Мин. прибыль/нормо-час", "number"],
    ["ownerHourCost", "Стоимость часа собственника", "number"],
    ["yandexBudgetMonth", "Бюджет Яндекс.Директ/мес", "number"],
    ["minCheckAfterRepair", "Мин. чек: после ремонта", "number"],
    ["minCheckGeneral", "Мин. чек: генеральная", "number"],
    ["minCheckMaintenance", "Мин. чек: поддерживающая", "number"],
    ["cleanerHourRate", "Базовая ставка клинера/час", "number"],
    ["brigadierHourRate", "Базовая ставка бригадира/час", "number"]
  ];
  document.getElementById("settingsForm").innerHTML = fields.map(([key, label, type, step]) => `<label>${label}<input name="${key}" type="${type}" step="${step || 1}" value="${escapeHtml(state.settings[key])}"></label>`).join("");
}

function statusBadge(status) {
  const good = ["Согласована", "Выполнена", "Оплачена"].includes(status);
  const bad = ["Отказ", "Отменена", "Проблема"].includes(status);
  return `<span class="badge ${bad ? "badge-bad" : good ? "badge-ok" : "badge-neutral"}">${escapeHtml(status || "—")}</span>`;
}
function signalBadge(signal) {
  const cls = signal === "ОК" ? "badge-ok" : signal === "Отменён" ? "badge-neutral" : ["Долг", "Низкая маржа", "Низкая ₽/час"].includes(signal) ? "badge-warn" : "badge-bad";
  return `<span class="badge ${cls}">${escapeHtml(signal || "—")}</span>`;
}
function emptyRow(cols, text) { return `<tr><td colspan="${cols}" class="muted">${text}</td></tr>`; }
function escapeHtml(value) { return String(value ?? "").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;"); }
function escapeAttr(value) { return escapeHtml(value).replaceAll("\n", " "); }
function showToast(message) { const toast = document.getElementById("toast"); toast.textContent = message; toast.classList.add("visible"); setTimeout(()=>toast.classList.remove("visible"),2600); }
function nextId(items) { return Math.max(0, ...items.map(item => n(item.id))) + 1; }
function collectForm(form) { return Object.fromEntries(new FormData(form).entries()); }
function setFormValues(form, values) { Object.entries(values).forEach(([key,value]) => { const el = form.elements[key]; if (el) el.value = value ?? ""; }); }
function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.querySelectorAll("input[type='date']").forEach(input => { if (!input.value) input.value = today(); });
  modal.showModal();
}
function closeModalFromElement(element) { element.closest("dialog")?.close(); }

async function postAction(action, payload) {
  if (!SHEETS_API_URL) return { ok: true, localOnly: true };
  const response = await fetch(SHEETS_API_URL, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify({ action, payload }) });
  return response.json();
}
async function bootstrapFromSheets() {
  if (!SHEETS_API_URL) { document.getElementById("dataSourceLabel").textContent = "Локальный режим"; return; }
  try {
    const response = await fetch(`${SHEETS_API_URL}?action=bootstrap`);
    const data = await response.json();
    state = mergeState({ ...state, ...data });
    saveState();
    document.getElementById("dataSourceLabel").textContent = "Google Sheets";
    showToast("Данные обновлены из Google Sheets");
  } catch (error) {
    console.error(error);
    document.getElementById("dataSourceLabel").textContent = "Локальный режим";
    showToast("Не удалось подключиться к Google Sheets");
  }
}

function editLead(id) {
  const lead = state.leads.find(x => Number(x.id) === Number(id));
  if (!lead) return;
  editing.lead = lead.id;
  document.getElementById("leadFormTitle").textContent = "Редактирование заявки";
  setFormValues(document.getElementById("leadForm"), lead);
  openModal("leadModal");
}
function deleteLead(id) {
  if (!confirm("Удалить заявку?")) return;
  state.leads = state.leads.filter(x => Number(x.id) !== Number(id));
  saveState(); render(); showToast("Заявка удалена");
}
function editOrder(id) {
  const order = state.orders.find(x => Number(x.id) === Number(id));
  if (!order) return;
  editing.order = order.id;
  document.getElementById("orderFormTitle").textContent = "Редактирование заказа";
  const prepared = { ...order, complaint: toBool(order.complaint) ? "Да" : "Нет", rework: toBool(order.rework) ? "Да" : "Нет", checklist: toBool(order.checklist) ? "Да" : "Нет" };
  setFormValues(document.getElementById("orderForm"), prepared);
  openModal("orderModal");
}
function deleteOrder(id) {
  if (!confirm("Удалить заказ?")) return;
  state.orders = state.orders.filter(x => Number(x.id) !== Number(id));
  saveState(); render(); showToast("Заказ удалён");
}
function editExpense(id) {
  const exp = state.expenses.find(x => Number(x.id) === Number(id));
  if (!exp) return;
  editing.expense = exp.id;
  document.getElementById("expenseFormTitle").textContent = "Редактирование расхода";
  setFormValues(document.getElementById("expenseForm"), exp);
  openModal("expenseModal");
}
function deleteExpense(id) {
  if (!confirm("Удалить расход?")) return;
  state.expenses = state.expenses.filter(x => Number(x.id) !== Number(id));
  saveState(); render(); showToast("Расход удалён");
}

function setupEvents() {
  document.querySelectorAll(".nav-link").forEach(button => button.addEventListener("click", () => setView(button.dataset.view)));
  document.querySelectorAll("[data-view-shortcut]").forEach(button => button.addEventListener("click", () => setView(button.dataset.viewShortcut)));
  document.querySelectorAll("[data-open-modal]").forEach(button => button.addEventListener("click", () => {
    const formId = button.dataset.openModal;
    if (formId === "leadModal") { editing.lead = null; document.getElementById("leadFormTitle").textContent = "Новая заявка"; document.getElementById("leadForm").reset(); }
    if (formId === "orderModal") { editing.order = null; document.getElementById("orderFormTitle").textContent = "Новый заказ"; document.getElementById("orderForm").reset(); }
    if (formId === "expenseModal") { editing.expense = null; document.getElementById("expenseFormTitle").textContent = "Новый расход"; document.getElementById("expenseForm").reset(); }
    openModal(formId);
  }));
  document.querySelectorAll("[data-close-modal]").forEach(button => button.addEventListener("click", () => closeModalFromElement(button)));

  document.querySelectorAll("#periodButtons button").forEach(btn => btn.addEventListener("click", () => {
    filterState.period = btn.dataset.period;
    localStorage.setItem("prochistka.period", filterState.period);
    render();
  }));
  ["fromDate","toDate","channelFilter","serviceFilter","statusFilter"].forEach(id => document.getElementById(id).addEventListener("change", ev => {
    const map = { fromDate: "from", toDate: "to", channelFilter: "channel", serviceFilter: "service", statusFilter: "status" };
    filterState[map[id]] = ev.target.value;
    render();
  }));
  document.getElementById("resetFiltersBtn").addEventListener("click", () => { filterState = { period: "month", from: "", to: "", channel: "", service: "", status: "" }; render(); });
  ["leadSearch","leadStatusFilter","orderSearch","orderSignalFilter"].forEach(id => {
    document.getElementById(id)?.addEventListener("input", render);
    document.getElementById(id)?.addEventListener("change", render);
  });
  document.getElementById("refreshBtn").addEventListener("click", async () => { await bootstrapFromSheets(); render(); });
  document.getElementById("themeBtn").addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("prochistka.theme", next);
    render();
  });

  document.getElementById("leadForm").addEventListener("submit", async ev => {
    ev.preventDefault();
    const data = collectForm(ev.currentTarget);
    const lead = { id: editing.lead || nextId(state.leads), ...data, area: n(data.area), amount: n(data.amount), finalAmount: n(data.amount), time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }) };
    const i = state.leads.findIndex(x => Number(x.id) === Number(lead.id));
    if (i >= 0) state.leads[i] = lead; else state.leads.push(lead);
    saveState(); await postAction(i >= 0 ? "updateLead" : "appendLead", lead);
    ev.currentTarget.reset(); closeModalFromElement(ev.currentTarget); render(); showToast("Заявка сохранена");
  });

  document.getElementById("orderForm").addEventListener("submit", async ev => {
    ev.preventDefault();
    const d = collectForm(ev.currentTarget);
    const order = {
      id: editing.order || nextId(state.orders),
      leadId: d.leadId || "",
      requestDate: d.requestDate || d.doneDate,
      doneDate: d.doneDate,
      client: d.client,
      phone: d.phone || "",
      address: d.address || "",
      service: d.service,
      objectType: d.objectType,
      area: n(d.area),
      channel: d.channel,
      partner: d.partner || "",
      status: d.status,
      plannedRevenue: n(d.revenue),
      revenue: n(d.revenue),
      paid: d.paid === "" ? n(d.revenue) : n(d.paid),
      cleaners: n(d.cleaners || 1),
      plannedHours: 0,
      hours: n(d.hours),
      normHours: n(d.cleaners || 1) * n(d.hours),
      cleanerPay: n(d.cleanerPay),
      brigadierPay: n(d.brigadierPay),
      chemistry: n(d.chemistry),
      transport: n(d.transport),
      parking: n(d.parking),
      equipment: n(d.equipment),
      ads: n(d.ads),
      partnerCommission: n(d.partnerCommission),
      reworkCost: n(d.reworkCost),
      otherCosts: n(d.otherCosts),
      ownerHours: n(d.ownerHours),
      quality: d.quality || "",
      complaint: d.complaint === "Да",
      rework: d.rework === "Да" || n(d.reworkCost) > 0,
      checklist: d.checklist === "Да",
      photoReport: false,
      documents: false,
      comment: d.comment || ""
    };
    const enriched = enrichOrder(order);
    const i = state.orders.findIndex(x => Number(x.id) === Number(order.id));
    if (i >= 0) state.orders[i] = order; else state.orders.push(order);
    saveState(); await postAction(i >= 0 ? "updateOrder" : "appendOrder", enriched);
    ev.currentTarget.reset(); closeModalFromElement(ev.currentTarget); render(); showToast("Заказ сохранён");
  });

  document.getElementById("expenseForm").addEventListener("submit", async ev => {
    ev.preventDefault();
    const d = collectForm(ev.currentTarget);
    const exp = { id: editing.expense || nextId(state.expenses), ...d, orderId: d.orderId ? n(d.orderId) : "", amount: n(d.amount) };
    const i = state.expenses.findIndex(x => Number(x.id) === Number(exp.id));
    if (i >= 0) state.expenses[i] = exp; else state.expenses.push(exp);
    saveState(); await postAction(i >= 0 ? "updateExpense" : "appendExpense", exp);
    ev.currentTarget.reset(); closeModalFromElement(ev.currentTarget); render(); showToast("Расход сохранён");
  });

  document.getElementById("saveSettingsBtn").addEventListener("click", async () => {
    const data = collectForm(document.getElementById("settingsForm"));
    Object.entries(data).forEach(([key,value]) => { state.settings[key] = ["companyName","brandFont"].includes(key) ? value : n(value); });
    saveState(); await postAction("saveSettings", state.settings); render(); showToast("Настройки сохранены");
  });

  document.getElementById("exportJsonBtn").addEventListener("click", () => downloadFile(`prochistka-dashboard-${today()}.json`, JSON.stringify(state, null, 2), "application/json"));
  document.getElementById("exportCsvBtn").addEventListener("click", exportOrdersCsv);
  document.getElementById("importJsonBtn").addEventListener("click", () => document.getElementById("importJsonFile").click());
  document.getElementById("importJsonFile").addEventListener("change", importJson);
}
function setView(view) {
  currentView = view;
  document.querySelectorAll(".view").forEach(section => section.classList.toggle("active", section.id === view));
  document.querySelectorAll(".nav-link").forEach(button => button.classList.toggle("active", button.dataset.view === view));
  document.getElementById("pageTitle").textContent = pageTitles[view] || "Дашборд";
}
function downloadFile(name, text, type) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([text], { type }));
  a.download = name;
  a.click();
  URL.revokeObjectURL(a.href);
}
function exportOrdersCsv() {
  const esc = v => {
    v = String(v ?? "");
    if (/^[=+@\t\r]/.test(v) || (/^-/.test(v) && !/^-\d+([.,]\d+)?$/.test(v))) v = "'" + v;
    return /[";\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
  };
  const headers = ["ID","Дата","Клиент","Канал","Услуга","Выручка","Затраты","Прибыль","Маржа","Долг","Сигнал","Комментарий"];
  const rows = state.orders.map(o => enrichOrder(o)).map(o => [o.id,o.doneDate,o.client,o.channel,o.service,o.revenue,o.directCosts,o.grossProfit,pct(o.margin),o.debt,o.signal,o.comment]);
  downloadFile(`prochistka-orders-${today()}.csv`, "\ufeff" + [headers, ...rows].map(row => row.map(esc).join(";")).join("\r\n"), "text/csv;charset=utf-8");
}
async function importJson(ev) {
  const file = ev.target.files[0];
  if (!file) return;
  try {
    const imported = JSON.parse(await file.text());
    state = mergeState(imported);
    saveState(); render(); showToast("JSON импортирован");
  } catch {
    alert("Не удалось прочитать JSON.");
  }
  ev.target.value = "";
}

function initTheme() {
  const saved = localStorage.getItem("prochistka.theme");
  document.documentElement.dataset.theme = saved || "dark";
}
async function init() {
  initTheme();
  setupEvents();
  await bootstrapFromSheets();
  render();
}
init();

window.editLead = editLead;
window.deleteLead = deleteLead;
window.editOrder = editOrder;
window.deleteOrder = deleteOrder;
window.editExpense = editExpense;
window.deleteExpense = deleteExpense;
