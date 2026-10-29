'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { User, ImagePlus, ThumbsUp, X, Loader2, CheckCircle2, Star, ShieldCheck, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { RatingStars } from '@/components/foundations/rating-stars';
import { RatingBadge } from '@/components/foundations/rating-badge';
import PageHeader from '@/components/PageHeader';
import { AccordionApp, type AccordionItemData } from '@/components/watermelon/card-split-accordian';

interface Review {
  id: number;
  user: string;
  rating: number;
  date: string;
  comment: string;
  image: string | null;
  helpful: number;
  ownerReply: string | null;
}

const initialReviews: Review[] = [
  {
    id: 1,
    user: 'Budi Santoso',
    rating: 5,
    date: '25 Okt 2026',
    comment: 'Barang berfungsi sangat baik untuk praktikum IoT. Pemilik ramah dan tepat waktu saat COD di TULT.',
    image: null,
    helpful: 12,
    ownerReply: 'Terima kasih Budi! Ditunggu sewa berikutnya.',
  },
  {
    id: 2,
    user: 'Siti Aminah',
    rating: 4,
    date: '20 Okt 2026',
    comment: 'Kamera bersih dan lensa terawat. Serah terima di Open Library berjalan lancar.',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80',
    helpful: 3,
    ownerReply: null,
  },
];

const REVIEW_PROTOCOL_ITEMS: AccordionItemData[] = [
  {
    id: 1,
    title: 'Ulasan Terverifikasi Transaksi Selesai',
    tag: 'VERIFIED REVIEW',
    icon: <ShieldCheck className="size-4 text-[#1B4332]" />,
    content:
      'Hanya mahasiswa yang telah menyelesaikan siklus serah terima pengembalian alat yang dapat memberikan rating bintang dan foto kondisi aktual.',
  },
  {
    id: 2,
    title: 'Hak Jawab & Balasan Pemilik Alat',
    tag: 'TWO-WAY REPUTATION',
    icon: <MessageSquare className="size-4 text-[#C83E2B]" />,
    content:
      'Pemilik barang dapat menanggapi ulasan penyewa secara terbuka untuk menjaga transparansi histori perawatan instrumen praktikum.',
  },
];

