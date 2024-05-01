using ChatService.Server.Models;
using System.Collections.Concurrent;

namespace ChatService.Server.DataService
{
    public class SharedDB
    {
        public readonly ConcurrentDictionary<string, UserConnection> _connection;

        public SharedDB()
        {
                _connection = new ConcurrentDictionary<string, UserConnection>();
        }

    }
}
