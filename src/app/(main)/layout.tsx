import { Header } from "@/components/layout/header/Header";
import { Footer } from "@/components/layout/footer/Footer";



export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            <main className="min-height-main h-auto">
                {children}
            </main>
            <Footer />
        </>
    );
}
