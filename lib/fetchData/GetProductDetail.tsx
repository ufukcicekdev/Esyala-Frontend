"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Slider from "react-slick";
import { Container, Grid, Box, Typography, CircularProgress, FormControl, Select, MenuItem, Button, CardContent, Card, Tabs, Tab, TextField, Rating, SelectChangeEvent } from "@mui/material";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import BreadcrumbsComponent from "@/app/components/breadcrumbsComponent";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { useAlert } from "@/app/context/AlertContext";
import ProductCategory from "./ProductCategory";
import Share from '@/app/components/share';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useCart } from '@/app/context/CartContext';
import { useSession } from "@/app/context/SessionContext";
import { createProductComment, createProductQuestion, fetchProductComments, fetchProductDetails, fetchProductQuestions } from "../product/product_api";





interface Answers {
    id: number;
    answer_text: string;
    created_at: string;
}
interface Questions {
    id: number;
    question_text: string;
    created_at: string;
    is_answered: boolean;
    answers: Answers[];
}

interface Comment {
    id: number;
    user: number;
    username: string;
    product: number;
    rating: number;
    comment: string;
    created_at: string;
}

interface ProductImage {
    image: string;
    img_alt: string;
    img_title: string;
}

interface Category {
    name: string;
    slug: string;
}

interface RentalPrice {
    name: string;
    rental_price: string;
    rental_old_price: string;
}

interface Product {
    id: number;
    name: string;
    slug: string;
    images: ProductImage[];
    selling_price: string;
    selling_old_price: string;
    rental_prices: RentalPrice[];
    in_stock: number;
    view_count: number;
    description: string;
    information: string;
    category_breadcrumb: {
        main_category: Category;
        sub_categories: Category[];
    };
}



