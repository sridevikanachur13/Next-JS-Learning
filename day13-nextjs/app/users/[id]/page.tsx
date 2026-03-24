async function getUser(id: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  return res.json();
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function UserDetailPage({ params }: PageProps) {
  const { id } = await params;
  const user = await getUser(id);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">👤 {user.name}</h1>

      <div className="border rounded-xl p-6 max-w-md space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-500">Email</span>
          <span className="font-medium">{user.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Phone</span>
          <span className="font-medium">{user.phone}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Company</span>
          <span className="font-medium">{user.company.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">City</span>
          <span className="font-medium">{user.address.city}</span>
        </div>
      </div>

      <a href="/users" className="text-blue-500 hover:underline mt-6 block">
        ← Back to Users
      </a>
    </div>
  );
}
