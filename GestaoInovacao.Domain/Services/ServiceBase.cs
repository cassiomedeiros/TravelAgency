using TravelAgency.Domain.Interfaces.Repositories;
using TravelAgency.Domain.Interfaces.Services;
using System.Collections.Generic;

namespace TravelAgency.Domain.Services
{
    public class ServiceBase<IEntity> : IServiceBase<IEntity> where IEntity : class
    {
        private readonly IRepositoryBase<IEntity> _repository;

        public ServiceBase(IRepositoryBase<IEntity> repository)
        {
            _repository = repository;
        }

        public void Add(IEntity obj)
        {
            _repository.Add(obj);
        }

        public IEnumerable<IEntity> GetAll()
        {
           return _repository.GetAll();
        }

        public IEntity GetById(long id)
        {
            return _repository.GetById(id);
        }

        public void Remove(IEntity obj)
        {
            _repository.Remove(obj);
        }

        public void Update(IEntity obj)
        {
            _repository.Update(obj);
        }
    }
}
