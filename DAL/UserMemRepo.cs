using Labyrinth.DAL.Interfaces;
using Labyrinth.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Labyrinth.DAL
{
	public class UserMemRepo : IUserDAL
	{
		private int id = 4;
		private List<User> users;
		public UserMemRepo()
		{
			users = new List<User>() 
			{
				new User() { Id = 0, 
							 Name = "Sergei", 
							 Login = "tenzor", 
							 Password = "password", 
							 RegisterDate = new DateTime(22, 10, 30, 13, 30, 22) },
				new User() { Id = 1,
							 Name = "Sasha",
							 Login = "user123",
							 Password = "qwertyuiop", 
							 RegisterDate = new DateTime(21, 12, 11, 19, 44, 1) },
			};
		}

		public User GetById(int id)
		{
			return users.FirstOrDefault(item => item.Id == id);
		}
		public User GetByLogin(string login)
		{
			return users.FirstOrDefault(item => item.Login == login);
		}

		public void Add(RegisterModel regModel)
		{
			users.Add(new User { Id = id++, Name = regModel.Name, Login = regModel.Login, Password = regModel.Password, RegisterDate = DateTime.Now });
		}
	}
}
