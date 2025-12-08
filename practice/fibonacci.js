// Fibonacci (first n)
const fib = n => { n=Number(n); if(!Number.isInteger(n)||n<1) throw Error('n>0'); let a=0,b=1, out=[]; for(let i=0;i<n;i++){ out.push(a); [a,b]=[b,a+b]; } return out; };
if(require.main===module){
  const n=process.argv[2]; if(!n) return console.log('Usage: node fibonacci.js <n>');
  console.log(fib(n).join(', '));
}
module.exports={fib};
