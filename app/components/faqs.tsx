import * as React from "react";
import Box from "@mui/material/Box";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

function TabPanel({ children, value, index }) {
    return (
        <div role="tabpanel" hidden={value !== index}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

export function GeneralViewAccordion() {
    const items = [
        {
            title: "Eşyala Nedir?",
            content: `Eşyala, eviniz için ihtiyacınız olan mobilya ve elektronik tüm ürünleri (ve dekoru!)
                      ihtiyaç duyduğunuz süre boyunca kolayca almanızı sağlayan aylık bir abonelik hizmetidir.
                      Size uygun düşük bir aylık ücret karşılığında evinizin ihtiyacı olan parçalara abone olabilir
                      veya satın alabilirsiniz.`
        },
        {
            title: "Eşyala.com abone olmak?",
            content: `Evinizi taşımak ve döşemek bunaltıcı, zaman alıcı ve stresli olabilir.
                      Eviniz için satın alma taahhüdü olmadan, zevkinize uygun doğru parçaları bulmanızı ve keyfini çıkarmanızı kolaylaştırıyoruz.
                      Kolay bir alışveriş deneyiminden, kolay ev içi teslimat ve montaja kadar, evinizde yaşamaya odaklanabilmeniz için uygun fiyatlı, kaliteli ürünleri
                      kendinizi anında evinizde hissetmenize yardımcı oluyoruz.
                      Stil yenilemeye mi ihtiyacınız var? Seni satın alma konusunda koruyoruz!
                      Eşyalarınızı değiştirebilir, satın alabilir veya bize teslim ettirebilirsiniz!`
        },
        {
            title: "Hangi şehirleri tüylendiriyorsunuz?",
            content: `Şu anda aşağıdaki alanlarda evler sağlıyoruz
                      
                          İstanbul
                          Ankara
                          İzmir
                          Eskişehir
                   
                      Mahallenize teslimat yapıp yapmadığımızdan emin değilseniz, lütfen bizimle iletişime geçin, biz de sizin için kontrol edelim!`
        },
        {
            title: "Eşyala taşınma deneyimimi kolaylaştırmaya nasıl yardımcı olur?",
            content: `Kelimenin tam anlamıyla ürün taşıma ve kurulum konusunda endişelenmeyin.
                      Siz istediğinizi seçin, biz onu yeni yerinize getirelim, kurulumunu yapıp istediğiniz yere koyalım.`
        },
        {
            title: "Eşyala kredi kontrolü yapıyor mu?",
            content: `Eşyala müşterilerimizin mümkün olan en iyi deneyimi yaşamasını sağlamak için kredi puanınızı etkilemeyen yumuşak bir kredi kontrolü gerçekleştirir.
                      Kredi puanınızın uygun olmaması durumunda size bilgi verilecek ve tamamı iade edilecektir. Kredi puanınız kriterleri karşılamıyorsa, ürünleri her zaman doğrudan satın alabilirsiniz.`
        },
        {
            title: "Dekor, mutfak eşyaları, klima üniteleri ve elektronik ürünlerine abone olabilir miyim?",
            content: `Şu anda yalnızca mobilya, televizyon ve seçkin dekor ürünlerinde hizmet sunuyoruz.
                      Hijyen ürünlerinde hesap oluşturup satın alma yapabilirsiniz.
                      Gelecekte ek öğelerden haberdar olmak için bir hesap oluşturun.`
        },
        {
            title: "Eşyala'ın işletmelere özel programları veya teklifleri var mı?",
            content: `Evet, Eşyalan'ın e-ticaret hizmet sağlayıcılarına, emlakçılara, iç mimarlara, ticari ofis ve iş verenlere
                      sosyal haklar ve yer değiştirme hizmetleri için özel teklifleri vardır.`
        }
    ];

    return (
        <>
            {items.map((item, index) => (
    <Accordion key={index}>
        <AccordionSummary
            expandIcon={<ArrowDownwardIcon />}
            aria-controls={`panel${index + 1}-content`}
            id={`panel${index + 1}-header`}
            sx={{
                fontSize: "1.25rem", 
                fontWeight: "bold",
            }}
        >
            <Typography sx={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                {item.title}
            </Typography>
        </AccordionSummary>
        <AccordionDetails
            sx={{
                fontSize: "5",
                lineHeight: 5, 
            }}
        >
            <Typography
                sx={{
                    fontSize: "5",
                    color: "text.secondary", 
                }}
                dangerouslySetInnerHTML={{ __html: item.content }}
            />
        </AccordionDetails>
    </Accordion>
))}

        </>
    );
}

export function Subscribe() {
    const items = [
        {
            title: "Eşyala Aboneliği nasıl çalışır?",
            content: `İstediğiniz ürünlere abone olmak çok basit!
                    <ol>
                        <li>Ürünü seçin </li>
                        <li>E-posta ve şifre oluşturma işleminizle bir hesap oluşturun (e-posta onayıyla doğrulayın)</li>
                        <li>Siteye göz atın ve beğendiğiniz ürünleri veya odaları sepetinize ekleyerek seçin. (Not: Tüm aboneliklerde aylık minimum üceretlendirme için iletişime geçebilirsiniz)</li>
                        <li>Ürün aboneliğinizi süresini 3 ila 12 ay arasında seçin.</li>
                        <li>Teslimat adresinizi ve ödeme bilgilerinizi ekleyerek ödeme yapın.</li>
                    </ol>
                    Tercih ettiğiniz teslimat tarihini, sipariş tarihinizden itibaren bir hafta kadar erken bir sürede seçebilirsiniz.
                    Teslimatınızdan birkaç gün önce tarih ve varış saati penceresini onaylamak için sizinle iletişime geçeceğiz.
                    Aboneliğinizi değiştirmeniz gerekiyorsa bizimle iletişime geçmeniz yeterli !`
        },
        {
            title: "Abonelik için minimum tutarlar ve koşullar nelerdir?",
            content: `Eşyala abonelikleri ayda minimum tutar seçmiş olduğunuz ürüne göre değişiklik göstermektedir en az 3 ay sürelidir.
                    Ürünlerimize 3 aydan kısa bir süre için ihtiyacınız varsa onları daha erken alabiliriz ancak yine de ödemeyi en az 3 ay boyunca işleme koymamız gerekir.`
        },
        {
            title: "Fatura bilgilerimi nasıl güncellerim?",
            content: `Üyelik bilgilerinizden faturalarınıza ulaşabilirsiniz`
        },
        {
            title: "Ne zaman ücretlendirileceğim? Aboneliğim resmi olarak ne zaman başlıyor?",
            content: `Ödeme işleminiz sırasında ilk ayın abonelik ödemesini tahsil edeceğiz.
                    Sonrasında aylık abonelik ücretiniz, teslim tarihinizden bir ay sonra başlamak üzere, ürünlerinizi teslim edildiği ayın aynı günü tahsil edilecektir.`
        },
        {
            title: "Aboneliğimi orijinal bitiş tarihinden önce iptal etmem gerekirse ne olur?",
            content: `Sorun değil. Koşullarınız değişirse ve aboneliğinizi beklenenden daha erken iptal etmeniz gerekirse bizimle iletişime geçmeniz yeterlidir.
                    Son ödemenizi, sözleşmenizin kalan ödemelerinin %75'ini yansıtacak şekilde ayarlayacağız.`
        },
        {
            title: "Abonelik süremin sonunda ne olur?",
            content: `
                Bundan sonra olacaklar ilk kaydolduğunuz zamanki kadar kolay olmalı! İlk sözleşmenizin sonunda birkaç seçeneğiniz olacak:
                <ul>
                    <li>Eşyalarınızı satın alabilirsiniz. Her şeyi sonsuza kadar saklamaya hazırsanız, aboneliğinizi perakende satış fiyatından, belirli bir ürün için abonelik ücretlerinde ödemiş olduğunuz tutar düşüldükten sonra satın alabilirsiniz.</li>
                    <li>Eşyalarınızı iade etmek istiyorsanız sorun değil. Zamanı geldiyse aboneliğinizi sonlandırmanıza yardımcı olacağız. Ekibimiz eşyalarınızı söküp kaldıracaktır (en az 7 gün önceden bildirimde bulunulması kaydıyla). İade servis ücretimiz tarafınızda bildirilecektir.</li>
                </ul>
                Ürünlerimiz için abonelik süresi tamamen bittiyse, teslim almak için sizinle ortak bir tarih belirleyeceğiz.
            `,
        },
        {
            title: "Aboneliğimin ortasında ürünlerimi değiştirebilir miyim?",
            content: `
                Evet!
                Tarafınıza bildirmiş olduğumuz değişim ücreti karşılığında istediğiniz kadar ürünü kolayca yenileyebilir ve değiştirebilirsiniz.
                Aylık yinelenen abonelik maliyetiniz yeni ürün fiyatlandırmasına göre ayarlanacaktır.
            `,
        },
        {
            title: "Aboneliğimin sonunda ürünleri satın alabilir miyim ve maliyeti ne kadar olur?",
            content: `
                Evet!
                İstediğiniz eşyaları satın almanızı kolaylaştırıyoruz.
                Aboneliğinizin sonuna doğru, herhangi bir öğenizi orijinal perakende fiyatından, ilk aboneliğiniz sırasında söz konusu öğe için zaten ödemiş olduğunuz tutar düşülerek satın almayı seçebilirsiniz.
            `,
        },
        {
            title: "Eşyala hangi ödeme türlerini kabul ediyor?",
            content: `
                Tüm önemli kredi ve banka kartlarını kabul ediyoruz.
                Güvenliğiniz bizim bir numaralı endişemizdir ve esyala, gizlilik ve güvenlikle ilgili tüm bankacılık ve mali düzenlemelere tamamen uygundur.
            `,
        },
        {
            title: "Eşyala aboneliğimin ortasında taşınırsam ne olur?",
            content: `
                Yardım etmek için buradayız.
                Esyala eşyalarınızı (hizmet alanlarımız içerisinde kaldığınız sürece) diğer eşyalarınızla birlikte kendiniz de taşıyabilirsiniz, ancak taşıma sırasında meydana gelebilecek hasarlardan siz sorumlu tutulacaksınız.
            `,
        },
        {
            title: "Aboneliğime teslim edilmeden önce ürün ekleyebilir miyim?",
            content: `
                Müşteri deneyim ekibimizden <Link href="mailto:info@esyala.com">info@esyala.com</Link> adresine e-posta göndererek, planlanan teslimat tarihinden 48 saat öncesine kadar kesinlikle ürün ekleyebilirsiniz.
            `,
        },
        {
            title: "Promosyon kodunu nasıl uygularım?",
            content: `
                Ödeme işlemi sırasında promosyon kodları eklenebilir!
                Masaüstü bilgisayarda “Promosyon kodu ekle” bağlantısını göreceksiniz. Mobil cihazda kodu girmek için "Sipariş Özeti" kutusunu genişletin. Siparişinizi zaten verdiyseniz ve geriye dönük olarak bir promosyon kodu eklemeniz gerekiyorsa lütfen <Link href="mailto:info@esyala.com">info@esyala.com</Link> adresinden müşteri hizmetlerine ulaşın.
            `,
        },
        {
            title: "Eşyala'ın işletmelere özel programları veya teklifleri var mı?",
            content: `
                Evet, Eşyalan'ın e-ticaret hizmet sağlayıcılarına, emlakçılara, iç mimarlara, ticari ofis ve iş verenlere
                sosyal haklar ve yer değiştirme hizmetleri için özel teklifleri vardır.
            `,
        },
    ];

    return (
        <>
            {items.map((item, index) => (
                <Accordion key={index}>
                    <AccordionSummary
                        expandIcon={<ArrowDownwardIcon />}
                        aria-controls={`panel${index + 1}-content`}
                        id={`panel${index + 1}-header`}
                        sx={{
                            fontSize: "1.25rem", // Adjust font size for accordion summary
                            fontWeight: "bold", // Make the title bold
                        }}
                    >
                        <Typography sx={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                            {item.title}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails
                        sx={{
                            fontSize: "1.75rem", // Use a valid font size (e.g., "1rem")
                            lineHeight: "1.5", // Adjust line height for better readability
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "2.5rem", // Set font size for content text
                                color: "text.secondary", // You can change the color if needed
                            }}
                            dangerouslySetInnerHTML={{ __html: item.content }}
                        />
                    </AccordionDetails>
                </Accordion>
            ))}
        </>
    );
    
    
}

export function Product() {
    const items = [
        {
            title: "Ürünlerim nereden?",
            content: `
                Yüksek kaliteli ve şık mobilyalar sunmak için seçilmiş bir tedarikçi listesiyle çalışıyoruz. Bu sayede mobilyalarınız size hissettirdiği kadar güzel görünür! 
                İş ortaklarımız arasında zaten tanıdığınız ve sevdiğiniz markalar yer alıyor.
            `,
        },
        {
            title: "Ürünlerim her zaman yeni mi?",
            content: `
                Tüm ürünler yeni veya yeni gibi teslim edilecektir. Herhangi bir ürün evinize teslim edilmeden önce uzman ekibimiz tarafından çeşitli tamir, temizlik ve kalite kontrollerinden geçer. 
                "Yeni gibi", ahşapta küçük bir çentik veya deride aşınma çizikleri olabileceği anlamına gelir. Beyaz Eşya ve Elektronik ürünlerde yetkili servisler tarafından bakım yapılmaktadır.
            `,
        },
        {
            title: "Ürünlerimiz çöplüklere mi gidiyor?",
            content: `
                Hayır, Eşyala'ın kurulma nedenlerinden biri de bu! Sürdürülebilirlik bizim için çok önemlidir, bu nedenle yalnızca uzun süre dayanacak şekilde üretilmiş kaliteli ürünler sunuyoruz. 
                Denetim, temizlik ve yenileme sürecimiz sonrasında bize geri gelen "yeni gibi" standartlarımızı karşılamayan her türlü mobilya, sayıları giderek artan hayır kurumlarına bağışlanıyor. 
                Sunduğumuz öğelerin güvenli bir şekilde yeniden kullanılamayan küçük bir kısmı için mümkün olduğunca geri dönüşüm veya diğer yeniden kullanım tesisleriyle çalışıyoruz.
            `,
        },
        {
            title: "Abone olduğum ürünlere ne kadar dikkat etmeliyim?",
            content: `
                Ürünlerimiz kendinizinmiş gibi davranın! Üzerinde yiyin, üzerinde uyuyun ve tüylü arkadaşlarınızın kullanmasına izin verin. Ona saygı duyduğunuzu takdir ediyoruz 
                (tıpkı ona sahip olsaydınız yapacağınız gibi), ancak normal aşınma ve yıpranma konusunda endişelenmeyin.
            `,
        },
        {
            title: "Bir eşyayı yanlışlıkla kırarsam ya da lekelersem ne olur?",
            content: `
                Stres yapmayın, hayatın gerçekleştiğini biliyoruz! Ürünlerimizde ticari sınıf ve yaşamak için yapılmış ürünler. 
                Aboneliğinizin sonunda ürünlerimiz geri aldığımızda, mobilyaların yeni kadar iyi görünmesini sağlamak için genellikle lekelerin çoğunu çıkarabiliriz. 
                Kapsamlı lekeler veya hasarlar için lütfen bizimle iletişime geçin, böylece sonraki adımı değerlendirebiliriz.
            `,
        },
        {
            title: "Ürünlerimiz evcil hayvan dostu mu?",
            content: `
                İki ve dört ayaklı arkadaşlarınız da dahil olmak üzere tüm ailenizin yeni döşenmiş evinizden keyif almasını istiyoruz.
            `,
        }
    ];

    return (
        <>
            {items.map((item, index) => (
                <Accordion key={index}>
                    <AccordionSummary
                        expandIcon={<ArrowDownwardIcon />}
                        aria-controls={`panel${index + 1}-content`}
                        id={`panel${index + 1}-header`}
                        sx={{
                            fontSize: "1.25rem", // Adjust font size for accordion summary
                            fontWeight: "bold", // Make the title bold
                        }}
                    >
                        <Typography sx={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                            {item.title}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails
                        sx={{
                            fontSize: "1.75rem", // Use a valid font size (e.g., "1rem")
                            lineHeight: "1.5", // Adjust line height for better readability
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "2.5rem", // Set font size for content text
                                color: "text.secondary", // You can change the color if needed
                            }}
                            dangerouslySetInnerHTML={{ __html: item.content }}
                        />
                    </AccordionDetails>
                </Accordion>
            ))}
        </>
    );
    
}

export function Shipping() {
    const items = [
        {
            title: "Teslim maliyeti ne kadar?",
            content: `
                Ürünlerinizin ilk teslimatı ücretsizdir ve seçtiğiniz odaya/odalara montajı ve ambalajının çıkarılmasını içerir.
            `,
        },
        {
            title: "Teslimat deneyimi nasıl?",
            content: `
                Teslimat sürecini mümkün olduğunca sorunsuz hale getirmek istiyoruz.
                Ödeme sırasında ideal teslimat tarihinizi seçmeniz yeterlidir.
                Tarihi ve varış penceresini onaylamak için teslimatınızdan birkaç gün önce sizinle iletişime geçeceğiz.
            `,
        },
        {
            title: "Ürünlerimi ne kadar sürede teslim alırım?",
            content: `
                Hızlı çalışıyoruz!
                Teslimat yaklaşık 7 gün sürer ve pazartesiden cumartesiye teslimat yapıyoruz.
                Coğrafi olarak rota çizerken, planlama ekibimiz teslimatınızdan 3 gün önce sizinle iletişime geçerek bir zaman aralığını onaylayacak ve böylece gününüzü buna göre planlayabilirsiniz.
            `,
        },
        {
            title: "Teslimata hazırlanmak için ne yapmam gerekiyor?",
            content: `
                Hızlı ve güvenli bir şekilde girip çıkabileceğimizden emin olmak istiyoruz.
                Lütfen evinizdeki bir yürüyüş yolunu temizleyin ve ekibin ürünlerin montajı üzerinde çalışması için yer olduğundan emin olun.
                Binanız için bir yükleme iskelesi veya yük asansörü varsa, Esyala teslimat ekibinin ihtiyaç halinde erişim sağlayabilmesi için mülk yöneticinizle düzenlemeler yaptığınızdan emin olun.
                Lütfen öğeleri monte edilmemiş halde bırakamayacağımızı unutmayın.
            `,
        },
        {
            title: "Teslimat için evde olmam gerekiyor mu?",
            content: `
                Teslimatı kabul etmek ve seçtiğiniz ürünlerden memnun olduğunuzdan emin olmak için evde olmanız gerekir.
                Ekip, evinize teslim edilenlerin listesini içeren bir onay belgesi imzalamanızı isteyecektir.
            `,
        },
        {
            title: "Eşyala eski ürünlerimi alıyor mu?",
            content: `
                Yalnızca sizin onayınız ve evrak karşılığında vermiş olduğunuz sürdürülebilir ürünleri alabiliyoruz; ancak almış olduğumuz ürünlerde önceliğimiz bağış için yerel hayır kurumlarına ürünlerin ulaştırılması.
            `,
        },
        {
            title: "Ürünlerimin bir kısmını veya tamamını elime ulaştığında beğenmezsem ne olur?",
            content: `
                Evinizi sevmenizi istiyoruz; bu nedenle, ihtiyaçlarınıza uygun olmayan bir şey varsa, 3 günlük ödemesiz süreniz içinde (teslimatın hemen ardından) müşteri deneyim ekibimizde iletmeniz yeterli olacaktır.
                Daha iyi çalışabileceğini düşündüğünüz bir şey varsa, o öğeyi mümkün olan en kısa sürede sizin için değiştirmekten memnuniyet duyarız.
            `,
        }
    ];

    return (
        <>
            {items.map((item, index) => (
                <Accordion key={index}>
                    <AccordionSummary
                        expandIcon={<ArrowDownwardIcon />}
                        aria-controls={`panel${index + 1}-content`}
                        id={`panel${index + 1}-header`}
                        sx={{
                            fontSize: "1.25rem", // Adjust font size for accordion summary
                            fontWeight: "bold", // Make the title bold
                        }}
                    >
                        <Typography sx={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                            {item.title}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails
                        sx={{
                            fontSize: "1.75rem", // Use a valid font size (e.g., "1rem")
                            lineHeight: "1.5", // Adjust line height for better readability
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "2.5rem", // Set font size for content text
                                color: "text.secondary", // You can change the color if needed
                            }}
                            dangerouslySetInnerHTML={{ __html: item.content }}
                        />
                    </AccordionDetails>
                </Accordion>
            ))}
        </>
    );
    
    
}

export function Retail() {
    
    const items = [
        {
            title: "Aboneliğimin sonunda mobilyaları satın alabilir miyim?",
            content: `
                Evet! 
                İstediğiniz eşyaları satın almanızı kolaylaştırıyoruz. 
                Aboneliğinizin sonuna doğru, herhangi bir öğenizi orijinal perakende fiyatından, ilk aboneliğiniz sırasında söz konusu öğe için zaten ödemiş olduğunuz tutar düşülerek satın almayı seçebilirsiniz.
            `,
        },
        {
            title: "Ürünlerin sahibi olmadan önce ne kadar ödeme yapmam gerekecek?",
            content: `
                Genel olarak, en düşük aylık ödeme oranıyla perakende satış değerine ulaşmak 24 ay sürecektir (promosyon indirimleri ve tavsiye kredileri perakende satın alma maliyetine uygulanmaz). 
                Ancak ürün bedelinin tamamını ödemek için beklemeniz gerekmez. 
                Aboneliğinizin sonuna doğru, herhangi bir öğenizi mevcut perakende satış fiyatından aboneliğiniz boyunca ödediğiniz tutar düşülerek satın almayı seçebilirsiniz.
                Abonelik öğelerinizden herhangi birini elinizde tutmayı seçerseniz, öğenin tamamı ödenene kadar her aylık ödeme perakende fiyatına uygulanır. 
                Abonelik ne kadar kısa olursa (aylık ödeme ne kadar yüksek olursa), ürün o kadar hızlı satın alınabilir. 
                Abonelik ne kadar uzun olursa (aylık ödeme ne kadar düşük olursa), ürünün satın alınması da o kadar uzun sürer.
                Bu otomatik olarak gerçekleşmediğinden parçaları satın almak için Müşteri Desteği ile iletişime geçmeniz gerektiğini lütfen unutmayın. 
                Ürün satın alındıktan sonra artık teslim alma, takas veya taşıma dahil abonelik hizmetlerimiz için uygun değildir. 
                Satın alınan tüm satışlar nihaidir.
            `,
        },
        {
            title: "Satın alma fiyatı nasıl hesaplanır?",
            content: `
                Satın alma maliyetiniz, geçerli perakende satış fiyatından aboneliğiniz boyunca söz konusu ürün için ödediğiniz tutarın çıkarılmasıyla elde edilen tutardır (promosyon indirimleri ve tavsiye kredileri perakende satın alma maliyetine uygulanmaz).
            `,
        },
        {
            title: "Satın alma abonelik süresi tamamlandıktan sonra ürünlerimin otomatik olarak sahibi olacak mıyım?",
            content: `
                Hayır. 
                Öncelikle bir kiralama şirketi olduğumuz göz önüne alındığında, bu otomatik olarak gerçekleşmediğinden parçaları satın almak için Müşteri Desteği ile iletişime geçmelisiniz. 
                Ürün satın alındıktan sonra artık teslim alma, takas veya taşıma dahil abonelik hizmetlerimiz için uygun değildir. 
                Satın alınan tüm satışlar nihaidir.
            `,
        },
        {
            title: "Ürünleri aldıktan sonra fikrimi değiştirirsem gelip alır mısın?",
            content: `
                Hayır. 
                Ürün satın alındıktan sonra artık teslim alma, takas veya taşıma dahil abonelik hizmetlerimiz için uygun değildir. 
                Satın alınan tüm satışlar nihaidir.
            `,
        }
        
    ];

    return (
        <>
            {items.map((item, index) => (
                <Accordion key={index}>
                    <AccordionSummary
                        expandIcon={<ArrowDownwardIcon />}
                        aria-controls={`panel${index + 1}-content`}
                        id={`panel${index + 1}-header`}
                        sx={{
                            fontSize: "1.25rem", // Adjust font size for accordion summary
                            fontWeight: "bold", // Make the title bold
                        }}
                    >
                        <Typography sx={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                            {item.title}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails
                        sx={{
                            fontSize: "1.75rem", // Use a valid font size (e.g., "1rem")
                            lineHeight: "1.5", // Adjust line height for better readability
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "2.5rem", // Set font size for content text
                                color: "text.secondary", // You can change the color if needed
                            }}
                            dangerouslySetInnerHTML={{ __html: item.content }}
                        />
                    </AccordionDetails>
                </Accordion>
            ))}
        </>
    );
    
}

export function Sales() {
    const items = [
        {
            title: "Satın aldığım ürünleri değiştirebilir miyim?",
            content: `
                Herhangi bir nedenle ürünlerinizi Esyala'dan farklı bir parçayla değiştirmek isterseniz, orijinal teslimattan itibaren 30 gün içinde bunu yapabilirsiniz. 
                Ödemiş olduğunuz tutarında bir ücret olsa da, Esyala orijinal ödemenizi ürünün maliyet farkına göre ayarlayacaktır ve biz de geri gelip parçayı sizin için değiştireceğiz.
            `
        },
        {
            title: "Ürünlerimi peşin alırsam iade politikası nedir?",
            content: `
                Ürün satın almanın sıkıcı bir süreç olabileceğini biliyoruz ve sonsuza kadar kendinizi rahat hissetmenizi istiyoruz! 
                Herhangi bir nedenle ürünlerinizden memnun kalmazsanız, satın alma işleminiz için tam bir geri ödeme sunuyoruz. İadenin planlanması sırasında kayıtlı karta işlenecek …. tutarında bir iade ücreti vardır. 
                Bazı sınırlamalar geçerli olabilir. Daha fazla bilgi için lütfen info@esyala.com adresinden bize ulaşın.
            `
        },
        {
            title: "Bir ürünü peşin olarak alırsam yeni mi yoksa kullanılmış mı olacak?",
            content: `
                Sürdürülebilir misyonumuzun bir parçası olarak tüm ürünlerimiz yeni veya yeni gibi durumda! 
                Ekibimiz, yeni gibi olan tüm eşyaların yenilenmesi, temizlenmesi ve rötuşlanması gibi ayrıntılı bir süreçten geçer. 
                Senin için yeni olacaklar!
            `
        },
        {
            title: "Kiralamak ve sahip olmak arasındaki fark nedir?",
            content: `
                Uzun vadeli "sonsuza kadar" ürün arıyorsanız ancak tarzınızın ne olduğundan emin değilseniz veya mevcut evinizde uzun vadeli kalacaksanız kiralama, sevdiğiniz eşyalara uzun süre beklemeden sahip olmanın harika bir yoludur. Vadeli taahhüt. Aboneliğinizin sonunda ürünlerinizi satın alma seçeneğimiz var! 
                Uzun vadede bu işin içinde olduklarını bilen ve hayallerindeki ürünlere bağlanmaya hazır olan kişiler için satın alma olanağı mevcuttur.
            `
        },
        {
            title: "Bilmeniz gereken başka ayrıntılar var mı?",
            content: `
                Doğrudan satın alınan ürünler, teslimat tarihinden itibaren 14 gün önceden bildirimde bulunularak tam para iadesi almaya hak kazanır. 
                Doğrudan satın alınan ürünler, (teslimat tarihinden itibaren) 14 gün önceden bildirimde bulunarak başka bir doğrudan satın alınan ürünüyle değiştirilebilir. 
                Değişim durumunda ücret farkı kayıtlı karta göre ayarlanacaktır. 
                İade edilen ürün(ler) orijinal durumda olmalıdır ve esyala'ın hatası olmaksızın ürün(ler)de hasar meydana gelmişse, geri ödemede indirime tabi olmalıdır. 
                Son satış olarak işaretlenen ürünler iade veya değişime uygun değildir. 
                Geri ödemelerin işleme koyulması 2 hafta kadar sürebilir. 
                Ürününüzün teslimat sırasında hasar görmesi ihtimaline karşı esyala, en iyi çözümü bulmak için sizinle birlikte ayrı ayrı çalışacaktır.
            `
        }
    ];

    return (
        <>
            {items.map((item, index) => (
                <Accordion key={index}>
                    <AccordionSummary
                        expandIcon={<ArrowDownwardIcon />}
                        aria-controls={`panel${index + 1}-content`}
                        id={`panel${index + 1}-header`}
                        sx={{
                            fontSize: "1.25rem", // Adjust font size for accordion summary
                            fontWeight: "bold", // Make the title bold
                        }}
                    >
                        <Typography sx={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                            {item.title}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails
                        sx={{
                            fontSize: "1.75rem", // Use a valid font size (e.g., "1rem")
                            lineHeight: "1.5", // Adjust line height for better readability
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "2.5rem", // Set font size for content text
                                color: "text.secondary", // You can change the color if needed
                            }}
                            dangerouslySetInnerHTML={{ __html: item.content }}
                        />
                    </AccordionDetails>
                </Accordion>
            ))}
        </>
    );
    
}


export default function ScrollableTabsButtonVisible() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start", // align to the top to ensure space
                height: "80vh",
                bgcolor: "background.paper",
                padding: 2,
            }}
        >
            <Box
                sx={{
                    flexGrow: 1,
                    maxWidth: { xs: 700, sm: 900 },
                    bgcolor: "background.paper",
                }}
            >
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons
                    aria-label="visible arrows tabs example"
                    sx={{
                        [`& .${tabsClasses.scrollButtons}`]: {
                            "&.Mui-disabled": { opacity: 0.3 },
                        },
                        fontSize: 18,
                        marginBottom: 2, // spacing between tabs and content
                    }}
                >
                    <Tab label="Genel Bakış" sx={{ fontSize: '2rem' }} />
                    <Tab label="Abonelik" sx={{ fontSize: '2rem' }} />
                    <Tab label="Ürün" sx={{ fontSize: '2rem' }} />
                    <Tab label="Teslimat" sx={{ fontSize: '2rem' }} />
                    <Tab label="Kiralama" sx={{ fontSize: '2rem' }} />
                    <Tab label="Satın Alma" sx={{ fontSize: '2rem' }} />
                </Tabs>
            </Box>

            {/* Tab content with scrollable area for large content */}
            <Box
                sx={{
                    width: "100%",
                    height: "calc(100% - 50px)", // Adjust height based on tab area
                    overflowY: "auto", // Add vertical scrolling for tab content
                    padding: 2,
                }}
            >
                <TabPanel value={value} index={0}>
                    <GeneralViewAccordion />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Subscribe />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Product />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <Shipping />
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <Retail />
                </TabPanel>
                <TabPanel value={value} index={5}>
                    <Sales />
                </TabPanel>
            </Box>
        </Box>
    );
}