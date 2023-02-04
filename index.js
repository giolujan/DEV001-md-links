const fs = require("fs");
const path = require("path");
const readMd = (inputPath) => fs.readFileSync(inputPath, 'utf-8');

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
          fs.readFile(inputPath, 'utf-8', (err, data) => {
            if (err) {
              console.log('error: ', err);
            } else {
              //console.log(data);
              const getmdLinks = (inputPath) => {
                const links = [];
                const regex = /\[(.+?)\]\((https?:\/\/.+?)\)/g;
                const file = readMd(inputPath);
                console.log(file)
                let match = regex.exec(file);
                while (match !== null) {
                  links.push({
                    href: match[2],
                    text: match[1],
                    file: inputPath,
                  });
                  match = regex.exec(file);
                  
              console.log(match)

                }
              };
              getmdLinks(inputPath)
              /*
              const getMdLinks = {};
              * Funcion que a partir de una cadena de texto en formato Mardkdown devuelve
              * todo elemento de la forma []()
              * getMdLinks.mdLink = function (str) {
                var regex = /\[(.*?)\](([^\s]+))/gi;
                var matchesArr = str.match(regex);
                var matchesArrFilter = matchesArr.filter(function (element) {
                  return element !== '[]()';
                });
                return matchesArrFilter;
              } 

              console.log(getMdLinks);
              */
              
              /* fs.readdir(inputPath, (err, files) => {
                if (err)
                  console.log(err);
                else {
                  console.log(file);
                  /*
                  files.forEach(file => {
                    console.log(file);
                })
                }
              })*/
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

      // leer el archivo md
      // sacar los links del contenido con las propiedades href text file 
      // si opcion validate es true se valida con status ok
      //  para resolver la promesa devolver un arreglo de links
    } else {
      //si la ruta no existe se rechaza la promesa
      reject('la ruta no existe');
    }
  });
};

/*
const relativePath = (mdLinks) => {
  return new Promise((resolve, reject) => {
    reject ( path.dirname(inputPath) )
  })
}*/

module.exports = {
  mdLinks
};
