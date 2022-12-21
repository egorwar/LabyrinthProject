﻿using Labyrinth.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Labyrinth.DAL.Interfaces
{
	public interface IGameRecordDAL
	{
		GameRecord GetById(int id);

		GameRecord GetByUserId(int userId);

		void Add(ScoreModel mod);
	}
}
