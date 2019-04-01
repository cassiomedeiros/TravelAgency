using System.Collections.Generic;
using TravelAgency.Domain.Entities;

namespace TravelAgency.Application.Interface
{
    public interface IComportamentoClienteAppService : IAppServiceBase<ComportamentoCliente>
    {
        void SaveMensageQueue(ComportamentoCliente obj);

        IEnumerable<ComportamentoCliente> SearchActions(string ip, string nomePagina);
    }
}
