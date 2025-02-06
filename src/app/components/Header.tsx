import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppState } from "../context/appStateContext";

export const Header = () => {
  const router = useRouter();
  const { user, setUser } = useAppState();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    router.push('/auth/signin');
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-200">
      <Link href="/">Home</Link>
      <div className="flex gap-4 items-center">
        {user && (
            <>
            <span className="text-gray-600">
            {user.email}
          </span>
          <Link
            href="/alert/new"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
            >
              New Alert
            </Link>
          </>
        )}
        {user ? (
          <>
            
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <Link 
            href="/auth/login"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};