using MediatR;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace WebApi.Controllers
{      
    ///<Summary>
    /// Base Controller
    ///</Summary>
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController : ControllerBase
    {
        ///<Summary>
        /// The mediator private property is common between all controller
        ///</Summary>
        private IMediator _mediator;

        ///<Summary>
        /// IMediator is also common between the controllers
        ///</Summary>
        protected IMediator Mediator => _mediator ?? (_mediator = HttpContext.RequestServices.GetService<IMediator>());

    }
}