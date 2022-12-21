using Labyrinth.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Labyrinth.DAL.Interfaces
{
    public interface IUserDAL
    {
        User GetById(int id);
        User GetByLogin(string login);

        void Add(RegisterModel regModel);
    }
}
