using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PropertyListingsController : ControllerBase
    {
        private readonly RealEstateDbContext _dbcontext;

        public PropertyListingsController(RealEstateDbContext realEstateDbContext)
        {
            _dbcontext = realEstateDbContext;
        }

        //public object JsonConvert { get; private set; }

        [HttpGet]
        public async Task<IEnumerable<PropertyListing>> Get()
        {
            var result = await _dbcontext.PropertyListings.ToListAsync();
            return result;
        }

        [HttpPost]
        public async Task<string> Post([FromBody] PropertyListing propertyListing)
        {
            var returnMessage = string.Empty;
            try
            {
                _dbcontext.PropertyListings.Add(propertyListing);
                await _dbcontext.SaveChangesAsync();
                returnMessage = "Details added successfully.";


            }
            catch (Exception ex)
            {
                returnMessage = "Technical error occurred while adding details.";
            }

            Response response = new Response
            {
                ResponseMessage = returnMessage
            };

            string result = JsonConvert.SerializeObject(response);

            return result;
        }

        [HttpPut("{id}")]  // ✅
        public async Task<string> Put(int id, [FromBody] PropertyListing propertyListing)
        {
            var returnMessage = string.Empty;
            try
            {
                propertyListing.Id = id;
                _dbcontext.Entry(propertyListing).State = EntityState.Modified;
                await _dbcontext.SaveChangesAsync();
                returnMessage = "Details updated successfully.";


            }
            catch (Exception ex)
            {
                returnMessage = "Technical error occurred while adding details.";
            }

            Response response = new Response
            {
                ResponseMessage = returnMessage
            };

            string result = JsonConvert.SerializeObject(response);

            return result;
        }

        [HttpDelete("{id}")]  // ✅
        public async Task<string> Delete(int id)
        {
            var returnMessage = string.Empty;
            try
            {
                PropertyListing record = await _dbcontext.PropertyListings.FindAsync(id);
                if (record == null)
                {
                    returnMessage = "Record not found.";
                }
                else
                {
                    _dbcontext.PropertyListings.Remove(record);

                    await _dbcontext.SaveChangesAsync();
                    returnMessage = "Record Deleted successfully.";
                }


            }
            catch (Exception ex)
            {
                returnMessage = "Technical error occurred while adding details.";
            }

            Response response = new Response
            {
                ResponseMessage = returnMessage
            };

            string result = JsonConvert.SerializeObject(response);

            return result;
        }
    }
}

