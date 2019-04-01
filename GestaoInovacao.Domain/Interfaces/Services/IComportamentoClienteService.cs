using System.Collections.Generic;
using TravelAgency.Domain.Entities;

namespace TravelAgency.Domain.Interfaces.Services
{
    public interface IComportamentoClienteService : IServiceBase<ComportamentoCliente>
    {
        void SaveMensageQueue(ComportamentoCliente obj);

        IEnumerable<ComportamentoCliente> SearchActions(string ip, string nomePagina);
    }
}
