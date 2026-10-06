const copy = {
  tr: {
    skip:'İçeriğe geç', kicker:'Kapınız için dijital zil', title:'Bir QR kodu.\nKapınızla bağlantı.', lead:'DOQR ile kapınıza özel bir QR kodu oluşturun. Ziyaretçiniz tarayıcıdan zili çalsın, siz uygulamadan yanıtlayın.', download:'App Store’dan indirin', device:'Elektronik zil veya ek cihaz gerekmez. İnternet bağlantısı gerekir.', scan:'Tara', scanBody:'Kapınızdaki basılı QR kodu.', ring:'Zili çal', ringBody:'Ziyaretçi uygulama kurmadan tarayıcıdan ulaşır.', reply:'Yanıtla', replyBody:'Uygulamada ziyaret bildirimini açın ve mesajlaşın.', setup:'Kapınıza özel QR', setupBody:'Uygulamada dijital zil oluşturun, QR kodunu yazdırın ve kapınıza yerleştirin.', visitor:'Ziyaretçi için indirme yok', visitorBody:'QR kodunu telefon kamerasıyla tarayın ve web sayfasından zili çalın.', control:'Yanıt sizde', controlBody:'Mesajlaşarak yanıtlayın. Pro ile sesli veya görüntülü görüşme için ziyaretçinin onayı istenir.', atDoor:'Bir kapıyı mı ziyaret ediyorsunuz?', atDoorBody:'Kapı sahibine ulaşmak için kapıdaki DOQR kodunu tarayın. Bu tanıtım sayfası bir ziyaret başlatmaz.', privacy:'Gizlilik', terms:'Kullanım koşulları', support:'Destek', deletion:'Hesap silme', pageTitle:'DOQR • QR koduyla dijital kapı zili'
  },
  en: {
    skip:'Skip to content', kicker:'A digital doorbell for your door', title:'Your door.\nOne scan away.', lead:'Create a door-specific QR code with DOQR. Your visitor rings from their browser; you answer in the app.', download:'Download on the App Store', device:'No electronic doorbell or extra device needed. Internet access required.', scan:'Scan', scanBody:'The printed QR code at your door.', ring:'Ring', ringBody:'Visitors contact you through their browser, without installing an app.', reply:'Reply', replyBody:'Open the visit notification in the app and chat.', setup:'A QR code for your door', setupBody:'Create a digital doorbell in the app, print its QR code and place it at your door.', visitor:'No visitor download', visitorBody:'Scan with a phone camera and ring through the web page.', control:'You choose how to answer', controlBody:'Reply by text. With Pro, voice and video calls require the visitor’s approval.', atDoor:'Visiting a door?', atDoorBody:'Scan the DOQR code at the door to contact its owner. This marketing page does not start a visit.', privacy:'Privacy', terms:'Terms of use', support:'Support', deletion:'Account deletion', pageTitle:'DOQR • Digital doorbell with a QR code'
  },
  ru: {
    skip:'Перейти к содержимому', kicker:'Цифровой звонок для вашей двери', title:'Один QR-код.\nСвязь с вашей дверью.', lead:'Создайте QR-код двери в DOQR. Посетитель звонит из браузера, а вы отвечаете в приложении.', download:'Скачать в App Store', device:'Электронный звонок или дополнительное устройство не нужны. Нужен интернет.', scan:'Сканируйте', scanBody:'Распечатанный QR-код у двери.', ring:'Позвоните', ringBody:'Посетитель связывается через браузер без установки приложения.', reply:'Ответьте', replyBody:'Откройте уведомление о визите в приложении и отправьте сообщение.', setup:'QR-код для вашей двери', setupBody:'Создайте цифровой звонок в приложении, распечатайте QR-код и разместите его у двери.', visitor:'Без установки для посетителя', visitorBody:'Сканируйте камерой телефона и звоните через веб-страницу.', control:'Вы выбираете ответ', controlBody:'Отвечайте сообщениями. В Pro для аудио и видео нужно согласие посетителя.', atDoor:'Вы пришли в гости?', atDoorBody:'Сканируйте код DOQR у двери, чтобы связаться с владельцем. Эта страница не начинает визит.', privacy:'Конфиденциальность', terms:'Условия использования', support:'Поддержка', deletion:'Удаление аккаунта', pageTitle:'DOQR • Цифровой звонок с QR-кодом'
  }
};
let saved;
try { saved = localStorage.getItem('doqr_visitor_language'); } catch { /* Storage may be unavailable. */ }
const requested = new URLSearchParams(location.search).get('lang')?.toLowerCase();
let language = [requested, saved, navigator.language?.split('-')[0].toLowerCase()].find(value => Object.hasOwn(copy, value)) || 'tr';
function render() {
  document.documentElement.lang = language;
  document.title = copy[language].pageTitle;
  document.querySelector('meta[name="description"]').content = copy[language].lead;
  document.getElementById('marketingLanguage').value = language;
  document.querySelectorAll('[data-copy]').forEach(node => { node.textContent = copy[language][node.dataset.copy]; });
  document.querySelectorAll('[data-legal]').forEach(node => { node.href = `${document.documentElement.dataset.legalBase || "./"}${node.dataset.legal}${language === 'tr' ? '' : `-${language}`}.html`; });
  // The exact verified product ID; use Apple's language preference without
  // guessing another storefront's availability.
  document.querySelector('.store-link').href = `https://apps.apple.com/tr/app/doqr/id6800038738${language === 'tr' ? '?l=tr' : '?l=en'}`;
}
document.getElementById('marketingLanguage').addEventListener('change', event => {
  language = event.target.value;
  try { localStorage.setItem('doqr_visitor_language', language); } catch { /* Optional preference. */ }
  render();
});
render();
