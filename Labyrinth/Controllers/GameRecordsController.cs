using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Labyrinth.BL.Interfaces;
using Labyrinth.Entities;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;

namespace Labyrinth.Controllers
{
	public class GameRecordsController : Controller
	{
		private IGameRecordBL _bl;
		private IUserBL _ubl;
		public GameRecordsController(IGameRecordBL bl, IUserBL ubl) 
		{
			_bl = bl;
			_ubl = ubl;
		}

		[Authorize]
		[HttpPost]
		public IActionResult Add(int score)
		{
			User curUser = _ubl.GetByLogin(User.Identity.Name);
			_bl.Add(new ScoreModel { Score = score, UserId = curUser.Id });
			return RedirectToAction("Index", "Home");
		}
	}
}
