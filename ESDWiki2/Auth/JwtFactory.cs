

using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;
using ESDWiki2.Data;
using ESDWiki2.Data.Entities;
using ESDWiki2.Helpers;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
 

namespace ESDWiki2.Auth
{
    public class JwtFactory : IJwtFactory
    {
        private readonly JwtIssuerOptions _jwtOptions;
        private readonly UserManager<ApplicationUser> userManager;

        public JwtFactory(IOptions<JwtIssuerOptions> jwtOptions, UserManager<ApplicationUser> userManager)
        {
            _jwtOptions = jwtOptions.Value;
            ThrowIfInvalidOptions(_jwtOptions);
            this.userManager = userManager;
        }

        public async Task<Claim> GetRoleClaim(string userName)
        {
            ApplicationUser user = await userManager.FindByEmailAsync(userName);
            if (user.Permissions == "Wiki Admin")
            {
                return new Claim(Constants.Strings.JwtClaimIdentifiers.Role, Constants.Strings.JwtClaims.WikiAdmin);
            }
            else if (user.Permissions == "ESD Member") {
                return new Claim(Constants.Strings.JwtClaimIdentifiers.Role, Constants.Strings.JwtClaims.ESDTeamMember);
            }
            else if (user.Permissions == "ESD Admin")
            {
                return new Claim(Constants.Strings.JwtClaimIdentifiers.Role, Constants.Strings.JwtClaims.ESDTeamAdmin);
            }
            else return new Claim(Constants.Strings.JwtClaimIdentifiers.Role, Constants.Strings.JwtClaims.WikiUser);
        }

        public async Task<string> GenerateEncodedToken(string userName, ClaimsIdentity identity)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userName),
                new Claim(JwtRegisteredClaimNames.Jti, await _jwtOptions.JtiGenerator()),
                new Claim(JwtRegisteredClaimNames.Iat, ToUnixEpochDate(_jwtOptions.IssuedAt).ToString(), ClaimValueTypes.Integer64),
                await GetRoleClaim(userName),
                identity.FindFirst(Constants.Strings.JwtClaimIdentifiers.Id)
             };

            // Create the JWT security token and encode it.
            var jwt = new JwtSecurityToken(
                issuer: _jwtOptions.Issuer,
                audience: _jwtOptions.Audience,
                claims: claims,
                notBefore: _jwtOptions.NotBefore,
                expires: _jwtOptions.Expiration,
                signingCredentials: _jwtOptions.SigningCredentials);

            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            return encodedJwt;
        }

        public ClaimsIdentity GenerateClaimsIdentity(string userName, string id)
        {
            return new ClaimsIdentity(new GenericIdentity(userName, "Token"), new[]
            {
                new Claim(Helpers.Constants.Strings.JwtClaimIdentifiers.Id, id),
                new Claim(Helpers.Constants.Strings.JwtClaimIdentifiers.Role, Helpers.Constants.Strings.JwtClaims.WikiUser)
            });
        }

        /// <returns>Date converted to seconds since Unix epoch (Jan 1, 1970, midnight UTC).</returns>
        private static long ToUnixEpochDate(DateTime date)
          => (long)Math.Round((date.ToUniversalTime() -
                               new DateTimeOffset(1970, 1, 1, 0, 0, 0, TimeSpan.Zero))
                              .TotalSeconds);

        private static void ThrowIfInvalidOptions(JwtIssuerOptions options)
        {
            if (options == null) throw new ArgumentNullException(nameof(options));

            if (options.ValidFor <= TimeSpan.Zero)
            {
                throw new ArgumentException("Must be a non-zero TimeSpan.", nameof(JwtIssuerOptions.ValidFor));
            }

            if (options.SigningCredentials == null)
            {
                throw new ArgumentNullException(nameof(JwtIssuerOptions.SigningCredentials));
            }

            if (options.JtiGenerator == null)
            {
                throw new ArgumentNullException(nameof(JwtIssuerOptions.JtiGenerator));
            }
        }
    }
}
