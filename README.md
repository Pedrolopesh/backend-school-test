# Inglesh

## Getting Started with SCHOOL API

## install depencies
'npm install' at principal /API diractory to install all dependecies

## Start server
'npm run dev' at principal /API diractory to run server localhost:4000/

## Start Testes
'npm run test' at principal /API diractory to run tests.
warn: need config local variables inside mocha.spec.js file

## Introduction
What does your API do? It's a prototype for API that simulate a school test, you can create a student, the test and a question for that test.

## Overview
There are validations at the request that must atend the rigth way to the requests return success as true

## Error Codes
401 as error to save data 400 as error to find some data

## ========================================================================

# Português

## Primeiro passos para SCHOOL API

## Instalar dependências
'npm install' dentro da pasta /API para instalar todas as depências do projeto

## Iniciar Servidor Local
'npm run dev' dentro da pasta /API para iniciar o servidor localmente localhost:3333/

## Iniciar Testes
'npm run test' dentro da pasta /API para iniciar os testes.
obs: necessário configurar variaveis locais dentro do arquivo mocha.spec.js

## Introdução
O que a API faz? é um prototipo de API que simula situação de teste escolar de uma escola podendo cadastrar o estudante, o teste e a pergunta para o teste.

## Overview
Existem validações para os endpoints que precisam atender a maneira certa de envio para retornar respostas de sucesso.

## Códigos de Error
401 - erro ao salvar.
400 - erro ao encontrar algum dado.



## ========================================================================
GET
/index

http://localhost:3333/api/index

Desc: Confere se servidor está inciado.

## ========================================================================


## ========================================================================
POST
/create/student

http://localhost:3333/api/create/student

body = {
    "name":"Nome do Estudante"
}

Desc: Adiciona usuário ao banco de dados.

## ========================================================================


## ========================================================================
GET
/findAll/student

http://localhost:3333/api/find/student/:id

Desc: Encontrar um estudande

## ========================================================================

GET
/find/student?params

http://localhost:3333/api/find/student?name=name

Desc: Encontrar estudande por parametro de nome

## ========================================================================


## ========================================================================

GET
/calc/average?params

http://localhost:3333/api/calc/average?student_name=:id&test_id=:id

Desc: Calcula média do Estudante

## ========================================================================


## ========================================================================

POST
/create/test

http://localhost:3333/api/create/test

body = {
    "name": "Matemática",
    "student_id": "STRING"
}

Desc: Cadastrar Teste

## ========================================================================


## ========================================================================

GET
/findAll/tests

http://localhost:3333/api/findAll/tests

Desc: Encontre todos os testes cadastrados

## ========================================================================


## ========================================================================

GET
/find/test/:id

http://localhost:3333/api/find/test/:id

Desc: Encontrar um Teste por id

## ========================================================================


## ========================================================================

POST
/create/question

http://localhost:3333/api/create/question

body = 
    {
    "name":"Questão 1",
    "test_id":"STRING",
    "message":"qual o resultado da expressão matématica: 1 + 1",
    "correct_answer": "B",
    "options":[
        {"option":"A", "content":"1"},
        {"option":"B", "content":"2"},
        {"option":"C", "content":"3"},
        {"option":"D", "content":"4"},
        {"option":"E", "content":"5"}
    ]
}


Desc: Cria Pergunta que é vinculada a um teste quando enviado test_id

## ========================================================================


## ========================================================================

PACTH
/answer/question

body = {
    "student_id":"STRING",
    "test_id":"STRING",
    "quest_id":"STRING",
    "student_answer":"B"
}

Desc: Registra resposta do estudande que respondeu a pergunta e vincula ao estudante, ao teste e a questão a resposta a questão em si.


## ========================================================================


## ========================================================================

GET
/findAll/questions

http://localhost:3333/api/findAll/questions

Desc: Busca por todas as questões.

## ========================================================================


## ========================================================================

GET
/find/question/:id

http:localhost:3333/api/find/question/:id


Desc: Encontrar uma questão por id

## ========================================================================