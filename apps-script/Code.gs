const SPREADSHEET_ID = '18fLwl1Wwh1SvyymZNlae8C7cQaDO8c9LFSFCT6MSKgE';

const SHEETS = {
  leads: 'Обращения',
  orders: 'Заказы',
  expenses: 'Расходы',
  employees: 'Сотрудники',
  partners: 'Партнёры',
  dictionaries: 'Справочники',
  settings: 'Настройки'
};

function doGet(e) {
  const action = e && e.parameter && e.parameter.action;
  if (action === 'bootstrap') {
    return jsonResponse(getBootstrapData());
  }
  return jsonResponse({ ok: true, message: 'PRO-CHISTKA Business Dashboard API' });
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || '{}');
    const action = body.action;
    const payload = body.payload || {};

    if (action === 'appendLead') return jsonResponse(appendLead(payload));
    if (action === 'appendOrder') return jsonResponse(appendOrder(payload));
    if (action === 'appendExpense') return jsonResponse(appendExpense(payload));
    if (action === 'saveSettings') return jsonResponse(saveSettings(payload));

    return jsonResponse({ ok: false, error: 'Unknown action: ' + action });
  } catch (error) {
    return jsonResponse({ ok: false, error: String(error && error.message ? error.message : error) });
  }
}

function getBootstrapData() {
  return {
    leads: readObjects(SHEETS.leads),
    orders: readObjects(SHEETS.orders),
    expenses: readObjects(SHEETS.expenses),
    settings: readSettings(),
    dictionaries: readDictionaries()
  };
}

function appendLead(lead) {
  const row = [
    lead.id,
    lead.date,
    lead.time || '',
    lead.client,
    lead.phone,
    lead.source,
    lead.partner || '',
    lead.service,
    lead.objectType,
    lead.area || '',
    lead.address || '',
    lead.desiredDate || '',
    lead.status,
    lead.rejectReason || '',
    lead.amount || '',
    lead.finalAmount || '',
    lead.responsible || '',
    lead.comment || '',
    lead.orderId || '',
    lead.nextContact || '',
    monthOf(lead.date),
    yearOf(lead.date),
    weekOf(lead.date),
    lead.orderId ? 'Да' : 'Нет'
  ];
  appendRowSafe(SHEETS.leads, row);
  return { ok: true, lead: lead };
}

function appendOrder(order) {
  const row = [
    order.id,
    order.leadId || '',
    order.requestDate || '',
    order.doneDate || '',
    order.client,
    order.service,
    order.objectType,
    order.area || '',
    order.channel,
    order.partner || '',
    order.status,
    order.plannedRevenue || '',
    order.revenue || '',
    order.paid || '',
    order.debt || '',
    order.cleaners || '',
    order.plannedHours || '',
    order.hours || '',
    order.normHours || '',
    order.pricePerMeter || '',
    order.cleanerPay || '',
    order.brigadierPay || '',
    order.chemistry || '',
    order.transport || '',
    order.parking || '',
    order.equipment || '',
    order.ads || '',
    order.partnerCommission || '',
    order.reworkCost || '',
    order.otherCosts || '',
    order.directCosts || '',
    order.grossProfit || '',
    order.margin || '',
    order.profitPerHour || '',
    order.ownerHours || '',
    order.ownerHourCost || '',
    order.ownerProfit || '',
    order.brigadier || '',
    order.employees || '',
    order.quality || '',
    boolRu(order.complaint),
    boolRu(order.rework),
    boolRu(order.checklist),
    boolRu(order.photoReport),
    boolRu(order.documents),
    order.comment || '',
    monthOf(order.doneDate),
    yearOf(order.doneDate),
    weekOf(order.doneDate),
    order.signal || ''
  ];
  appendRowSafe(SHEETS.orders, row);
  return { ok: true, order: order };
}

function appendExpense(expense) {
  const row = [
    expense.date,
    expense.orderId || '',
    expense.category,
    expense.subcategory || '',
    expense.amount,
    expense.paymentMethod || '',
    expense.responsible || '',
    expense.comment || '',
    monthOf(expense.date),
    yearOf(expense.date),
    weekOf(expense.date)
  ];
  appendRowSafe(SHEETS.expenses, row);
  return { ok: true, expense: expense };
}

function saveSettings(settings) {
  const sheet = getOrCreateSheet(SHEETS.settings);
  sheet.clearContents();
  sheet.appendRow(['Параметр', 'Значение']);
  Object.keys(settings).forEach(function (key) {
    sheet.appendRow([key, settings[key]]);
  });
  return { ok: true, settings: settings };
}

