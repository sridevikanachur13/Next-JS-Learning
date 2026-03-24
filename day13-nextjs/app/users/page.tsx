async function getUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  return res.json();
}

interface User {
  id: number;
  name: string;
  email: string;
}

export default async function UsersPage() {
  const users: User[] = await getUsers();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-2">👥 Users</h1>
      <p className="text-gray-500 mb-6">
        ✨ Fetched on the SERVER — no useEffect, no useState, no loading
        spinner!
      </p>

      {users.map((user) => (
        <div
          key={user.id}
          className="flex justify-between 
          items-center p-4 mb-3 border rounded-lg hover:bg-gray-50"
        >
          <a
            href={`/users/${user.id}`}
            className="font-semibold text-blue-500 hover:underline"
          >
            {user.name}
          </a>
          <span className="text-gray-500 text-sm">{user.email}</span>
        </div>
      ))}

      <a href="/" className="text-blue-500 hover:underline mt-4 block">
        ← Back Home
      </a>
    </div>
  );
}
