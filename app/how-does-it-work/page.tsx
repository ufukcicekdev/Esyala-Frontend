"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from "@mui/material";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Banner from '../components/banner';

const theme = createTheme({ typography: { fontSize: 30 } });

const steps = [
    {
        label: 'Nasıl Çalışır?',
        description: `
            <ul>
                <li>Yüzlerce ürün arasından istediğin ürünü seç.</li>
                <li>Kiralamak istediğin süreyi belirle.</li>
                <li>Siparişini oluşturduğunda ilk ay kira ücreti alınır.</li>
                <li>Otomatik kimlik teyidi ve Findeks raporu onayının ardından kiralama işlemi onaylanır ve ürünün ücretsiz kargo ile sana gönderilir.</li>
                <li>Kiralama talebi onaylanmazsa alınan ilk ay kira ücreti iade edilir.</li>
            </ul>
        `,
    },
    {
        label: 'Kullanım Detayları',
        description: `
            <p><strong>İlk ay kira ücreti:</strong> Kiralama yapıldığı gün alınır.</p>
            <p><strong>Kira süresi:</strong> Ürünü teslim aldığın gün başlar. Sonraki ayların kira ücretleri, siparişini oluşturduğun günlerde kartından otomatik olarak alınır. Kargoda geçen süre kira süresine eklenir.</p>
            <p><strong>Hasar Durumu:</strong> Ürünü kullanırken hasar oluşursa, hasar onarım süreçlerini biz üstleniriz ve hasar onarım masraflarının %70’ini karşılarız.</p>
            <p><strong>Uzun Süreli Kullanım:</strong> Kiraladığın ürünü daha uzun süre kullanmak istersen, istediğin zaman kira süresini uzatabilir ya da kiraladığın ürünü satın alabilirsin.</p>
        `,
    },
    {
        label: 'İade İşlemleri',
        description: `
            <p><strong>İade işlemi:</strong> Kira süresi bittiğinde ürünü orijinal kutusu ve aksesuarlarıyla ücretsiz kargo ile geri gönder.</p>
            <p>Her iade edilen ürünün teknik kalite kontrol işlemleri yapılır. Kalite kontrol işlemleri onaylandığında, kartından çekilen bir sonraki ayın kira ücreti iade edilir.</p>
        `,
    },
];

function VerticalLinearStepper() {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ maxWidth: "lg", margin: 'auto' }}>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                        <Step key={step.label}>
                            <StepLabel>{step.label}</StepLabel>
                            <StepContent>
                                <Typography
                                    component="div"
                                    sx={{
                                        fontSize: '2rem',
                                        lineHeight: '1.6',
                                    }}
                                    dangerouslySetInnerHTML={{ __html: step.description }}
                                />
                                <Box sx={{ mb: 2 }}>
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 2, mr: 2 }}
                                    >
                                        {index === steps.length - 1 ? 'Bitir' : 'Devam'}
                                    </Button>
                                    <Button
                                        disabled={index === 0}
                                        onClick={handleBack}
                                        sx={{ mt: 2, mr: 2 }}
                                    >
                                        Geri
                                    </Button>
                                </Box>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length && (
                    <Paper square elevation={0} sx={{ p: 3 }}>
                        <Button onClick={handleReset} sx={{ mt: 2, mr: 2 }}>
                            Resetle
                        </Button>
                    </Paper>
                )}
            </Box>
        </ThemeProvider>
    );
}

export default function Page() {
    return (
            
        <>
            <Banner
                backgroundImage="https://filestorages.fra1.cdn.digitaloceanspaces.com/esyabul/static/images/img43.jpg"
                title="Nasıl Çalışır"
                breadcrumbs={[
                    { label: "Ana Sayfa", href: "/" },
                    { label: "Nasıl Çalışır", href: "/how-does-it-work" },

                ]}
            />

            <Container maxWidth="lg">
                <Grid container justifyContent="center" spacing={4}>
                    <Grid item xs={12} md={8}>
                        <VerticalLinearStepper />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
