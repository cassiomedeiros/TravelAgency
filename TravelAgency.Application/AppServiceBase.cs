using System.Collections.Generic;
using TravelAgency.Application.Interface;
using TravelAgency.Domain.Interfaces.Services;

namespace TravelAgency.Application
{
    public class AppServiceBase<IEntity> : IAppServiceBase<IEntity> where IEntity : class
    {
        private readonly IServiceBase<IEntity> _serviceBase;

        public AppServiceBase(IServiceBase<IEntity> serviceBase)
        {
            _serviceBase = serviceBase;
        }

        public void Add(IEntity obj)
        {
            _serviceBase.Add(obj);
        }

        public IEnumerable<IEntity> GetAll()
        {
            return _serviceBase.GetAll();
        }

        public IEntity GetById(long id)
        {
            return _serviceBase.GetById(id);
        }

        public void Remove(IEntity obj)
        {
            _serviceBase.Remove(obj);
        }

        public void Update(IEntity obj)
        {
            _serviceBase.Update(obj);
        }
    }
}
