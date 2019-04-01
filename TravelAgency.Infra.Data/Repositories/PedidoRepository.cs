using TravelAgency.Domain.Entities;
using TravelAgency.Domain.Interfaces.Repositories;
using TravelAgency.Infra.Data.Context;

namespace TravelAgency.Infra.Data.Repositories
{
    public class PedidoRepository : RepositoryBase<Pedido>, IPedidoRepository
    {
        public PedidoRepository(ITravelAgencyBucketProvider bucketProvider) : base(bucketProvider)
        {
        }
    }
}
