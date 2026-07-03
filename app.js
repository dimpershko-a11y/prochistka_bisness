// PRO-CHISTKA Business Dashboard
// Если подключишь Google Apps Script Web App, вставь URL сюда.
const SHEETS_API_URL = "";

const STORAGE_KEY = "prochistka_business_dashboard_v1";

const defaultState = {
  settings: {
    companyName: "PRO-CHISTKA",
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
    paymentMethods: ["Наличные", "Перевод", "Расчётный счёт", "Карта", "Другое"]
  },
  leads: [
    {
      id: 1,
      date: "2026-05-08",
      time: "10:37",
      client: "Полина",
      phone: "79650852038",
      source: "Яндекс Директ",
      partner: "",
      service: "После ремонта",
      objectType: "Квартира",
      area: 39,
      address: "-",
      desiredDate: "",
      status: "Расчёт отправлен",
      rejectReason: "",
      amount: 12000,
      finalAmount: 0,
      responsible: "",
      comment: "",
      orderId: "",
      nextContact: "2026-05-09"
    },
    {
      id: 2,
      date: "2026-05-08",
      time: "12:09",
      client: "Кристина",
      phone: "79062699120",
      source: "Яндекс Директ",
      partner: "",
      service: "После ремонта",
      objectType: "Квартира",
      area: 41,
      address: "проспект художников 14",
      desiredDate: "2026-05-10",
      status: "Согласована",
      rejectReason: "",
      amount: 16450,
      finalAmount: 19000,
      responsible: "",
      comment: "",
      orderId: 1,
      nextContact: ""
    }
  ],
  orders: [
    {
      id: 1,
      leadId: 2,
      requestDate: "2026-05-08",
      doneDate: "2026-05-10",
      client: "Кристина",
      service: "После ремонта",
      objectType: "Квартира",
      area: 41,
      channel: "Яндекс Директ",
      status: "Выполнена",
      plannedRevenue: 16450,
      revenue: 19000,
      paid: 19000,
      cleaners: 1,
      plannedHours: 7.5,
      hours: 7,
      normHours: 7,
      cleanerPay: 4000,
      brigadierPay: 0,
      chemistry: 500,
      transport: 0,
      parking: 0,
      equipment: 0,
      ads: 0,
      partnerCommission: 0,
      reworkCost: 0,
      otherCosts: 0,
      ownerHours: 7,
      quality: 5,
      complaint: false,
      rework: false,
      checklist: false,
      photoReport: false,
      documents: false,
      comment: ""
    },
    {
      id: 2,
      leadId: 3,
      requestDate: "2026-05-07",
      doneDate: "2026-05-07",
      client: "Марина",
      service: "После ремонта",
      objectType: "Квартира",
      area: 70,
      channel: "Яндекс Директ",
      status: "Выполнена",
      plannedRevenue: 29200,
      revenue: 29500,
      paid: 29500,
      cleaners: 3,
      plannedHours: 7.5,
      hours: 7,
      normHours: 21,
      cleanerPay: 14000,
      brigadierPay: 0,
      chemistry: 600,
      transport: 372,
      parking: 0,
      equipment: 0,
      ads: 0,
      partnerCommission: 0,
      reworkCost: 0,
      otherCosts: 0,
      ownerHours: 7,
      quality: 5,
      complaint: false,
      rework: false,
      checklist: false,
      photoReport: false,
      documents: false,
      comment: ""
    },
    {
      id: 3,
      leadId: 4,
      requestDate: "2026-05-04",
      doneDate: "2026-05-08",
      client: "Ия",
      service: "После ремонта",
      objectType: "Дом",
      area: 260,
      channel: "Яндекс Директ",
      status: "Выполнена",
      plannedRevenue: 30000,
      revenue: 30000,
      paid: 30000,
      cleaners: 4,
      plannedHours: 9,
      hours: 10,
      normHours: 40,
      cleanerPay: 20000,
      brigadierPay: 0,
      chemistry: 1000,
      transport: 1500,
      parking: 0,
      equipment: 0,
      ads: 0,
      partnerCommission: 0,
      reworkCost: 0,
      otherCosts: 0,
      ownerHours: 10,
      quality: 5,
      complaint: false,
      rework: false,
      checklist: false,
      photoReport: false,
      documents: false,
      comment: "Низкая цена за м² — разобрать отдельно"
    },
    {
      id: 4,
      leadId: 5,
      requestDate: "2026-05-12",
      doneDate: "2026-05-13",
      client: "Марина",
      service: "Мойка окон",
      objectType: "Квартира",
      area: 0,
      channel: "Повторный клиент",
      status: "Согласована",
      plannedRevenue: 10000,
      revenue: 10000,
      paid: 0,
      cleaners: 1,
      plannedHours: 3,
      hours: 0,
      normHours: 0,
      cleanerPay: 0,
      brigadierPay: 0,
      chemistry: 300,
      transport: 1000,
      parking: 0,
      equipment: 0,
      ads: 0,
      partnerCommission: 0,
      reworkCost: 0,
      otherCosts: 0,
      ownerHours: 3,
      quality: "",
      complaint: false,
      rework: false,
      checklist: false,
      photoReport: false,
      documents: false,
      comment: ""
    },
    {
      id: 5,
      leadId: 6,
      requestDate: "2026-05-12",
      doneDate: "2026-05-14",
      client: "Евгения",
      service: "Другое",
      objectType: "Квартира",
      area: 0,
      channel: "Повторный клиент",
      status: "Согласована",
      plannedRevenue: 10000,
      revenue: 10000,
      paid: 0,
      cleaners: 1,
      plannedHours: 5,
      hours: 0,
      normHours: 0,
      cleanerPay: 0,
      brigadierPay: 0,
      chemistry: 150,
      transport: 1500,
      parking: 0,
      equipment: 0,
      ads: 0,
      partnerCommission: 0,
      reworkCost: 0,
      otherCosts: 0,
      ownerHours: 5,
      quality: "",
      complaint: false,
      rework: false,
      checklist: false,
      photoReport: false,
      documents: false,
      comment: ""
    },
    {
      id: 6,
      leadId: 7,
      requestDate: "2026-05-06",
      doneDate: "2026-05-16",
      client: "Михаил",
      service: "После ремонта",
      objectType: "Дом",
      area: 170,
      channel: "Яндекс Директ",
      status: "Согласована",
      plannedRevenue: 99745,
      revenue: 99745,
      paid: 0,
      cleaners: 8,
      plannedHours: 9,
      hours: 0,
      normHours: 0,
      cleanerPay: 0,
      brigadierPay: 0,
      chemistry: 5000,
      transport: 1500,
      parking: 0,
      equipment: 0,
      ads: 0,
      partnerCommission: 0,
      reworkCost: 0,
      otherCosts: 0,
      ownerHours: 20,
      quality: "",
      complaint: false,
      rework: false,
      checklist: false,
      photoReport: false,
      documents: false,
      comment: "Большой объект — держать под контролем"
    }
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
let selectedMonth = "all";

const pageTitles = {
  dashboard: "Пульс бизнеса",
  leads: "Заявки",
  orders: "Заказы",
  expenses: "Расходы",
  analytics: "Аналитика",
  settings: "Настройки"
};

const formatRub = new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 });
const formatNum = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 1 });

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return clone(defaultState);
    const parsed = JSON.parse(saved);
    return {
      ...clone(defaultState),
      ...parsed,
      settings: { ...defaultState.settings, ...(parsed.settings || {}) },
      dictionaries: { ...defaultState.dictionaries, ...(parsed.dictionaries || {}) }
    };
  } catch (error) {
    console.warn("Не удалось загрузить локальные данные", error);
    return clone(defaultState);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function money(value) {
  return formatRub.format(Number(value || 0));
}

function percent(value) {
  if (!Number.isFinite(value)) return "0%";
  return `${Math.round(value * 100)}%`;
}

function parseNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function getMonth(date) {
  if (!date) return "Без даты";
  return String(date).slice(0, 7);
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function getOrderCosts(order) {
  return [
    order.cleanerPay,
    order.brigadierPay,
    order.chemistry,
    order.transport,
    order.parking,
    order.equipment,
    order.ads,
    order.partnerCommission,
    order.reworkCost,
    order.otherCosts
  ].reduce((sum, value) => sum + parseNumber(value), 0);
}

function enrichOrder(order) {
  const revenue = parseNumber(order.revenue || order.plannedRevenue);
  const paid = parseNumber(order.paid);
  const debt = Math.max(revenue - paid, 0);
  const directCosts = getOrderCosts(order);
  const grossProfit = revenue - directCosts;
  const margin = revenue > 0 ? grossProfit / revenue : 0;
  const normHours = parseNumber(order.normHours) || (parseNumber(order.cleaners) * parseNumber(order.hours));
  const profitPerHour = normHours > 0 ? grossProfit / normHours : 0;
  const ownerProfit = grossProfit - parseNumber(order.ownerHours) * parseNumber(state.settings.ownerHourCost);
  const pricePerMeter = parseNumber(order.area) > 0 ? revenue / parseNumber(order.area) : 0;
  const signal = getOrderSignal({ ...order, revenue, debt, grossProfit, margin, profitPerHour });

  return {
    ...order,
    revenue,
    paid,
    debt,
    directCosts,
    grossProfit,
    margin,
    normHours,
    profitPerHour,
    ownerProfit,
    pricePerMeter,
    signal
  };
}

function getOrderSignal(order) {
  if (order.status === "Отменена") return "Отменён";
  if (order.debt > 0 && ["Выполнена", "Оплачена"].includes(order.status)) return "Долг";
  if (order.complaint || order.rework || parseNumber(order.reworkCost) > 0 || order.status === "Проблема") return "Проблема";
  if (order.revenue > 0 && order.margin < parseNumber(state.settings.minMargin)) return "Низкая маржа";
  if (order.profitPerHour > 0 && order.profitPerHour < parseNumber(state.settings.minProfitPerHour)) return "Низкая ₽/час";
  return "ОК";
}

function filterByMonth(items, dateField = "doneDate") {
  if (selectedMonth === "all") return items;
  return items.filter((item) => getMonth(item[dateField]) === selectedMonth);
}

function getVisibleOrders() {
  return filterByMonth(state.orders.map(enrichOrder), "doneDate");
}

function getVisibleLeads() {
  return filterByMonth(state.leads, "date");
}

function getVisibleExpenses() {
  return filterByMonth(state.expenses, "date");
}

function getMetrics() {
  const orders = getVisibleOrders();
  const leads = getVisibleLeads();
  const expenses = getVisibleExpenses();
  const completed = orders.filter((order) => ["Выполнена", "Оплачена"].includes(order.status));
  const revenue = completed.reduce((sum, order) => sum + order.revenue, 0);
  const directCosts = completed.reduce((sum, order) => sum + order.directCosts, 0);
  const extraExpenses = expenses
    .filter((expense) => !expense.orderId)
    .reduce((sum, expense) => sum + parseNumber(expense.amount), 0);
  const grossProfit = revenue - directCosts - extraExpenses;
  const margin = revenue > 0 ? grossProfit / revenue : 0;
  const normHours = completed.reduce((sum, order) => sum + order.normHours, 0);
  const avgCheck = completed.length ? revenue / completed.length : 0;
  const profitPerHour = normHours > 0 ? grossProfit / normHours : 0;
  const conversion = leads.length ? completed.length / leads.length : 0;
  const debt = orders.reduce((sum, order) => sum + order.debt, 0);
  const problemCount = orders.filter((order) => !["ОК", "Отменён"].includes(order.signal)).length;

  return {
    leads: leads.length,
    completedOrders: completed.length,
    allOrders: orders.length,
    revenue,
    directCosts: directCosts + extraExpenses,
    grossProfit,
    margin,
    avgCheck,
    normHours,
    profitPerHour,
    conversion,
    debt,
    problemCount
  };
}

function groupSum(items, key, valueGetter) {
  return items.reduce((acc, item) => {
    const label = item[key] || "Не указано";
    acc[label] = (acc[label] || 0) + valueGetter(item);
    return acc;
  }, {});
}

function render() {
  renderMonthFilter();
  renderSelectOptions();
  renderDashboard();
  renderLeads();
  renderOrders();
  renderExpenses();
  renderAnalytics();
  renderSettings();
}

function renderMonthFilter() {
  const monthFilter = document.getElementById("monthFilter");
  const months = Array.from(new Set([
    ...state.orders.map((order) => getMonth(order.doneDate)),
    ...state.leads.map((lead) => getMonth(lead.date)),
    ...state.expenses.map((expense) => getMonth(expense.date))
  ].filter(Boolean))).sort().reverse();

  const current = selectedMonth;
  monthFilter.innerHTML = `<option value="all">Все месяцы</option>${months.map((month) => `<option value="${month}">${month}</option>`).join("")}`;
  monthFilter.value = months.includes(current) ? current : "all";
  selectedMonth = monthFilter.value;
}

function renderSelectOptions() {
  document.querySelectorAll("select[data-options]").forEach((select) => {
    const key = select.dataset.options;
    const options = state.dictionaries[key] || [];
    const current = select.value;
    select.innerHTML = options.map((item) => `<option value="${escapeHtml(item)}">${escapeHtml(item)}</option>`).join("");
    if (current) select.value = current;
  });

  fillFilter("leadStatusFilter", state.dictionaries.leadStatuses);
  fillFilter("orderStatusFilter", state.dictionaries.orderStatuses);
  fillFilter("orderSignalFilter", ["ОК", "Долг", "Проблема", "Низкая маржа", "Низкая ₽/час", "Отменён"]);
}

function fillFilter(id, values) {
  const select = document.getElementById(id);
  if (!select) return;
  const first = select.options[0]?.outerHTML || `<option value="">Все</option>`;
  const current = select.value;
  select.innerHTML = first + values.map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join("");
  select.value = current;
}

function renderDashboard() {
  const metrics = getMetrics();
  const orders = getVisibleOrders();

  document.getElementById("heroProfit").textContent = money(metrics.grossProfit);
  document.getElementById("heroProfitHint").textContent = `${money(metrics.revenue)} выручка · ${money(metrics.directCosts)} затраты`;
  document.getElementById("heroMargin").textContent = percent(metrics.margin);
  document.querySelector(".hero-meter")?.style.setProperty("--meter", `${Math.min(Math.max(metrics.margin * 100, 0), 100)}%`);

  const cards = [
    ["Заявки", metrics.leads, "в выбранном периоде"],
    ["Выполнено", metrics.completedOrders, "заказов"],
    ["Конверсия", percent(metrics.conversion), "заявка → заказ"],
    ["Средний чек", money(metrics.avgCheck), "по выполненным"],
    ["Нормо-часы", formatNum.format(metrics.normHours), "факт"],
    ["Прибыль/час", money(metrics.profitPerHour), "ключевой показатель"],
    ["Долги", money(metrics.debt), "к оплате"],
    ["Проблемные", metrics.problemCount, "заказов с сигналом"]
  ];

  document.getElementById("metricGrid").innerHTML = cards.map(([label, value, hint]) => `
    <article class="metric-card">
      <small>${label}</small>
      <strong>${value}</strong>
      <small>${hint}</small>
    </article>
  `).join("");

  renderFocusList(orders, metrics);
  renderBars("channelBars", groupSum(orders, "channel", (order) => order.revenue), money);
  renderRecentOrders(orders);
}

function renderFocusList(orders, metrics) {
  const focus = [];
  if (metrics.debt > 0) focus.push(["Долги клиентов", money(metrics.debt)]);
  const lowMargin = orders.filter((order) => order.signal === "Низкая маржа").length;
  if (lowMargin) focus.push(["Заказы с низкой маржой", lowMargin]);
  const lowHour = orders.filter((order) => order.signal === "Низкая ₽/час").length;
  if (lowHour) focus.push(["Заказы с низкой прибылью/час", lowHour]);
  const nextContacts = getVisibleLeads().filter((lead) => lead.nextContact && lead.status !== "Отказ").length;
  if (nextContacts) focus.push(["Следующие контакты", nextContacts]);
  if (!focus.length) focus.push(["Критичных сигналов нет", "ОК"]);

  document.getElementById("focusList").innerHTML = focus.map(([title, value]) => `
    <div class="focus-item">
      <span>${escapeHtml(title)}</span>
      <strong>${value}</strong>
    </div>
  `).join("");
}

function renderRecentOrders(orders) {
  const sorted = [...orders]
    .sort((a, b) => String(b.doneDate).localeCompare(String(a.doneDate)))
    .slice(0, 6);

  document.getElementById("recentOrders").innerHTML = sorted.map((order) => `
    <article class="compact-item">
      <div class="compact-item-title">
        <span>${escapeHtml(order.client)} · ${escapeHtml(order.service)}</span>
        ${signalBadge(order.signal)}
      </div>
      <p>${order.doneDate || "без даты"} · ${money(order.revenue)} · прибыль ${money(order.grossProfit)} · ${percent(order.margin)}</p>
    </article>
  `).join("") || `<p class="muted">Заказов пока нет.</p>`;
}

function renderLeads() {
  const search = document.getElementById("leadSearch")?.value?.toLowerCase() || "";
  const status = document.getElementById("leadStatusFilter")?.value || "";

  const leads = getVisibleLeads()
    .filter((lead) => !status || lead.status === status)
    .filter((lead) => [lead.client, lead.phone, lead.service, lead.source].join(" ").toLowerCase().includes(search))
    .sort((a, b) => String(b.date).localeCompare(String(a.date)));

  document.getElementById("leadsTable").innerHTML = leads.map((lead) => `
    <tr>
      <td>${lead.date || ""}</td>
      <td><strong>${escapeHtml(lead.client)}</strong><br><span class="muted">${escapeHtml(lead.phone)}</span></td>
      <td>${escapeHtml(lead.source)}</td>
      <td>${escapeHtml(lead.service)}<br><span class="muted">${lead.area ? `${lead.area} м²` : ""}</span></td>
      <td>${money(lead.finalAmount || lead.amount)}</td>
      <td>${statusBadge(lead.status)}</td>
      <td>${lead.nextContact || "—"}</td>
    </tr>
  `).join("") || emptyRow(7, "Заявок пока нет.");
}

function renderOrders() {
  const search = document.getElementById("orderSearch")?.value?.toLowerCase() || "";
  const status = document.getElementById("orderStatusFilter")?.value || "";
  const signal = document.getElementById("orderSignalFilter")?.value || "";

  const orders = getVisibleOrders()
    .filter((order) => !status || order.status === status)
    .filter((order) => !signal || order.signal === signal)
    .filter((order) => [order.client, order.service, order.objectType, order.channel, order.comment].join(" ").toLowerCase().includes(search))
    .sort((a, b) => String(b.doneDate).localeCompare(String(a.doneDate)));

  document.getElementById("ordersTable").innerHTML = orders.map((order) => `
    <tr>
      <td>${order.doneDate || ""}</td>
      <td><strong>${escapeHtml(order.client)}</strong><br><span class="muted">${escapeHtml(order.channel)}</span></td>
      <td>${escapeHtml(order.service)}<br><span class="muted">${order.area ? `${order.area} м² · ${money(order.pricePerMeter)}/м²` : escapeHtml(order.objectType)}</span></td>
      <td>${money(order.revenue)}</td>
      <td>${money(order.directCosts)}</td>
      <td><strong>${money(order.grossProfit)}</strong></td>
      <td>${percent(order.margin)}</td>
      <td>${order.profitPerHour ? money(order.profitPerHour) : "—"}</td>
      <td>${signalBadge(order.signal)}</td>
    </tr>
  `).join("") || emptyRow(9, "Заказов пока нет.");
}

function renderExpenses() {
  const expenses = getVisibleExpenses().sort((a, b) => String(b.date).localeCompare(String(a.date)));
  document.getElementById("expensesTable").innerHTML = expenses.map((expense) => `
    <tr>
      <td>${expense.date || ""}</td>
      <td>${expense.orderId || "—"}</td>
      <td>${escapeHtml(expense.category)}</td>
      <td><strong>${money(expense.amount)}</strong></td>
      <td>${escapeHtml(expense.paymentMethod || "")}</td>
      <td>${escapeHtml(expense.comment || "")}</td>
    </tr>
  `).join("") || emptyRow(6, "Расходов пока нет.");
}

function renderAnalytics() {
  const orders = getVisibleOrders();
  renderBars("serviceBars", groupSum(orders, "service", (order) => order.revenue), money);
  renderBars("profitChannelBars", groupSum(orders, "channel", (order) => order.grossProfit), money);

  const metrics = getMetrics();
  const orderTarget = parseNumber(state.settings.targetOrdersMonth);
  const revenueTarget = parseNumber(state.settings.targetRevenueMonth);
  const orderProgress = orderTarget ? Math.min(metrics.completedOrders / orderTarget, 1) : 0;
  const revenueProgress = revenueTarget ? Math.min(metrics.revenue / revenueTarget, 1) : 0;

  document.getElementById("planFact").innerHTML = `
    <div class="plan-line"><strong>Заказы</strong><span>${metrics.completedOrders} / ${orderTarget}</span></div>
    <div class="plan-track"><div class="plan-fill" style="--width:${orderProgress * 100}%"></div></div>
    <div class="plan-line"><strong>Выручка</strong><span>${money(metrics.revenue)} / ${money(revenueTarget)}</span></div>
    <div class="plan-track"><div class="plan-fill" style="--width:${revenueProgress * 100}%"></div></div>
  `;
}

function renderBars(containerId, grouped, formatter = (value) => value) {
  const entries = Object.entries(grouped).sort((a, b) => b[1] - a[1]);
  const max = Math.max(...entries.map(([, value]) => Math.abs(value)), 1);

  document.getElementById(containerId).innerHTML = entries.map(([label, value]) => `
    <div class="bar-row">
      <div class="bar-row-header"><span>${escapeHtml(label)}</span><strong>${formatter(value)}</strong></div>
      <div class="bar-track"><div class="bar-fill" style="--width:${Math.max((Math.abs(value) / max) * 100, 4)}%"></div></div>
    </div>
  `).join("") || `<p class="muted">Данных пока нет.</p>`;
}

function renderSettings() {
  const fields = [
    ["companyName", "Название компании", "text"],
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

  document.getElementById("settingsForm").innerHTML = fields.map(([key, label, type, step]) => `
    <label>${label}
      <input name="${key}" type="${type}" step="${step || 1}" value="${escapeHtml(state.settings[key])}">
    </label>
  `).join("");
}

function statusBadge(status) {
  const good = ["Согласована", "Выполнена", "Оплачена"].includes(status);
  const bad = ["Отказ", "Отменена", "Проблема"].includes(status);
  const cls = bad ? "badge-bad" : good ? "badge-ok" : "badge-neutral";
  return `<span class="badge ${cls}">${escapeHtml(status || "—")}</span>`;
}

function signalBadge(signal) {
  const cls = signal === "ОК" ? "badge-ok" : signal === "Отменён" ? "badge-neutral" : ["Долг", "Низкая маржа", "Низкая ₽/час"].includes(signal) ? "badge-warn" : "badge-bad";
  return `<span class="badge ${cls}">${escapeHtml(signal || "—")}</span>`;
}

function emptyRow(cols, text) {
  return `<tr><td colspan="${cols}" class="muted">${text}</td></tr>`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("visible");
  window.setTimeout(() => toast.classList.remove("visible"), 2600);
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.querySelectorAll("input[type='date']").forEach((input) => {
    if (!input.value) input.value = today();
  });
  modal.showModal();
}

function closeModalFromElement(element) {
  const modal = element.closest("dialog");
  if (modal) modal.close();
}

function nextId(items) {
  return Math.max(0, ...items.map((item) => parseNumber(item.id))) + 1;
}

function collectForm(form) {
  return Object.fromEntries(new FormData(form).entries());
}

async function postAction(action, payload) {
  if (!SHEETS_API_URL) return { ok: true, localOnly: true };
  const response = await fetch(SHEETS_API_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ action, payload })
  });
  return response.json();
}

