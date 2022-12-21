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
	public class GameRecordBL : IGameRecordBL
	{
		private IGameRecordDAL _dal;
		public GameRecordBL(IGameRecordDAL dal)
		{
			_dal = dal;
		}

		public GameRecord GetById(int id)
		{
			return _dal.GetById(id);
		}

		public GameRecord GetByUserId(int userId)
		{
			return _dal.GetByUserId(userId);
		}

		public void Add(ScoreModel mod)
		{
			_dal.Add(mod);
		}
	}
}
