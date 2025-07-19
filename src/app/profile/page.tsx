export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-xl text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Profile</h1>
        <hr className="border-white/20 mb-6" />
        <p className="text-gray-300 text-lg">This profile belongs to you.</p>
      </div>
    </div>
  );
}
