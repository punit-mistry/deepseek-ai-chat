'use client';

import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from 'next/image';

export default function AuthButtons() {
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  return (
    <div className="space-y-4 border-t border-gray-700/50 pt-4 mt-4">
      <div className="text-sm text-gray-400">
        {isSignedIn ? (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Image 
                src={user.imageUrl} 
                alt="Profile"
                width={32}
                height={32}
                className="rounded-full"
              />
              <div className="text-gray-200">{user.fullName}</div>
            </div>
            <SignOutButton>
              <button 
                onClick={() => router.push('/')}
                className="w-full p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
              >
                Sign Out
              </button>
            </SignOutButton>
          </div>
        ) : (
          <SignInButton mode="modal">
            <button className="w-full p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors">
              Sign In to Chat
            </button>
          </SignInButton>
        )}
      </div>
    </div>
  );
} 