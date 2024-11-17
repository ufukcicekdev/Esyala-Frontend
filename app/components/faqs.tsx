import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";


import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Link } from "lucide-react";



import React from 'react';

export default function TabsFaqs() {
    return (
        <Tabs defaultValue="GenelBakış" className="flex flex-col pt-10">
            <TabsList className="flex flex-wrap sm:flex-nowrap overflow-x-auto whitespace-nowrap mb-4 sm:mb-0 border-b sm:border-none h-40">
                <TabsTrigger value="GenelBakış" className="min-w-[150px] sm:min-w-[200px] text-6xl sm:text-4xl p-2 sm:p-4 hover:bg-blue-100 transition-colors duration-300 border-b sm:border-0 inline-block">
                    Genel Bakış
                </TabsTrigger>
                <span className="inline-block mx-2 text-2xl">|</span> {/* Ayraç için boş bir span */}
                <TabsTrigger value="Abonelik" className="min-w-[150px] sm:min-w-[200px] text-6xl sm:text-4xl p-2 sm:p-4 hover:bg-blue-100 transition-colors duration-300 border-b sm:border-0 inline-block">
                    Abonelik
                </TabsTrigger>
                <span className="inline-block mx-2 text-2xl">|</span> {/* Ayraç için boş bir span */}
                <TabsTrigger value="Ürün" className="min-w-[150px] sm:min-w-[200px] text-6xl sm:text-4xl p-2 sm:p-4 hover:bg-blue-100 transition-colors duration-300 border-b sm:border-0 inline-block">
                    Ürün
                </TabsTrigger>
                <span className="inline-block mx-2 text-2xl">|</span> {/* Ayraç için boş bir span */}
                <TabsTrigger value="Teslimat" className="min-w-[150px] sm:min-w-[200px] text-6xl sm:text-4xl p-2 sm:p-4 hover:bg-blue-100 transition-colors duration-300 border-b sm:border-0 inline-block">
                    Teslimat
                </TabsTrigger>
                <span className="inline-block mx-2 text-2xl">|</span> {/* Ayraç için boş bir span */}
                <TabsTrigger value="Kiralama" className="min-w-[150px] sm:min-w-[200px] text-6xl sm:text-4xl p-2 sm:p-4 hover:bg-blue-100 transition-colors duration-300 border-b sm:border-0 inline-block">
                    Kiralama
                </TabsTrigger>
                <span className="inline-block mx-2 text-2xl">|</span> {/* Ayraç için boş bir span */}
                <TabsTrigger value="SatınAlma" className="min-w-[150px] sm:min-w-[200px] text-6xl sm:text-4xl p-2 sm:p-4 hover:bg-blue-100 transition-colors duration-300 border-b sm:border-0 inline-block">
                    Satın Alma
                </TabsTrigger>
            </TabsList>

            <TabsContent value="GenelBakış">
                <GeneralView />
            </TabsContent>
            <TabsContent value="Abonelik">
                <Subscribe />
            </TabsContent>
            <TabsContent value="Ürün">
                <Product />
            </TabsContent>

            <TabsContent value="Teslimat">
                <Shipping />
            </TabsContent>

            <TabsContent value="Kiralama">
                <Retail />
            </TabsContent>

            <TabsContent value="SatınAlma">
                <Sales />
            </TabsContent>
        </Tabs>
    );
}




