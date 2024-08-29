using EduVerseApi.Models;

namespace EduVerseApi.Repositories
{
    public interface INoteRepository
    {
        Task<Note> GetNoteByIdAsync(int noteId);
        Task<IEnumerable<Note>> GetAllNotesAsync();
        Task AddNoteAsync(Note note);
        Task UpdateNoteAsync(Note note);
        Task DeleteNoteAsync(int noteId);
    }
}
