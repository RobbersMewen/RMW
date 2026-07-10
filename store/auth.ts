import { create } from "zustand";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

type AuthStore = {
  user: User | null;
  loading: boolean;
  init: () => void;
  signUp: (email: string, password: string) => Promise<string | null>;
  signIn: (email: string, password: string) => Promise<string | null>;
  signOut: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,

  init: () => {
    supabase.auth.getSession().then(({ data }) => {
      set({ user: data.session?.user || null, loading: false });
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      set({ user: session?.user || null, loading: false });
    });
  },

  signUp: async (email, password) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) return error.message;
    return null;
  },

  signIn: async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return error.message;
    return null;
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
}));
