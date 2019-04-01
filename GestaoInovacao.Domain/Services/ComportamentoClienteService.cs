using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using RabbitMQ.Client;
using System;
using System.Collections.Generic;
using System.Text;
using TravelAgency.Domain.Entities;
using TravelAgency.Domain.Interfaces.Repositories;
using TravelAgency.Domain.Interfaces.Services;

namespace TravelAgency.Domain.Services
{
    public class ComportamentoClienteService : ServiceBase<ComportamentoCliente>, IComportamentoClienteService
    {
        private readonly IComportamentoClienteRepository _repository;

        public ComportamentoClienteService(IComportamentoClienteRepository repository) : base(repository)
        {
            _repository = repository;
        }

        public IEnumerable<ComportamentoCliente> SearchActions(string ip, string nomePagina)
        {
            return _repository.SearchActions(ip, nomePagina);
        }

        public void SaveMensageQueue(ComportamentoCliente obj)
        {
            //var connectionFactory = new ConnectionFactory();

            //var config = new ConfigurationBuilder().Build();

            //config.GetSection("RabbitMqConnection").Bind(connectionFactory);

            //using (var conn = connectionFactory.CreateConnection())
            //{
            //    using (var channel = conn.CreateModel())
            //    {
            //        const string queueName = "ComportamentoCliente";
            //        channel.QueueDeclare(queueName, true, false, false, null);


            //        var objSerialized = JsonConvert.SerializeObject(obj);

            //        var body = Encoding.UTF8.GetBytes(objSerialized);

            //        channel.BasicPublish(exchange: "",
            //                             routingKey: queueName,
            //                             basicProperties: null,
            //                             body: body);
            //    }
            //}

            _repository.SaveMensageQueue(obj);
        }
    }
}
