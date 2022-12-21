using Labyrinth.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Labyrinth.BL.Interfaces
{
    public interface IUserBL
    {
        User GetById(int id);
        User GetByLogin(string login);

        void Register(RegisterModel regModel);
    }
}