export default function ReviewsPage() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (rating === 0) return toast.error('Pilih rating bintang terlebih dahulu!');

    setIsSubmitting(true);
    setTimeout(() => {
      const newReview: Review = {
        id: Date.now(),
        user: 'Anda (Penyewa Terverifikasi)',
        rating,
        date: 'Baru saja',
        comment,
        image: imagePreview,
        helpful: 0,
        ownerReply: null,
      };
      setReviews([newReview, ...reviews]);
      setRating(0);
      setComment('');
      setImagePreview(null);
      setIsSubmitting(false);
      toast.success('Ulasan berhasil diterbitkan!');
    }, 800);
  };

  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? (reviews.reduce((acc, rev) => acc + rev.rating, 0) / totalReviews).toFixed(1)
      : '0.0';

  return (
    <div className="min-h-screen bg-[#F6F5F0]">
      <PageHeader
        eyebrow="07 / REPUTASI KOMUNITAS"
        title="Rating & Ulasan Dua Arah"
        description="Transparansi penilaian antara Pemilik Alat dan Mahasiswa Penyewa pasca pengembalian barang."
        actions={
          <Link
            href="/catalog"
            className="rounded-xl border border-[#141413] bg-white px-4 py-2.5 text-xs font-medium text-[#141413] hover:bg-[#EFECE6] transition"
          >
            Eksplorasi Katalog →
          </Link>
        }
      />

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
            <div className="flex justify-center rounded-2xl border border-[#DCD8CE] bg-white p-6">
              <RatingBadge
                title={averageRating}
                subtitle={`Dari ${totalReviews} ulasan terverifikasi`}
                rating={Number(averageRating)}
                theme="light"
              />
            </div>

            <div className="rounded-2xl border border-[#DCD8CE] bg-white p-6">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#78756F] block text-center">
                FORMULIR EVALUASI
              </span>
              <h3 className="text-base font-bold text-[#141413] mb-5 text-center mt-1">
                Beri Penilaian Transaksi
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      type="button"
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.92 }}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(rating)}
                    >
                      <Star
                        className={`h-8 w-8 transition-colors duration-200 ${
                          star <= (hover || rating)
                            ? 'fill-[#C83E2B] text-[#C83E2B]'
                            : 'fill-[#EFECE6] text-[#DCD8CE]'
                        }`}
                      />
                    </motion.button>
                  ))}
                </div>

                <textarea
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Bagaimana akurasi spesifikasi alat dan ketepatan waktu COD?"
                  required
                  className="w-full rounded-xl border border-[#DCD8CE] bg-[#F6F5F0] px-4 py-3 text-sm text-[#141413] focus:bg-white focus:border-[#141413] outline-none resize-none transition-all"
                />

                <div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                  />
                  {!imagePreview ? (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full flex items-center justify-center gap-2 border border-dashed border-[#DCD8CE] bg-[#FBF9F5] rounded-xl py-3 text-xs font-medium text-[#575653] hover:border-[#141413] hover:text-[#141413] transition"
                    >
                      <ImagePlus className="h-4 w-4" /> Lampirkan Foto Dokumentasi (Opsional)
                    </button>
                  ) : (
                    <div className="relative rounded-xl overflow-hidden border border-[#DCD8CE] group">
                      <img src={imagePreview} alt="Preview" className="w-full h-32 object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => setImagePreview(null)}
                          className="bg-[#C83E2B] text-white p-2 rounded-full hover:bg-[#AE3221]"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#141413] px-4 py-3 text-sm font-medium text-[#F6F5F0] hover:bg-[#C83E2B] transition disabled:opacity-70"
                >
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Terbitkan Ulasan'}
                </button>
              </form>
            </div>

            <div className="rounded-2xl border border-[#DCD8CE] bg-[#EFECE6]/70 p-4">
              <AccordionApp items={REVIEW_PROTOCOL_ITEMS} defaultOpenId={1} />
            </div>
          </div>

          <div className="lg:col-span-8 space-y-4">
            <AnimatePresence>
              {reviews.map((review) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={review.id}
                  className="rounded-2xl border border-[#DCD8CE] bg-white p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl border border-[#DCD8CE] bg-[#F6F5F0] flex items-center justify-center text-[#141413] font-bold">
                        <User className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#141413]">{review.user}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <RatingStars rating={review.rating} />
                          <span className="font-mono text-xs text-[#78756F]">{review.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-[#575653] leading-relaxed mb-4">{review.comment}</p>

                  {review.image && (
                    <div className="mb-4 rounded-xl overflow-hidden border border-[#EFECE6]">
                      <img
                        src={review.image}
                        alt="Bukti"
                        className="w-full h-52 object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
                      />
                    </div>
                  )}

                  <div className="flex items-center gap-4 pt-4 border-t border-[#EFECE6]">
                    <button
                      onClick={() =>
                        setReviews(
                          reviews.map((r) =>
                            r.id === review.id ? { ...r, helpful: r.helpful + 1 } : r
                          )
                        )
                      }
                      className="flex items-center gap-1.5 font-mono text-xs font-medium text-[#575653] hover:text-[#C83E2B] transition"
                    >
                      <ThumbsUp className="h-3.5 w-3.5" /> Membantu ({review.helpful})
                    </button>
                  </div>

                  {review.ownerReply && (
                    <div className="mt-4 bg-[#F6F5F0] rounded-xl p-4 text-sm border border-[#DCD8CE]">
                      <span className="font-mono text-xs font-semibold text-[#1B4332] mb-1 flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4" /> TANGGAPAN PEMILIK ALAT
                      </span>
                      <p className="text-[#575653] text-xs leading-relaxed mt-1">{review.ownerReply}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
