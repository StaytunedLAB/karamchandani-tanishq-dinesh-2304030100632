// Palindrome (string)
const isPalindrome = s => {
  s = String(s).toLowerCase().replace(/[^a-z0-9]/g,'');
  return s === s.split('').reverse().join('');
};
if(require.main===module){
  const input = process.argv.slice(2).join(' '); if(!input) return console.log('Usage: node palindrome.js "<text>"');
  console.log(isPalindrome(input) ? 'Palindrome' : 'Not a palindrome');
}
module.exports={isPalindrome};
