using ESDWiki2.Data;
using ESDWiki2.Data.Entities;
using ESDWiki2.Helpers;
using ESDWiki2.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ESDWiki2.Controllers
{
    [Route("api/auth")]
    public class AuthController : Controller
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IConfiguration config;
        private readonly SignInManager<ApplicationUser> signInManager;

        public AuthController(UserManager<ApplicationUser> userManager, IConfiguration config, SignInManager<ApplicationUser> signInManager)
        {
            this.userManager = userManager;
            this.config = config;
            this.signInManager = signInManager;
        }

        [HttpGet]
        public async Task<IActionResult> Logout()
        {
            await signInManager.SignOutAsync();
            return Ok();
        }

        [HttpPost, Route("createtoken")]
        public async Task<IActionResult> CreateToken([FromBody] LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await userManager.FindByNameAsync(model.Username);

                if (user != null)
                {
                    var result = await signInManager.CheckPasswordSignInAsync(user, model.Password, false);
                    if (result.Succeeded)
                    {
                        var newClaim1 = new Claim(ClaimTypes.Role, "DefaultUser");
                        var newClaim2 = new Claim("role", "Default User");
                        if (user.Permissions == "Wiki Admin")
                        {
                            newClaim1 = new Claim(ClaimTypes.Role, "WikiAdmin");
                            newClaim2 = new Claim("role", "Wiki Admin");
                        } else if (user.Permissions == "ESD Member")
                        {
                            newClaim1 = new Claim(ClaimTypes.Role, "ESDMember");
                            newClaim2 = new Claim("role", "ESD Member");
                        }
                        else if (user.Permissions == "ESD Admin")
                        {
                            newClaim1 = new Claim(ClaimTypes.Role, "ESDAdmin");
                            newClaim2 = new Claim("role", "ESD Admin");
                        }
                        var claims = new[]
                        {
                            new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                            new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName),
                            newClaim1,
                            newClaim2
                        };

                        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Tokens:Key"]));
                        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                        var token = new JwtSecurityToken(
                            config["Tokens:Issuer"],
                            config["Tokens:Audience"],
                            claims,
                            expires: DateTime.UtcNow.AddHours(8),
                            signingCredentials: creds
                            );
                        var tokenString = new JwtSecurityTokenHandler().WriteToken(token);
                        return Ok(new { Token = tokenString });
                    }
                }
            }
            return BadRequest();
        }
    } 
}
