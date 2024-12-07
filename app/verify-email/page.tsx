"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';  // `next/router` yerine `next/navigation` kullanıyoruz
import { useAlert } from '@/app/context/AlertContext'; // showAlert fonksiyonu dışarıdan gelecek

const prodUrl = process.env.NEXT_PUBLIC_API_BASE_URL; // prodUrl API base URL'si
export default function VerifyEmail({ params }: { params: Promise<{ uidb64: string, token: string }> }) {
  const showAlert = useAlert();
  const [mounted, setMounted] = useState(false); // Sayfa yüklendikten sonra yönlendirme yapabilmek için
  const router = useRouter(); // Sayfa yönlendirme için

  useEffect(() => {
    setMounted(true); // Sayfa yüklendikten sonra router'ı kullanabiliriz

    // params'ı unwrapping işlemi yapıyoruz
    params.then((unwrappedParams) => {
      const { uidb64, token } = unwrappedParams; // Artık uidb64 ve token'ı güvenle kullanabiliriz

      if (uidb64 && token) {
        // API isteğinde prodUrl kullanıyoruz
        axios
          .get(`${prodUrl}/customerauth/user/verify/${uidb64}/${token}/`) // prodUrl burada kullanılacak
          .then((response) => {
            const { status, message } = response.data;

            if (status) {
              // Başarılı mesajı göster
              showAlert("success", message || "E-posta başarıyla doğrulandı!");
            } else {
              // Hata mesajını göster
              showAlert("error", message || "E-posta doğrulama başarısız.");
            }

            // Her durumda 2 saniye sonra ana sayfaya yönlendir
            setTimeout(() => {
              router.push('/'); // Ana sayfaya yönlendirme
            }, 2000);
          })
          .catch((error) => {
            // Hata mesajını göster
            showAlert("error", error.response?.data?.message || "Bir hata oluştu.");

            // Hata durumunda da ana sayfaya yönlendirme
            setTimeout(() => {
              router.push('/'); // Ana sayfaya yönlendirme
            }, 2000);
          });
      }
    });
  }, [params, router, showAlert]);

  // Yalnızca tarayıcı tarafında render yapıyoruz
  if (!mounted) return null;

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      {/* Doğrudan mesajları burada gösteriyorsunuz, artık state gerek yok */}
      <h2>Doğrulama işlemi devam ediyor...</h2>
    </div>
  );
}