export default function ProductDetail({ slug }: { slug: string }) {
    const showAlert = useAlert();
    const { isAuthenticated, user } = useAuth();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");

    const [selectedOption, setSelectedOption] = useState<string>("buy"); 
    const [selectedRentalPrice, setSelectedRentalPrice] = useState<string>(""); 

    const [comments, setComments] = useState<Comment[]>([]);
    const [questions, setQuestions] = useState<Questions[]>([]);

    const [tabIndex, setTabIndex] = useState(0);
    const [newComment, setNewComment] = useState("");
    const [rating, setRating] = useState(5);

    const [newQuestion, setNewQuestion] = useState("");


    useEffect(() => {
        const fetchData = async () => {
            try {
                const productData = await fetchProductDetails(slug);
                setProduct(productData);

                if (productData.category_breadcrumb.sub_categories.length > 0) {
                    setSelectedSubCategory(productData.category_breadcrumb.sub_categories[0].slug);
                }

                const commentsData = await fetchProductComments(productData.id);
                setComments(commentsData);

                const questionsData = await fetchProductQuestions(productData.id);
                setQuestions(questionsData);
            } catch (error) {
                console.error("Ürün detayları alınırken bir hata oluştu:", error);
            } finally {
                setLoading(false);
            }
        };

        if (slug) fetchData();
    }, [slug]);

    const handleCommentSubmit = async () => {
        if (!isAuthenticated) {
            showAlert("error", "Yorum eklemek için giriş yapmalısınız!");
            return;
        }
    
        try {
            if (product?.id && user?.id) {
                await createProductComment(product.id, {
                    rating: rating,
                    product: product.id,
                    comment: newComment,
                    user: user.id,
                });

                setNewComment("");
                setRating(5);
                showAlert("success", "Yorum eklendi!");

        
                const updatedCommentsResponse = await fetchProductComments(product?.id);
                setComments(updatedCommentsResponse);
            } 
    
            
    
        } catch (error) {
            showAlert("error", "Yorum eklenemedi!");
        }
    };
    
    const handleQuestionSubmit = async () => {
        if (!isAuthenticated) {
            showAlert("error", "Yorum eklemek için giriş yapmalısınız!");
            return;
        }
    
        try {
            if (product?.id && user?.id) {
                await createProductQuestion(product.id, {
                    product: product?.id,
                    question_text: newQuestion,
                    user: user?.id,
                });
        
                setNewQuestion("");
                showAlert("success", "Soru gönderildi!");
        
                const questionsResponse = await fetchProductQuestions(product.id);
                setQuestions(questionsResponse);
            }
            
    
        } catch (error) {
            showAlert("error", "Soru eklenemedi!");
        }
    };

    useEffect(() => {
        if (product?.images?.length) {
            Fancybox.bind('[data-fancybox="gallery"]');
        }
    }, [product]);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleSubCategoryChange = (slug: string) => {
        setSelectedSubCategory(slug);
        handleMenuClose();
    };

    const handleOptionChange = (option: string) => {
        setSelectedOption(option);
    };

    const handleRentalChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedRentalPrice(event.target.value as string);
    };

    if (loading) {
        return <div><CircularProgress /></div>;
    }

    if (!product) {
        return <div>Ürün bulunamadı.</div>;
    }

    return (
        <Container>
            <Box>
                {/* Breadcrumbs */}
                <BreadcrumbsComponent
                    product={product}
                    selectedSubCategory={selectedSubCategory}
                    handleMenuClick={handleMenuClick}
                    handleMenuClose={handleMenuClose}
                    handleSubCategoryChange={handleSubCategoryChange}
                    anchorEl={anchorEl} // anchorEl'i prop olarak gönderiyoruz
                />

                <Grid container spacing={4}>
                    {/* Sol Bölüm - Ürün Görselleri Slider */}

                    <Grid item xs={12} md={6}>
                        {/* Share ve View Count için yatay düzen */}
                        <Box display="flex" alignItems="center" gap={2} mb={2}>
                            <Share />
                            <Box display="flex" alignItems="center" gap={1}>
                                <VisibilityIcon />
                                <Typography>{product.view_count}</Typography>
                            </Box>
                        </Box>

                        {/* Slider */}
                        <Slider>
                            {product.images.map((image, index) => (
                                <div key={index}>
                                    <Link
                                        href={image.image}
                                        data-fancybox="gallery"
                                        data-caption={image.img_alt}
                                    >
                                        <Image
                                            src={image.image}
                                            alt={image.img_alt}
                                            title={image.img_title}
                                            width={500}
                                            height={500}
                                        />
                                    </Link>
                                </div>
                            ))}
                        </Slider>
                    </Grid>


                    {/* Sağ Bölüm - Ürün Detayları */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4">{product.name}</Typography>

                        <Card sx={{ my: 3 }} style={{ padding: "20px", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
                            <CardContent sx={{
                                fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
                                '& p': { marginBottom: '1rem' }, // Paragraflara boşluk ekleyin
                            }}>
                                <Box dangerouslySetInnerHTML={{ __html: product.description }} />
                            </CardContent>
                        </Card>

                        <PriceSection
                            product={product}
                            selectedOption={selectedOption}
                            handleOptionChange={handleOptionChange}
                        />
                        <Card sx={{ my: 3 }} style={{ padding: "20px", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Kargo Bilgileri
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Tahmini Teslimat: 2-5 iş günü
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Kargo Ücreti: Ücretsiz
                                </Typography>

                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

            <Box
                sx={{
                    border: '1px solid #ddd', // İnce bir çerçeve
                    borderRadius: '8px', // Köşe yuvarlatma
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Hafif gölge
                    overflow: 'hidden', // İçerik taşmasını önlemek için
                    backgroundColor: '#fff', // Beyaz arka plan
                }}
            >
                {/* Tablar */}
                <Tabs
                    value={tabIndex}
                    onChange={(e, newIndex) => setTabIndex(newIndex)}
                    variant="scrollable" // Sekmeleri kaydırılabilir yapar
                    scrollButtons="auto" // Kaydırma butonlarını ekran boyutuna göre otomatik gösterir
                    sx={{
                        borderBottom: '1px solid #ddd', // Sekmeler arasında bir ayırıcı
                        backgroundColor: '#f9f9f9', // Sekmeler için açık arka plan
                    }}
                >
                    <Tab label="Ürün Açıklaması" />
                    <Tab label="Değerlendirmeler" />
                    <Tab label="Soru Cevap" />
                </Tabs>


                {/* Tab Panelleri */}
                <Box hidden={tabIndex !== 0} p={3}>
                    <Typography
                        variant="h5"
                        sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } }}
                    >
                        {product.name}
                    </Typography>
                    <Box
                        sx={{
                            fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
                            '& p': { marginBottom: '1rem' }, // Paragraflara boşluk ekleyin
                        }}
                        dangerouslySetInnerHTML={{ __html: product.information }}
                    />
                </Box>

                <Box hidden={tabIndex !== 1} p={3}>
                    {/* Değerlendirme ve Yorumlar */}
                    <Box mt={1}>
                        <TextField
                            fullWidth
                            label="Yorumunuz"
                            multiline
                            rows={4}
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            margin="normal"
                            inputProps={{ maxLength: 500 }} // Maksimum karakter sayısı
                            helperText={`${newComment.length}/500`} // Kullanıcıya kaç karakter yazdığını göster
                        />
                        <Box mb={2}>
                            <Typography
                                variant="caption"
                                sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' } }}
                            >
                                Puan
                            </Typography>
                            <Rating
                                name="rating"
                                value={rating}
                                onChange={(e, newValue) => setRating(newValue || 0)}
                            />
                        </Box>
                        <Button variant="contained" color="primary" onClick={handleCommentSubmit}>
                            Yorum Ekle
                        </Button>
                    </Box>
                    {/* Yorum Listesi */}
                    {comments.length > 0 && (
                        <Box
                            sx={{
                                maxHeight: '400px',
                                overflowY: 'auto',
                                padding: '1rem',
                                borderRadius: '8px',
                                border: '1px solid #ddd',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                backgroundColor: '#fafafa',
                            }}
                        >
                            {comments.slice(0, 10).map((comment, index) => (
                                <Box key={index} my={2} p={2} border="1px solid #ddd" borderRadius="8px">
                                    <Typography variant="body1">{comment.comment}</Typography>
                                    <Box display="flex" alignItems="center">
                                        <Rating value={comment.rating} readOnly />
                                        <Typography variant="caption" ml={1}>
                                            Puan: {comment.rating}
                                        </Typography>
                                        <Typography variant="caption" ml={2} color="textSecondary">
                                            {new Date(comment.created_at).toLocaleString()}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    )}

                    {comments.length === 0 && (
                        <Typography variant="body2" color="textSecondary">
                            Henüz yorum yapılmamış.
                        </Typography>
                    )}


                </Box>

                <Box hidden={tabIndex !== 2} p={3}>
                    {/* Sorular ve Cevaplar */}
                    <Box mt={1}>
                        <TextField
                            fullWidth
                            label="Sorunuz"
                            multiline
                            rows={4}
                            value={newQuestion}
                            onChange={(e) => setNewQuestion(e.target.value)}
                            margin="normal"
                            inputProps={{ maxLength: 500 }}
                            helperText={`${newQuestion.length}/500`}
                        />
                        <Button variant="contained" color="primary" onClick={handleQuestionSubmit}>
                            Gönder
                        </Button>
                    </Box>
                    {questions.length > 0 ? (
                        <Box
                            sx={{
                                maxHeight: '400px',
                                overflowY: 'auto',
                                padding: '1rem',
                                borderRadius: '8px',
                                border: '1px solid #ddd',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                backgroundColor: '#fafafa',
                            }}
                        >
                            {questions.slice(0, 10).map((question, index) => (
                                <Box key={index} my={2} p={2} border="1px solid #ddd" borderRadius="8px">
                                    <Typography variant="body1">{question.question_text}</Typography>
                                    <Box display="flex" alignItems="center">
                                        <Typography variant="caption" color="textSecondary">
                                            {question.is_answered ? "Cevaplandı" : "Cevaplanmamış"}
                                        </Typography>
                                        <Typography variant="caption" ml={2} color="textSecondary">
                                            {new Date(question.created_at).toLocaleString()}
                                        </Typography>
                                    </Box>
                                    <Box mt={2}>
                                        {question.answers.map((answer, answerIndex) => (
                                            <Box key={answerIndex} my={1} p={2} border="1px solid #ddd" borderRadius="8px">
                                                <Typography variant="body2">{answer.answer_text}</Typography>
                                                <Typography variant="caption" color="textSecondary">
                                                    {new Date(answer.created_at).toLocaleString()}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    ) : (
                        <Typography variant="body2" color="textSecondary">
                            Henüz soru yok.
                        </Typography>
                    )}

                </Box>
            </Box>


        </Container>
    );
}





const PriceSection = ({
    product,
    selectedOption,
    handleOptionChange
}: {
    product: Product;
    selectedOption: string;
    handleOptionChange: (option: string) => void;
}) => {
    const [selectedRentalPrice, setSelectedRentalPrice] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(1);  // Quantity state'i sadece 'buy' için kullanılacak
    const hasRentalPrices = product.rental_prices.length > 0;

    const sessionKey = useSession(); 


    const { addToCart } = useCart();

    // Varsayılan kiralama fiyatını ayarlamak için
    useEffect(() => {
        if (selectedOption === "rent" && product.rental_prices.length > 0) {
            setSelectedRentalPrice(product.rental_prices[0].rental_price);
        }
    }, [selectedOption, product.rental_prices]);

    const handleRentalChange = (event: SelectChangeEvent<string>) => {
        setSelectedRentalPrice(event.target.value as string);
    };

    // Quantity arttırma ve azaltma fonksiyonları (sadece 'buy' için)
    const handleIncreaseQuantity = () => {
        if (selectedOption === "buy") {
            setQuantity(prevQuantity => prevQuantity + 1);
        }
    };

    const handleDecreaseQuantity = () => {
        if (selectedOption === "buy" && quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const handleAddToCart = async () => {
        const isRental = selectedOption === "rent";
        const rentalPrice = isRental ? selectedRentalPrice : null;
        const sellingPrice = !isRental ? product.selling_price : null;

        let rentalPeriod = null;
        if (isRental && rentalPrice) {
            const selectedRental = product.rental_prices.find(
                (rental) => rental.rental_price === rentalPrice
            );
            if (selectedRental) {
                rentalPeriod = selectedRental.name;
            }
        }

        addToCart({
            id: product.id,
            quantity: isRental ? 1 : quantity,  // Kiralama için quantity 1 sabit kalacak
            isRental: isRental,
            rentalPrice: rentalPrice,
            sellingPrice: sellingPrice,
            sessionKey: sessionKey,  // sessionKey burada kullanılıyor
            rentalPeriod: rentalPeriod,
        });
    };

    return (
        <Box my={3}>
            <Card elevation={3} style={{ padding: "20px", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
                <CardContent>
                    {/* Satın al veya Kirala Butonları */}
                    <Box display="flex" justifyContent="center" mb={2}>
                        <Button
                            variant={selectedOption === "buy" ? "contained" : "outlined"}
                            color="primary"
                            onClick={() => handleOptionChange("buy")}
                            style={{ marginRight: "10px", width: "120px" }}
                        >
                            Satın al
                        </Button>
                        {hasRentalPrices && (
                            <Button
                                variant={selectedOption === "rent" ? "contained" : "outlined"}
                                color="primary"
                                onClick={() => handleOptionChange("rent")}
                                style={{ width: "120px" }}
                            >
                                Kirala
                            </Button>
                        )}
                    </Box>

                    {selectedOption === "buy" ? (
                        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                            <Typography variant="h4" color="primary" style={{ fontWeight: 700 }}>
                                {product.selling_price} ₺
                            </Typography>
                            {product.selling_old_price !== "0.00" && (
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    style={{
                                        textDecoration: "line-through",
                                        marginTop: "5px",
                                        textAlign: "center"  // Ortalamayı sağlamak için
                                    }}
                                >
                                    {product.selling_old_price} ₺
                                </Typography>
                            )}
                        </Box>
                    ) : (
                        hasRentalPrices && (
                            <Box>
                                <Typography variant="h6" mt={3} gutterBottom>
                                    Aylık Kiralama Planı
                                </Typography>
                                <FormControl fullWidth>
                                    <Select
                                        value={selectedRentalPrice}
                                        onChange={handleRentalChange}
                                        displayEmpty
                                        sx={{ marginTop: 2 }}
                                    >
                                        {product.rental_prices.map((rental, index) => (
                                            <MenuItem key={index} value={rental.rental_price}>
                                                {rental.name} Ay - {rental.rental_price} ₺
                                                {rental.rental_old_price !== "0.00" && (
                                                    <del style={{ marginLeft: "8px" }}>
                                                        {rental.rental_old_price} ₺
                                                    </del>
                                                )}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        )
                    )}

                    {/* Miktar Kontrolü (sadece 'buy' için) */}
                    {selectedOption === "buy" && (
                        <Box mt={3} display="flex" justifyContent="center" alignItems="center">
                            <Button onClick={handleDecreaseQuantity} disabled={quantity <= 1}>-</Button>
                            <Typography variant="h6" mx={2}>{quantity}</Typography>
                            <Button onClick={handleIncreaseQuantity}>+</Button>
                        </Box>
                    )}

                    {/* Sepete Ekle Butonu */}
                    <Box mt={3} display="flex" justifyContent="center">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddToCart}
                            style={{ width: "200px" }}
                        >
                            Sepete Ekle
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};