async function bootstrapFromSheets() {
  if (!SHEETS_API_URL) {
    document.getElementById("dataSourceLabel").textContent = "Демо-режим";
    return;
  }

  try {
    const response = await fetch(`${SHEETS_API_URL}?action=bootstrap`);
    const data = await response.json();
    state = {
      ...state,
      ...data,
      settings: { ...state.settings, ...(data.settings || {}) },
      dictionaries: { ...state.dictionaries, ...(data.dictionaries || {}) }
    };
    saveState();
    document.getElementById("dataSourceLabel").textContent = "Google Sheets";
    showToast("Данные обновлены из Google Sheets");
  } catch (error) {
    console.error(error);
    document.getElementById("dataSourceLabel").textContent = "Локальный режим";
    showToast("Не удалось подключиться к Google Sheets, работаю локально");
  }
}

function setupEvents() {
  document.querySelectorAll(".nav-link").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.view));
  });

  document.querySelectorAll("[data-view-shortcut]").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.viewShortcut));
  });

  document.querySelectorAll("[data-open-modal]").forEach((button) => {
    button.addEventListener("click", () => openModal(button.dataset.openModal));
  });

  document.querySelectorAll("[data-close-modal]").forEach((button) => {
    button.addEventListener("click", () => closeModalFromElement(button));
  });

  document.getElementById("monthFilter").addEventListener("change", (event) => {
    selectedMonth = event.target.value;
    render();
  });

  ["leadSearch", "leadStatusFilter", "orderSearch", "orderStatusFilter", "orderSignalFilter"].forEach((id) => {
    document.getElementById(id)?.addEventListener("input", render);
    document.getElementById(id)?.addEventListener("change", render);
  });

  document.getElementById("refreshBtn").addEventListener("click", async () => {
    await bootstrapFromSheets();
    render();
  });

  document.getElementById("leadForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = collectForm(event.currentTarget);
    const lead = {
      id: nextId(state.leads),
      ...data,
      area: parseNumber(data.area),
      amount: parseNumber(data.amount),
      finalAmount: parseNumber(data.amount),
      time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })
    };
    state.leads.push(lead);
    saveState();
    await postAction("appendLead", lead);
    event.currentTarget.reset();
    closeModalFromElement(event.currentTarget);
    render();
    showToast("Заявка добавлена");
  });

  document.getElementById("orderForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = collectForm(event.currentTarget);
    const order = {
      id: nextId(state.orders),
      requestDate: data.doneDate,
      ...data,
      area: parseNumber(data.area),
      plannedRevenue: parseNumber(data.revenue),
      revenue: parseNumber(data.revenue),
      paid: parseNumber(data.paid || data.revenue),
      cleaners: parseNumber(data.cleaners || 1),
      hours: parseNumber(data.hours),
      normHours: parseNumber(data.cleaners || 1) * parseNumber(data.hours),
      cleanerPay: parseNumber(data.cleanerPay),
      brigadierPay: 0,
      chemistry: parseNumber(data.chemistry),
      transport: parseNumber(data.transport),
      parking: 0,
      equipment: 0,
      ads: parseNumber(data.ads),
      partnerCommission: 0,
      reworkCost: parseNumber(data.reworkCost),
      otherCosts: 0,
      ownerHours: 0,
      complaint: false,
      rework: parseNumber(data.reworkCost) > 0,
      checklist: false,
      photoReport: false,
      documents: false
    };
    state.orders.push(order);
    saveState();
    await postAction("appendOrder", enrichOrder(order));
    event.currentTarget.reset();
    closeModalFromElement(event.currentTarget);
    render();
    showToast("Заказ добавлен");
  });

  document.getElementById("expenseForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = collectForm(event.currentTarget);
    const expense = {
      id: nextId(state.expenses),
      ...data,
      orderId: data.orderId ? parseNumber(data.orderId) : "",
      amount: parseNumber(data.amount)
    };
    state.expenses.push(expense);
    saveState();
    await postAction("appendExpense", expense);
    event.currentTarget.reset();
    closeModalFromElement(event.currentTarget);
    render();
    showToast("Расход добавлен");
  });

  document.getElementById("saveSettingsBtn").addEventListener("click", async () => {
    const data = collectForm(document.getElementById("settingsForm"));
    Object.entries(data).forEach(([key, value]) => {
      state.settings[key] = key === "companyName" ? value : parseNumber(value);
    });
    saveState();
    await postAction("saveSettings", state.settings);
    render();
    showToast("Настройки сохранены");
  });
}

function setView(view) {
  currentView = view;
  document.querySelectorAll(".view").forEach((section) => section.classList.toggle("active", section.id === view));
  document.querySelectorAll(".nav-link").forEach((button) => button.classList.toggle("active", button.dataset.view === view));
  document.getElementById("pageTitle").textContent = pageTitles[view] || "Дашборд";
}

async function init() {
  setupEvents();
  await bootstrapFromSheets();
  render();
}

init();
