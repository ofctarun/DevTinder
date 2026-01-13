import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${BASE_URL}/logout`,
        {},
        { withCredentials: true }
      );

      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error("LOGOUT ERROR:", err);
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          DEVTINDER👨🏻‍💻
        </Link>
      </div>

      {user && (
        <div className="flex gap-2 items-center">
          <p className="hidden sm:block">
            Welcome, <span className="font-semibold">{user.firstName}</span>
          </p>

          <div className="dropdown dropdown-end mx-3">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src={user.photoURL || "https://www.gravatar.com/avatar/?d=mp"}
                  alt="User avatar"
                />
              </div>
            </div>

            <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/edit-profile">Edit Profile</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
