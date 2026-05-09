"use client";

import { create } from "zustand";
import { useEffect } from "react";

type Toast = {
  id: number;
  message: string;
};

type ToastStore = {
  toasts: Toast[];
  addToast: (message: string) => void;
  removeToast: (id: number) => void;
};

let toastId = 0;

export const useToastStore = create<ToastStore>((set, get) => ({
  toasts: [],
  addToast: (message) => {
    const id = ++toastId;
    set({ toasts: [...get().toasts, { id, message }] });
    setTimeout(() => {
      set({ toasts: get().toasts.filter((t) => t.id !== id) });
    }, 2500);
  },
  removeToast: (id) => {
    set({ toasts: get().toasts.filter((t) => t.id !== id) });
  },
}));

export function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast">
          <span className="toast-icon">✓</span>
          {toast.message}
        </div>
      ))}
    </div>
  );
}
