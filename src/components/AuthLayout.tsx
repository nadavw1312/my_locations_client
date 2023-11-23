const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" w-screen h-screen flex justify-center items-center bg-map ">
      <div className="bg-white p-4 rounded-md">{children}</div>
    </div>
  );
};
export default AuthLayout;
