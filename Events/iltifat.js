const discord = require("discord.js");

let iltifatSayi = 0;
let iltifatlar = [
   'Gözlerindeki saklı cenneti benden başkası fark etsin istemiyorum.',
"Yaşanılacak en güzel mevsim sensin.",
  "Sıradanlaşmış her şeyi, ne çok güzelleştiriyorsun.",
  "Gönlüm bir şehir ise o şehrin tüm sokakları sana çıkar.",
  "Birilerinin benim için ettiğinin en büyük kanıtı seninle karşılaşmam.",
  "Denize kıyısı olan şehrin huzuru birikmiş yüzüne.",
  "Ben çoktan şairdim ama senin gibi şiiri ilk defa dinliyorum.",
  "Gece yatağa yattığımda aklımda kalan tek gerçek şey sen oluyorsun.",
  "Ne tatlısın sen öyle. Akşam gel de iki bira içelim.",
  "Bir gamzen var sanki cennette bir çukur.",
  "Gecemi aydınlatan yıldızımsın.",
  "Ponçik burnundan ısırırım seni",
  "Bu dünyanın 8. harikası olma ihtimalin?",
  "fıstık naber?",
  "Dilek tutman için yıldızların kayması mı gerekiyor illa ki? Gönlüm gönlüne kaydı yetmez mi?",
  "Süt içiyorum yarım yağlı, mutluluğum sana bağlı.",
  "Müsaitsen aklım bu gece sende kalacak.",
  "Gemim olsa ne yazar liman sen olmadıktan sonra...",
  "Gözlerimi senden alamıyorum çünkü benim tüm dünyam sensin.",
  "Sabahları görmek istediğim ilk şey sensin.",
  "Mutluluk ne diye sorsalar- cevabı gülüşünde ve o sıcak bakışında arardım.",
  "Hayatım ne kadar saçma olursa olsun, tüm hayallerimi destekleyecek bir kişi var. O da sensin, mükemmel insan.",
  "Bir adada mahsur kalmak isteyeceğim kişiler listemde en üst sırada sen varsın.",
  "Sesini duymaktan- hikayelerini dinlemekten asla bıkmayacağım. Konuşmaktan en çok zevk aldığım kişi sensin.",
  "Üzerinde pijama olsa bile, nasıl oluyor da her zaman bu kadar güzel görünüyorsun? Merhaba, neden bu kadar güzel olduğunu bilmek istiyorum.",
  "Çok yorulmuş olmalısın. Bütün gün aklımda dolaşıp durdun.",
  "Çocukluk yapsan da gönlüme senin için salıncak mı kursam?",
  "Sen birazcık huzur aradığımda gitmekten en çok hoşlandığım yersin.",
  "Hangi çiçek anlatır güzelliğini? Hangi mevsime sığar senin adın. Hiçbir şey yeterli değil senin güzelliğine erişmeye. Sen eşsizsin...",
  "Rotanızı geçen her geminin ışığıyla değil, yıldızlara göre ayarlayın.",
  "Telaşımı hoş gör, ıslandığım ilk yağmursun.",
  "Gülüşün ne güzel öyle- CUMHURİYETİN gelişi gibi...",
  "Arkandan sevdim seni, hiç kalbin sızladı mı?",
  "Elinden geliyorsa azıcık sevsene beni.",
  "Sen bir sorusun, cevabın içinde saklı.",
"Kadınların özelliği ne biliyor musun? Seni sen yapan özelliklere âşık olup, senden o özellikleri almaya çalışmak.",
  "Dünyada iki kör tanıdım.. Biri beni görmeyen sen.. Biri senden başkasını görmeyen ben..",
  "Yanımda bir kişilik yer var. Ama ne yazık ki o kişilik sende yok.",
  "Umursamıyorum çünkü sen benimsin",
  "Sarılma ihtiyacı duyuyorum ama hep sana tek sana...",
  "Bir gün herkes gibi olmadığımı anlayacaksın. işte o gün sen. herkes gibi olacaksın...",
  "Bir seni sevdim birde seni sevmeyi sevdim",
  "Melekleri kıskandıran güzelliğinden bir tas doldur da ver, içeyim. Serinlesin gönlüm. Meleklere sesleneyim siz gökyüzünün, bu kadın yeryüzünün *MELEĞİ* diye.",
  "O kadar Güzel Gülüyorsun ki Bütün Acılarımı Unutuyorum",
  "Sana sarılmak gibi bir dünya harikası var.",
  "Benim en güzel zaafım sensin aşkım.",
  "Seninle yuva kurmak tek hayalim, ellerini tutarak ömrümü bitirmek tek isteğim.",
  "Kokun yokken nefes almak zehir gibi geliyor",
  "Bir romanın içindeki altı çizili kelime gibisin kendimi bulduğum.",
  "Hayallerim bile yetmiyor senli anlarıma.",
  "Gözüm görmese bile kalbim bulur seni.",
  "Gözlerin gönlüme en yakın liman bense o limandaki tek adam.",
  "Sen benim gözümün daldığı, yüreğimin aşkla yandığısın. Nerede olursa ol sen bende candan fazlasın.",
  "Dünyan kararsa bile gözlerimle aydınlatırım hayatını.",
  "Öyle güzel dalıp gidiyorsun ki daldığın yerde olmak isterdim.",
  "Küçük kalbimde kocaman bir yere sahipsin.",
  "Gözlerine bakınca geleceğimi görebiliyorum.",
  "Seni sevmek sevap ise her gün sevmeye razıyım.",
  "Sen acılarımın arasında yeşeren en güzel şifasın benim için.",
  "Yürüdüğün yol olmak isterim ayağın taşa değmesin diye sakınırım.",
  "Sana bakarken gözlerimin için titriyor canımın içi.",
  "Kendimi sende bulduğum için bu kadar güzelsin.",
];

module.exports = (message) => {
  if (message.channel.id === global.sunucuAyar.chatKanali && !message.author.bot) {
    iltifatSayi++;
    if (iltifatSayi >= 100) {
      iltifatSayi = 0;
      message.reply(iltifatlar.random());
    };
  };
};

module.exports.configuration = {
  name: "message"
};