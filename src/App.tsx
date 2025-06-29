import "./index.css";
import Footer from "./components/Footer";
import Disclaimer from "./components/Disclaimer";
import TikTokPage from "./page/tiktok/TiktokPage";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#0f051d] via-[#120e29] to-[#1a1039] text-white px-4 py-8">
      <TikTokPage />
      <Disclaimer />
      <Footer />
    </div>
  );
}

export default App;
