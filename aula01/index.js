const express = require('express');

const app =  express();
const port = 3000;

app.get('/',(req, res) => {
    res.send('Hello World');
});

app.get('/calculadora', (req, res) => {
    const { numero1, numero2, operacao } = req.query;

//converte os parâmetros para números
const number1 = parseFloat(numero1);
const number2 = parseFloat(numero2);

//verifica se os parâmetros são números válidos
if (isNaN(number1) || isNaN(number2)) {
    return res.status(400).json({erro: 'numero1 e numero2 devem ser numeros'});
}

//cria uma variável javascript
let resultado;

switch (operacao) {
    case 'soma':
        resultado = number1 + number2;
        break;
    case 'multiplicacao':
        resultado = number1 * number2;
        break;
    case 'divisao':
        if (number2 === 0) {
            return res.status(400).json({ erro: 'Divisão por zero não é permitida'})
        }
        resultado = number1 / number2;
        break;
    default:
        return res.status(400).json({ erro: 'Operação inválida'});
    }
    res.json({ resultado });
});

//inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
});

//mantém o servidor rodando mesmo se ocorrer erro
process.on('uncaughtException', (err) => {
    console.error('Erro não tratado:', err);
});

process.on('unhandledRejection', (err) => {
    console.error('Rejeição não tratada:', err);
});