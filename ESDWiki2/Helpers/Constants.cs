

namespace ESDWiki2.Helpers{

 public static class Constants
    {
        public static class Strings
        {
            public static class JwtClaimIdentifiers
            {
                public const string Role = "role", Id = "id";
            }

            public static class JwtClaims
            {
                public const string WikiUser = "Default User";
                public const string WikiAdmin = "Wiki Admin";
                public const string ESDTeamMember = "ESD Member";
                public const string ESDTeamAdmin = "ESD Admin"; 
            }
        }
    }

}
