const SPREADSHEET_ID = '1zjar439J_-xwZQNcgHfdHNt8oVGukq7O33OiIInoIrE';

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
  if (action === 'bootstrap') return jsonResponse(getBootstrapData());
  return jsonResponse({ ok: true, message: 'PRO-CHISTKA Business Dashboard API v2' });
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || '{}');
    const action = body.action;
    const payload = body.payload || {};
    if (action === 'appendLead') return jsonResponse(appendObject(SHEETS.leads, payload, leadRow));
    if (action === 'updateLead') return jsonResponse(updateObject(SHEETS.leads, payload, leadRow, 'ID заявки'));
    if (action === 'appendOrder') return jsonResponse(appendObject(SHEETS.orders, payload, orderRow));
    if (action === 'updateOrder') return jsonResponse(updateObject(SHEETS.orders, payload, orderRow, 'ID заказа'));
    if (action === 'appendExpense') return jsonResponse(appendObject(SHEETS.expenses, payload, expenseRow));
    if (action === 'updateExpense') return jsonResponse(updateObject(SHEETS.expenses, payload, expenseRow, 'ID расхода'));
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

function appendObject(sheetName, payload, rowBuilder) {
  getOrCreateSheet(sheetName).appendRow(rowBuilder(payload));
  return { ok: true, payload: payload };
}

function updateObject(sheetName, payload, rowBuilder, idHeader) {
  const sheet = getOrCreateSheet(sheetName);
  const values = sheet.getDataRange().getValues();
  if (!values.length) return appendObject(sheetName, payload, rowBuilder);
  const headers = values[0].map(String);
  const idIndex = headers.indexOf(idHeader);
  if (idIndex < 0) return appendObject(sheetName, payload, rowBuilder);
  const id = String(payload.id || '');
  for (let i = 1; i < values.length; i++) {
    if (String(values[i][idIndex]) === id) {
      const row = rowBuilder(payload);
      sheet.getRange(i + 1, 1, 1, row.length).setValues([row]);
      return { ok: true, updated: true, payload: payload };
    }
  }
  return appendObject(sheetName, payload, rowBuilder);
}

function leadRow(lead) {
  const date = lead.date || '';
  return [
    lead.id || '', date, lead.time || '', lead.client || '', lead.phone || '', lead.source || '', lead.partner || '',
    lead.service || '', lead.objectType || '', lead.area || '', lead.address || '', lead.desiredDate || '', lead.status || '',
    lead.rejectReason || '', lead.amount || '', lead.finalAmount || '', lead.responsible || '', lead.comment || '', lead.orderId || '',
    lead.nextContact || '', monthOf(date), yearOf(date), weekOf(date), lead.orderId ? 'Да' : 'Нет'
  ];
}

function orderRow(order) {
  const doneDate = order.doneDate || '';
  return [
    order.id || '', order.leadId || '', order.requestDate || '', doneDate, order.client || '', order.phone || '', order.address || '',
    order.service || '', order.objectType || '', order.area || '', order.channel || '', order.partner || '', order.status || '',
    order.plannedRevenue || '', order.revenue || '', order.paid || '', order.debt || '', order.cleaners || '', order.plannedHours || '',
    order.hours || '', order.normHours || '', order.pricePerMeter || '', order.cleanerPay || '', order.brigadierPay || '',
    order.chemistry || '', order.transport || '', order.parking || '', order.equipment || '', order.ads || '',
    order.partnerCommission || '', order.reworkCost || '', order.otherCosts || '', order.directCosts || '', order.grossProfit || '',
    order.margin || '', order.profitPerHour || '', order.ownerHours || '', order.ownerHourCost || '', order.ownerProfit || '',
    order.brigadier || '', order.employees || '', order.quality || '', boolRu(order.complaint), boolRu(order.rework),
    boolRu(order.checklist), boolRu(order.photoReport), boolRu(order.documents), order.comment || '', monthOf(doneDate),
    yearOf(doneDate), weekOf(doneDate), order.signal || ''
  ];
}

function expenseRow(expense) {
  const date = expense.date || '';
  return [
    expense.id || '', date, expense.orderId || '', expense.category || '', expense.subcategory || '', expense.amount || '',
    expense.paymentMethod || '', expense.responsible || '', expense.comment || '', monthOf(date), yearOf(date), weekOf(date)
  ];
}

function saveSettings(settings) {
  const sheet = getOrCreateSheet(SHEETS.settings);
  sheet.clearContents();
  sheet.appendRow(['Параметр', 'Значение', 'Комментарий']);
  Object.keys(settings).forEach(function (key) { sheet.appendRow([key, settings[key], '']); });
  return { ok: true, settings: settings };
}

function readObjects(sheetName) {
  const sheet = getSheet(sheetName);
  if (!sheet) return [];
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];
  const headers = values[0].map(function (header) { return normalizeHeader(header, sheetName); });
  return values.slice(1)
    .filter(function (row) { return row.some(function (cell) { return cell !== '' && cell !== null; }); })
    .map(function (row) {
      const item = {};
      headers.forEach(function (header, index) { if (header) item[header] = row[index]; });
      return item;
    });
}

