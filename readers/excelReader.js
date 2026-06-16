import XLSX from "xlsx";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getSheetData(sheetName) {
  const filePath = path.join(
    __dirname,
    "../data/IngredientsAndComorbidities-ScrapperHackathon.xlsx",
  );
  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[sheetName];

  if (!sheet) {
    throw new Error(`Sheet "${sheetName}" not found in Excel file`);
  }

  return XLSX.utils.sheet_to_json(sheet, { header: 1 });
}

export function readLCHFData() {
  const rows = getSheetData("Final list for LCHFElimination ");
  const lchfEliminate = [];
  const lchfAdd = [];

  for (let i = 2; i < rows.length; i++) {
    const row = rows[i];
    if (row[0]) lchfEliminate.push(row[0].toString().toLowerCase().trim());
    if (row[1]) lchfAdd.push(row[1].toString().toLowerCase().trim());
  }

  return { lchfEliminate, lchfAdd };
}

export function readLFVData() {
  const rows = getSheetData("Final list for LFV Elimination ");
  const lfvEliminate = [];
  const lfvAdd = [];

  for (let i = 2; i < rows.length; i++) {
    const row = rows[i];
    if (row[0]) lfvEliminate.push(row[0].toString().toLowerCase().trim());
    if (row[1]) lfvAdd.push(row[1].toString().toLowerCase().trim());
  }

  return { lfvEliminate, lfvAdd };
}

export function readAllergyData() {
  const rows = getSheetData("Filter -1 Allergies - Bonus Poi");
  const allergies = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (row[0]) allergies.push(row[0].toString().toLowerCase().trim());
  }

  return { allergies };
}
