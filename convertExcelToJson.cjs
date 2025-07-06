const XLSX = require('xlsx');
const fs = require('fs');
// const path = require('path');

const inputFile = './src/data/products.xlsx';
const outputFile = './src/data/products.json';

const workbook = XLSX.readFile(inputFile);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

const jsonData = XLSX.utils.sheet_to_json(worksheet);

fs.writeFileSync(outputFile, JSON.stringify(jsonData, null, 2));

console.log(`✅Converted ${inputFile} to ${outputFile} with ${jsonData.length} records.`);
