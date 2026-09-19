/**
 * Easy Tax & Account — รับข้อมูลจากฟอร์ม "ขอใบเสนอราคา / ปรึกษาฟรี" แล้วบันทึกลง Google Sheets
 * ------------------------------------------------------------------------------------------
 * วิธีใช้: คัดลอกไฟล์นี้ทั้งหมดไปวางใน Extensions > Apps Script ของ Google Sheet
 * แล้ว Deploy เป็น Web app (ดูขั้นตอนใน README.md หัวข้อ "เชื่อมฟอร์มกับ Google Sheets")
 *
 * หมายเหตุ: ทุกครั้งที่แก้โค้ดนี้ ต้อง Deploy > Manage deployments > Edit > Version: New version
 * ไม่อย่างนั้น Web app จะยังใช้โค้ดเวอร์ชันเดิม
 */

/** ชื่อแท็บที่ใช้เก็บข้อมูล (สร้างให้อัตโนมัติถ้ายังไม่มี) */
const SHEET_NAME = 'Leads';

/** อีเมลที่ต้องการให้แจ้งเตือนเมื่อมีคนกรอกฟอร์ม (คั่นหลายอีเมลด้วย ,) — เว้นว่างถ้าไม่ต้องการ */
const NOTIFY_EMAILS = '';

/** หัวคอลัมน์ และ key ของข้อมูลที่ส่งมาจากเว็บ (เรียงตามลำดับคอลัมน์) */
const COLUMNS = [
  ['วันเวลาที่ส่ง', 'timestamp'],
  ['ประเภทคำขอ', 'mode'],
  ['ชื่อ', 'name'],
  ['ชื่อธุรกิจ', 'businessName'],
  ['เบอร์โทร', 'phone'],
  ['อีเมล', 'email'],
  ['LINE ID', 'lineId'],
  ['ประเภทธุรกิจ', 'businessType'],
  ['จำนวนเอกสารต่อเดือน', 'documentVolume'],
  ['สถานะ VAT', 'vatStatus'],
  ['บริการที่สนใจ', 'services'],
  ['แพ็กเกจที่สนใจ', 'plan'],
  ['รายละเอียดเพิ่มเติม', 'details'],
  ['หน้าเว็บที่ส่ง', 'pageUrl'],
  ['สถานะการติดต่อ', 'status'],
];

const MAX_LENGTH = 2000;

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);

    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');

    // Honeypot กันสแปมบอท: ช่องนี้ถูกซ่อนจากผู้ใช้จริง ถ้ามีค่าแปลว่าเป็นบอท
    if (data.website) return json_({ ok: true });

    if (!clean_(data.name) || !clean_(data.phone)) {
      return json_({ ok: false, error: 'missing required fields' });
    }

    const record = Object.assign({}, data, { timestamp: new Date(), status: 'ยังไม่ติดต่อ' });
    const row = COLUMNS.map(function (col) {
      const key = col[1];
      return key === 'timestamp' ? record.timestamp : clean_(record[key]);
    });

    const sheet = getSheet_();
    const range = sheet.getRange(sheet.getLastRow() + 1, 1, 1, row.length);
    // คอลัมน์แรกเป็นวันที่ ที่เหลือเก็บเป็นข้อความ (เบอร์โทรจะไม่หายเลข 0 ด้านหน้า)
    range.setNumberFormats([row.map(function (_, i) { return i === 0 ? 'dd/mm/yyyy hh:mm:ss' : '@'; })]);
    range.setValues([row]);

    notify_(row);
    return json_({ ok: true });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/** เปิด URL ของ Web app ใน browser เพื่อเช็กว่า deploy สำเร็จ */
function doGet() {
  return json_({ ok: true, message: 'Easy Tax & Account lead endpoint is running' });
}

function getSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    writeHeaders_(sheet);
    sheet.setFrozenRows(1);
  } else {
    // ชีตที่สร้างไว้ก่อนจะมีการเพิ่ม/ย้ายคอลัมน์ จะมีหัวคอลัมน์ชุดเก่าค้างอยู่
    // ทำให้ข้อมูลแถวใหม่เลื่อนไม่ตรงหัว — เขียนหัวคอลัมน์ใหม่ให้ตรงกับ COLUMNS เสมอ
    // (ถ้าตั้งใจเปลี่ยนชื่อหัวคอลัมน์เอง ให้แก้ที่ COLUMNS แทน ไม่งั้นจะถูกเขียนทับ)
    const current = sheet.getRange(1, 1, 1, COLUMNS.length).getValues()[0];
    const expected = COLUMNS.map(function (col) { return col[0]; });
    const matched = expected.every(function (label, i) { return current[i] === label; });
    if (!matched) writeHeaders_(sheet);
  }
  return sheet;
}

function writeHeaders_(sheet) {
  sheet.getRange(1, 1, 1, COLUMNS.length)
    .setValues([COLUMNS.map(function (col) { return col[0]; })])
    .setFontWeight('bold')
    .setBackground('#e1f1e6');
}

/**
 * ซ่อมหัวคอลัมน์ให้ตรงกับ COLUMNS ทันที โดยไม่ต้องรอให้มีคนกรอกฟอร์ม
 * วิธีใช้: เลือกฟังก์ชัน "setupHeaders" ในแถบด้านบนของ Apps Script แล้วกด Run
 * หมายเหตุ: ซ่อมเฉพาะ "หัวคอลัมน์" เท่านั้น ไม่ได้ย้ายข้อมูลแถวเก่าที่บันทึกด้วยชุดคอลัมน์เดิม
 */
function setupHeaders() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) throw new Error('ยังไม่มีแท็บ ' + SHEET_NAME);
  writeHeaders_(sheet);
  sheet.setFrozenRows(1);
}

/** ตัดช่องว่าง จำกัดความยาว และกันการแทรกสูตร (=, +, -, @) ลงในชีต */
function clean_(value) {
  let text = value == null ? '' : String(value).trim().slice(0, MAX_LENGTH);
  if (/^[=+\-@]/.test(text)) text = "'" + text;
  return text;
}

function notify_(row) {
  if (!NOTIFY_EMAILS) return;
  try {
    const body = COLUMNS.map(function (col, i) { return col[0] + ': ' + row[i]; }).join('\n');
    MailApp.sendEmail({
      to: NOTIFY_EMAILS,
      subject: '[Easy Tax & Account] ' + row[1] + ' ใหม่จากคุณ ' + row[2],
      body: body + '\n\nดูทั้งหมด: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl(),
    });
  } catch (err) {
    // ส่งอีเมลไม่สำเร็จ ไม่ต้องทำให้การบันทึกข้อมูลล้มเหลว
    console.error('notify failed', err);
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
