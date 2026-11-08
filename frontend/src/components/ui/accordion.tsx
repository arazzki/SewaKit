"use client";

import React, { useState, type FC } from "react";
import { motion, MotionConfig, type Transition } from "motion/react";
import {
  ChevronDown,
  ArrowUpRight,
  ShieldCheck,
  Clock,
  CreditCard,
  ScanLine,
  Award,
} from "lucide-react";
import useMeasure from "react-use-measure";
import Button from "@/components/ui/button";

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

export interface AccordionProps {
  items?: AccordionItemData[];
  defaultOpenId?: number | null;
  className?: string;
}

const springTransition: Transition = {
  type: "spring",
  stiffness: 600,
  damping: 50,
  mass: 1,
};

export const SEWAKIT_ACCORDION_ITEMS: AccordionItemData[] = [
  {
    id: 1,
    title: "Jadwal Dikunci 24 Jam Saat Pengajuan",
    icon: <Clock className="size-4 text-accent" strokeWidth={1.75} />,
    content:
      "Begitu kamu mengajukan sewa, tanggal tersebut otomatis ditahan selama 24 jam supaya tidak diserobot penyewa lain selagi pemilik meninjau permintaanmu.",
    links: [
      { label: "Ajukan Sewa", href: "/rentals/request" },
      { label: "Lihat Katalog", href: "/catalog" },
    ],
  },
  {
    id: 2,
    title: "Pembayaran Sewa & Deposit via Rekber",
    icon: <CreditCard className="size-4 text-forest" strokeWidth={1.75} />,
    content:
      "Setelah disetujui pemilik, kamu punya waktu 2 jam untuk membayar lewat QRIS atau Virtual Account. Uang sewa dan deposit disimpan di sistem sampai barang kembali.",
    links: [
      { label: "Halaman Pembayaran", href: "/payments" },
      { label: "Info Deposit", href: "/disputes" },
    ],
  },
  {
    id: 3,
    title: "Ketemuan & Cek Fisik COD di Kampus",
    icon: <ScanLine className="size-4 text-ink" strokeWidth={1.75} />,
    content:
      "Serah terima dilakukan langsung di area Telkom University (Lobi TULT, GKU, Open Library, atau Student Center) sambil mencocokkan kelengkapan dan foto kondisi barang.",
    links: [
      { label: "Serah Terima COD", href: "/handover" },
      { label: "Pembatalan Sewa", href: "/rentals/cancellation" },
    ],
  },
  {
    id: 4,
    title: "Deposit Kembali Utuh Saat Alat Dikembalikan",
    icon: <ShieldCheck className="size-4 text-forest" strokeWidth={1.75} />,
    content:
      "Kalau alat dikembalikan tepat waktu dan kondisinya sesuai saat pengambilan, deposit langsung kembali 100% ke penyewa dan uang sewa cair ke pemilik.",
    links: [
      { label: "Dompet Pemilik", href: "/owner/wallet" },
      { label: "Kelola Barang", href: "/owner/items" },
    ],
  },
  {
    id: 5,
    title: "Ulasan Dua Arah Antar Mahasiswa",
    icon: <Award className="size-4 text-accent" strokeWidth={1.75} />,
    content:
      "Penyewa dan pemilik alat bisa saling memberi penilaian setelah transaksi selesai agar kondisi barang dan ketepatan waktu COD tetap terjaga.",
    links: [
      { label: "Lihat Ulasan", href: "/reviews" },
      { label: "Moderasi Kampus", href: "/admin/dashboard" },
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

  const BORDER_WIDTH = "1px";
  const BORDER_STYLE = "solid";
  const borderTopWidth =
    isFirst || isAfterOpen || isOpen ? BORDER_WIDTH : "0px";
  const borderBottomWidth =
    isLast || isBeforeOpen || isOpen ? BORDER_WIDTH : "0px";

  const RADIUS = 14;
  let borderTopLeftRadius = 0;
  let borderTopRightRadius = 0;
  let borderBottomLeftRadius = 0;
  let borderBottomRightRadius = 0;

  if (isOpen || isAlone) {
    borderTopLeftRadius = RADIUS;
    borderTopRightRadius = RADIUS;
    borderBottomLeftRadius = RADIUS;
    borderBottomRightRadius = RADIUS;
  } else if (isBeforeOpen) {
    borderBottomLeftRadius = RADIUS;
    borderBottomRightRadius = RADIUS;
  } else if (isAfterOpen) {
    borderTopLeftRadius = RADIUS;
    borderTopRightRadius = RADIUS;
  } else if (isFirst) {
    borderTopLeftRadius = RADIUS;
    borderTopRightRadius = RADIUS;
  } else if (isLast) {
    borderBottomLeftRadius = RADIUS;
    borderBottomRightRadius = RADIUS;
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
              ? "border-ink bg-surface shadow-card"
              : "border-hairline bg-surface-subtle hover:bg-surface"
          }`}
          style={{
            borderTopWidth,
            borderBottomWidth,
            borderLeftWidth: BORDER_WIDTH,
            borderRightWidth: BORDER_WIDTH,
            borderStyle: BORDER_STYLE,
            marginBlock: isOpen ? "8px" : "0px",
          }}
        >
          <button
            type="button"
            onClick={() => setOpenId(isOpen ? null : item.id)}
            className="flex w-full cursor-pointer items-center justify-between gap-4 px-4 py-3.5 text-left"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                  isOpen
                    ? "border-ink bg-ink text-white [&>*]:text-white"
                    : "border-hairline bg-surface-muted text-ink"
                }`}
              >
                {item.icon}
              </div>

              <div className="min-w-0">
                {item.tag && (
                  <span className="block text-xs font-medium text-ink-subtle">
                    {item.tag}
                  </span>
                )}
                <span className="block truncate text-sm font-semibold tracking-tight text-ink">
                  {item.title}
                </span>
              </div>
            </div>

            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border ${
                isOpen
                  ? "border-accent bg-accent text-white"
                  : "border-hairline bg-surface text-ink-muted"
              }`}
            >
              <ChevronDown className="size-3.5" />
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
              <div className="border-t border-surface-muted px-4 pb-4 pt-3 text-xs leading-relaxed text-ink-muted">
                <p>{item.content}</p>
                {item.links && item.links.length > 0 && (
                  <div className="mt-3.5 flex flex-wrap items-center gap-2">
                    {item.links.map((link) => (
                      <Button key={link.href} href={link.href} size="xs">
                        <span>{link.label}</span>
                        <ArrowUpRight className="size-3" />
                      </Button>
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

export const Accordion: FC<AccordionProps> = ({
  items,
  defaultOpenId = 1,
  className = "",
}) => {
  const defaultItems = items ?? SEWAKIT_ACCORDION_ITEMS;
  const [openId, setOpenId] = useState<number | null>(defaultOpenId);
  const openIndex = defaultItems.findIndex((item) => item.id === openId);

  return (
    <div className={`w-full ${className}`}>
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

export const AccordionApp = Accordion;
export default Accordion;
