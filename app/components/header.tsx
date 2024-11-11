'use client';

import Link from "next/link";
import Image from 'next/image';
import SocialMediaHeader from "./socialMediHeader";
import { useUser } from "../context/UserContext"; // Kullanıcı verisini almak için context

const Header = () => {
  const { user } = useUser() || {}; // useUser'den gelen veriyi alıyoruz

  return (
    <header id="mt-header" className="style19">
      <div className="mt-top-bar">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-6 hidden-xs">
              <a href="tel:+908503048400" className="tel">
                <i className="fa fa-phone" aria-hidden="true"></i> 0 850 304 84 00
              </a>
              <a href="mailto:info@esyala.com" className="tel">
                <i className="fa fa-envelope-o" aria-hidden="true"></i> info@esyala.com
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="mt-bottom-bar">
          <div className="row">
            <div className="col-xs-12">
              <SocialMediaHeader />
              <ul className="mt-icon-list">
                <li className="hidden-lg hidden-md">
                  <a href="#" className="bar-opener mobile-toggle">
                    <span className="bar"></span>
                    <span className="bar small"></span>
                    <span className="bar"></span>
                  </a>
                </li>
                <li><a href="#" className="icon-magnifier"></a></li>
                <li id="user-icon">
                  {user ? (
                    <>
                      <a href="/address-list" title={user.username}>
                        <div className="user-icon">
                          {user.username[0].toUpperCase()} {/* Kullanıcının isminin ilk harfini göster */}
                        </div>
                        <span className="username">{user.username}</span>
                      </a>
                      <a href="/api/auth/signout" className="logout-link">Çıkış Yap</a> {/* Çıkış butonu */}
                    </>
                  ) : (
                    <a href="/login">
                      <div className="icon-user"></div> {/* Giriş yapmamış kullanıcı için simge */}
                    </a>
                  )}
                </li>
              </ul>
              <div className="mt-logo">
                <a href="/">
                  <Image
                    className="logo-img"
                    src="https://filestorages.fra1.cdn.digitaloceanspaces.com/esyabul/static/images/esyala_syh_noktal%C4%B1.png"
                    alt="Esyala"
                    width={500} // Gerekli genişlik
                    height={300} // Gerekli yükseklik
                  />
                </a>
                <div className="logo-text">
                  <span>Keşfet</span>
                  <span>Kullan</span>
                  <span>Eşyala</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-nav-holder">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <nav id="nav">
                <ul>
                  <li>
                    <Link href="/" title="Anasayfa">Anasayfa</Link>
                  </li>
                  <li>
                    <Link href="/blog" title="Blog">Blog</Link>
                  </li>
                  <li className="drop">
                    <a title="Kategoriler">Kategoriler <i className="fa fa-angle-down" aria-hidden="true"></i></a>
                    <div className="mt-dropmenu text-left">
                      <div className="mt-frame">
                        <div className="mt-f-box">
                          <div className="mt-col-3"></div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <Link href="/about" title="Hakkımızda">Hakkımızda</Link>
                  </li>
                  <li>
                    <Link href="/contact" title="İletişim">İletişim</Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
