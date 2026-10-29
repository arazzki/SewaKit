'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bell, CheckCheck, Trash2, Package, ShieldAlert, Monitor } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

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
  { id: 1, type: 'pengingat', title: 'Pengingat Jatuh Tempo', message: 'Masa sewa Multimeter Digital berakhir besok (H-1).', time: 'Baru saja', isRead: false },
  { id: 2, type: 'transaksi', title: 'Pembayaran Berhasil', message: 'Pembayaran via Xendit untuk ESP32 Board telah diverifikasi.', time: '2 jam lalu', isRead: false },
  { id: 3, type: 'sistem', title: 'Pembaruan Sistem', message: 'Kami telah memperbarui kebijakan privasi platform.', time: '1 hari lalu', isRead: true },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [activeTab, setActiveTab] = useState<'semua' | NotifType>('semua');

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    toast.success('Semua notifikasi ditandai telah dibaca');
  };
  
  const deleteNotification = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const filtered = activeTab === 'semua' ? notifications : notifications.filter(n => n.type === activeTab);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getIcon = (type: NotifType) => {
    if (type === 'transaksi') return <Package className="h-5 w-5 text-blue-600" />;
    if (type === 'pengingat') return <ShieldAlert className="h-5 w-5 text-amber-500" />;
    return <Monitor className="h-5 w-5 text-gray-500" />;
  };

  const getIconBg = (type: NotifType) => {
    if (type === 'transaksi') return 'bg-blue-50 border-blue-100';
    if (type === 'pengingat') return 'bg-amber-50 border-amber-100';
    return 'bg-gray-50 border-gray-200';
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-6">
      <div className="mx-auto max-w-3xl">
        
        <div className="mb-8 flex items-center justify-between border-b border-slate-200 pb-5">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900">Notifikasi</h1>
            {unreadCount > 0 && (
              <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-bold text-indigo-700 border border-indigo-100">
                {unreadCount} Baru
              </span>
            )}
          </div>
          <Link href="/" className="text-sm font-semibold text-slate-600 hover:text-indigo-600">← Beranda</Link>
        </div>

        <div className="mb-6 flex gap-4 border-b border-slate-200">
          {(['semua', 'transaksi', 'pengingat', 'sistem'] as const).map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)} 
              className={`pb-3 text-sm font-medium border-b-2 transition-colors capitalize ${activeTab === tab ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {unreadCount > 0 && (
          <div className="flex justify-end mb-4">
            <button onClick={markAllAsRead} className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition">
              <CheckCheck className="h-4 w-4" /> Tandai Semua Dibaca
            </button>
          </div>
        )}

        <div className="space-y-3">
          <AnimatePresence>
            {filtered.map((notif) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                key={notif.id}
                onClick={() => !notif.isRead && setNotifications(notifications.map(n => n.id === notif.id ? { ...n, isRead: true } : n))}
                className={`group relative rounded-xl border p-5 shadow-sm flex items-start gap-4 transition cursor-pointer hover:shadow-md ${notif.isRead ? 'bg-white border-slate-200' : 'bg-indigo-50/30 border-indigo-200'}`}
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${getIconBg(notif.type)}`}>
                  {getIcon(notif.type)}
                </div>
                
                <div className="flex-1 pr-10">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className={`text-sm ${notif.isRead ? 'font-medium text-slate-700' : 'font-bold text-slate-900'}`}>{notif.title}</h4>
                    <span className="text-xs font-medium text-slate-400 whitespace-nowrap">{notif.time}</span>
                  </div>
                  <p className={`text-sm ${notif.isRead ? 'text-slate-500' : 'text-slate-700'}`}>{notif.message}</p>
                </div>
                
                <button onClick={(e) => deleteNotification(e, notif.id)} className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all">
                  <Trash2 className="h-4 w-4" />
                </button>

                {!notif.isRead && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-indigo-500 rounded-r-md"></div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          
          {filtered.length === 0 && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-16 bg-white rounded-xl border border-slate-200 shadow-sm text-center">
              <div className="bg-slate-50 p-4 rounded-full mb-4">
                <Bell className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-base font-semibold text-slate-900">Tidak ada notifikasi</h3>
              <p className="text-sm text-slate-500 mt-1 max-w-xs">Belum ada pemberitahuan baru untuk kategori ini.</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}