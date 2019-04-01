using TravelAgency.Application.Interface;
using TravelAgency.Domain.Entities;
using TravelAgency.Domain.Interfaces.Services;

namespace TravelAgency.Application
{
    public class PedidoAppService : AppServiceBase<Pedido>, IPedidoAppService
    {
        public PedidoAppService(IPedidoService serviceBase) : base(serviceBase)
        {
        }
    }
}
