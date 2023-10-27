// Importando as bibliotecas necessárias
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

// Quando um cliente se conectar
io.on('connection', (socket) => {
    console.log('Um usuário entrou no chat');

    // Quando um usuário entrar no chat
    socket.on('entrada', (usuario) => {
        console.log(usuario + ' entrou no chat');
        io.emit('mensagem', { usuario: usuario, mensagem: usuario + ' entrou no chat', tipo: 'entrada' });
    });

    // Quando um usuário enviar uma mensagem
    socket.on('mensagem', (dados) => {
        console.log(dados.usuario + ': ' + dados.mensagem);
        io.emit('mensagem', { usuario: dados.usuario, mensagem: dados.mensagem, tipo: 'mensagem' });
    });
});

// Iniciando o servidor na porta 8000
http.listen(8000, () => {
    console.log('Servidor rodando na porta 8000');
});