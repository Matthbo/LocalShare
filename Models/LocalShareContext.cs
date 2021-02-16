using Microsoft.EntityFrameworkCore;

namespace LocalShare.Models
{
    public class LocalShareContext : DbContext
    {
        public LocalShareContext(DbContextOptions<LocalShareContext> options) : base(options)
        {
            
        }

        public DbSet<Session> Sessions { get; set; }
    }
}