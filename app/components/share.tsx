import React, { useState, useRef } from "react";

function Share() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const inputRef = useRef(null);
  const [copyMessage, setCopyMessage] = useState("Kopyala");

  const togglePopup = () => {
    setIsPopupVisible((prevState) => !prevState);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  const handleCopy = async () => {
    if (inputRef.current) {
      try {
        await navigator.clipboard.writeText(inputRef.current.value); // Modern copy
        setCopyMessage("Kopyalandı");
        setTimeout(() => setCopyMessage("Kopyala"), 3000);
      } catch (err) {
        console.error("Kopyalama başarısız:", err);
      }
    }
  };

  const shareToPlatform = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const platforms = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      whatsapp: `https://api.whatsapp.com/send?text=${url}`,
      telegram: `https://t.me/share/url?url=${url}`,
    };

    const shareUrl = platforms[platform];
    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
  };

  return (
    <>
      {/* Popup */}
      {isPopupVisible && (
        <div className="popupSocial show">
          <header>
            <span>Paylaşım Penceresi</span>
            <div className="close" onClick={closePopup}>
              <i className="uil uil-times"></i>
            </div>
          </header>
          <div className="content">
            <p>Bu linki paylaşın:</p>
            <ul className="icons">
              {["facebook", "twitter", "linkedin", "whatsapp", "telegram"].map(
                (platform) => (
                  <li key={platform}>
                    <button
                      className="share-btn"
                      onClick={() => shareToPlatform(platform)}
                    >
                      <i className={`fa fa-${platform}`}></i>
                    </button>
                  </li>
                )
              )}
            </ul>
            <div className="field">
              <input
                ref={inputRef}
                type="text"
                value={window.location.href}
                readOnly
              />
              <button onClick={handleCopy}>{copyMessage}</button>
            </div>
          </div>
        </div>
      )}

      {/* Share Button */}
      <li>
        <span className="share-modal" onClick={togglePopup}>
          <i className="fa fa-share-alt"></i> Paylaş
        </span>
      </li>
    </>
  );
}

export default Share;
