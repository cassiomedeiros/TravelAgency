using Couchbase.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using TravelAgency.Application;
using TravelAgency.Application.Interface;
using TravelAgency.Domain.Interfaces.Repositories;
using TravelAgency.Domain.Interfaces.Services;
using TravelAgency.Domain.Services;
using TravelAgency.Infra.Data.Context;
using TravelAgency.Infra.Data.Repositories;

namespace TravelAgency.WindowsService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = new HostBuilder()
                          .ConfigureServices((hostContext, services) =>
                          {
                              ConfigureServices(services);
                              services.AddHostedService<ReadMensageQueue>();
                          });


            builder.Build().Run();


        }

        private static void ConfigureServices(IServiceCollection services)
        { 

            services
            .AddCouchbase(client =>
            {
                client.Servers = new List<Uri> { new Uri("http://localhost:8091") };
                client.UseSsl = false;
                client.Username = "cassio";
                client.Password = "cassio123";
            })
            .AddCouchbaseBucket<ITravelAgencyBucketProvider>("TravelAgency")

            .AddTransient(typeof(IAppServiceBase<>), typeof(AppServiceBase<>))
            .AddTransient(typeof(IPedidoAppService), typeof(PedidoAppService))
            .AddTransient(typeof(IComportamentoClienteAppService), typeof(ComportamentoClienteAppService))
            
            .AddTransient(typeof(IServiceBase<>), typeof(ServiceBase<>))
            .AddTransient(typeof(IPedidoService), typeof(PedidoService))
            .AddTransient(typeof(IComportamentoClienteService), typeof(ComportamentoClienteService))
            
            .AddTransient(typeof(IRepositoryBase<>), typeof(RepositoryBase<>))
            .AddTransient(typeof(IPedidoRepository), typeof(PedidoRepository))
            .AddTransient(typeof(IComportamentoClienteRepository), typeof(ComportamentoClienteRepository))
            .BuildServiceProvider();
        }
    }
}
