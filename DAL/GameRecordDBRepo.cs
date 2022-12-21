using Labyrinth.DAL.Interfaces;
using Labyrinth.Entities;
using Labyrinth.ORMDAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Labyrinth.DAL
{
	public class GameRecordDBRepo : IGameRecordDAL
	{
		public GameRecord GetById(int id)
		{
			using (var ctx = new DefaultDBContext())
			{
				return ctx.GameRecords.Find(id);
			}
		}
		public GameRecord GetByUserId(int userId)
		{
			using (var ctx = new DefaultDBContext())
			{
				return ctx.GameRecords.FirstOrDefault(item => item.UserId == userId);
			}
			
		}

		public void Add(ScoreModel mod)
		{
			using (var ctx = new DefaultDBContext())
			{
				Console.Write(mod.Score);
				ctx.GameRecords.Add(new GameRecord { Score = mod.Score, Date = DateTime.Now, UserId = mod.UserId});
				ctx.SaveChanges();
			}
		}
	}
}
