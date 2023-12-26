using System.IO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace WebApi.Controllers
{
    ///<Summary>
    /// Fallback Controller which used for url rewriting
    ///</Summary>
    public class FallbackController : Controller
    {
        ///<Summary>
        /// This method return the index file
        ///</Summary>
        [AllowAnonymous]
        public IActionResult Index()
        {
            return PhysicalFile(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "index.html"), "text/HTML");
        }
    }
}