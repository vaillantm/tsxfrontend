import TopBar from '../components/TopBar';
import MainHeader from '../components/MainHeader';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuthContext } from '../context/AuthContext';
import { uploadProfile } from '../services/auth';
import { useState } from 'react';
import { useToast } from '../context/ToastContext';

export default function Profile() {
  const { user, refreshUser } = useAuthContext();
  const { showToast } = useToast();
  const [uploading, setUploading] = useState(false);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      await uploadProfile(file);
      await refreshUser();
      showToast('Profile picture updated', 'success');
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Failed to upload profile picture';
      showToast(msg, 'error');
    } finally {
      setUploading(false);
      e.currentTarget.value = '';
    }
  };

  return (
    <div>
      <TopBar />
      <MainHeader cartItemCount={0} cartTotal={0} wishlistCount={0} onCartClick={() => {}} />
      <Navbar />

      <main className="max-w-[900px] mx-auto my-12 bg-white border border-gray-200 shadow-[0_15px_35px_rgba(0,0,0,0.05)] p-8">
        <h1 className="text-2xl font-semibold mb-6">My Profile</h1>

        {!user ? (
          <p>Please sign in to manage your profile.</p>
        ) : (
          <div className="flex items-start gap-8">
            <div className="flex flex-col items-center gap-4">
              <div className="w-28 h-28 rounded-full overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerText = 'No Avatar';
                    }}
                  />
                ) : (
                  <span className="text-gray-400">No Avatar</span>
                )}
              </div>
              <label className="inline-block">
                <span className="px-4 py-2 bg-primary-blue text-white rounded cursor-pointer text-sm hover:bg-dark-blue">
                  {uploading ? 'Uploading...' : 'Upload New'}
                </span>
                <input type="file" accept="image/*" className="hidden" onChange={onFileChange} disabled={uploading} />
              </label>
            </div>

            <div className="flex-1">
              <div className="mb-3"><strong>Name:</strong> {user.name}</div>
              <div className="mb-3"><strong>Username:</strong> {user.username}</div>
              <div className="mb-3"><strong>Email:</strong> {user.email}</div>
              <div className="mb-3"><strong>Role:</strong> {user.role}</div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
