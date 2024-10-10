import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center text-white"
      style={{ backgroundImage: "url('/404.png')" }}
    >
      <header className="absolute top-0 left-0 bg-black p-4 w-full">
        <div className="max-w-6xl mx-auto">
          <Link to={"/"}>
            <img src="/netflix-logo.png" alt="logo img" className="h-8" />
          </Link>
        </div>
      </header>

      <main className="text-center error_page__content z-10 ">
        <h1 className="text-7xl font-semibold text-white mb-4">
          Lost Your Way?
        </h1>
        <p className="mb-6 text-xl">
          Sorry We can't find that Page. You'll find a lot to explore on the
          home Page.
        </p>
        <Link
          to={"/"}
          className="bg-white text-black px-4 py-2 rounded font-semibold"
        >
          Netflix Home
        </Link>
      </main>
    </div>
  );
};

export default ErrorPage;
