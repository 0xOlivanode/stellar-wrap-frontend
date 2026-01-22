'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useWrapperStore } from '../store/useWrapperStore';
import { connectFreighter } from '../utils/walletConnect';

export default function ConnectPage() {
  const router = useRouter();
  const { setAddress, setConnecting, setError, error, isConnecting } = useWrapperStore();
  const [walletAddress, setWalletAddress] = useState('');

  const handleFreighterConnect = async () => {
    setConnecting(true);
    setError(null);

    try {
      const publicKey = await connectFreighter();
      setAddress(publicKey);
      // Redirect to loading page after successful connection
      router.push('/loading');
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to connect wallet';
      setError(errorMessage);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (walletAddress.trim()) {
      setAddress(walletAddress.trim());
      router.push('/loading');
    }
  };

  const handleDemoMode = () => {
    // Demo mode with a sample Stellar address
    setAddress('GDEMOADDRESSFORSTELLARWRAPDEMOPURPOSES12345678');
    router.push('/loading');
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-bg-primary">
      {/* Subtle Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-subtle opacity-20 pointer-events-none" />

      {/* Back Button */}
      <button
        onClick={() => router.push('/')}
        className="absolute top-6 left-6 z-30 flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
        <span className="text-sm font-medium">BACK</span>
      </button>

      {/* Main Content */}
      <main className="relative z-20 flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
        <div className="w-full max-w-xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4 animate-fade-in">
            <h1 className="text-5xl sm:text-6xl font-black leading-tight">
              <span className="gradient-text">CONNECT</span>
              <span className="block text-text-primary">WALLET</span>
            </h1>
            <p className="text-lg text-text-secondary max-w-md mx-auto">
              Enter your Stellar wallet address to unwrap your 2026 journey
            </p>
          </div>

          {/* Manual Address Input Form */}
          <form 
            onSubmit={handleManualSubmit} 
            className="space-y-4 animate-fade-in-up delay-200"
          >
            <div className="relative">
              <input
                type="text"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                placeholder="STELLAR ADDRESS"
                className={`w-full px-6 py-4 bg-bg-elevated border ${
                  error ? 'border-red-500' : 'border-muted'
                } rounded-2xl text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-primary transition-colors text-center font-mono text-sm`}
              />
            </div>

            <button
              type="submit"
              disabled={!walletAddress.trim() || isConnecting}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
            >
              START WRAPPING
            </button>
          </form>

          {/* Divider */}
          <div className="relative animate-fade-in delay-400">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-muted"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-bg-primary text-text-muted">OR</span>
            </div>
          </div>

          {/* Freighter Connect Button */}
          <button
            onClick={handleFreighterConnect}
            disabled={isConnecting}
            className={`w-full px-6 py-4 bg-bg-elevated border ${
              error ? 'border-red-500' : 'border-accent-primary/30'
            } rounded-2xl text-text-primary font-semibold hover:bg-bg-elevated/80 hover:border-accent-primary transition-all flex items-center justify-center gap-3 min-h-[56px] animate-fade-in-up delay-600 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isConnecting ? (
              <>
                <div className="w-5 h-5 border-2 border-accent-primary border-t-transparent rounded-full animate-spin" />
                <span>Connecting...</span>
              </>
            ) : (
              <>
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                </svg>
                <span>Connect with Freighter</span>
              </>
            )}
          </button>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500 rounded-xl text-red-500 text-sm text-center animate-fade-in">
              {error}
            </div>
          )}

          {/* Footer Links */}
          <div className="text-center space-y-3 pt-4 animate-fade-in delay-800">
            <p className="text-sm text-text-muted">
              Don&apos;t have a Stellar wallet?{' '}
              <a
                href="https://stellar.org/wallets"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-primary hover:text-accent-primary-hover underline"
              >
                Get one here
              </a>
            </p>
            <button
              onClick={handleDemoMode}
              className="text-sm text-text-secondary hover:text-accent-primary transition-colors underline"
            >
              Or click here to try demo mode →
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