function readSettings() {
  const sheet = getSheet(SHEETS.settings);
  if (!sheet) return {};
  const values = sheet.getDataRange().getValues();
  const result = {};
  values.slice(1).forEach(function (row) { if (row[0]) result[normalizeHeader(row[0], SHEETS.settings)] = row[1]; });
  return result;
}

function readDictionaries() {
  const sheet = getSheet(SHEETS.dictionaries);
  if (!sheet) return {};
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return {};
  const headers = values[0].map(function (header) { return normalizeHeader(header, SHEETS.dictionaries); });
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

function getSheet(sheetName) {
  return SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(sheetName);
}

function getOrCreateSheet(sheetName) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  return ss.getSheetByName(sheetName) || ss.insertSheet(sheetName);
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

function normalizeHeader(header, sheetName) {
  const name = String(header).trim();
  const sheetMaps = {};
  sheetMaps[SHEETS.leads] = { 'ID заявки': 'id', 'ID заказа': 'orderId' };
  sheetMaps[SHEETS.orders] = { 'ID заказа': 'id', 'ID заявки': 'leadId' };
  sheetMaps[SHEETS.expenses] = { 'ID расхода': 'id', 'ID заказа': 'orderId' };
  if (sheetMaps[sheetName] && sheetMaps[sheetName][name]) return sheetMaps[sheetName][name];

  const map = {
    'Дата обращения': 'date', 'Время': 'time', 'Клиент': 'client', 'Телефон': 'phone', 'Источник': 'source',
    'Партнёр': 'partner', 'Услуга': 'service', 'Тип объекта': 'objectType', 'Площадь, м²': 'area',
    'Адрес/район': 'address', 'Желаемая дата': 'desiredDate', 'Статус заявки': 'status', 'Причина отказа': 'rejectReason',
    'Предварительная сумма': 'amount', 'Финальная сумма': 'finalAmount', 'Ответственный': 'responsible', 'Комментарий': 'comment',
    'Дата след. контакта': 'nextContact', 'Дата выполнения': 'doneDate', 'Канал': 'channel', 'Статус заказа': 'status',
    'Сумма план': 'plannedRevenue', 'Сумма факт': 'revenue', 'Оплачено, ₽': 'paid', 'Долг, ₽': 'debt',
    'Кол-во клинеров': 'cleaners', 'Часы бригады план': 'plannedHours', 'Часы бригады факт': 'hours',
    'Нормо-часы факт': 'normHours', 'Цена за м²': 'pricePerMeter', 'Оплата клинерам': 'cleanerPay',
    'Оплата бригадиру': 'brigadierPay', 'Химия/расходники': 'chemistry', 'Дорога': 'transport', 'Парковка': 'parking',
    'Оборудование/аренда': 'equipment', 'Реклама': 'ads', 'Комиссия партнёру': 'partnerCommission', 'Переделки': 'reworkCost',
    'Прочие расходы': 'otherCosts', 'Прямые затраты': 'directCosts', 'Валовая прибыль': 'grossProfit', 'Маржа': 'margin',
    'Прибыль/нормо-час': 'profitPerHour', 'Часы собственника': 'ownerHours', 'Стоимость часа собственника': 'ownerHourCost',
    'Прибыль после собственника': 'ownerProfit', 'Бригадир': 'brigadier', 'Сотрудники': 'employees', 'Оценка качества': 'quality',
    'Жалобы': 'complaint', 'Переделка?': 'rework', 'Чек-лист': 'checklist', 'Фотоотчёт': 'photoReport', 'Договор/акт': 'documents',
    'Сигнал': 'signal', 'Дата': 'date', 'Категория': 'category', 'Подкатегория': 'subcategory', 'Сумма': 'amount',
    'Способ оплаты': 'paymentMethod', 'Параметр': 'parameter', 'Значение': 'value',
    'Статусы заявок': 'leadStatuses', 'Статусы заказов': 'orderStatuses', 'Услуги': 'services', 'Типы объектов': 'objectTypes',
    'Каналы': 'channels', 'Причины отказа': 'rejectReasons', 'Категории расходов': 'expenseCategories', 'Да/Нет': 'yesNo',
    'Оценка': 'ratings', 'Роли': 'roles', 'Статусы сотрудников': 'employeeStatuses', 'Типы партнёров': 'partnerTypes', 'Способы оплаты': 'paymentMethods'
  };
  return map[name] || name;
}

function boolRu(value) { return value ? 'Да' : 'Нет'; }
function monthOf(date) { return date ? Utilities.formatDate(new Date(date), Session.getScriptTimeZone(), 'yyyy-MM') : ''; }
function yearOf(date) { return date ? Utilities.formatDate(new Date(date), Session.getScriptTimeZone(), 'yyyy') : ''; }
function weekOf(date) { return date ? Utilities.formatDate(new Date(date), Session.getScriptTimeZone(), 'w') : ''; }
