using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ESDWiki2.Data
{
    public class WikiRepository : IWikiRepository
    {
        private readonly WikiContext ctx;

        public WikiRepository(WikiContext ctx)
        {
            this.ctx = ctx;
        }

        public void AddEntity(object model)
        {
            ctx.Add(model);
        }

        public IEnumerable<Article> GetAllArticles(bool includeItems)
        {
            return null;
        }
        

        public bool SaveAll()
        {
            return ctx.SaveChanges() > 0;
        }
    }
}
