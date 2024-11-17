import { Link } from 'lucide-react';
import React from 'react';

function Odeme() {
  return (
    <div className="overflow-y-scroll p-4">
      <h1 className="text-3xl font-bold mb-4">Ödeme ve Teslimat Bilgileri</h1>

      <h2 className="text-2xl font-semibold mb-2">Ödeme</h2>
      <p className="mb-4">
        Her türlü kredi kartınıza çevrimiçi ödeme yapabilirsiniz. Çevrimiçi ödemelerinizde siparişiniz sonunda kredi
        kartınızdan seçtiğiniz ürün veya ürünler için belirlenen aylık tutar çekim işlemi gerçekleşecektir. Söz konusu
        sistem herhangi bir sorun nedeni ile işlemi gerçekleştirilemiyorsa ödeme sayfası sonucunda ziyaretçimiz bu
        durumdan haberdar edilmektedir.
      </p>

      <hr className="my-4" />

      <h2 className="text-2xl font-semibold mb-2">Kimlik Teyidi ve Sipariş Onayı</h2>
      <p className="mb-4">
        Siparişinizin onaylanması için önce ödeme işleminizin tamamlanması gerekmektedir. İlk aylık kira bedelini
        kartınızdan çekimi gerçekleştiğinde ödeme işleminiz tamamlanır ve siparişiniz onaya düşer.
      </p>
      <p className="mb-4">
        Yaptığınız işlem, esyala.com’dan verdiğiniz ilk sipariş ise kimlik teyidi aşamasını tamamlamanız gerekir.
        Kimlik teyidi için talep edilen bilgiler gönderildikten sonra, ekibimiz kimlik teyidi işlemlerine başlar ve
        sipariş onayı değerlendirmesine başlar. Sipariş onayı verilebilmesi için:
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li>Kimlik teyidi yapılabilmesi</li>
        <li>Kiralama süresinden en az 1 ay fazla son kullanım tarihi bulunan kredi kartınızla satın almayı tamamlamış
            olmanız;</li>
        <li>Findeks Raporu puan durumunuz olumlu bulunan puan sınırlarımız dahilinde olması; ve sipariş verilen ürün /
            ürünlerin tedarik edilebilir olması;</li>
      </ul>
      <p className="mb-4">
        Siparişin esyala.com tarafından onaylanmasından sonra mesafeli kira sözleşmesi kurulur.
      </p>

      <hr className="my-4" />

      <h2 className="text-2xl font-semibold mb-2">Kimlik Teyidi ve Sipariş Onay Süresi</h2>
      <p className="mb-4">
        Siparişinizi tamamlamanız akabinde tarafınıza gönderilen e-postada, kimlik teyidi ve onay sürecinde ihtiyaç
        duyduğumuz belgeleri içerir. Bu belgeleri ne kadar hızlı sürede paylaşırsanız, kimlik teyit ve sipariş onay
        süreci o kadar hızlı tamamlanır. Talep edilen belge ve görüntülerin anlaşılabilir, okunaklı ve net olması gerekir.
        Normal şartlarda, talep edilen belgeler tarafımıza ulaştıktan sonra kimlik teyidi ve sipariş onayı 48 saat
        içerisinde tamamlanmaktadır.
      </p>
      <p className="mb-4">
        Kimlik teyidi için talep edilen belgelerin 48 saat içerisinde gönderilmemesi veya esyala.com tarafından
        siparişin onaylanmaması halinde siparişler iptal edilir.
      </p>

      <hr className="my-4" />

      <h2 className="text-2xl font-semibold mb-2">Sipariş İptali ve Bedel İadesi</h2>
      <p className="mb-4">
        Siparişin iptal edilmesi halinde esyala.com tarafından herhangi bir işlem ücreti alınmaz. İlgili tutarlar,
        azami yedi (7) iş günü içerisinde ödeme aracına uygun bir şekilde iade edilir. İadeye konu tutarın, bankaya
        iadesi işleminin ardından sizin hesabınıza yansıması banka işlem süreçleri ile ilgilidir.
      </p>

      <hr className="my-4" />

      <h2 className="text-2xl font-semibold mb-2">Onay işlemi sonrasında teslimat ne kadar sürmektedir?</h2>
      <p className="mb-4">
        Onaylanan siparişler derhal işleme alınır ve kiraladığınız ürün / ürünler 7-10 iş günü içerisinde tarafınıza
        ulaştırılmak üzere kargo/kurye firmasına teslim edilir. Kiralamış olduğunuz cihazın stoklarımızda bulunmaması
        ve/veya tarafınız için tedarik edilmesinin uzayabileceği durumlarda müşteri hizmetlerimiz hızlıca tarafınıza
        ulaşarak güncel teslimat tarihi ile ilgili bilgi verecektir.
      </p>
      <p className="mb-4">
        Cihazınızın boyutlarına göre kargo süresi değişebilmekte olup; siparişiniz kargo firmasına teslim edildikten
        sonra kargonuzun güncel durumuna ilişkin bilgiler, SMS/e-posta yoluyla tarafınıza bildirilecektir.
      </p>

      <hr className="my-4" />

      <h2 className="text-2xl font-semibold mb-2">Teslim Noktası</h2>
      <p className="mb-4">
        Esyala.com tüm Türkiye’ye gönderim yapmaktadır. Kiraladığınız ürün veya ürünleriniz, bulunduğunuz bölgeye göre
        anlaşmalı kurye firmalarımız tarafından belirttiğiniz adrese teslim edilecek veya belirttiğiniz adrese en yakın
        anlaşmalı kargo firmamızın şubesinde teslim edilecektir.
      </p>

      <hr className="my-4" />

      <h2 className="text-2xl font-semibold mb-2">Siparişin Şahsen Teslim Alınması</h2>
      <p className="mb-4">
        Kiralanan ürün veya ürünlerin değeri nedeniyle bunların kiralayan tarafından şahsen teslim alınması gerekir.
        Teslimat esnasında kargo/kurye personeli tarafından kimlik kontrolü yapması zorunludur. Kimlik ibraz edilmemesi
        durumunda teslimat yapılmaz.
      </p>
      <p className="mb-4">
        Kimlik olarak geçerli evraklar nüfus cüzdanı, ehliyet veya pasaport belgelerinden biridir. Diğer kimlikler kurye
        veya kargo firması tarafından teslim sırasında kabul edilmeyebilir.
      </p>

      <hr className="my-4" />

      <h2 className="text-2xl font-semibold mb-2">Hasarlı Ürün Teslimi</h2>
      <p className="mb-4">
        Sevkiyat sırasında zarar gördüğünü düşündüğünüz paketleri, teslim aldığınız firma yetkilisi önünde açıp kontrol
        ediniz. Eğer üründe herhangi bir zarar olduğunu düşünüyorsanız tutanak tutturularak ürünü teslim almayınız.
      </p>
      <p className="mb-4">
        Ürün teslim alındıktan sonra kargo firmasının görevini tam olarak yerine getirdiği kabul edilmektedir.
      </p>
      <p className="mb-4">
        Ürün hasarlı ise: Hazırlamış olduğunuz hasarlı ürün teslim tutanağının görüntüsünü en kısa zamanda
        <a href="mailto:info@esyala.com" className="tel">
                 info@esyala.com
              </a> e-posta adresine gönderiniz.
      </p>
    </div>
  );
}

export default Odeme;
