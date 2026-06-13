import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 🛠️ TO'G'RILANDI: Sizning loyihangizga mos ravishda jingalak qavsli (Named) importlar
import { HomePage } from "./pages/HomePage"; 
import { CartPage } from "./pages/CartPage"; 

// 🟢 Default importlar (Qavssiz)
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";


const queryClient = new QueryClient();

function App() {

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);

    if (exists) {
      alert("Bu mahsulot savatda bor");
      return;
    }

    setCart([...cart, product]);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
     
        <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-purple-500 selection:text-white">
          
       
          <Header cartCount={cart.length} />

   
          <main className="container mx-auto px-4 py-6">
            <Routes>
          
              <Route
                path="/"
                element={<HomePage addToCart={addToCart} />}
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

       
              <Route
                path="/cart"
                element = {
                  <ProtectedRoute>
                    <CartPage cart={cart} />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;