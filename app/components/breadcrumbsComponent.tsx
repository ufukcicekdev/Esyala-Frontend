import React, { useState } from 'react';
import { Breadcrumbs, Link, Typography, Button, Menu, MenuItem } from '@mui/material';
import NextLink from 'next/link';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'; // Ok simgesi

interface Category {
  name: string;
  slug: string;
}

interface BreadcrumbsComponentProps {
  product: {
    name?: string;
    category_breadcrumb: {
      main_category: Category;
      sub_categories: Category[];
    };
  };
  selectedSubCategory: string;
  handleSubCategoryChange: (slug: string) => void;
  handleMenuClick: (event: React.MouseEvent<HTMLElement>) => void;  // Add this line
  handleMenuClose: () => void;  // Add this line
  anchorEl: HTMLElement | null;  // Add this line
}

const BreadcrumbsComponent: React.FC<BreadcrumbsComponentProps> = ({
  product,
  selectedSubCategory,
  handleSubCategoryChange,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      sx={{
        display: 'flex',
        justifyContent: 'flex-start', // Sola hizalamak için eklenmiş
        flexWrap: 'wrap', // Uzun breadcrumb'lar için satırları kaydırma
        marginBottom: 2, // Correct way to apply margin bottom using sx prop
      }}
    >
      {/* Main Category */}
      <Link
        component={NextLink}
        href={`/category/${product.category_breadcrumb.main_category.slug}`}
        underline="hover"
        color="inherit"
      >
        <Typography
          sx={{
            fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem', lg: '1.8rem' },
          }}
        >
          {product.category_breadcrumb.main_category.name}
        </Typography>
      </Link>

      {/* Sub Categories - Dropdown Menu */}
      {product.category_breadcrumb.sub_categories.length > 0 && (
        <>
          <Button
            aria-controls="sub-categories-menu"
            aria-haspopup="true"
            onClick={handleMenuClick}
            endIcon={<ArrowDropDownIcon />}  // Ok simgesini ekledik
          >
            <Typography
              sx={{
                fontSize: { xs: '1rem', sm: '1.2rem', md: '1.4rem', lg: '1.6rem' },
              }}
            >
              {product.category_breadcrumb.sub_categories.find(
                (category) => category.slug === selectedSubCategory
              )?.name || 'Select Sub Category'}
            </Typography>
          </Button>
          <Menu
            id="sub-categories-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {product.category_breadcrumb.sub_categories.map((category, index) => (
              <MenuItem
                key={index}
                component={NextLink}
                href={`/category/${category.slug}`}
                selected={category.slug === selectedSubCategory}
                onClick={() => {
                  handleSubCategoryChange(category.slug);
                  handleMenuClose(); // Close the menu after selection
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: '1rem', sm: '1.2rem', md: '1.4rem', lg: '1.6rem' },
                  }}
                >
                  {category.name}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </>
      )}

      {/* Product Name or Category only if product.name is not available */}
      {product.name && (
        <Typography
          sx={{
            fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem', lg: '1.8rem' },
            color: 'text.primary',
          }}
        >
          {product.name}
        </Typography>
      )}
    </Breadcrumbs>
  );
};

export default BreadcrumbsComponent;
