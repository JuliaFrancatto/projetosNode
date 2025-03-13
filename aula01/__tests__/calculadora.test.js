const request = require('supertest');
const app = require('../index.js');

describe('Calculadora API', () => {
    // Teste para a rota raiz
    it('deve retornar "Hello Word" para a rota raiz', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Hello Word');
    });

      // Teste para a operação de soma
      it('deve retornar a soma de dois números', async () => {
        const response = await request(app)
            .get('/calculadora')
            .query({ numero1: 5, numero2: 3, operacao: 'soma' });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ resultado: 8 });
    });

        // Teste para a operação de subtracao
        it('deve retornar a subtracao de dois números', async () => {
          const response = await request(app)
              .get('/calculadora')
              .query({ numero1: 2, numero2: 1, operacao: 'subtracao' });
          expect(response.statusCode).toBe(200);
          expect(response.body).toEqual({ resultado: 1 });
      });

         // Teste para a operação de multiplicacao
         it('deve retornar a multiplicacao de dois números', async () => {
          const response = await request(app)
              .get('/calculadora')
              .query({ numero1: 5, numero2: 5, operacao: 'multiplicacao' });
          expect(response.statusCode).toBe(200);
          expect(response.body).toEqual({ resultado: 25 });
      });

       // Teste para a operação de divisao
       it('deve retornar a divisao de dois números', async () => {
        const response = await request(app)
            .get('/calculadora')
            .query({ numero1: 30, numero2: 3, operacao: 'divisao' });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ resultado: 10 }); 
    });

    // Teste para a operação de divisao com zero
    it('deve retornar erro ao dividir por zero', async () => {
      const response = await request(app)
          .get('/calculadora')
          .query({ numero1: 2, numero2: 0, operacao: 'divisao' });
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({ erro: 'Divisão por zero não é permitida' }); 
  });

   // Teste para a operação de divisao com zero
   it('deve retornar erro para operação inválida', async () => {
    const response = await request(app)
        .get('/calculadora')
        .query({ numero1: 2, numero2: 3, operacao: 'invalida' });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ erro: 'Operação inválida' })
});


});

