/* 
  input : 10 charactrers

  binary space partitioning
  the first 7 characters either be F or B and specify the 128 rows (0 - 127)
  the last 3 characters either R or L and specify the 8 columns (0 - 7)
  F => front (lower half row)
  B => back (upper half row)
  L => left (lower half column)
  R => right (upper half column)
  seat ID => row * 8 + column

  output : your seat ID, highest seat ID
*/

const fs = require('fs');

const convertToBinary = (input) => {
  let binary = [];
  for (const letter of input) {
    if (letter === 'F' || letter === 'L') binary.push(0);
    else if (letter === 'B' || letter === 'R') binary.push(1);
  }
  return binary.join('');
};

const convertToDecimal = (input) => {
  return parseInt(input, 2);
};

const calculateSeatId = (row, column) => {
  return row * 8 + column;
};

const getMySeatId = (data) => {
  for (let index = 0; index < data.length; index++) {
    if (data[index] !== data[index + 1] - 1) {
      return data[index] + 1;
    }
  }
};

const getListSeatId = (data) => {
  const seats = data.toString().split('\n');
  const listSeatId = seats.map((seat) => {
    const row = seat.slice(0, 7);
    const column = seat.slice(7);
    const rowBinary = convertToBinary(row);
    const columnBinary = convertToBinary(column);
    const rowDecimal = convertToDecimal(rowBinary);
    const columnDecimal = convertToDecimal(columnBinary);
    const seatId = calculateSeatId(rowDecimal, columnDecimal);
    if (seatId) return seatId;
  });
  // filter undefined data
  const filterData = listSeatId.filter((a) => typeof a === 'number');
  // sort data
  const sortData = filterData.sort((a, b) => a - b);
  return sortData;
};

const data = fs.readFileSync('./input1.txt', { encoding: 'utf8', flag: 'r' });
const listSeatId = getListSeatId(data);

const mySeatId = getMySeatId(listSeatId);
const maxSeatId = listSeatId[listSeatId.length - 1];
console.log('My Seat ID: ', mySeatId);
console.log('Max Seat ID: ', maxSeatId);
