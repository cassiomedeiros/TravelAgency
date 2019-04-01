# TravelAgency

TravelAgency é um projeto modelo em Domain Driven Design.

Páginas estáticas (TravelAgency.Web)

 - Registra as interações do usuário enviando os dados para o API.
 
API  (TravelAgency.Rest)

 - Recebe os dados de interações dos usuários da web e registra em fila específica no RabbitMQ.
 - Permite a consulta de dados de interações dos usuários que foram consumidos do RabbitMQ e armazenados no Couchbase.
 
Serviço Consumidor do RabbitMQ  (TravelAgency.WindowsService)

 - Serviço responsável por consumir as mensagens de interações dos usuários e armazená-las no Couchbase. 
