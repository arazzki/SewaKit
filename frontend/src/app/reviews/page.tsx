'use client';

import { useState, useRef } from 'react';
import { User, ImagePlus, ThumbsUp, X, Loader2, CheckCircle2, Star, ShieldCheck, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { RatingStars } from '@/components/foundations/rating-stars';
import { RatingBadge } from '@/components/foundations/rating-badge';
import PageHeader from '@/components/PageHeader';
import Button from '@/components/ui/button';
import Card from '@/components/ui/card';
import { Accordion, type AccordionItemData } from '@/components/ui/accordion';

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
    icon: <ShieldCheck className="size-4 text-forest" />,
    content:
      'Hanya mahasiswa yang telah menyelesaikan siklus serah terima pengembalian alat yang dapat memberikan rating bintang dan foto kondisi aktual.',
  },
  {
    id: 2,
    title: 'Hak Jawab & Balasan Pemilik Alat',
    tag: 'TWO-WAY REPUTATION',
    icon: <MessageSquare className="size-4 text-accent" />,
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
    <div className="min-h-screen bg-canvas">
      <PageHeader
        eyebrow="Ulasan Pengguna"
        title="Penilaian Penyewa & Pemilik Alat"
        description="Ulasan jujur antar mahasiswa setelah serah terima pengembalian barang selesai."
        actions={
          <Button href="/catalog" variant="outline" className="border-ink">
            Eksplorasi Katalog →
          </Button>
        }
      />

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
            <Card className="flex justify-center p-6">
              <RatingBadge
                title={averageRating}
                subtitle={`Dari ${totalReviews} ulasan terverifikasi`}
                rating={Number(averageRating)}
                theme="light"
              />
            </Card>

            <Card className="p-6">
              <span className="text-xs font-semibold text-ink-subtle block text-center">
                FORMULIR EVALUASI
              </span>
              <h3 className="text-base font-bold text-ink mb-5 text-center mt-1">
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
                            ? 'fill-accent text-accent'
                            : 'fill-surface-muted text-hairline'
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
                  className="w-full rounded-xl border border-hairline bg-canvas px-4 py-3 text-sm text-ink focus:bg-surface focus:border-ink outline-none resize-none transition-all"
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
                      className="w-full flex items-center justify-center gap-2 border border-dashed border-hairline bg-surface-subtle rounded-xl py-3 text-xs font-medium text-ink-muted hover:border-ink hover:text-ink transition"
                    >
                      <ImagePlus className="h-4 w-4" /> Lampirkan Foto Dokumentasi (Opsional)
                    </button>
                  ) : (
                    <div className="relative rounded-xl overflow-hidden border border-hairline group">
                      <img src={imagePreview} alt="Preview" className="w-full h-32 object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                        <Button
                          variant="accent"
                          size="icon"
                          onClick={() => setImagePreview(null)}
                          className="rounded-full"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Terbitkan Ulasan'}
                </Button>
              </form>
            </Card>

            <Card variant="muted" className="p-4">
              <Accordion items={REVIEW_PROTOCOL_ITEMS} defaultOpenId={1} />
            </Card>
          </div>

          <div className="lg:col-span-8 space-y-4">
            <AnimatePresence>
              {reviews.map((review) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={review.id}
                  className="rounded-2xl border border-hairline bg-surface p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl border border-hairline bg-canvas flex items-center justify-center text-ink font-bold">
                        <User className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-ink">{review.user}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <RatingStars rating={review.rating} />
                          <span className="font-mono text-xs text-ink-subtle">{review.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-ink-muted leading-relaxed mb-4">{review.comment}</p>

                  {review.image && (
                    <div className="mb-4 rounded-xl overflow-hidden border border-surface-muted">
                      <img
                        src={review.image}
                        alt="Bukti"
                        className="w-full h-52 object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
                      />
                    </div>
                  )}

                  <div className="flex items-center gap-4 pt-4 border-t border-surface-muted">
                    <button
                      onClick={() =>
                        setReviews(
                          reviews.map((r) =>
                            r.id === review.id ? { ...r, helpful: r.helpful + 1 } : r
                          )
                        )
                      }
                      className="flex items-center gap-1.5 font-mono text-xs font-medium text-ink-muted hover:text-accent transition"
                    >
                      <ThumbsUp className="h-3.5 w-3.5" /> Membantu ({review.helpful})
                    </button>
                  </div>

                  {review.ownerReply && (
                    <div className="mt-4 bg-canvas rounded-xl p-4 text-sm border border-hairline">
                      <span className="font-mono text-xs font-semibold text-forest mb-1 flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4" /> TANGGAPAN PEMILIK ALAT
                      </span>
                      <p className="text-ink-muted text-xs leading-relaxed mt-1">{review.ownerReply}</p>
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
