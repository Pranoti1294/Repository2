using EduVerseApi.Data;
using EduVerseApi.Models;
using Microsoft.EntityFrameworkCore;

namespace EduVerseApi.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly EduVerseContext _context;

        public UserRepository(EduVerseContext context) { 
            _context = context;
        }
        public async Task AddUserAsync(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            //return user;
        }

        public async Task DeleteUserAsync(int userId)
        {
            var user = await _context.Users.FindAsync(userId);

            if (user != null) { 
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
            }
        }

        public Task<IEnumerable<User>> GetAllUserAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.emailId == email);
        }


        public async Task<User> GetUserByIdAsync(int userId)
        {
            return await _context.Users.FindAsync(userId);
        }

        public async Task<IEnumerable<User>> GetUsersAsync() {
            return await _context.Users.ToListAsync();
        }

        public async Task UpdateUserAsync(User user)
        {
            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}
