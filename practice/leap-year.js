// Leap year
const isLeap = y => {
  y = Number(y); if(!Number.isInteger(y) || y<=0) throw Error('year>0');
  return (y%4===0 && y%100!==0) || (y%400===0);
};
if(require.main===module){
  const y=process.argv[2]; if(!y) return console.log('Usage: node leap-year.js <year>');
  console.log(isLeap(y) ? `${y} is a leap year` : `${y} is not a leap year`);
}
module.exports={isLeap};
