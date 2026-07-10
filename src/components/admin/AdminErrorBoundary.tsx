"use client";

import React from "react";

interface Props {
  children: React.ReactNode;
  name: string;
}

interface State {
  hasError: boolean;
  error: string;
}

export class AdminErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: "" };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error: error.message };
  }

  componentDidCatch(error: Error) {
    console.error(`[${this.props.name}] Admin component error:`, error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "20px", margin: "16px 0", background: "#FFF3F0", border: "1px solid #FFD0C7", borderRadius: "8px" }}>
          <p style={{ fontSize: "14px", color: "#76220B", fontWeight: 600, margin: "0 0 4px" }}>
            {this.props.name} failed to load
          </p>
          <p style={{ fontSize: "12px", color: "#A48374", margin: 0 }}>{this.state.error}</p>
        </div>
      );
    }
    return this.props.children;
  }
}
