using TravelAgency.Domain.Entities;
using TravelAgency.Domain.Interfaces.Repositories;
using TravelAgency.Domain.Interfaces.Services;

namespace TravelAgency.Domain.Services
{
    public class PedidoService : ServiceBase<Pedido>, IPedidoService
    {
        private readonly IPedidoRepository _repository;

        public PedidoService(IPedidoRepository repository): base(repository)
        {
            _repository = repository;
        }
    }
}
