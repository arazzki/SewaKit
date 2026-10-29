'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { User, ImagePlus, ThumbsUp, X, Loader2, CheckCircle2, Star } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { RatingStars } from "@/components/foundations/rating-stars";
import { RatingBadge } from "@/components/foundations/rating-badge";

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
  { id: 1, user: 'Budi Santoso', rating: 5, date: '25 Okt 2026', comment: 'Barang berfungsi sangat baik. Pemilik ramah.', image: null, helpful: 12, ownerReply: 'Terima kasih Budi! Ditunggu sewa berikutnya.' },
  { id: 2, user: 'Siti Aminah', rating: 4, date: '20 Okt 2026', comment: 'Kamera bersih dan terawat. Pengiriman agak telat.', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=200&q=80', helpful: 3, ownerReply: null },
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
    if (rating === 0) return toast.error('Pilih rating bintang dulu ya!');
    
    setIsSubmitting(true);
    setTimeout(() => {
      const newReview: Review = {
        id: Date.now(), user: 'Anda (Penyewa)', rating, date: 'Baru saja', comment, image: imagePreview, helpful: 0, ownerReply: null
      };
      setReviews([newReview, ...reviews]);
      setRating(0); setComment(''); setImagePreview(null); setIsSubmitting(false);
      toast.success('Ulasan berhasil dikirim!');
    }, 800);
  };

  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0 
    ? (reviews.reduce((acc, rev) => acc + rev.rating, 0) / totalReviews).toFixed(1)
    : '0.0';
  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-6">
      <div className="mx-auto max-w-5xl">
        
        <div className="mb-8 flex items-end justify-between border-b border-slate-200 pb-5">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Rating & Ulasan</h1>
            <p className="text-sm text-slate-500 mt-1">Ulasan dua arah antara Pemilik dan Penyewa.</p>
          </div>
          <Link href="/" className="text-sm font-semibold text-slate-600 hover:text-indigo-600">← Beranda</Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-1">
            <div className="mb-6 flex justify-center">
              <RatingBadge 
                title={averageRating} 
                subtitle={`Dari ${totalReviews} ulasan`} 
                rating={Number(averageRating)}
                theme="light"
              />
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sticky top-6">
              <h3 className="text-base font-bold text-slate-900 mb-5 text-center">Beri Penilaian</h3>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button 
                      key={star} type="button" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}
                      onClick={() => setRating(star)} onMouseEnter={() => setHover(star)} onMouseLeave={() => setHover(rating)}
                    >
                      <Star className={`h-9 w-9 transition-colors duration-200 ${star <= (hover || rating) ? 'fill-amber-400 text-amber-400' : 'fill-slate-100 text-slate-200'}`} />
                    </motion.button>
                  ))}
                </div>
                
                <textarea 
                  rows={4} value={comment} onChange={(e) => setComment(e.target.value)}
                  placeholder="Bagaimana kondisi barangnya?" required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none resize-none transition-all"
                />

                <div>
                  <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageChange} />
                  {!imagePreview ? (
                    <button type="button" onClick={() => fileInputRef.current?.click()} className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-xl py-3 text-sm font-semibold text-slate-500 hover:bg-slate-50 hover:border-indigo-300 transition">
                      <ImagePlus className="h-4 w-4" /> Tambah Foto (Opsional)
                    </button>
                  ) : (
                    <div className="relative rounded-xl overflow-hidden border border-slate-200 group">
                      <img src={imagePreview} alt="Preview" className="w-full h-32 object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                        <button type="button" onClick={() => setImagePreview(null)} className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow-lg">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white hover:bg-indigo-700 transition disabled:opacity-70">
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Kirim Ulasan'}
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {reviews.map((review) => (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={review.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500 font-bold"><User className="h-5 w-5" /></div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{review.user}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <RatingStars rating={review.rating} />
                          <span className="text-xs text-slate-400">{review.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-slate-700 leading-relaxed mb-4">{review.comment}</p>
                  
                  {review.image && (
                    <div className="mb-4 rounded-xl overflow-hidden border border-slate-100">
                      <img src={review.image} alt="Bukti" className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500 cursor-pointer" />
                    </div>
                  )}

                  <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                    <button onClick={() => setReviews(reviews.map(r => r.id === review.id ? { ...r, helpful: r.helpful + 1 } : r))} className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition">
                      <ThumbsUp className="h-4 w-4" /> Membantu ({review.helpful})
                    </button>
                  </div>

                  {review.ownerReply && (
                    <div className="mt-4 bg-indigo-50/50 rounded-xl p-4 text-sm border border-indigo-100">
                      <span className="font-bold text-indigo-700 mb-1 flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4" /> Balasan Pemilik:
                      </span>
                      <p className="text-slate-700">{review.ownerReply}</p>
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