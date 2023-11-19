import MapContainer from "../components/map/MapContainer";
import { useAuth } from "../hooks/useAuth";

const HomePage = () => {
  const { logout } = useAuth();

  const onLogOut = async () => {
    await logout();
  };

  return (
    <div className="bg-slate-300">
      <div className="h-screen w-screen flex flex-col">
        <div className="  bg-opacity-90 flex justify-center items-center">
          <button className="" onClick={onLogOut}>
            Logout
          </button>
        </div>
        <MapContainer />
      </div>
    </div>
  );
};
export default HomePage;
