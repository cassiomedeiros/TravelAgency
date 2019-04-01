using System;

namespace TravelAgency.Domain.Entities
{
    public class Pedido
    {
        public long Codigo { get; set; }

        public DateTime DataCriacao { get; set; }

        public DateTime DataPagamento { get; set; }

        public bool Status { get; set; }

        public decimal ValorTotal { get; set; }

        public decimal Descontos { get; set; }

        public decimal ValorPago => ValorTotal - Descontos;
    }
}
