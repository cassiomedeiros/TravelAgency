using Couchbase.Core;
using TravelAgency.Domain.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using TravelAgency.Infra.Data.Context;
using Couchbase;
using Newtonsoft.Json;

namespace TravelAgency.Infra.Data.Repositories
{
    public class RepositoryBase<IEntity> : IRepositoryBase<IEntity> where IEntity : class
    {
        private readonly IBucket _bucket;

        public RepositoryBase(ITravelAgencyBucketProvider bucketProvider)
        {
            _bucket = bucketProvider.GetBucket();
        }

        public void Add(IEntity obj)
        {
            var json = JsonConvert.SerializeObject(obj);
            var key = Guid.NewGuid().ToString();

            _bucket.Upsert(key, json);
        }

        public IEnumerable<IEntity> GetAll()
        {
            throw new NotImplementedException();
        }

        public IEntity GetById(long id)
        {
            throw new NotImplementedException();
        }

        public void Remove(IEntity obj)
        {
            throw new NotImplementedException();
        }

        public void Update(IEntity obj)
        {
            throw new NotImplementedException();
        }
    }
}