export function GeneralView() {
    return (

        <Accordion type="single" collapsible className="flex-col justify-center">
            <AccordionItem value="item-1">
                <AccordionTrigger className="text-5xl bg-gray-100 px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-500 transition-all duration-300">Eşyala Nedir?</AccordionTrigger>
                <AccordionContent className="text-2xl bg-white px-4 py-4 rounded-lg shadow-lg mt-2">
                    Eşyala, eviniz için ihtiyacınız olan mobilya ve elektronik tüm ürünleri (ve dekoru!) ihtiyaç duyduğunuz süre boyunca kolayca almanızı sağlayan aylık bir abonelik hizmetidir.
                    Size uygun düşük bir aylık ücret karşılığında evinizin ihtiyacı olan parçalara abone olabilir veya satın alabilirsiniz.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger className="text-5xl bg-gray-100 px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-500 transition-all duration-300">Eşyala.com abone olmak?</AccordionTrigger>
                <AccordionContent className="text-2xl bg-white px-4 py-4 rounded-lg shadow-lg mt-2">
                    Evinizi taşımak ve döşemek bunaltıcı, zaman alıcı ve stresli olabilir.
                    Eviniz için satın alma taahhüdü olmadan, zevkinize uygun doğru parçaları bulmanızı ve keyfini çıkarmanızı kolaylaştırıyoruz.
                    Kolay bir alışveriş deneyiminden, kolay ev içi teslimat ve montaja kadar, evinizde yaşamaya odaklanabilmeniz için uygun fiyatlı, kaliteli ürünleri kendinizi anında evinizde hissetmenize yardımcı oluyoruz.
                    Stil yenilemeye mi ihtiyacınız var?
                    Seni satın alma konusunda koruyoruz !
                    Eşyalarınızı değiştirebilir, satın alabilir veya bize teslim ettirebilirsiniz!
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger className="text-5xl bg-gray-100 px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-500 transition-all duration-300">Hangi şehirleri tüylendiriyorsunuz?</AccordionTrigger>
                <AccordionContent className="text-2xl bg-white px-4 py-4 rounded-lg shadow-lg mt-2">
                    Şu anda aşağıdaki alanlarda evler sağlıyoruz:
                    <ul>
                        <li>İstanbul</li>
                        <li>Ankara</li>
                        <li>İzmir</li>
                        <li>Eskişehir</li>

                    </ul>
                    Mahallenize teslimat yapıp yapmadığımızdan emin değilseniz, lütfen bizimle iletişime geçin, biz de sizin için kontrol edelim!
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
                <AccordionTrigger className="text-5xl bg-gray-100 px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-500 transition-all duration-300">
                    Eşyala taşınma deneyimimi kolaylaştırmaya nasıl yardımcı olur?
                </AccordionTrigger>
                <AccordionContent className="text-2xl bg-white px-4 py-4 rounded-lg shadow-lg mt-2">
                    Kelimenin tam anlamıyla ürün taşıma ve kurulum konusunda endişelenmeyin
                    Siz istediğinizi seçin, biz onu yeni yerinize getirelim, kurulumunu yapıp istediğiniz yere koyalım.
                </AccordionContent>
            </AccordionItem>


            <AccordionItem value="item-5">
                <AccordionTrigger className="text-5xl bg-gray-100 px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-500 transition-all duration-300">Eşyala kredi kontrolü yapıyor mu?</AccordionTrigger>
                <AccordionContent className="text-2xl bg-white px-4 py-4 rounded-lg shadow-lg mt-2">
                    Eşyala müşterilerimizin mümkün olan en iyi deneyimi yaşamasını sağlamak için kredi puanınızı etkilemeyen yumuşak bir kredi kontrolü gerçekleştirir.
                    Kredi puanınızın uygun olmaması durumunda size bilgi verilecek ve tamamı iade edilecektir. Kredi puanınız kriterleri karşılamıyorsa, ürünleri her zaman doğrudan satın alabilirsiniz.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
                <AccordionTrigger className="text-5xl bg-gray-100 px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-500 transition-all duration-300">Dekor, mutfak eşyaları, klima üniteleri ve elektronik ürünlerine abone olabilir miyim?</AccordionTrigger>
                <AccordionContent className="text-2xl bg-white px-4 py-4 rounded-lg shadow-lg mt-2">
                    Şu anda yalnızca mobilya, televizyon ve seçkin dekor  ürünlerinde hizmet sunuyoruz.
                    Hijyen ürünlerinde hesap oluşturup satın alma yapabilirsiniz .
                    Gelecekte ek öğelerden haberdar olmak için bir hesap oluşturun.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
                <AccordionTrigger className="text-5xl bg-gray-100 px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-500 transition-all duration-300">Eşyala'ın işletmelere özel programları veya teklifleri var mı?</AccordionTrigger>
                <AccordionContent className="text-2xl bg-white px-4 py-4 rounded-lg shadow-lg mt-2">
                    Evet, Eşyalan'ın e-ticaret hizmet sağlayıcılarına, emlakçılara ,iç mimarlara ,ticari ofis ve iş verenlere  sosyal haklar ve yer değiştirme hizmetleri için özel teklifleri vardır.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}


export function Subscribe() {
    return (
        <Accordion type="single" collapsible className="flex-col justify-center">
            <AccordionItem value="item-1">
                <AccordionTrigger className="text-5xl bg-gray-100 px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-500 transition-all duration-300">Esyala Aboneliği nasıl çalışır?</AccordionTrigger>
                <AccordionContent className="text-2xl bg-white px-4 py-4 rounded-lg shadow-lg mt-2">
                    İstediğiniz ürünlere abone olmak çok basit!
                    <ol>
                        <li>Ürünü seçin </li>
                        <li>E-posta ve şifre oluşturma işleminizle bir hesap oluşturun (e-posta onayıyla doğrulayın)</li>
                        <li>Siteye göz atın ve beğendiğiniz ürünleri veya odaları sepetinize ekleyerek seçin. (Not: Tüm aboneliklerde aylık minimum üceretlendirme için iletişime geçebilirsiniz)</li>
                        <li>Ürün aboneliğinizi süresini 3 ila 12 ay arasında seçin.</li>
                        <li>Teslimat adresinizi ve ödeme bilgilerinizi ekleyerek ödeme yapın.</li>
                    </ol>
                    Tercih ettiğiniz teslimat tarihini, sipariş tarihinizden itibaren bir hafta kadar erken bir sürede seçebilirsiniz.
                    Teslimatınızdan birkaç gün önce tarih ve varış saati penceresini onaylamak için sizinle iletişime geçeceğiz.
                    Aboneliğinizi değiştirmeniz gerekiyorsa bizimle iletişime geçmeniz yeterli !
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
                <AccordionTrigger className="text-5xl bg-gray-100 px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-500 transition-all duration-300">Abonelik için minimum tutarlar ve koşullar nelerdir?</AccordionTrigger>
                <AccordionContent className="text-2xl bg-white px-4 py-4 rounded-lg shadow-lg mt-2">
                    Eşyala abonelikleri ayda minimum tutar seçmiş olduğunuz ürüne göre değişiklik göstermektedir en az 3 ay sürelidir.
                    Ürünlerimize 3 aydan kısa bir süre için ihtiyacınız varsa onları daha erken alabiliriz ancak yine de ödemeyi en az 3 ay boyunca işleme koymamız gerekir.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
                <AccordionTrigger className="text-5xl bg-gray-100 px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-500 transition-all duration-300">Fatura bilgilerimi nasıl güncellerim?</AccordionTrigger>
                <AccordionContent className="text-2xl bg-white px-4 py-4 rounded-lg shadow-lg mt-2">
                    Üyelik bilgilerinizden faturalarınıza ulaşabilirsiniz
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
                <AccordionTrigger className="text-5xl bg-gray-100 px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-500 transition-all duration-300">Ne zaman ücretlendirileceğim? Aboneliğim resmi olarak ne zaman başlıyor?</AccordionTrigger>
                <AccordionContent className="text-2xl bg-white px-4 py-4 rounded-lg shadow-lg mt-2">
                    Ödeme işleminiz sırasında ilk ayın abonelik ödemesini tahsil edeceğiz.
                    Sonrasında aylık abonelik ücretiniz, teslim tarihinizden bir ay sonra başlamak üzere, ürünlerinizi teslim edildiği ayın aynı günü tahsil edilecektir.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
                <AccordionTrigger className="text-5xl bg-gray-100 px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-500 transition-all duration-300">Aboneliğimi orijinal bitiş tarihinden önce iptal etmem gerekirse ne olur?</AccordionTrigger>
                <AccordionContent className="text-2xl bg-white px-4 py-4 rounded-lg shadow-lg mt-2">
                    Sorun değil. Koşullarınız değişirse ve aboneliğinizi beklenenden daha erken iptal etmeniz gerekirse bizimle iletişime geçmeniz yeterlidir.
                    Son ödemenizi, sözleşmenizin kalan ödemelerinin %75'ini yansıtacak şekilde ayarlayacağız.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
                <AccordionTrigger className="text-5xl bg-gray-100 px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-500 transition-all duration-300">Abonelik süremin sonunda ne olur?</AccordionTrigger>
                <AccordionContent className="text-2xl bg-white px-4 py-4 rounded-lg shadow-lg mt-2">
                    Bundan sonra olacaklar ilk kaydolduğunuz zamanki kadar kolay olmalı! İlk sözleşmenizin sonunda birkaç seçeneğiniz olacak:
                    <ul>
                        <li>Eşyalarınızı satın alabilirsiniz. Her şeyi sonsuza kadar saklamaya hazırsanız, aboneliğinizi perakende satış fiyatından, belirli bir ürün için abonelik ücretlerinde ödemiş olduğunuz tutar düşüldükten sonra satın alabilirsiniz.</li>
                        <li>Eşyalarınızı iade etmek istiyorsanız sorun değil. . Zamanı geldiyse aboneliğinizi sonlandırmanıza yardımcı olacağız. Ekibimiz eşyalarınızı söküp kaldıracaktır (en az 7 gün önceden bildirimde bulunulması kaydıyla). İade servis ücretimiz tarafınızda bildirilecektir.</li>

                    </ul>
                    Ürünlerimiz için  abonelik süresi tamamen bittiyse, teslim almak için sizinle ortak bir tarih belirleyeceğiz.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
                <AccordionTrigger className="text-5xl bg-gray-100 px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-500 transition-all duration-300">Aboneliğimin ortasında ürünlerimi değiştirebilir miyim?</AccordionTrigger>
                <AccordionContent className="text-2xl bg-white px-4 py-4 rounded-lg shadow-lg mt-2">
                    Evet!
                    Tarafınıza bildirmiş olduğumuz değişim ücreti karşılığında istediğiniz kadar ürünü kolayca yenileyebilir ve değiştirebilirsiniz.
                    Aylık yinelenen abonelik maliyetiniz yeni ürün fiyatlandırmasına göre ayarlanacaktır.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
                <AccordionTrigger className="text-5xl bg-gray-100 px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-500 transition-all duration-300">Aboneliğimin sonunda ürünleri satın alabilir miyim ve maliyeti ne kadar olur?</AccordionTrigger>
                <AccordionContent className="text-2xl bg-white px-4 py-4 rounded-lg shadow-lg mt-2">
                    Evet!
                    İistediğiniz eşyaları satın almanızı kolaylaştırıyoruz.
                    Aboneliğinizin sonuna doğru, herhangi bir öğenizi orijinal perakende fiyatından, ilk aboneliğiniz sırasında söz konusu öğe için zaten ödemiş olduğunuz tutar düşülerek satın almayı seçebilirsiniz.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9">
                <AccordionTrigger className="text-5xl bg-gray-100 px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-500 transition-all duration-300">Eşyala hangi ödeme türlerini kabul ediyor?</AccordionTrigger>
                <AccordionContent className="text-2xl bg-white px-4 py-4 rounded-lg shadow-lg mt-2">
                    Tüm önemli kredi ve banka kartlarını kabul ediyoruz.
                    Güvenliğiniz bizim bir numaralı endişemizdir ve esyala, gizlilik ve güvenlikle ilgili tüm bankacılık ve mali düzenlemelere tamamen uygundur.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10">
                <AccordionTrigger className="text-5xl bg-gray-100 px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-500 transition-all duration-300">Eşyala boneliğimin ortasında taşınırsam ne olur?</AccordionTrigger>
                <AccordionContent className="text-2xl bg-white px-4 py-4 rounded-lg shadow-lg mt-2">
                    Yardım etmek için buradayız.
                    Esyala eşyalarınızı (hizmet alanlarımız içerisinde kaldığınız sürece) diğer eşyalarınızla birlikte kendiniz de taşıyabilirsiniz, ancak taşıma sırasında meydana gelebilecek hasarlardan siz sorumlu tutulacaksınız.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-11">
                <AccordionTrigger className="text-5xl bg-gray-100 px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-500 transition-all duration-300">Aboneliğime teslim edilmeden önce ürün ekleyebilir miyim?</AccordionTrigger>
                <AccordionContent className="text-2xl bg-white px-4 py-4 rounded-lg shadow-lg mt-2">
                    Müşteri deneyim ekibimizden <Link href="mailto:info@esyala.com">info@esyala.com</Link> adresine e-posta göndererek, planlanan teslimat tarihinden 48 saat öncesine kadar kesinlikle ürün ekleyebilirsiniz.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-12">
                <AccordionTrigger className="text-5xl bg-gray-100 px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-500 transition-all duration-300">Promosyon kodunu nasıl uygularım?</AccordionTrigger>
                <AccordionContent className="text-2xl bg-white px-4 py-4 rounded-lg shadow-lg mt-2">
                    Ödeme işlemi sırasında promosyon kodları eklenebilir!
                    Masaüstü bilgisayarda “Promosyon kodu ekle” bağlantısını göreceksiniz. Mobil cihazda kodu girmek için "Sipariş Özeti" kutusunu genişletin. Siparişinizi zaten verdiyseniz ve geriye dönük olarak bir promosyon kodu eklemeniz gerekiyorsa lütfen <Link href="mailto:info@esyala.com">info@esyala.com</Link> adresinden müşteri hizmetlerine ulaşın .
                </AccordionContent>
            </AccordionItem>

        </Accordion>
    );
}


export function Product() {
    return (
        <Accordion type="single" collapsible className="flex-col justify-center">
            <AccordionItem value="item-1">
                <AccordionTrigger className="text-5xl bg-gray-100 px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-500 transition-all duration-300">Ürünlerim nereden?</AccordionTrigger>
                <AccordionContent className="text-2xl bg-white px-4 py-4 rounded-lg shadow-lg mt-2">
                    Yüksek kaliteli ve şık mobilyalar sunmak için seçilmiş bir tedarikçi listesiyle çalışıyoruz. Bu sayede mobilyalarınız size hissettirdiği kadar güzel görünür!
                    İş ortaklarımız arasında  zaten tanıdığınız ve sevdiğiniz markalar yer alıyor.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
                <AccordionTrigger className="text-5xl bg-gray-100 px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-500 transition-all duration-300">Ürünlerim her zaman yeni mi?</AccordionTrigger>
                <AccordionContent className="text-2xl bg-white px-4 py-4 rounded-lg shadow-lg mt-2">
                    Tüm ürünler yeni veya yeni gibi teslim edilecektir.
                    Herhangi bir ürün evinize teslim edilmeden önce uzman ekibimiz tarafından çeşitli tamir, temizlik ve kalite kontrollerinden geçer. "Yeni gibi", ahşapta küçük bir çentik veya deride aşınma çizikleri olabileceği anlamına gelir.
                    Beyaz Eşya ve Elektronik ürünlerde yetkili servisler tarafından bakım yapılmaktadır.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
                <AccordionTrigger className="text-5xl bg-gray-100 px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-500 transition-all duration-300">Ürünlerimiz çöplüklere mi gidiyor?</AccordionTrigger>
                <AccordionContent className="text-2xl bg-white px-4 py-4 rounded-lg shadow-lg mt-2">
                    Hayır, eşyala'ın kurulma nedenlerinden biri de bu!
                    Sürdürülebilirlik bizim için çok önemlidir, bu nedenle yalnızca uzun süre dayanacak şekilde üretilmiş kaliteli ürünler sunuyoruz.
                    Denetim, temizlik ve yenileme sürecimiz sonrasında bize geri gelen  "yeni gibi" standartlarımızı karşılamayan her türlü mobilya, sayıları giderek artan hayır kurumlarına bağışlanıyor.
                    Sunduğumuz öğelerin güvenli bir şekilde yeniden kullanılamayan küçük bir kısmı için mümkün olduğunca geri dönüşüm veya diğer yeniden kullanım tesisleriyle çalışıyoruz.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
                <AccordionTrigger className="text-5xl bg-gray-100 px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-500 transition-all duration-300">Abone olduğum ürünlere ne kadar dikkat etmeliyim?</AccordionTrigger>
                <AccordionContent className="text-2xl bg-white px-4 py-4 rounded-lg shadow-lg mt-2">
                    Ürünlerimiz kendinizinmiş gibi davranın!
                    Üzerinde yiyin, üzerinde uyuyun ve tüylü arkadaşlarınızın kullanmasına izin verin.
                    Ona saygı duyduğunuzu takdir ediyoruz (tıpkı ona sahip olsaydınız yapacağınız gibi), ancak normal aşınma ve yıpranma konusunda endişelenmeyin.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
                <AccordionTrigger className="text-5xl bg-gray-100 px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-500 transition-all duration-300">Bir eşyayı yanlışlıkla kırarsam ya da lekelersem ne olur?</AccordionTrigger>
                <AccordionContent className="text-2xl bg-white px-4 py-4 rounded-lg shadow-lg mt-2">
                    Stres yapmayın, hayatın gerçekleştiğini biliyoruz!
                    Ürünlerimizde ticari sınıf ve yaşamak için yapılmış ürünler .
                    Aboneliğinizin sonunda ürünlerimiz geri aldığımızda, mobilyaların yeni kadar iyi görünmesini sağlamak için genellikle lekelerin çoğunu çıkarabiliriz.
                    Kapsamlı lekeler veya hasarlar için lütfen bizimle iletişime geçin ,böylece sonraki adımı değerlendirebiliriz.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
                <AccordionTrigger className="text-5xl bg-gray-100 px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-500 transition-all duration-300">Ürünlerimiz evcil hayvan dostu mu?</AccordionTrigger>
                <AccordionContent className="text-2xl bg-white px-4 py-4 rounded-lg shadow-lg mt-2">
                    İki ve dört ayaklı arkadaşlarınız da dahil olmak üzere tüm ailenizin yeni döşenmiş evinizden keyif almasını istiyoruz.
                </AccordionContent>
            </AccordionItem>




        </Accordion>
    );
}


export function Shipping() {
    return (
        <Accordion type="single" collapsible className="flex-col justify-center">

            <AccordionItem value="item-1">
                <AccordionTrigger className="text-5xl bg-gray-100 px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-500 transition-all duration-300">Teslim maliyeti ne kadar?</AccordionTrigger>
                <AccordionContent className="text-2xl bg-white px-4 py-4 rounded-lg shadow-lg mt-2">
                    Ürünlerinizin ilk teslimatı ücretsizdir ve seçtiğiniz odaya/odalara montajı ve ambalajının çıkarılmasını içerir.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
                <AccordionTrigger className="text-5xl bg-gray-100 px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-500 transition-all duration-300">Teslimat deneyimi nasıl?</AccordionTrigger>
                <AccordionContent className="text-2xl bg-white px-4 py-4 rounded-lg shadow-lg mt-2">
                    Teslimat sürecini mümkün olduğunca sorunsuz hale getirmek istiyoruz.
                    Ödeme sırasında ideal teslimat tarihinizi seçmeniz yeterlidir.
                    Tarihi ve varış penceresini onaylamak için teslimatınızdan birkaç gün önce sizinle iletişime geçeceğiz.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
                <AccordionTrigger className="text-5xl bg-gray-100 px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-500 transition-all duration-300">Ürünlerimi ne kadar sürede teslim alırım?</AccordionTrigger>
                <AccordionContent className="text-2xl bg-white px-4 py-4 rounded-lg shadow-lg mt-2">
                    Hızlı çalışıyoruz!
                    Teslimat yaklaşık 7 gün sürer ve pazartesiden cumartesiye teslimat yapıyoruz.
                    Coğrafi olarak rota çizerken, planlama ekibimiz teslimatınızdan 3 gün önce sizinle iletişime geçerek bir zaman aralığını onaylayacak ve böylece gününüzü buna göre planlayabilirsiniz.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
                <AccordionTrigger className="text-5xl bg-gray-100 px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-500 transition-all duration-300">Teslimata hazırlanmak için ne yapmam gerekiyor?</AccordionTrigger>
                <AccordionContent className="text-2xl bg-white px-4 py-4 rounded-lg shadow-lg mt-2">
                    Hızlı ve güvenli bir şekilde girip çıkabileceğimizden emin olmak istiyoruz.
                    Lütfen evinizdeki bir yürüyüş yolunu temizleyin ve ekibin ürünlerin montajı üzerinde çalışması için yer olduğundan emin olun.
                    Binanız için bir yükleme iskelesi veya yük asansörü varsa, Esyala teslimat ekibinin ihtiyaç halinde erişim sağlayabilmesi için mülk yöneticinizle düzenlemeler yaptığınızdan emin olun.
                    Lütfen öğeleri monte edilmemiş halde bırakamayacağımızı unutmayın.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
                <AccordionTrigger className="text-5xl bg-gray-100 px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-500 transition-all duration-300">Teslimat için evde olmam gerekiyor mu?</AccordionTrigger>
                <AccordionContent className="text-2xl bg-white px-4 py-4 rounded-lg shadow-lg mt-2">
                    Teslimatı kabul etmek ve seçtiğiniz ürünlerden memnun olduğunuzdan emin olmak için evde olmanız gerekir.
                    Ekip, evinize teslim edilenlerin listesini içeren bir onay belgesi imzalamanızı isteyecektir.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
                <AccordionTrigger className="text-5xl bg-gray-100 px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-500 transition-all duration-300">Eşyala eski ürünlerimi alıyor mu?</AccordionTrigger>
                <AccordionContent className="text-2xl bg-white px-4 py-4 rounded-lg shadow-lg mt-2">
                    Yalnızca sizin onayınız ve evrak karşılığında vermiş olduğunuz sürdürülebilir ürünleri alabiliyoruz; ancak almış olduğumuz ürünlerde önceliğimiz bağış için yerel hayır kurumlarına ürünlerin ulaştırılması.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
                <AccordionTrigger className="text-5xl bg-gray-100 px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-500 transition-all duration-300">Ürünlerimin bir kısmını veya tamamını elime ulaştığında beğenmezsem ne olur?</AccordionTrigger>
                <AccordionContent className="text-2xl bg-white px-4 py-4 rounded-lg shadow-lg mt-2">
                    Evinizi sevmenizi istiyoruz; bu nedenle, ihtiyaçlarınıza uygun olmayan bir şey varsa, 3 günlük ödemesiz süreniz içinde (teslimatın hemen ardından) müşteri deneyim ekibimizde iletmeniz yeterli olacaktır .
                    Daha iyi çalışabileceğini düşündüğünüz bir şey varsa, o öğeyi mümkün olan en kısa sürede sizin için değiştirmekten memnuniyet duyarız.
                </AccordionContent>
            </AccordionItem>

        </Accordion>
    )
}


export function Retail() {
    return (
        <Accordion type="single" collapsible className="flex-col justify-center">

            <AccordionItem value="item-1">
                <AccordionTrigger className="text-5xl bg-gray-100 px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-500 transition-all duration-300">Aboneliğimin sonunda mobilyaları satın alabilir miyim?</AccordionTrigger>
                <AccordionContent className="text-2xl bg-white px-4 py-4 rounded-lg shadow-lg mt-2">
                Evet! 
                                    İstediğiniz eşyaları satın almanızı kolaylaştırıyoruz. 
                                    Aboneliğinizin sonuna doğru, herhangi bir öğenizi orijinal perakende fiyatından, ilk aboneliğiniz sırasında söz konusu öğe için zaten ödemiş olduğunuz tutar düşülerek satın almayı seçebilirsiniz. 
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
                <AccordionTrigger className="text-5xl bg-gray-100 px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-500 transition-all duration-300">Ürünlerin sahibi olmadan önce ne kadar ödeme yapmam gerekecek?</AccordionTrigger>
                <AccordionContent className="text-2xl bg-white px-4 py-4 rounded-lg shadow-lg mt-2">
                Genel olarak, en düşük aylık ödeme oranıyla perakende satış değerine ulaşmak 24 ay sürecektir (promosyon indirimleri ve tavsiye kredileri perakende satın alma maliyetine uygulanmaz). 
                                    Ancak ürün bedelinin tamamını ödemek için beklemeniz gerekmez. 
                                    Aboneliğinizin sonuna doğru, herhangi bir öğenizi mevcut perakende satış fiyatından aboneliğiniz boyunca ödediğiniz tutar düşülerek satın almayı seçebilirsiniz.
                                    Abonelik öğelerinizden herhangi birini elinizde tutmayı seçerseniz, öğenin tamamı ödenene kadar her aylık ödeme perakende fiyatına uygulanır. 
                                    Abonelik ne kadar kısa olursa (aylık ödeme ne kadar yüksek olursa), ürün o kadar hızlı satın alınabilir. 
                                    Abonelik ne kadar uzun olursa (aylık ödeme ne kadar düşük olursa), ürünün satın alınması da o kadar uzun sürer.
                                    Bu otomatik olarak gerçekleşmediğinden parçaları satın almak için Müşteri Desteği ile iletişime geçmeniz gerektiğini lütfen unutmayın. 
                                    Ürün satın alındıktan sonra artık teslim alma, takas veya taşıma dahil abonelik hizmetlerimiz için uygun değildir. 
                                    Satın alınan tüm satışlar nihaidir.
                </AccordionContent>
            </AccordionItem>
          
            <AccordionItem value="item-3">
                <AccordionTrigger className="text-5xl bg-gray-100 px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-500 transition-all duration-300">Satın alma fiyatı nasıl hesaplanır?</AccordionTrigger>
                <AccordionContent className="text-2xl bg-white px-4 py-4 rounded-lg shadow-lg mt-2">
                Satın alma maliyetiniz, geçerli perakende satış fiyatından aboneliğiniz boyunca söz konusu ürün için ödediğiniz tutarın çıkarılmasıyla elde edilen tutardır (promosyon indirimleri ve tavsiye kredileri perakende satın alma maliyetine uygulanmaz).
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
                <AccordionTrigger className="text-5xl bg-gray-100 px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-500 transition-all duration-300">Satın alma abonelik süresi tamamlandıktan sonra ürünlerimin otomatik olarak sahibi olacak mıyım?</AccordionTrigger>
                <AccordionContent className="text-2xl bg-white px-4 py-4 rounded-lg shadow-lg mt-2">
                Hayır. 
                                    Öncelikle bir kiralama şirketi olduğumuz göz önüne alındığında, bu otomatik olarak gerçekleşmediğinden parçaları satın almak için Müşteri Desteği ile iletişime geçmelisiniz. 
                                    Ürün satın alındıktan sonra artık teslim alma, takas veya taşıma dahil abonelik hizmetlerimiz için uygun değildir. 
                                    Satın alınan tüm satışlar nihaidir.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
                <AccordionTrigger className="text-5xl bg-gray-100 px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-500 transition-all duration-300">Ürünleri aldıktan sonra fikrimi değiştirirsem gelip alır mısın?</AccordionTrigger>
                <AccordionContent className="text-2xl bg-white px-4 py-4 rounded-lg shadow-lg mt-2">
                Hayır. 
                                    Ürün satın alındıktan sonra artık teslim alma, takas veya taşıma dahil abonelik hizmetlerimiz için uygun değildir. 
                                    Satın alınan tüm satışlar nihaidir.
                </AccordionContent>
            </AccordionItem>

        </Accordion>
    )
}


export function Sales() {
    return (
        <Accordion type="single" collapsible className="flex-col justify-center">

            <AccordionItem value="item-1">
                <AccordionTrigger className="text-5xl bg-gray-100 px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-500 transition-all duration-300">Satın aldığım ürünleri değiştirebilir miyim?</AccordionTrigger>
                <AccordionContent className="text-2xl bg-white px-4 py-4 rounded-lg shadow-lg mt-2">
                Herhangi bir nedenle ürünlerinizi Esyala'dan farklı bir parçayla değiştirmek isterseniz, orijinal teslimattan itibaren 30 gün içinde bunu yapabilirsiniz. 
                                    Ödemiş olduğunuz  tutarında bir ücret olsa da, Esyala orijinal ödemenizi ürünün maliyet farkına göre ayarlayacaktır ve biz de geri gelip parçayı sizin için değiştireceğiz.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
                <AccordionTrigger className="text-5xl bg-gray-100 px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-500 transition-all duration-300">Ürünlerimi peşin alırsam iade politikası nedir?</AccordionTrigger>
                <AccordionContent className="text-2xl bg-white px-4 py-4 rounded-lg shadow-lg mt-2">
                Ürün satın almanın sıkıcı bir süreç olabileceğini biliyoruz ve sonsuza kadar kendinizi rahat hissetmenizi istiyoruz! 
                                    Herhangi bir nedenle ürünlerinizden memnun kalmazsanız, satın alma işleminiz için tam bir geri ödeme sunuyoruz. İadenin planlanması sırasında kayıtlı karta işlenecek …. tutarında bir iade ücreti vardır. 
                                    Bazı sınırlamalar geçerli olabilir. Daha fazla bilgi için lütfen info@esyala.com adresinden bize ulaşın.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
                <AccordionTrigger className="text-5xl bg-gray-100 px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-500 transition-all duration-300">Bir ürünü peşin olarak alırsam yeni mi yoksa kullanılmış mı olacak?</AccordionTrigger>
                <AccordionContent className="text-2xl bg-white px-4 py-4 rounded-lg shadow-lg mt-2">
                Sürdürülebilir misyonumuzun bir parçası olarak tüm ürünlerimiz yeni veya yeni gibi durumda! 
                                    Ekibimiz, yeni gibi olan tüm eşyaların yenilenmesi, temizlenmesi ve rötuşlanması gibi ayrıntılı bir süreçten geçer. 
                                    Senin için yeni olacaklar!
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
                <AccordionTrigger className="text-5xl bg-gray-100 px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-500 transition-all duration-300">Kiralamak ve sahip olmak arasındaki fark nedir?</AccordionTrigger>
                <AccordionContent className="text-2xl bg-white px-4 py-4 rounded-lg shadow-lg mt-2">
                Uzun vadeli "sonsuza kadar" ürün arıyorsanız ancak tarzınızın ne olduğundan emin değilseniz veya mevcut evinizde uzun vadeli kalacaksanız kiralama, sevdiğiniz eşyalara uzun süre beklemeden sahip olmanın harika bir yoludur. Vadeli taahhüt. Aboneliğinizin sonunda ürünlerinizi satın alma seçeneğimiz var! 
                                    Uzun vadede bu işin içinde olduklarını bilen ve hayallerindeki ürünlere bağlanmaya hazır olan kişiler için satın alma olanağı mevcuttur.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
                <AccordionTrigger className="text-5xl bg-gray-100 px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-500 transition-all duration-300">Bilmeniz gereken başka ayrıntılar var mı?</AccordionTrigger>
                <AccordionContent className="text-2xl bg-white px-4 py-4 rounded-lg shadow-lg mt-2">
                Doğrudan satın alınan ürünler, teslimat tarihinden itibaren 14 gün önceden bildirimde bulunularak tam para iadesi almaya hak kazanır. 
                                    Doğrudan satın alınan ürünler, (teslimat tarihinden itibaren) 14 gün önceden bildirimde bulunarak başka bir doğrudan satın alınan ürünüyle değiştirilebilir. 
                                    Değişim durumunda ücret farkı kayıtlı karta göre ayarlanacaktır. 
                                    İade edilen ürün(ler) orijinal durumda olmalıdır ve esyala'ın hatası olmaksızın ürün(ler)de hasar meydana gelmişse, geri ödemede indirime tabi olmalıdır. 
                                    Son satış olarak işaretlenen ürünler iade veya değişime uygun değildir. 
                                    Geri ödemelerin işleme koyulması 2 hafta kadar sürebilir. 
                                    Ürününüzün teslimat sırasında hasar görmesi ihtimaline karşı esyala, en iyi çözümü bulmak için sizinle birlikte ayrı ayrı çalışacaktır.
                </AccordionContent>
            </AccordionItem>


        </Accordion>
    )
}
