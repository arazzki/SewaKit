'use client';

import React, { useState, type FC } from 'react';
import Link from 'next/link';
import { motion, MotionConfig, type Transition } from 'motion/react';
import { ChevronDown, ArrowUpRight, ShieldCheck, Clock, MapPin, CreditCard, Sparkles } from 'lucide-react';
import { HiCursorArrowRipple } from 'react-icons/hi2';
import { IoIosTimer } from 'react-icons/io';
import { PiHandTap } from 'react-icons/pi';
import useMeasure from 'react-use-measure';

export interface AccordionItemData {
  id: number;
  title: string;
  tag?: string;
  icon: React.ReactNode;
  content: string;
  links?: { label: string; href: string }[];
}

interface AccordionItemProps {
  item: AccordionItemData;
  setOpenId: (id: number | null) => void;
  index: number;
  total: number;
  openIndex: number;
}

interface AccordionProps {
  items?: AccordionItemData[];
  defaultOpenId?: number | null;
  className?: string;
}

const springTransition: Transition = {
  type: 'spring',
  stiffness: 600,
  damping: 50,
  mass: 1,
};

export const SEWAKIT_ACCORDION_ITEMS: AccordionItemData[] = [
  {
    id: 1,
    title: '01 / Penahanan Jadwal (Hold 24 Jam) Anti-Bentrok',
    tag: 'Booking Engine',
    icon: <IoIosTimer className="size-5 text-[#C83E2B]" />,
    content:
      'Setiap pengajuan sewa otomatis mengunci kalender ketersediaan alat selama 24 jam. Mahasiswa lain tidak dapat menyerobot tanggal yang sama sementara pemilik meninjau permintaan Anda.',
    links: [
      { label: 'Ajukan Sewa Alat', href: '/rentals/request' },
      { label: 'Eksplorasi Katalog', href: '/catalog' },
    ],
  },
  {
    id: 2,
    title: '02 / Rekening Bersama (Escrow) & Deposit Jaminan',
    tag: 'Xendit Payment',
    icon: <CreditCard className="size-4 text-[#1B4332]" />,
    content:
      'Setelah disetujui pemilik, penyewa memiliki waktu 2 jam untuk menyelesaikan pembayaran via QRIS atau Virtual Account. Dana sewa dan deposit ditahan di sistem hingga alat kembali dengan aman.',
    links: [
      { label: 'Gateway Pembayaran', href: '/payments' },
      { label: 'Pusat Deposit & Klaim', href: '/disputes' },
    ],
  },
  {
    id: 3,
    title: '03 / Verifikasi Serah Terima COD di Titik Kampus',
    tag: 'Handover Protocol',
    icon: <PiHandTap className="size-5 -rotate-12 text-[#141413]" />,
    content:
      'Pertemuan dilakukan langsung di area Telkom University (Lobi TULT, GKU, Open Library, atau Student Center). Dilengkapi kode verifikasi 2 arah, checklist fisik, dan dokumentasi foto sebelum/sesudah.',
    links: [
      { label: 'Buka Modul Serah Terima', href: '/handover' },
      { label: 'Laporan No-Show COD', href: '/rentals/cancellation' },
    ],
  },
  {
    id: 4,
    title: '04 / Kalkulasi Denda Proporsional & Pencairan Otomatis',
    tag: 'Automated Settlement',
    icon: <ShieldCheck className="size-4 text-[#1B4332]" />,
    content:
      'Jika pengembalian tepat waktu dan sesuai checklist, deposit dikembalikan 100% ke penyewa dan uang sewa langsung cair ke dompet pemilik. Keterlambatan dihitung transparan per jam.',
    links: [
      { label: 'Dompet Pemilik Alat', href: '/owner/wallet' },
      { label: 'Kelola Inventaris', href: '/owner/items' },
    ],
  },
  {
    id: 5,
    title: '05 / Reputasi Dua Arah & Moderasi Komunitas Kampus',
    tag: 'Trust & Safety',
    icon: <HiCursorArrowRipple className="size-5 -rotate-6 text-[#C83E2B]" />,
    content:
      'Setiap mahasiswa terverifikasi dengan NIM & program studi. Penyewa dan pemilik saling memberikan rating dan ulasan pasca transaksi untuk menjaga standar peralatan praktikum.',
    links: [
      { label: 'Ulasan Komunitas', href: '/reviews' },
      { label: 'Panel Moderasi Admin', href: '/admin/dashboard' },
    ],
  },
];

