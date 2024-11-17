import Link from 'next/link';
import BlogCategory from './components/blogcategory';
import PopulerBlogs from './components/populerblogs';
import BlogList from './components/blogList';


function Blog() {
    

    return (
        <main id="mt-main">
            {/* Banner Bölümü */}
            <section className="mt-contact-banner style4 wow fadeInUp" data-wow-delay="0.4s" style={{
                backgroundImage: 'url(https://filestorages.fra1.cdn.digitaloceanspaces.com/esyabul/static/images/img43.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '250px',
                width: '100%',
            }}>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 text-center">
                            <h1>Blog</h1>
                            <nav className="breadcrumbs">
                                <ul className="list-unstyled">
                                    <li><Link href="/">Ana Sayfa <i className="fa fa-angle-right"></i></Link></li>
                                    <li><Link href="/blog">Blog</Link></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog Detayları */}
            <div className="mt-blog-detail style1">
                <div className="container">
                    <div className="row">
                        <BlogList/>

                        <div className="col-xs-12 col-sm-4 text-right sidebar wow fadeInUp" data-wow-delay="0.4s">  
                            <BlogCategory/>
                            
                            <PopulerBlogs/>

                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
}

export default Blog;
