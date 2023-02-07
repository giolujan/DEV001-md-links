const { getmdLinks } = require('./getmdlink.js');

const fs = require("fs");
const path = require("path");

const mdLinks = (inputPath, options) => {
  return new Promise((resolve, reject) => {
    //comprueba si una ruta existe o no
    if (fs.existsSync(inputPath)) {

      if (path.isAbsolute(inputPath)) {
        //Comprueba si un archivo es una ruta absoluta o no.
        //reject("la  ruta es absoluta")
        const extension = path.extname(inputPath)
        //Devuelve la extensión de la ruta. 
        if ((extension === '.md')) {
          //reject("la  ruta es .md")

          // leer el archivo md
          // utf-8 formatos
          fs.readFile(inputPath, 'utf-8', (err, data) => {
            if (err) {
              console.log('error: ', err);
            } else {
              //console.log(data);
             resolve( getmdLinks(inputPath))
            }
            
          });
        } else {
          reject(path.extname(inputPath))
        }
      } else {
        //permite obtener la ruta absoluta 
        const relativePath = path.resolve(inputPath)
        //Devuelve el nombre de directorio de una ruta.
        const path1 = path.dirname(relativePath)
        //Devuelve la última parte de una ruta. 
        const path2 = path.basename(relativePath)
        //Junta todos los argumentos y normaliza la ruta resultante.
        reject(path.join(path1, path2))
      }   
      
    } else {
      //si la ruta no existe se rechaza la promesa
      reject('la ruta no existe');
    }
  });
};



module.exports = {
  mdLinks
};
