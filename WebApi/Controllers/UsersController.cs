using Application.Users;
using Application.dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace WebApi.Controllers
{
    ///<Summary>
    /// UserController: the user table related actions
    ///</Summary>
    public class UsersController : BaseController
    {
        ///<Summary>
        /// Login method for the user
        ///</Summary>
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<CurrentUserDto>> Login(Login.LoginCommand command)
        {
            return await Mediator.Send(command);
        }

        ///<Summary>
        /// Register method for the user
        ///</Summary>
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<CurrentUserDto>> Register(Register.RegisterCommand command)
        {
            return await Mediator.Send(command);
        }

        ///<Summary>
        /// Get the current user
        ///</Summary>
        [Authorize]
        [HttpGet("current-user")]
        public async Task<ActionResult<CurrentUserDto>> CurrentUser()
        {
            return await Mediator.Send(new CurrentUser.CurrentUserQuery());
        }

        ///<Summary>
        /// Get users list
        ///</Summary>
        [Authorize]
        [ProducesResponseType(typeof(List<UserListItemDto>), StatusCodes.Status200OK)]
        [HttpGet]
        public async Task<ActionResult<List<UserListItemDto>>> GetUsers([FromQuery] UserList.UserListQuery query)
        {
            return await Mediator.Send(query);
        }

        ///<Summary>
        /// Change user rank: promote to gm or demote to normal user
        ///</Summary>
        [Authorize]
        [HttpPost("change-user-rank")]
        public async Task ChangeUserRank(ChangeUserRank.ChangeUserRankCommand command)
        {
           await Mediator.Send(command);
        }

        ///<Summary>
        /// Change user rank: promote to gm or demote to normal user
        ///</Summary>
        [Authorize]
        [HttpPost("add-gold")]
        public async Task AddGold(AddGold.AddGoldCommand command)
        {
            await Mediator.Send(command);
        }
    }
}