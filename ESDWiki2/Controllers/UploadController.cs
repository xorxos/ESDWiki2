using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace ESDWiki2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        [HttpPost, DisableRequestSizeLimit]
        public IActionResult Upload()
        {
            try
            {
                var file = Request.Form.Files[0];
                var folderName = Path.Combine("StaticFiles", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);

                    Console.WriteLine(fullPath);
                    if(!System.IO.File.Exists(fullPath))
                    {
                        Console.WriteLine("File does not exist");
                        using (var stream = new FileStream(fullPath, FileMode.Create))
                        {
                            file.CopyTo(stream);
                        }

                        return Ok(new { dbPath });
                    }
                    else
                    {
                        var numberToAppend = 1;
                        int dotIndex = fileName.IndexOf(".");
                        string newFileName = fileName.Insert(dotIndex, numberToAppend.ToString());
                        fileName = newFileName;
                        fullPath = Path.Combine(pathToSave, fileName);
                        while (System.IO.File.Exists(fullPath))
                        {
                            numberToAppend++;
                            dotIndex = fileName.IndexOf(".");
                            newFileName = fileName.Insert(dotIndex, numberToAppend.ToString());
                            fileName = newFileName;
                            fullPath = Path.Combine(pathToSave, fileName);
                        }
                        using (var stream = new FileStream(fullPath, FileMode.Create))
                        {
                            file.CopyTo(stream);
                        }

                        dbPath = Path.Combine(folderName, fileName);
                        Console.WriteLine("New filename: " + fileName);

                        return Ok(new { dbPath });
                    }
                    
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
    }
}
