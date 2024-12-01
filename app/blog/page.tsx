import BlogCategory from './components/blogcategory';
import PopulerBlogs from './components/populerblogs';
import BlogList from './components/blogList';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Banner from '../components/banner';
import { Grid } from '@mui/material';

function Blog() {
  return (
    <>
      {/* Banner Bölümü */}
      <Banner
        backgroundImage="https://filestorages.fra1.cdn.digitaloceanspaces.com/esyabul/static/images/img43.jpg"
        title="Blog"
        breadcrumbs={[
          { label: "Ana Sayfa", href: "/" },
          { label: "Blog", href: "/blog" },
        ]}
      />

      {/* Blog Detayları */}
      <div className="mt-blog-detail style1">
        <Container maxWidth="lg">
          <Box sx={{ width: '100%', margin: 'auto', mt: 1 }}>
            {/* Grid yapısı */}
            <Grid container spacing={3}>
              {/* BlogList sol tarafa yerleşir */}
              <Grid item xs={12} sm={8}>
                <BlogList />
              </Grid>

              {/* Sağ tarafta BlogCategory ve PopulerBlogs, ancak mobilde sol tarafa kaymayacak */}
              <Grid item xs={12} sm={4}>
                <Box className="text-right sidebar wow fadeInUp">
                  <BlogCategory />
                  <PopulerBlogs />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </div>
    </>
  );
}

export default Blog;
