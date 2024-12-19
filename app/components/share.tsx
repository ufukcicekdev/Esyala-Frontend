import React, { useState, useRef, useEffect } from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp, FaTelegram, FaTimes, FaShareAlt } from "react-icons/fa";

function Share() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const [copyMessage, setCopyMessage] = useState("Kopyala");

  const togglePopup = () => setIsPopupVisible((prev) => !prev);
  const closePopup = () => setIsPopupVisible(false);

  const handleCopy = async () => {
    if (inputRef.current) {
      try {
        await navigator.clipboard.writeText(inputRef.current.value);
        setCopyMessage("Kopyalandı");
        setTimeout(() => setCopyMessage("Kopyala"), 3000);
      } catch (err) {
        console.error("Kopyalama başarısız:", err);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        closePopup();
      }
    };

    if (isPopupVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPopupVisible]);

  const shareToPlatform = (
    platform: "facebook" | "twitter" | "linkedin" | "whatsapp" | "telegram"
  ) => {
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
      {isPopupVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closePopup}
        >
          <div
            className="bg-white rounded-lg p-6 w-11/12 max-w-md shadow-lg" 
            ref={popupRef} 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Paylaş</h3>
              <button className="text-gray-500 hover:text-gray-800" onClick={closePopup}>
                <FaTimes />
              </button>
            </div>

            <div className="grid grid-cols-5 gap-4 text-center mb-4">
              {[
                { name: "facebook", icon: <FaFacebook className="text-blue-600" /> },
                { name: "twitter", icon: <FaTwitter className="text-blue-400" /> },
                { name: "linkedin", icon: <FaLinkedin className="text-blue-700" /> },
                { name: "whatsapp", icon: <FaWhatsapp className="text-green-500" /> },
                { name: "telegram", icon: <FaTelegram className="text-blue-500" /> },
              ].map(({ name, icon }) => (
                <button
                  key={name}
                  className="hover:scale-110 transition-transform"
                  onClick={() =>
                    shareToPlatform(
                      name as "facebook" | "twitter" | "linkedin" | "whatsapp" | "telegram"
                    )
                  }
                >
                  {icon}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={window.location.href}
                readOnly
                className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleCopy}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                {copyMessage}
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        className="flex items-center gap-2 text-blue-500 hover:text-blue-700"
        onClick={togglePopup}
      >
        <FaShareAlt /> Paylaş
      </button>
    </>
  );
}

export default Share;
