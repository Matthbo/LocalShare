using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LocalShare.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace LocalShare.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SessionController : Controller
    {
        private readonly LocalShareContext _context;
        private readonly ILogger _logger;
        
        public SessionController(LocalShareContext context, ILogger<SessionController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpPost]
        public async Task<ActionResult<Session>> Create()
        {
            Session newSession = Session.CreateSession();

            _context.Sessions.Add(newSession);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new {code = newSession.Code}, newSession);
        }

        [HttpGet]
        public async Task<List<Session>> GetAll()
        {
            return await _context.Sessions.ToListAsync();
        }
        
        [HttpGet("{code}")]
        public async Task<ActionResult<Session>> Get(string code)
        {
            Session session = await _context.Sessions.FindAsync(code);

            if (session == null)
                return NotFound();

            return session;
        }

        [HttpPut("{code}")]
        public async Task<ActionResult<Session>> Upsert(string code, Session session)
        {
            if (code != session.Code)
            {
                return BadRequest();
            }

            if (_context.Sessions.Any(ent => ent.Code == session.Code))
            {
                _context.Entry(session).State = EntityState.Modified;
            }
            else
            {
                _context.Sessions.Add(session);
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{code}")]
        public async Task<ActionResult> Delete(string code)
        {
            Session session = await _context.Sessions.FindAsync(code);
            if (session == null)
            {
                return NotFound();
            }

            _context.Sessions.Remove(session);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}