'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CertificatesRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/showcase');
  }, [router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-xl">Redirecting to showcase...</p>
    </div>
  );
} 