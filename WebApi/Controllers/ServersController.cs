using Application.Servers;
using Application.dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using System.Threading.Tasks;
using System.Collections.Generic;

namespace WebApi.Controllers
{
    ///<Summary>
    /// ServersController: responsibel to start, stop the map and server instances
    ///</Summary>
    public class ServersController : BaseController
    {
        ///<Summary>
        /// Check the server if online or not
        ///</Summary>
        [AllowAnonymous]
        [HttpGet("details")]
        public async Task<ActionResult<ServerDetailsDto>> Details()
        {
            return await Mediator.Send(new ServerDetails.ServerDetailsQuery());
        }

        ///<Summary>
        /// Manage instances
        ///</Summary>
        [Authorize]
        [HttpPost("manage-instances")]
        public async Task ManageInstances([FromQuery] ManageInstances.ManageInstancesCommand query)
        {
            await Mediator.Send(query);
        }

        ///<Summary>
        /// Verify instances if they running or not
        ///</Summary>
        [Authorize]
        [HttpGet("check-instances-status")]
        public async Task<ActionResult<List<ServerInstanceStatusDto>>> CheckInstancesStatus([FromQuery] CheckInstancesStatus.CheckInstancesStatusQuery query)
        {
            return await Mediator.Send(query);
        }
    }
}