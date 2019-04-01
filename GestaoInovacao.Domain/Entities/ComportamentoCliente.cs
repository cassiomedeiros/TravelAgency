using System;

namespace TravelAgency.Domain.Entities
{
    public class ComportamentoCliente
    {
        public string Ip { get; set; }

        public string NomePagina { get; set; }

        public string Browser { get; set; }

        public string Parametros { get; set; }

        public string Type => typeof(ComportamentoCliente).Name;

        public DateTime Data { get; set; }
    }
}
