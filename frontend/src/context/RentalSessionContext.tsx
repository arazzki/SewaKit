"use client";

import React, { createContext, useContext, useState } from "react";
import {
  INITIAL_REQUESTS,
  type RentalRequest,
} from "@/data/dummyRequests";

export type UserRole = "guest" | "mahasiswa" | "moderator";

export interface SessionUser {
  role: UserRole;
  name: string;
  nim?: string;
  prodi?: string;
  email?: string;
  phone?: string;
}

const GUEST_SESSION: SessionUser = {
  role: "guest",
  name: "Tamu",
};

export const DEMO_STUDENT_SESSION: SessionUser = {
  role: "mahasiswa",
  name: "Muhammad Ariq Azzaki",
  nim: "103032400138",
  prodi: "S1 Teknologi Informasi",
  email: "ariq@student.telkomuniversity.ac.id",
  phone: "0812-9988-1122",
};

export const DEMO_MODERATOR_SESSION: SessionUser = {
  role: "moderator",
  name: "Moderator Kampus",
  email: "admin.sewakit@telkomuniversity.ac.id",
};

interface RentalSessionContextValue {
  session: SessionUser;
  loginAsStudent: (identifier?: string) => void;
  loginAsModerator: (username?: string) => void;
  logout: () => void;
  requests: RentalRequest[];
  createRequest: (
    payload: Omit<
      RentalRequest,
      "id" | "status" | "holdExpiresIn" | "createdAt"
    >,
  ) => RentalRequest;
  approveRequest: (id: string) => void;
  rejectRequest: (id: string, reason: string) => void;
  markPaid: (id: string) => void;
}

const RentalSessionContext = createContext<RentalSessionContextValue | null>(
  null,
);

export function RentalSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<SessionUser>(GUEST_SESSION);
  const [requests, setRequests] = useState<RentalRequest[]>(INITIAL_REQUESTS);
  const [seq, setSeq] = useState<number>(90);

  const loginAsStudent = (identifier?: string) => {
    const trimmed = identifier?.trim();
    setSession({
      ...DEMO_STUDENT_SESSION,
      email:
        trimmed && trimmed.includes("@")
          ? trimmed
          : DEMO_STUDENT_SESSION.email,
      nim:
        trimmed && /^\d+$/.test(trimmed)
          ? trimmed
          : DEMO_STUDENT_SESSION.nim,
    });
  };

  const loginAsModerator = (username?: string) => {
    setSession({
      ...DEMO_MODERATOR_SESSION,
      name: username?.trim() ? `Moderator (${username.trim()})` : "Moderator Kampus",
    });
  };

  const logout = () => {
    setSession(GUEST_SESSION);
  };

  const createRequest: RentalSessionContextValue["createRequest"] = (
    payload,
  ) => {
    const id = `REQ-2026-0${seq}`;
    setSeq((n) => n + 1);
    const created: RentalRequest = {
      ...payload,
      id,
      status: "MENUNGGU_PERSETUJUAN",
      holdExpiresIn: "23:59:59",
      createdAt: "Baru saja",
    };
    setRequests((prev) => [created, ...prev]);
    return created;
  };

  const approveRequest = (id: string) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id
          ? {
              ...req,
              status: "DISETUJUI_MENUNGGU_BAYAR",
              holdExpiresIn: "Disetujui pemilik",
              paymentExpiresIn: "02:00:00",
            }
          : req,
      ),
    );
  };

  const rejectRequest = (id: string, reason: string) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id
          ? {
              ...req,
              status: "DITOLAK",
              holdExpiresIn: "Jadwal dibuka kembali",
              rejectReason: reason.trim() || "Jadwal pemilik berhalangan.",
            }
          : req,
      ),
    );
  };

  const markPaid = (id: string) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id
          ? {
              ...req,
              status: "SIAP_COD",
              holdExpiresIn: "Lunas rekber",
              paymentExpiresIn: undefined,
            }
          : req,
      ),
    );
  };

  return (
    <RentalSessionContext.Provider
      value={{
        session,
        loginAsStudent,
        loginAsModerator,
        logout,
        requests,
        createRequest,
        approveRequest,
        rejectRequest,
        markPaid,
      }}
    >
      {children}
    </RentalSessionContext.Provider>
  );
}

export function useRentalSession() {
  const ctx = useContext(RentalSessionContext);
  if (!ctx) {
    throw new Error(
      "useRentalSession harus digunakan di dalam RentalSessionProvider",
    );
  }
  return ctx;
}
