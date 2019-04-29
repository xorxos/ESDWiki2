

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
                public const string WikiUser = "WikiUser";
                public const string WikiAdmin = "WikiAdmin";
                public const string ESDTeamMember = "ESDTeamMember";
                public const string ESDTeamAdmin = "ESDTeamAdmin"; 
            }
        }
    }

}
