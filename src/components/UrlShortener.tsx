import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BiLink, BiCopy, BiCheck } from "react-icons/bi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";
import QRCode from "qrcode";

interface UrlShortenerProps {
  onUrlShortened?: (shortUrl: string) => void;
}

const UrlShortener: React.FC<UrlShortenerProps> = ({ onUrlShortened }) => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [qrCode, setQrCode] = useState("");

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const generateShortUrl = async () => {
    if (!url.trim()) {
      toast.error("Please enter a URL to shorten");
      return;
    }

    if (!isValidUrl(url)) {
      toast.error("Please enter a valid URL");
      return;
    }

    setShortUrl("");
    setQrCode("");
    setIsLoading(true);

    try {
      // Simulate API call
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/shortUrl`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ originalUrl: url }),
        }
      );
      const data = await response.json();
        if (!data.shortUrl) {
      throw new Error("No short URL returned");
    }
      setShortUrl(data.shortUrl);

     

      // Generate a mock short URL
      // const shortId = Math.random().toString(36).substring(2, 8);
      // const generatedShortUrl = `https://short.ly/${shortId}`;
      const generatedShortUrl = data.shortUrl;
      setShortUrl(generatedShortUrl);

       await new Promise((resolve) => setTimeout(resolve, 2000));

      // Generate QR Code
      const qrCodeDataUrl = await QRCode.toDataURL(generatedShortUrl);
      setQrCode(qrCodeDataUrl);

      onUrlShortened?.(generatedShortUrl);
      toast.success("URL shortened successfully!");
    } catch (error) {
      toast.error("Failed to shorten URL. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      toast.success("URL copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy URL");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      generateShortUrl();
    }
  };

  const downloadQR = () => {
    try{
      const link = document.createElement("a");
      link.href = qrCode;
      link.download = "short-url-qr.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Downloaded');
    }catch(error){
      toast.error('failed')
    }
  };

  return (
    
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md mx-auto"
    >


      <div className="glass-card rounded-xl p-3 sm:p-4 lg:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-4 sm:mb-6"
        >
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold gradient-text mb-2 sm:mb-3">
            URL Shortener
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base px-1">
            Transform your long URLs into short links
          </p>
        </motion.div>

        <div className="space-y-3 sm:space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <div className="relative">
              <BiLink className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your long URL here..."
                className="w-full pl-10 pr-3 py-2.5 sm:py-3 text-sm sm:text-base bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300 placeholder-gray-400"
                disabled={isLoading}
              />
            </div>
          </motion.div>

          <motion.button
            onClick={generateShortUrl}
            disabled={isLoading || !url.trim()}
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`w-full py-2.5 sm:py-3 px-4 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 ${
              isLoading || !url.trim()
                ? "bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl"
            }`}
          >
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-2"
                >
                  <AiOutlineLoading3Quarters className="animate-spin text-lg" />
                  Generating...
                </motion.div>
              ) : (
                <motion.span
                  key="shorten"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Shorten URL
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <AnimatePresence>
            {shortUrl && (
              <motion.div
                initial={{ opacity: 0, y: 20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -20, height: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="space-y-3"
              >
                <div className="p-3 sm:p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <h3 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    Your shortened URL:
                  </h3>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded-lg border">
                    <span className="flex-1 text-blue-600 dark:text-blue-400 font-mono break-all text-xs sm:text-sm">
                      {shortUrl}
                    </span>
                    <motion.button
                      onClick={copyToClipboard}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full sm:w-auto p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-200"
                    >
                      {copied ? (
                        <BiCheck className="text-lg mx-auto sm:mx-0" />
                      ) : (
                        <BiCopy className="text-lg mx-auto sm:mx-0" />
                      )}
                    </motion.button>
                  </div>
                </div>

                {qrCode && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600"
                  >
                    <h4 className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-2">
                      QR Code
                    </h4>
                    <img
                      src={qrCode}
                      alt="QR Code"
                      className="mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-md"
                    />
                    <button
                      onClick={() => downloadQR()}
                      className="mt-2 px-3 py-1.5 text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-all"
                    >
                      Download QR
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default UrlShortener;
