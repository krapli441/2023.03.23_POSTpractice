// const fs = require('fs');
import fs from 'fs';

let A = "";
fs.readFile('./index.html','utf-8',(err,data)=>{
  console.log(`===== 첫 비동기 처리 후 콘솔 =====
  읽어온 data =
  ${data}`)
})
const B = fs.readFileSync('./index.html','utf-8');
A += B;
console.log(`===== 동기처리 B를 A에 대입 =====
동기처리 A =
${A}`);
A = "";
console.log(`===== 동기처리 후 A 초기화 =====
초기화 후 A =
${A}`)
new Promise((resolve,reject)=>{
  console.log('===== Promis 시작 =====');
  fs.readFile('./index.html','utf-8',(err,data)=>{
    console.log(`===== 프로미스 안 비동기 처리 readFile =====
    결과 =
    ${data}`)
  })
  console.log(`===== 프로미스 안 비동기처리 후 콘솔 A =====
  A =
  ${A}`)
  console.log(`===== Promise 종료 =====`)
})
