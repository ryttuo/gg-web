import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppState } from "../context/appStateContext";
import { Button } from "./ui/Button";

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
      <Link href="/" className="text-2xl">🏠</Link>
      <div className="flex gap-4 items-center">
        {user && (
          <>
            <span className="text-sm text-blue-600">
              {user.email}
            </span>
            <Link href="/alert/new">
              <Button variant="primary">New Alert</Button>
            </Link>
          </>
        )}
        {user ? (
          <>
            <Button 
              onClick={handleLogout}
              variant="secondary"
            >
              Logout
            </Button>
          </>
        ) : (
          <Link href="/auth/signin">
            <Button variant="primary">Login</Button>
          </Link>
        )}
      </div>
    </div>
  );
};