const AccordionItem: FC<AccordionItemProps> = ({
  item,
  setOpenId,
  index,
  total,
  openIndex,
}) => {
  const [ref, bounds] = useMeasure();
  const isOpen = index === openIndex;

  const isFirst = index === 0;
  const isLast = index === total - 1;

  const isBeforeOpen = index === openIndex - 1;
  const isAfterOpen = index === openIndex + 1;

  const isAlone = (isAfterOpen && isLast) || (isBeforeOpen && isFirst);

  const BORDER_WIDTH = '1px';
  const BORDER_STYLE = 'solid';
  const borderTopWidth =
    isFirst || isAfterOpen || isOpen ? BORDER_WIDTH : '0px';
  const borderBottomWidth =
    isLast || isBeforeOpen || isOpen ? BORDER_WIDTH : '0px';
  const borderLeftWidth = BORDER_WIDTH;
  const borderRightWidth = BORDER_WIDTH;

  let borderTopLeftRadius = 0;
  let borderTopRightRadius = 0;
  let borderBottomLeftRadius = 0;
  let borderBottomRightRadius = 0;

  if (isOpen || isAlone) {
    borderTopLeftRadius = 20;
    borderTopRightRadius = 20;
    borderBottomLeftRadius = 20;
    borderBottomRightRadius = 20;
  } else if (isBeforeOpen) {
    borderBottomLeftRadius = 20;
    borderBottomRightRadius = 20;
  } else if (isAfterOpen) {
    borderTopLeftRadius = 20;
    borderTopRightRadius = 20;
  } else if (isFirst) {
    borderTopLeftRadius = 20;
    borderTopRightRadius = 20;
  } else if (isLast) {
    borderBottomLeftRadius = 20;
    borderBottomRightRadius = 20;
  }

  return (
    <MotionConfig transition={springTransition}>
      <motion.li layout className="list-none">
        <motion.div
          animate={{
            borderTopLeftRadius,
            borderTopRightRadius,
            borderBottomLeftRadius,
            borderBottomRightRadius,
          }}
          className={`overflow-hidden border-solid transition-colors will-change-transform ${
            isOpen
              ? 'border-[#141413] bg-white shadow-[0_12px_32px_-12px_rgba(20,20,19,0.12)]'
              : 'border-[#DCD8CE] bg-[#FBF9F5] hover:bg-white'
          }`}
          style={{
            borderTopWidth,
            borderBottomWidth,
            borderLeftWidth,
            borderRightWidth,
            borderStyle: BORDER_STYLE,
            marginBlock: isOpen ? '12px' : '0px',
          }}
        >
          <button
            type="button"
            onClick={() => setOpenId(isOpen ? null : item.id)}
            className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                  isOpen
                    ? 'border-[#141413] bg-[#141413] text-white [&>*]:text-white'
                    : 'border-[#E2DFD7] bg-[#F3F1EC] text-[#141413]'
                }`}
              >
                {item.icon}
              </div>

              <div className="min-w-0">
                {item.tag && (
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-[#78756F]">
                    {item.tag}
                  </span>
                )}
                <span className="block truncate text-sm font-semibold tracking-tight text-[#141413] md:text-base">
                  {item.title}
                </span>
              </div>
            </div>

            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${
                isOpen
                  ? 'border-[#C83E2B] bg-[#C83E2B] text-white'
                  : 'border-[#E2DFD7] bg-white text-[#575653]'
              }`}
            >
              <ChevronDown className="size-4" />
            </motion.div>
          </button>

          <motion.div
            initial={false}
            animate={{
              height: isOpen ? bounds.height : 0,
              opacity: isOpen ? 1 : 0,
            }}
            className="overflow-hidden will-change-transform"
          >
            <div ref={ref}>
              <div className="border-t border-[#EFECE6] px-5 pb-5 pt-3.5 text-sm leading-relaxed text-[#575653]">
                <p>{item.content}</p>
                {item.links && item.links.length > 0 && (
                  <div className="mt-4 flex flex-wrap items-center gap-2.5">
                    {item.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#141413] bg-[#141413] px-3 py-1.5 text-xs font-medium text-[#F6F5F0] transition hover:bg-[#C83E2B] hover:border-[#C83E2B]"
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight className="size-3.5" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.li>
    </MotionConfig>
  );
};

export const AccordionApp: FC<AccordionProps> = ({
  items,
  defaultOpenId = 1,
  className = '',
}) => {
  const defaultItems = items ?? SEWAKIT_ACCORDION_ITEMS;
  const [openId, setOpenId] = useState<number | null>(defaultOpenId);
  const openIndex = defaultItems.findIndex((item) => item.id === openId);

  return (
    <div className={`w-full transition-colors duration-500 ${className}`}>
      <ul className="w-full">
        {defaultItems.map((item, index) => (
          <AccordionItem
            key={item.id}
            item={item}
            setOpenId={setOpenId}
            index={index}
            total={defaultItems.length}
            openIndex={openIndex}
          />
        ))}
      </ul>
    </div>
  );
};

export default AccordionApp;