function readObjects(sheetName) {
  const sheet = getSheet(sheetName);
  if (!sheet) return [];
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];
  const headers = values[0].map(String);
  return values.slice(1)
    .filter(function (row) { return row.some(function (cell) { return cell !== '' && cell !== null; }); })
    .map(function (row) {
      const item = {};
      headers.forEach(function (header, index) {
        if (!header) return;
        item[normalizeHeader(header)] = row[index];
      });
      return item;
    });
}

function readSettings() {
  const sheet = getSheet(SHEETS.settings);
  if (!sheet) return {};
  const values = sheet.getDataRange().getValues();
  const result = {};
  values.slice(1).forEach(function (row) {
    if (row[0]) result[normalizeHeader(row[0])] = row[1];
  });
  return result;
}

function readDictionaries() {
  const sheet = getSheet(SHEETS.dictionaries);
  if (!sheet) return {};
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return {};
  const headers = values[0].map(function (header) { return normalizeHeader(header); });
  const result = {};
  headers.forEach(function (header) { if (header) result[header] = []; });
  values.slice(1).forEach(function (row) {
    row.forEach(function (cell, index) {
      const key = headers[index];
      if (key && cell !== '' && cell !== null) result[key].push(cell);
    });
  });
  return result;
}

function appendRowSafe(sheetName, row) {
  const sheet = getOrCreateSheet(sheetName);
  sheet.appendRow(row);
}

function getSheet(sheetName) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  return ss.getSheetByName(sheetName);
}

function getOrCreateSheet(sheetName) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  return ss.getSheetByName(sheetName) || ss.insertSheet(sheetName);
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function normalizeHeader(header) {
  const map = {
    'ID заявки': 'id',
    'Дата обращения': 'date',
    'Время': 'time',
    'Клиент': 'client',
    'Телефон': 'phone',
    'Источник': 'source',
    'Партнёр': 'partner',
    'Услуга': 'service',
    'Тип объекта': 'objectType',
    'Площадь, м²': 'area',
    'Адрес/район': 'address',
    'Желаемая дата': 'desiredDate',
    'Статус заявки': 'status',
    'Причина отказа': 'rejectReason',
    'Предварительная сумма': 'amount',
    'Финальная сумма': 'finalAmount',
    'Ответственный': 'responsible',
    'Комментарий': 'comment',
    'ID заказа': 'id',
    'Дата след. контакта': 'nextContact',
    'Дата выполнения': 'doneDate',
    'Канал': 'channel',
    'Статус заказа': 'status',
    'Сумма план': 'plannedRevenue',
    'Сумма факт': 'revenue',
    'Оплачено, ₽': 'paid',
    'Долг, ₽': 'debt',
    'Кол-во клинеров': 'cleaners',
    'Часы бригады план': 'plannedHours',
    'Часы бригады факт': 'hours',
    'Нормо-часы факт': 'normHours',
    'Цена за м²': 'pricePerMeter',
    'Оплата клинерам': 'cleanerPay',
    'Оплата бригадиру': 'brigadierPay',
    'Химия/расходники': 'chemistry',
    'Дорога': 'transport',
    'Парковка': 'parking',
    'Оборудование/аренда': 'equipment',
    'Реклама': 'ads',
    'Комиссия партнёру': 'partnerCommission',
    'Переделки': 'reworkCost',
    'Прочие расходы': 'otherCosts',
    'Прямые затраты': 'directCosts',
    'Валовая прибыль': 'grossProfit',
    'Маржа': 'margin',
    'Прибыль/нормо-час': 'profitPerHour',
    'Часы собственника': 'ownerHours',
    'Стоимость часа собственника': 'ownerHourCost',
    'Прибыль после собственника': 'ownerProfit',
    'Бригадир': 'brigadier',
    'Сотрудники': 'employees',
    'Оценка качества': 'quality',
    'Жалобы': 'complaint',
    'Переделка?': 'rework',
    'Чек-лист': 'checklist',
    'Фотоотчёт': 'photoReport',
    'Договор/акт': 'documents',
    'Сигнал': 'signal',
    'Дата': 'date',
    'Категория': 'category',
    'Подкатегория': 'subcategory',
    'Сумма': 'amount',
    'Способ оплаты': 'paymentMethod',
    'Параметр': 'parameter',
    'Значение': 'value'
  };
  return map[String(header).trim()] || String(header).trim();
}

function boolRu(value) {
  return value ? 'Да' : 'Нет';
}

function monthOf(date) {
  if (!date) return '';
  return Utilities.formatDate(new Date(date), Session.getScriptTimeZone(), 'yyyy-MM');
}

function yearOf(date) {
  if (!date) return '';
  return Utilities.formatDate(new Date(date), Session.getScriptTimeZone(), 'yyyy');
}

function weekOf(date) {
  if (!date) return '';
  return Utilities.formatDate(new Date(date), Session.getScriptTimeZone(), 'w');
}
