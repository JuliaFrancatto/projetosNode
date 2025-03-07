const request = require('supertest');
const app = require('../index.js');
 
describe('Testes da rota /calculadora', () => {
  it('Deve realizar uma soma corretamente', async () => {
    const response = await request(app)
      .get('/calculadora')
      .query({ numero1: 5, numero2: 3, operacao: 'soma' });
 
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ resultado: 8 });
  });
});
