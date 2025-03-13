const express = require('express');

const app = express();
const port = 3000;

// Middleware para analisar o corpo das requisições
//app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello Word');
})

    app.get('/calculadora', (req, res) => {
        const { numero1, numero2, operacao } = req.query;

    // Converte os parâmetros para números
    const number1 = parseFloat(numero1);
    const number2 = parseFloat(numero2);    

    // Verifica se os parâmetros são números válidos
    if (isNaN(number1) || isNaN(number2)) {
        return res.status(400).json({ erro: 'numero1 e numero2 devem ser números' });
    }    

    // cria uma variável javascript
    let resultado;

    switch (operacao) {
        case 'soma':
            resultado = number1 + number2;
            break;
        case 'subtracao':
            resultado = number1 - number2;
            break;
        case 'multiplicacao':
            resultado = number1 * number2;
            break;
        case 'divisao':
            if (number2 === 0) {
                return res.status(400).json({ erro: 'Divisão por zero não é permitida' });
            }
            resultado = number1 / number2;
            break;
        default:
            return res.status(400).json({ erro: 'Operação inválida' });
    }
    res.json({ resultado });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

// Mantém o servidor rodando mesmo se ocorrer um erro
process.on('uncaughtException', (err) => {
    console.error('Erro não tratado:', err);
  });
  
  process.on('unhandledRejection', (err) => {
    console.error('Rejeição não tratada:', err);
  });

  module.exports = app;