using Microsoft.AspNetCore.Mvc;

namespace MultiUI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CounterController : ControllerBase
    {
        private static int _globalCounter = 100;
        private static Dictionary<string, int> _userCounters = new();

        [HttpGet("global")]
        public IActionResult GetGlobal()
        {
            return Ok(_globalCounter);
        }

        [HttpPost("global/increment")]
        public IActionResult IncrementGlobal()
        {
            _globalCounter++;
            return Ok(_globalCounter);
        }

        [HttpGet("user/{userId}")]
        public IActionResult GetUser(string userId)
        {
            if (!_userCounters.ContainsKey(userId))
                _userCounters[userId] = 0;

            return Ok(_userCounters[userId]);
        }

        [HttpPost("user/{userId}/increment")]
        public IActionResult IncrementUser(string userId)
        {
            if (!_userCounters.ContainsKey(userId))
                _userCounters[userId] = 0;

            _userCounters[userId]++;
            return Ok(_userCounters[userId]);
        }
    }
}

