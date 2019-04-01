using Couchbase.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TravelAgency.Application;
using TravelAgency.Application.Interface;
using TravelAgency.Domain.Interfaces.Repositories;
using TravelAgency.Domain.Interfaces.Services;
using TravelAgency.Domain.Services;
using TravelAgency.Infra.Data.Context;
using TravelAgency.Infra.Data.Repositories;

namespace TravelAgency.WindowsService
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCouchbase(Configuration.GetSection("Couchbase"));
            services.AddCouchbaseBucket<ITravelAgencyBucketProvider>("TravelAgency");

            RegisterInject(services);
        }

        private void RegisterInject(IServiceCollection services)
        {
            services.AddTransient(typeof(IAppServiceBase<>), typeof(AppServiceBase<>));
            services.AddTransient(typeof(IPedidoAppService), typeof(PedidoAppService));
            services.AddTransient(typeof(IComportamentoClienteAppService), typeof(ComportamentoClienteAppService));

            services.AddTransient(typeof(IServiceBase<>), typeof(ServiceBase<>));
            services.AddTransient(typeof(IPedidoService), typeof(PedidoService));
            services.AddTransient(typeof(IComportamentoClienteService), typeof(ComportamentoClienteService));

            services.AddTransient(typeof(IRepositoryBase<>), typeof(RepositoryBase<>));
            services.AddTransient(typeof(IPedidoRepository), typeof(PedidoRepository));
            services.AddTransient(typeof(IComportamentoClienteRepository), typeof(ComportamentoClienteRepository));

        }
    }
}
