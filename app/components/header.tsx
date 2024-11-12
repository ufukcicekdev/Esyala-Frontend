'use client';

import Link from "next/link";
import Image from 'next/image';
import { useEffect, useState } from "react";
import SocialMediaHeader from "./socialMediHeader";
import { useUser } from "../context/UserContext";
import { fetchCategory } from "@/lib/main_api";

const Header = () => {
  const { user } = useUser() || {};
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetchCategory();
        if (response.status && response.data.header_categories) {
          setCategories(response.data.header_categories);
        }
      } catch (error) {
        console.error("Kategoriler alınamadı:", error);
      }
    };

    fetchCategories();
  }, []);

  const renderSubCategories = (category) => {
    if (category.children && category.children.length > 0) {
      return (
        <ul className="sub-category-list">
          {category.children.map((child) => (
            <li key={child.slug} className="sub-category-item">
              <strong>
                <Link
                  href={`/category/${child.get_full_path_slug}`}
                  title={child.name}
                >
                  {child.name}
                </Link>
              </strong>
              {/* Alt alt kategoriler */}
              {child.children && child.children.length > 0 && (
                <ul>
                  {child.children.map((subChild) => (
                    <li key={subChild.slug}>
                      <strong>
                        <Link
                          href={`/category/${subChild.get_full_path_slug}`}
                          title={subChild.name}
                        >
                          {subChild.name}
                        </Link>
                      </strong>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      );
    }
    return null; // Eğer alt kategori yoksa, hiçbir şey render edilmez.
  };

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
                          {user.username[0].toUpperCase()}
                        </div>
                        <span className="username">{user.username}</span>
                      </a>
                      <a href="/api/auth/signout" className="logout-link">Çıkış Yap</a>
                    </>
                  ) : (
                    <a href="/login">
                      <div className="icon-user"></div>
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
                    width={500}
                    height={300}
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
                    <a title="Kategoriler">
                      Kategoriler <i className="fa fa-angle-down" aria-hidden="true"></i>
                    </a>
                    <div className="mt-dropmenu text-left">
                      <div className="mt-frame">
                        <div className="mt-f-box">
                          {categories.length > 0 ? (
                            categories.map((category) => (
                              <div key={category.slug} className="mt-col-3">
                                <div className="sub-dropcont mt-03">
                                  <strong className="title">
                                    <Link
                                      href={`/category/${category.slug}`}
                                      title={category.name}
                                      className="mt-subopener"
                                    >
                                      {category.name}
                                    </Link>
                                  </strong>

                                  {/* Alt kategorileri render et */}
                                  <div className="sub-drop">
                                    {category.children && category.children.length > 0 ? (
                                      renderSubCategories(category) // Alt kategoriler burada render ediliyor
                                    ) : (
                                      <p>Alt kategori bulunmamaktadır.</p>
                                    )}
                                  </div>

                                  {/* Tümünü Gör linki */}
                                  <a href={`/category/${category.slug}`} title="Tümünü Gör">
                                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                                    Tümünü Gör
                                  </a>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p>Kategori bulunamadı.</p>
                          )}
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
