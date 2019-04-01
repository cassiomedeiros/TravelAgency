using Couchbase.Core;
using Couchbase.N1QL;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using RabbitMQ.Client;
using System.Collections.Generic;
using System.Text;
using TravelAgency.Domain.Entities;
using TravelAgency.Domain.Interfaces.Repositories;
using TravelAgency.Infra.Data.Context;

namespace TravelAgency.Infra.Data.Repositories
{
    public class ComportamentoClienteRepository : RepositoryBase<ComportamentoCliente>, IComportamentoClienteRepository
    {
        private readonly IBucket _bucket;

        public ComportamentoClienteRepository(ITravelAgencyBucketProvider bucketProvider) : base(bucketProvider)
        {
            _bucket = bucketProvider.GetBucket();
        }

        public IEnumerable<ComportamentoCliente> SearchActions(string ip, string nomePagina)
        {
            var n1ql = new StringBuilder();

            n1ql.Append(@"SELECT
                            a.Browser,
                            a.Ip,
                            a.NomePagina,
                            a.Parametros,
                            a.Type
                          FROM TravelAgency a
                          WHERE 1 = 1 ");

            if (!string.IsNullOrWhiteSpace(ip))
                n1ql.Append($" AND a.Ip = '{ip}'");

            if (!string.IsNullOrWhiteSpace(nomePagina))
                n1ql.Append($" AND a.NomePagina = '{nomePagina}'");

            var query = QueryRequest.Create(n1ql.ToString());
            query.ScanConsistency(ScanConsistency.RequestPlus);

            var result = _bucket.Query<ComportamentoCliente>(query);

            return result;
        }

        public void SaveMensageQueue(ComportamentoCliente obj)
        {
            var connectionFactory = new ConnectionFactory();

            var config = new ConfigurationBuilder().Build();

            config.GetSection("RabbitMqConnection").Bind(connectionFactory);

            using (var conn = connectionFactory.CreateConnection())
            {
                using (var channel = conn.CreateModel())
                {
                    const string queueName = "ComportamentoCliente";
                    channel.QueueDeclare(queueName, true, false, false, null);


                    var objSerialized = JsonConvert.SerializeObject(obj);

                    var body = System.Text.Encoding.UTF8.GetBytes(objSerialized);

                    channel.BasicPublish(exchange: "",
                                         routingKey: queueName,
                                         basicProperties: null,
                                         body: body);
                }
            }
        }
    }
}
