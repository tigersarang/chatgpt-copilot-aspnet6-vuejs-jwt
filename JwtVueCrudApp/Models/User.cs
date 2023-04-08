using System.ComponentModel.DataAnnotations;

namespace JwtVueCrudApp.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
