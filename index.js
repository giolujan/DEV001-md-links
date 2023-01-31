const fs = require("fs");

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    //identificar si la ruta existe
    if(fs.existsSync(path)){
      // revisar y convertir a una ruta absoluta
      // probar si es la ruta absoluta es un archivo o directorio
      // si es un directorio devolver un arreglo de md 
    }else {
    //si la ruta no existe se rechaza la promesa
    reject('la ruta no existe');
    }
  });
};

module.exports = {
  mdLinks
 };
