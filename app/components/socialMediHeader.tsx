"use client";
import { fetchSocialMediaLinks } from "@/lib/main_api";
import { useEffect, useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

interface SocialMediaLink {
    name: string;
    link: string;
}

function SocialMediaHeader() {
    const [socialMediaLinks, setSocialMediaLinks] = useState<SocialMediaLink[]>([]);

    useEffect(() => {
        const loadLinks = async () => {
            const links = await fetchSocialMediaLinks();
            setSocialMediaLinks(links.data); // JSON verisinden "data" alanını alıyoruz
        };

        loadLinks();
    }, []);

    const getIcon = (name: string) => {
        switch (name.toLowerCase()) {
            case "facebook":
                return <FaFacebook className="text-blue-600 hover:text-blue-800" size={20} />;
            case "twitter":
                return <FaTwitter className="text-blue-400 hover:text-blue-600" size={20} />;
            case "instagram":
                return <FaInstagram className="text-pink-600 hover:text-pink-800" size={20} />;
            case "linkedin":
                return <FaLinkedin className="text-blue-700 hover:text-blue-900" size={20} />;
            case "youtube":
                return <FaYoutube className="text-red-600 hover:text-red-800" size={20} />;
            default:
                return null;
        }
    };

    return (
        <>
            {/* Sosyal Medya Bağlantıları - Mobilde Gizleme */}
            {socialMediaLinks.length > 0 && (
                <ul className="flex space-x-4 mt-4 hidden sm:flex"> {/* sm:flex ile küçük ekranlarda gizler */}
                    {socialMediaLinks.map((socialMedia, index) => (
                        <li key={index}>
                            <a
                                target="_blank"
                                rel="nofollow noreferrer"
                                href={socialMedia.link}
                                className="flex items-center"
                            >
                                {getIcon(socialMedia.name)}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}

export default SocialMediaHeader;
