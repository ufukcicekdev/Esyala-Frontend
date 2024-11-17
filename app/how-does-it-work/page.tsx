import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'

export default function page() {
    return (
        <main id="mt-main">

            <section className="mt-contact-banner style4 wow fadeInUp" data-wow-delay="0.4s" style={{
                backgroundImage: 'url(https://filestorages.fra1.cdn.digitaloceanspaces.com/esyabul/static/images/img43.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '250px',
                width: '100%',
            }}>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 text-center">
                            <h1>Nasıl Çalışır</h1>
                            <nav className="breadcrumbs">
                                <ul className="list-unstyled">
                                    <li><a href="/">Ana Sayfa <IoIosArrowForward className="inline-block ml-1" /></a></li>
                                    <li>Nasıl Çalışır</li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>

            <div className="w-full">
                {/* Nasıl Çalışır */}
                <div className="container mx-auto mb-8">
                    <div className="step bg-white shadow-md rounded-lg p-6">
                        <span className="step-number bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold">
                            1
                        </span>
                        <div className="step-content mt-4">
                            <h2 className="text-xl font-semibold mb-2 text-gray-800">Nasıl Çalışır?</h2>
                            <p className="text-gray-600 mb-4">Web sitemizdeki kiralama işlemi adımları:</p>
                            <ol className="list-decimal list-inside text-gray-700 space-y-2">
                                <li>Yüzlerce ürün arasından istediğin ürünü seç.</li>
                                <li>Kiralamak istediğin süreyi belirle.</li>
                                <li>Siparişini oluşturduğunda ilk ay kira ücreti alınır.</li>
                                <li>
                                    Otomatik kimlik teyidi ve findeks raporu onayının ardından kiralama işlemi
                                    onaylanır ve ürünün ücretsiz kargo ile sana gönderilir.
                                </li>
                                <li>Kiralama talebi onaylanmazsa alınan ilk ay kira ücreti iade edilir.</li>
                            </ol>
                        </div>
                    </div>
                </div>

                {/* Kullanım Detayları */}
                <div className="container mx-auto mb-8">
                    <div className="step bg-white shadow-md rounded-lg p-6">
                        <span className="step-number bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold">
                            2
                        </span>
                        <div className="step-content mt-4">
                            <h2 className="text-xl font-semibold mb-2 text-gray-800">Kullanım Detayları</h2>
                            <ul className="list-disc list-inside text-gray-700 space-y-2">
                                <li>İlk ay kira ücreti kiralama yapıldığı gün alınır.</li>
                                <li>
                                    Kira süresi ürünü teslim aldığın gün başlar. Sonraki ayların kira ücretleri
                                    de siparişini oluşturduğun günlerde kartından otomatik olarak alınır.
                                    Kargoda geçen süre kira süresine eklenir.
                                </li>
                                <li>
                                    Ürünü kullanırken hasar oluşursa, hasar onarım süreçlerini biz üstleniriz ve
                                    hasar onarım masraflarının %70’ini karşılarız.
                                </li>
                                <li>
                                    Kiraladığın ürünü daha uzun süre kullanmak istersen, istediğin zaman kira
                                    süresini uzatabilir ya da kiraladığın ürünü satın alabilirsin.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* İade İşlemleri */}
                <div className="container mx-auto mb-8">
                    <div className="step bg-white shadow-md rounded-lg p-6">
                        <span className="step-number bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold">
                            3
                        </span>
                        <div className="step-content mt-4">
                            <h2 className="text-xl font-semibold mb-2 text-gray-800">İade İşlemleri</h2>
                            <ul className="list-disc list-inside text-gray-700 space-y-2">
                                <li>
                                    Kira süresi bittiğinde ürünü orijinal kutusu ve aksesuarlarıyla ücretsiz
                                    kargo ile geri gönder.
                                </li>
                                <li>Her iade edilen ürünün teknik kalite kontrol işlemleri yapılır.</li>
                                <li>
                                    Kalite kontrol işlemleri onaylandığında kartından çekilen bir sonraki ayın
                                    kira ücreti iade edilir.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
