const mdLinks = require('../index.js');
const transformPathAbsolute = require('../index.js');

describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });
  // it('deberia devolver una promesa', () => {
  //  expect(typeof mdLinks).toBe('Promise');
  // });
  it('deberia rechazar la promesa', () => {
    return mdLinks('/laboratoria/noexisteestepack.md').catch((error)=>{
      expect(error).toBe("la ruta no existe");
    });
  });
});
/*
describe('transformPathAbsolute', () => {
  it ('debería ser una función', => {})
})*/
