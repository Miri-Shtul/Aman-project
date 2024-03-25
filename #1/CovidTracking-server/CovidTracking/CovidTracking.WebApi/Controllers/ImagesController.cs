using Microsoft.AspNetCore.Mvc;

namespace CovidTracking.WebApi.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController: ControllerBase
    {
        [HttpGet("{imageName}")]
        public IActionResult GetImage(string imageName)
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Images", imageName);

            if (System.IO.File.Exists(filePath))
            {
                var mimeType = "image/jpeg";
                return PhysicalFile(filePath, mimeType);
            }

            return NotFound();
        }

    }
}
