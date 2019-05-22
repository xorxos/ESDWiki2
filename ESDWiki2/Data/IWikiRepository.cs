using System.Collections.Generic;
using ESDWiki2.Data.Entities;

namespace ESDWiki2.Data
{
    public interface IWikiRepository
    {
        void AddEntity(object model);
        IEnumerable<Article> GetAllArticles(bool includeItems);
        IEnumerable<TeamCategory> GetAllTeamCategories();
        IEnumerable<WikiCategory> GetAllWikiCategories();
        bool SaveAll();
    }
}