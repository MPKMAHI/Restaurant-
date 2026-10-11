import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Ember & Oak ErrorBoundary caught an unhandled error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.hash = '';
    window.location.reload();
  };

  private handleClearStorageAndReset = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch {
      // ignore storage clear errors
    }
    this.handleReset();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#111110] text-[#C4BDB2] flex items-center justify-center p-6 select-none">
          <div className="max-w-md w-full bg-[#161514] border border-[#39342E] p-8 rounded-sm shadow-2xl text-center space-y-6">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#C18A65]/10 border border-[#C18A65]/30 flex items-center justify-center text-[#C18A65]">
              <AlertCircle className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#C18A65]">
                Ember &amp; Oak · Gastronomy
              </span>
              <h1 className="font-serif-lux text-2xl text-[#F0E8DC]">
                Application Experience Restored
              </h1>
              <p className="text-xs text-[#A69D90] font-light leading-relaxed">
                A temporary rendering interruption was prevented. You can reload the page or return to the main dining sanctuary.
              </p>
            </div>

            {this.state.error?.message && (
              <div className="p-3 bg-[#0E0D0C] border border-[#2A2723] rounded text-left overflow-auto max-h-24">
                <p className="font-mono text-[10px] text-[#A69D90] break-words">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={this.handleReset}
                className="flex-1 px-4 py-2.5 bg-[#C18A65] hover:bg-[#D49E78] text-[#111110] font-mono text-xs uppercase tracking-wider font-semibold rounded-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload App</span>
              </button>
              <button
                onClick={this.handleClearStorageAndReset}
                className="flex-1 px-4 py-2.5 border border-[#39342E] hover:border-[#C18A65] text-[#F0E8DC] font-mono text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Reset View</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
