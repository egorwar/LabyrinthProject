using System.ComponentModel.DataAnnotations;

namespace Labyrinth.Entities
{
	public class RegisterModel
	{
		[MinLength(1, ErrorMessage = "Name should be one symbol or longer!")]
		public string Name { get; set; }
		[MinLength(5, ErrorMessage = "Login should be five symbols or longer!")]
		public string Login { get; set; }
		[MinLength(5, ErrorMessage = "Password should be five symbols or longer!")]
		[DataType(DataType.Password)]
		public string Password { get; set; }
	}
}
