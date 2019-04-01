using System.Collections.Generic;
using TravelAgency.Domain.Entities;

namespace TravelAgency.Domain.Interfaces.Repositories
{
    public interface IComportamentoClienteRepository : IRepositoryBase<ComportamentoCliente>
    {
        void SaveMensageQueue(ComportamentoCliente obj);

        IEnumerable<ComportamentoCliente> SearchActions(string ip, string nomePagina);
    }
}
