using Labyrinth.DAL.Interfaces;
using Labyrinth.BL.Interfaces;
using Labyrinth.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Labyrinth.BL
{
    public class UserBL : IUserBL
    {
        private IUserDAL _dal;
        public UserBL(IUserDAL dal)
        {
            _dal = dal;
        }

        public User GetByLogin(string login)
        {
            return _dal.GetByLogin(login);
        }

        public User GetById(int id)
        {
            return _dal.GetById(id);
        }

        public void Register(RegisterModel regModel)
        {
            _dal.Add(regModel);
        }
    }
}
