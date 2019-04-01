using System.Collections.Generic;

namespace TravelAgency.Domain.Interfaces.Services
{
    public interface IServiceBase<IEntity> where IEntity : class
    {
        void Add(IEntity obj);

        IEntity GetById(long id);

        IEnumerable<IEntity> GetAll();

        void Update(IEntity obj);

        void Remove(IEntity obj);
    }
}
