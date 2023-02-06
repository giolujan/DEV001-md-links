const fs = require("fs");
const path = require("path");
const axios = require("axios");

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

          // leer el archivo md
          fs.readFile(inputPath, 'utf-8', (err, data) => {
            if (err) {
              console.log('error: ', err);
            } else {
              //console.log(data);
              // sacar los links del contenido con las propiedades href text file

              const getmdLinks = (inputPath) => {
                const links = [];
                const file = readMd(inputPath);

                const regex = /\[(.+?)\]\((https?:\/\/.+?)\)/g;
                let match = regex.exec(file);

                while (match !== null) {
                  links.push({
                    href: match[2],
                    text: match[1],
                    file: inputPath,
                  });
                  match = regex.exec(file);
                }

                // si opcion validate es true se valida con status ok
                const arrayLinks = links.map(link => {
                  return axios.get(link.href).then(linkResponse => {
                    return {...link, status: linkResponse.status, ok: linkResponse.statusText };
                  }).catch(err => {
                    return {...link, status: 404, ok: 'fail' };
                  })
                });

                //  para resolver la promesa devolver un arreglo de links
                resolve(Promise.all(arrayLinks).then(result => console.log(result)));
                
                // console.log(links);
              };
              getmdLinks(inputPath);
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

/*
const arrayLinks = links.forEach(link => {
  console.log(arrayLinks)
});
*/
/*
const relativePath = (mdLinks) => {
  return new Promise((resolve, reject) => {
    reject ( path.dirname(inputPath) )
  })
}*/

module.exports = {
  mdLinks
};
