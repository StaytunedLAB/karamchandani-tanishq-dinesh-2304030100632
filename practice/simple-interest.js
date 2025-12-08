// Simple Interest
const si = (p,r,t) => Number(p)*Number(r)*Number(t)/100;
if(require.main===module){
  const [p,r,t]=process.argv.slice(2);
  if(!p||!r||!t) return console.log('Usage: node simple-interest.js <p> <r%> <t>');
  const val = si(p,r,t); console.log(`SI=${val} Amount=${Number(p)+val}`);
}
module.exports={si};
