using System.Collections.Generic;
using TravelAgency.Application.Interface;
using TravelAgency.Domain.Entities;
using TravelAgency.Domain.Interfaces.Services;

namespace TravelAgency.Application
{
    public class ComportamentoClienteAppService : AppServiceBase<ComportamentoCliente>, IComportamentoClienteAppService
    {
        private readonly IComportamentoClienteService _service;

        public ComportamentoClienteAppService(IComportamentoClienteService service) : base(service)
        {
            _service = service;
        }

        public IEnumerable<ComportamentoCliente> SearchActions(string ip, string nomePagina)
        {
            return _service.SearchActions(ip, nomePagina);
        }

        public void SaveMensageQueue(ComportamentoCliente obj)
        {
            _service.SaveMensageQueue(obj);
        }
    }
}
