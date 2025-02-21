export default function Home() {
  return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/assets/images/landingpage4.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-10">
        <h1 className="text-6xl font-bold mb-4 text-white drop-shadow-lg">
          Welcome to LilyCove
        </h1>
        <p className="text-2xl text-white drop-shadow-lg mb-6">
          Your Pokémon hub.
        </p>
        <a
          href="/series"
          className="relative px-6 py-3 bg-[#64ffda] text-black font-medium rounded-lg shadow-md hover:shadow-lg hover:bg-[#52dab6] transition duration-300 ease-in-out"
        >
          Explore Sets
        </a>
      </div>
    </div>
  );
}
