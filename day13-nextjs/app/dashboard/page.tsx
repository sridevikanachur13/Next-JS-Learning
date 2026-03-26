interface User {
  id: number
  name: string
  email: string
}

interface Post {
  id: number
  title: string
  userId: number
}

interface Todo {
  id: number
  title: string
  completed: boolean
}

// Each fetch simulates different data sources
async function getUser(): Promise<User> {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/users/1"
  )
  return res.json()
}

async function getPosts(): Promise<Post[]> {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?userId=1&_limit=3"
  )
  return res.json()
}

async function getTodos(): Promise<Todo[]> {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/todos?userId=1&_limit=5"
  )
  return res.json()
}

export default async function DashboardPage() {
  // ✅ All 3 fetch simultaneously — fastest approach
  const [user, posts, todos] = await Promise.all([
    getUser(),
    getPosts(),
    getTodos(),
  ])

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-2">
        👋 {user.name}'s Dashboard
      </h1>
      <p className="text-gray-500 mb-8">{user.email}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Posts */}
        <div className="border rounded-xl p-6">
          <h2 className="font-bold text-lg mb-4">
            📝 Recent Posts
          </h2>
          {posts.map(post => (
            <div key={post.id}
              className="p-3 mb-2 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium">{post.title}</p>
            </div>
          ))}
        </div>

        {/* Todos */}
        <div className="border rounded-xl p-6">
          <h2 className="font-bold text-lg mb-4">
            ✅ Todo List
          </h2>
          {todos.map(todo => (
            <div key={todo.id}
              className="flex items-center gap-3 p-2 mb-1">
              <span className="text-lg">
                {todo.completed ? "✅" : "⬜"}
              </span>
              <span className={`text-sm ${
                todo.completed
                  ? "line-through text-gray-400"
                  : "text-gray-700"
              }`}>
                {todo.title}
              </span>
            </div>
          ))}
        </div>

      </div>

      <a href="/"
        className="text-blue-500 hover:underline mt-8 block">
        ← Back Home
      </a>
    </div>
  )
}