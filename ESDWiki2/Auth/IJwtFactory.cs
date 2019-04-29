using System.Security.Claims;
using System.Threading.Tasks;

namespace ESDWiki2.Auth
{
    public interface IJwtFactory
    {
        ClaimsIdentity GenerateClaimsIdentity(string userName, string id);
        Task<string> GenerateEncodedToken(string userName, ClaimsIdentity identity);
        Task<Claim> GetRoleClaim(string userName);
    }
}