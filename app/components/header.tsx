'use client';

import Link from "next/link";
import Image from 'next/image';
import { useEffect, useState } from "react";
import { fetchCategory } from "@/lib/main_api";
import MobileBottomNav from "./MobileBottomNav";
import { AutoDismissAlert } from "./messages/Alert";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import React from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

interface Category {
  name: string;
  slug: string;
  children: Category[]; // Rekürsif yapı
}




const Header = () => {


  const [categories, setCategories] = useState<Category[] | null>(null);

  const rantalCategory = "rental";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetchCategory();
        if (response.status && response.data) {
          setCategories(response.data);
        }
      } catch {
        <AutoDismissAlert
          severity="error"
          message={"Kategoriler alınamadı"}
        />

      }
    };

    fetchCategories();
  }, []);


  const renderSubCategories = (category: Category) => {  // Burada category'ye tip ekliyoruz
    if (category.children && category.children.length > 0) {
      return (
        <ul className="sub-category-list">
          {category.children.map((child) => (
            <li key={child.slug} className="sub-category-item">
              <strong>
                <Link
                  href={`/category/${category.slug}/${child.slug}/`}
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
                          href={`/category/${subChild.slug}/`}
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
      <Container maxWidth="xl">
      <Box sx={{ width: '80%', margin: 'auto', mt: 1 }}>
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
      </Box>
      </Container>
      </div>


      <Container maxWidth="xl">
      <Box sx={{ width: '80%', margin: 'auto', mt: 1 }}>
        <div className="mt-bottom-bar">
          <div className="row">
            <div className="col-xs-12">
              <ul className="flex space-x-4 mt-4 hidden sm:flex"> {/* sm:flex ile küçük ekranlarda gizler */}

                <li>
                  <Link
                    target="_blank"
                    rel="nofollow noreferrer"
                    href="https://www.facebook.com/esyalacom"
                    className="flex items-center"
                  >
                    <FaFacebook className="text-blue-600 hover:text-blue-800" size={20} />
                  </Link>
                </li>

                <li>
                  <Link
                    target="_blank"
                    rel="nofollow noreferrer"
                    href="https://www.instagram.com/esyalacom/"
                    className="flex items-center"
                  >
                    <FaInstagram className="text-pink-600 hover:text-pink-800" size={20} />
                  </Link>
                </li>

                <li>
                  <Link
                    target="_blank"
                    rel="nofollow noreferrer"
                    href="https://www.linkedin.com/company/102235289/admin/feed/posts/?feedType=following"
                    className="flex items-center"
                  >
                    <FaLinkedin className="text-blue-700 hover:text-blue-900" size={20} />
                  </Link>
                </li>

                <li>
                  <Link
                    target="_blank"
                    rel="nofollow noreferrer"
                    href="https://www.youtube.com/@esyalacom"
                    className="flex items-center"
                  >
                    <FaYoutube className="text-red-600 hover:text-red-800" size={20} />
                  </Link>
                </li>

              </ul>
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
                  {/* {user ? (
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
                  )} */}
                </li>
              </ul>
              <div className="mt-logo">
                <Link href="/">
                  <Image
                    className="logo-img"
                    src="https://filestorages.fra1.cdn.digitaloceanspaces.com/esyabul/static/images/esyala_syh_noktal%C4%B1.png"
                    alt="Esyala"
                    width={500}
                    height={300}
                  />
                </Link>
                <div className="logo-text">
                  <span>Keşfet</span>
                  <span>Kullan</span>
                  <span>Eşyala</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        </Box>
        </Container>




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
                          <div className="mt-col-3">
                            <div className="sub-dropcont">
                              <strong className="title">
                                <Link href={`/category/${rantalCategory}`} title="Çalışma Odası" className="mt-subopener">Kiralık Ürünler</Link>
                              </strong>

                              <Link href="/category/rental/" title="Tümünü Gör" >
                                <i className="fa fa-angle-right" aria-hidden="true">Tümünü Gör</i>
                              </Link>
                            </div>
                          </div>
                          {categories && categories.length > 0 ? (
                            categories.map((category) => (
                              <div key={category.slug} className="mt-col-3">
                                <div className="sub-dropcont mt-03">
                                  <strong className="title">
                                    <Link
                                      href={`/category/${category.slug}/`}
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
                                  <Link href={`/category/${category.slug}`} title="Tümünü Gör">
                                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                                    Tümünü Gör
                                  </Link>
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

      <MobileBottomNav />


    </header>
  );
};

export default Header;
