using Microsoft.AspNetCore.Mvc;
using System;
using TravelAgency.Application.Interface;
using TravelAgency.Domain.Entities;

namespace TravelAgency.Rest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComportamentoClienteController : ControllerBase
    {
        private readonly IComportamentoClienteAppService _appService;

        public ComportamentoClienteController(IComportamentoClienteAppService appService)
        {
            _appService = appService;
        }

        [HttpGet]
        public IActionResult Get(string ip, string nomePagina)
        {
            var result = _appService.SearchActions(ip, nomePagina);

            return Ok(result);
        }

        [HttpPost]
        public void Post([FromBody] ComportamentoCliente obj)
        {
            obj.Data = DateTime.Today;

            _appService.SaveMensageQueue(obj);
        }

    }
}
