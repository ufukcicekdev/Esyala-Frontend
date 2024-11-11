'use client';
import { fetchSocialMediaLinks } from "@/lib/main_api";
import { useEffect, useState } from "react";

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

    return (
        <>
            {/* Sosyal medya bağlantılarını render et */}
            {socialMediaLinks.length > 0 && (
                <ul className="mt-top-social">
                    {socialMediaLinks.map((socialMedia, index) => {
                        let iconClass = '';
                        switch (socialMedia.name) {
                            case 'facebook':
                                iconClass = 'fa-facebook';
                                break;
                            case 'twitter':
                                iconClass = 'fa-twitter';
                                break;
                            case 'instagram':
                                iconClass = 'fa-instagram';
                                break;
                            case 'linkedin':
                                iconClass = 'fa-linkedin';
                                break;
                            case 'youtube':
                                iconClass = 'fa-youtube';
                                break;
                            default:
                                return null;
                        }

                        return (
                            <li key={index}>
                                <a target="_blank" rel="nofollow" href={socialMedia.link}>
                                    <i className={`fa ${iconClass}`} />
                                </a>
                            </li>
                        );
                    })}
                </ul>
            )}
             
        </>
    );
}

export default SocialMediaHeader;
