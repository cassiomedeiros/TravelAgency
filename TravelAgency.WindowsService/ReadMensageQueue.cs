using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using TravelAgency.Application.Interface;
using Newtonsoft.Json;
using TravelAgency.Domain.Entities;

namespace TravelAgency.WindowsService
{
    public class ReadMensageQueue : IHostedService, IDisposable
    {
        private Timer _timer;

        private readonly IComportamentoClienteAppService _comportamentoAppService;

        public ReadMensageQueue(IComportamentoClienteAppService comportamentoClienteAppService)
        {
            _comportamentoAppService = comportamentoClienteAppService;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _timer = new Timer(
                     (e) => ReadMensage(),
                     null,
                     TimeSpan.Zero,
                     TimeSpan.FromMinutes(1));

            return Task.CompletedTask;
        }

        private void ReadMensage()
        {
            var connectionFactory = new ConnectionFactory();

            var config = new ConfigurationBuilder()
            .Build();

            config.GetSection("RabbitMqConnection").Bind(connectionFactory);

            using (var conn = connectionFactory.CreateConnection())
            {
                using (var channel = conn.CreateModel())
                {
                    const string queueName = "ComportamentoCliente";
                    channel.QueueDeclare(queueName, true, false, false, null);

                    var consumer = new EventingBasicConsumer(channel);
                    consumer.Received += Consumer_Received;
                    channel.BasicConsume(queueName, true, consumer);
                }
            }


        }

        private void Consumer_Received(object sender, BasicDeliverEventArgs e)
        {
            try
            {
                var msg = Encoding.UTF8.GetString(e.Body);

                var obj = JsonConvert.DeserializeObject<ComportamentoCliente>(msg);

                _comportamentoAppService.Add(obj);
            }
            catch (Exception)
            {
                throw;
            }

        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _timer?.Change(Timeout.Infinite, 0);

            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _timer?.Dispose();
        }
    }
}
