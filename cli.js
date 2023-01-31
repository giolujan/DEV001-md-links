const {mdLinks} = require('./index.js');

console.log(mdLinks);
mdLinks('/noexiste/').then((error)=>{
  console.log(error)
})
.catch((error)=>{
   console.log(error)
})