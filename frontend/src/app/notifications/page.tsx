'use client';

import { useState } from 'react';
import { Bell, CheckCheck, Trash2, Package, ShieldAlert, Monitor } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import PageHeader from '@/components/PageHeader';

type NotifType = 'transaksi' | 'pengingat' | 'sistem';

interface Notification {
  id: number;
  type: NotifType;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    type: 'pengingat',
    title: 'Pengingat Jatuh Tempo (H-1)',
    message: 'Masa sewa Multimeter Digital berakhir besok. Siapkan pengembalian di titik COD kampus.',
    time: 'Baru saja',
    isRead: false,
  },
  {
    id: 2,
    type: 'transaksi',
    title: 'Dana Escrow Terverifikasi',
    message: 'Pembayaran via Xendit untuk ESP32 DevKit V1 telah diterima. Kontak WhatsApp COD kini terbuka.',
    time: '2 jam lalu',
    isRead: false,
  },
  {
    id: 3,
    type: 'sistem',
    title: 'Protokol Keamanan Kampus',
    message: 'Pastikan foto checklist kondisi awal diambil bersama pemilik saat serah terima di Lobi TULT / GKU.',
    time: '1 hari lalu',
    isRead: true,
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [activeTab, setActiveTab] = useState<'semua' | NotifType>('semua');

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
    toast.success('Semua notifikasi ditandai telah dibaca');
  };

  const deleteNotification = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const filtered =
    activeTab === 'semua'
      ? notifications
      : notifications.filter((n) => n.type === activeTab);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const getIcon = (type: NotifType) => {
    if (type === 'transaksi') return <Package className="h-4 w-4 text-forest" />;
    if (type === 'pengingat') return <ShieldAlert className="h-4 w-4 text-accent" />;
    return <Monitor className="h-4 w-4 text-ink" />;
  };

  const getIconBg = (type: NotifType) => {
    if (type === 'transaksi') return 'bg-forest-subtle border-forest/20';
    if (type === 'pengingat') return 'bg-accent/10 border-accent/25';
    return 'bg-surface-muted border-hairline';
  };

  return (
    <div className="min-h-screen bg-canvas">
      <PageHeader
        eyebrow="Notifikasi"
        title="Notifikasi Aktivitas & Pengingat Sewa"
        description="Pantau status persetujuan pemilik, batas bayar 2 jam, hingga pengingat pengembalian alat."
        actions={
          unreadCount > 0 ? (
            <button
              onClick={markAllAsRead}
              className="inline-flex items-center gap-1.5 rounded-xl bg-ink px-4 py-2.5 text-xs font-medium text-canvas hover:bg-accent transition"
            >
              <CheckCheck className="h-4 w-4" /> Tandai Semua Dibaca ({unreadCount})
            </button>
          ) : undefined
        }
      />

      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="mb-6 flex flex-wrap gap-2 border-b border-hairline pb-4">
          {(['semua', 'transaksi', 'pengingat', 'sistem'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
                activeTab === tab
                  ? 'bg-ink text-canvas font-semibold'
                  : 'border border-hairline bg-surface text-ink-muted hover:border-ink hover:text-ink'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          <AnimatePresence>
            {filtered.map((notif) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
                key={notif.id}
                onClick={() =>
                  !notif.isRead &&
                  setNotifications(
                    notifications.map((n) =>
                      n.id === notif.id ? { ...n, isRead: true } : n
                    )
                  )
                }
                className={`group relative rounded-2xl border p-5 flex items-start gap-4 transition cursor-pointer ${
                  notif.isRead
                    ? 'bg-surface border-hairline'
                    : 'bg-surface-subtle border-ink shadow-card'
                }`}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${getIconBg(
                    notif.type
                  )}`}
                >
                  {getIcon(notif.type)}
                </div>

                <div className="flex-1 pr-10">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4
                      className={`text-sm ${
                        notif.isRead
                          ? 'font-medium text-ink-muted'
                          : 'font-bold text-ink'
                      }`}
                    >
                      {notif.title}
                    </h4>
                    <span className="font-mono text-xs text-ink-subtle whitespace-nowrap">
                      {notif.time}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-ink-muted">
                    {notif.message}
                  </p>
                </div>

                <button
                  onClick={(e) => deleteNotification(e, notif.id)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-2 text-ink-subtle hover:text-accent hover:bg-surface-muted rounded-xl transition-all"
                  aria-label="Hapus notifikasi"
                >
                  <Trash2 className="h-4 w-4" />
                </button>

                {!notif.isRead && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-accent rounded-r-md" />
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="rounded-2xl border border-dashed border-hairline bg-surface py-14 text-center">
              <Bell className="mx-auto h-8 w-8 text-ink-subtle mb-2" />
              <p className="text-sm font-medium text-ink-muted">
                Tidak ada notifikasi pada kategori ini.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
