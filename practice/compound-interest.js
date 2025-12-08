// Compound Interest
const ci = (p,r,t,n=1)=>{
  p=Number(p); r=Number(r)/100; t=Number(t); n=Number(n);
  const A = p*Math.pow(1 + r/n, n*t);
  return { amount: A, ci: A - p };
};
if(require.main===module){
  const [p,r,t,n]=process.argv.slice(2);
  if(!p||!r||!t) return console.log('Usage: node compound-interest.js <p> <r%> <t> [n]');
  console.log(ci(p,r,t,n));
}
module.exports={ci};
