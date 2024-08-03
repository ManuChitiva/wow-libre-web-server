import { useEffect } from "react";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";

const useAuth = (message: string) => {
  const router = useRouter();
  const { user, clearUserData } = useUserContext();
  const token = Cookies.get("token");

  useEffect(() => {
    if (!token || !user.logged_in) {
      clearUserData();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: message,
        color: "white",
        background: "#0B1218",
        timer: 4000,
        willClose: () => {
          clearUserData();
        },
      });
      router.push("/");
    }
  }, [token, user]);

  return { isAuthenticated: !!token && user.logged_in };
};

export default useAuth;
