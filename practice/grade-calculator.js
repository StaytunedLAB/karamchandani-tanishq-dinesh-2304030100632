// Grade via switch-case
const grade = p => {
  p = Number(p); if (isNaN(p)||p<0||p>100) throw Error('0-100');
  switch(true){
    case p>=90: return 'A+';
    case p>=80: return 'A';
    case p>=70: return 'B';
    case p>=60: return 'C';
    case p>=50: return 'D';
    default: return 'F';
  }
};
if(require.main===module){
  const m=process.argv[2]; if(!m) return console.log('Usage: node grade-calculator.js <marks>');
  console.log(grade(m));
}
module.exports={grade};
