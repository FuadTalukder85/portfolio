"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Check,
  Copy,
  MapPin,
  Clock,
  Phone,
  ArrowUp,
  QrCode,
} from "lucide-react";

// Real generated QR code SVG path for https://wa.me/8801756867585
const WA_QR_PATH = "M 0,0 l 12,0 0,12 -12,0 z M 12,0 l 12,0 0,12 -12,0 z M 24,0 l 12,0 0,12 -12,0 z M 36,0 l 12,0 0,12 -12,0 z M 48,0 l 12,0 0,12 -12,0 z M 60,0 l 12,0 0,12 -12,0 z M 72,0 l 12,0 0,12 -12,0 z M 120,0 l 12,0 0,12 -12,0 z M 144,0 l 12,0 0,12 -12,0 z M 156,0 l 12,0 0,12 -12,0 z M 192,0 l 12,0 0,12 -12,0 z M 216,0 l 12,0 0,12 -12,0 z M 228,0 l 12,0 0,12 -12,0 z M 240,0 l 12,0 0,12 -12,0 z M 252,0 l 12,0 0,12 -12,0 z M 264,0 l 12,0 0,12 -12,0 z M 276,0 l 12,0 0,12 -12,0 z M 288,0 l 12,0 0,12 -12,0 z M 0,12 l 12,0 0,12 -12,0 z M 72,12 l 12,0 0,12 -12,0 z M 96,12 l 12,0 0,12 -12,0 z M 120,12 l 12,0 0,12 -12,0 z M 156,12 l 12,0 0,12 -12,0 z M 168,12 l 12,0 0,12 -12,0 z M 216,12 l 12,0 0,12 -12,0 z M 288,12 l 12,0 0,12 -12,0 z M 0,24 l 12,0 0,12 -12,0 z M 24,24 l 12,0 0,12 -12,0 z M 36,24 l 12,0 0,12 -12,0 z M 48,24 l 12,0 0,12 -12,0 z M 72,24 l 12,0 0,12 -12,0 z M 144,24 l 12,0 0,12 -12,0 z M 192,24 l 12,0 0,12 -12,0 z M 216,24 l 12,0 0,12 -12,0 z M 240,24 l 12,0 0,12 -12,0 z M 252,24 l 12,0 0,12 -12,0 z M 264,24 l 12,0 0,12 -12,0 z M 288,24 l 12,0 0,12 -12,0 z M 0,36 l 12,0 0,12 -12,0 z M 24,36 l 12,0 0,12 -12,0 z M 36,36 l 12,0 0,12 -12,0 z M 48,36 l 12,0 0,12 -12,0 z M 72,36 l 12,0 0,12 -12,0 z M 96,36 l 12,0 0,12 -12,0 z M 108,36 l 12,0 0,12 -12,0 z M 120,36 l 12,0 0,12 -12,0 z M 144,36 l 12,0 0,12 -12,0 z M 180,36 l 12,0 0,12 -12,0 z M 216,36 l 12,0 0,12 -12,0 z M 240,36 l 12,0 0,12 -12,0 z M 252,36 l 12,0 0,12 -12,0 z M 264,36 l 12,0 0,12 -12,0 z M 288,36 l 12,0 0,12 -12,0 z M 0,48 l 12,0 0,12 -12,0 z M 24,48 l 12,0 0,12 -12,0 z M 36,48 l 12,0 0,12 -12,0 z M 48,48 l 12,0 0,12 -12,0 z M 72,48 l 12,0 0,12 -12,0 z M 108,48 l 12,0 0,12 -12,0 z M 180,48 l 12,0 0,12 -12,0 z M 216,48 l 12,0 0,12 -12,0 z M 240,48 l 12,0 0,12 -12,0 z M 252,48 l 12,0 0,12 -12,0 z M 264,48 l 12,0 0,12 -12,0 z M 288,48 l 12,0 0,12 -12,0 z M 0,60 l 12,0 0,12 -12,0 z M 72,60 l 12,0 0,12 -12,0 z M 96,60 l 12,0 0,12 -12,0 z M 108,60 l 12,0 0,12 -12,0 z M 132,60 l 12,0 0,12 -12,0 z M 144,60 l 12,0 0,12 -12,0 z M 168,60 l 12,0 0,12 -12,0 z M 180,60 l 12,0 0,12 -12,0 z M 216,60 l 12,0 0,12 -12,0 z M 288,60 l 12,0 0,12 -12,0 z M 0,72 l 12,0 0,12 -12,0 z M 12,72 l 12,0 0,12 -12,0 z M 24,72 l 12,0 0,12 -12,0 z M 36,72 l 12,0 0,12 -12,0 z M 48,72 l 12,0 0,12 -12,0 z M 60,72 l 12,0 0,12 -12,0 z M 72,72 l 12,0 0,12 -12,0 z M 96,72 l 12,0 0,12 -12,0 z M 120,72 l 12,0 0,12 -12,0 z M 144,72 l 12,0 0,12 -12,0 z M 168,72 l 12,0 0,12 -12,0 z M 192,72 l 12,0 0,12 -12,0 z M 216,72 l 12,0 0,12 -12,0 z M 228,72 l 12,0 0,12 -12,0 z M 240,72 l 12,0 0,12 -12,0 z M 252,72 l 12,0 0,12 -12,0 z M 264,72 l 12,0 0,12 -12,0 z M 276,72 l 12,0 0,12 -12,0 z M 288,72 l 12,0 0,12 -12,0 z M 108,84 l 12,0 0,12 -12,0 z M 120,84 l 12,0 0,12 -12,0 z M 132,84 l 12,0 0,12 -12,0 z M 168,84 l 12,0 0,12 -12,0 z M 0,96 l 12,0 0,12 -12,0 z M 12,96 l 12,0 0,12 -12,0 z M 24,96 l 12,0 0,12 -12,0 z M 36,96 l 12,0 0,12 -12,0 z M 48,96 l 12,0 0,12 -12,0 z M 72,96 l 12,0 0,12 -12,0 z M 84,96 l 12,0 0,12 -12,0 z M 96,96 l 12,0 0,12 -12,0 z M 108,96 l 12,0 0,12 -12,0 z M 132,96 l 12,0 0,12 -12,0 z M 156,96 l 12,0 0,12 -12,0 z M 168,96 l 12,0 0,12 -12,0 z M 180,96 l 12,0 0,12 -12,0 z M 204,96 l 12,0 0,12 -12,0 z M 228,96 l 12,0 0,12 -12,0 z M 252,96 l 12,0 0,12 -12,0 z M 276,96 l 12,0 0,12 -12,0 z M 96,108 l 12,0 0,12 -12,0 z M 120,108 l 12,0 0,12 -12,0 z M 144,108 l 12,0 0,12 -12,0 z M 156,108 l 12,0 0,12 -12,0 z M 168,108 l 12,0 0,12 -12,0 z M 192,108 l 12,0 0,12 -12,0 z M 228,108 l 12,0 0,12 -12,0 z M 276,108 l 12,0 0,12 -12,0 z M 0,120 l 12,0 0,12 -12,0 z M 24,120 l 12,0 0,12 -12,0 z M 36,120 l 12,0 0,12 -12,0 z M 48,120 l 12,0 0,12 -12,0 z M 60,120 l 12,0 0,12 -12,0 z M 72,120 l 12,0 0,12 -12,0 z M 96,120 l 12,0 0,12 -12,0 z M 120,120 l 12,0 0,12 -12,0 z M 168,120 l 12,0 0,12 -12,0 z M 180,120 l 12,0 0,12 -12,0 z M 192,120 l 12,0 0,12 -12,0 z M 216,120 l 12,0 0,12 -12,0 z M 228,120 l 12,0 0,12 -12,0 z M 240,120 l 12,0 0,12 -12,0 z M 252,120 l 12,0 0,12 -12,0 z M 276,120 l 12,0 0,12 -12,0 z M 288,120 l 12,0 0,12 -12,0 z M 48,132 l 12,0 0,12 -12,0 z M 60,132 l 12,0 0,12 -12,0 z M 84,132 l 12,0 0,12 -12,0 z M 144,132 l 12,0 0,12 -12,0 z M 168,132 l 12,0 0,12 -12,0 z M 180,132 l 12,0 0,12 -12,0 z M 192,132 l 12,0 0,12 -12,0 z M 204,132 l 12,0 0,12 -12,0 z M 216,132 l 12,0 0,12 -12,0 z M 228,132 l 12,0 0,12 -12,0 z M 288,132 l 12,0 0,12 -12,0 z M 12,144 l 12,0 0,12 -12,0 z M 72,144 l 12,0 0,12 -12,0 z M 84,144 l 12,0 0,12 -12,0 z M 96,144 l 12,0 0,12 -12,0 z M 108,144 l 12,0 0,12 -12,0 z M 120,144 l 12,0 0,12 -12,0 z M 144,144 l 12,0 0,12 -12,0 z M 168,144 l 12,0 0,12 -12,0 z M 216,144 l 12,0 0,12 -12,0 z M 228,144 l 12,0 0,12 -12,0 z M 240,144 l 12,0 0,12 -12,0 z M 264,144 l 12,0 0,12 -12,0 z M 276,144 l 12,0 0,12 -12,0 z M 288,144 l 12,0 0,12 -12,0 z M 0,156 l 12,0 0,12 -12,0 z M 12,156 l 12,0 0,12 -12,0 z M 24,156 l 12,0 0,12 -12,0 z M 36,156 l 12,0 0,12 -12,0 z M 48,156 l 12,0 0,12 -12,0 z M 96,156 l 12,0 0,12 -12,0 z M 108,156 l 12,0 0,12 -12,0 z M 156,156 l 12,0 0,12 -12,0 z M 168,156 l 12,0 0,12 -12,0 z M 180,156 l 12,0 0,12 -12,0 z M 228,156 l 12,0 0,12 -12,0 z M 252,156 l 12,0 0,12 -12,0 z M 276,156 l 12,0 0,12 -12,0 z M 0,168 l 12,0 0,12 -12,0 z M 36,168 l 12,0 0,12 -12,0 z M 48,168 l 12,0 0,12 -12,0 z M 60,168 l 12,0 0,12 -12,0 z M 72,168 l 12,0 0,12 -12,0 z M 108,168 l 12,0 0,12 -12,0 z M 120,168 l 12,0 0,12 -12,0 z M 132,168 l 12,0 0,12 -12,0 z M 144,168 l 12,0 0,12 -12,0 z M 168,168 l 12,0 0,12 -12,0 z M 180,168 l 12,0 0,12 -12,0 z M 204,168 l 12,0 0,12 -12,0 z M 228,168 l 12,0 0,12 -12,0 z M 240,168 l 12,0 0,12 -12,0 z M 252,168 l 12,0 0,12 -12,0 z M 276,168 l 12,0 0,12 -12,0 z M 288,168 l 12,0 0,12 -12,0 z M 0,180 l 12,0 0,12 -12,0 z M 36,180 l 12,0 0,12 -12,0 z M 60,180 l 12,0 0,12 -12,0 z M 96,180 l 12,0 0,12 -12,0 z M 120,180 l 12,0 0,12 -12,0 z M 132,180 l 12,0 0,12 -12,0 z M 168,180 l 12,0 0,12 -12,0 z M 180,180 l 12,0 0,12 -12,0 z M 228,180 l 12,0 0,12 -12,0 z M 240,180 l 12,0 0,12 -12,0 z M 288,180 l 12,0 0,12 -12,0 z M 0,192 l 12,0 0,12 -12,0 z M 24,192 l 12,0 0,12 -12,0 z M 36,192 l 12,0 0,12 -12,0 z M 72,192 l 12,0 0,12 -12,0 z M 84,192 l 12,0 0,12 -12,0 z M 96,192 l 12,0 0,12 -12,0 z M 108,192 l 12,0 0,12 -12,0 z M 120,192 l 12,0 0,12 -12,0 z M 132,192 l 12,0 0,12 -12,0 z M 156,192 l 12,0 0,12 -12,0 z M 168,192 l 12,0 0,12 -12,0 z M 180,192 l 12,0 0,12 -12,0 z M 192,192 l 12,0 0,12 -12,0 z M 204,192 l 12,0 0,12 -12,0 z M 216,192 l 12,0 0,12 -12,0 z M 228,192 l 12,0 0,12 -12,0 z M 240,192 l 12,0 0,12 -12,0 z M 264,192 l 12,0 0,12 -12,0 z M 96,204 l 12,0 0,12 -12,0 z M 108,204 l 12,0 0,12 -12,0 z M 144,204 l 12,0 0,12 -12,0 z M 156,204 l 12,0 0,12 -12,0 z M 168,204 l 12,0 0,12 -12,0 z M 180,204 l 12,0 0,12 -12,0 z M 192,204 l 12,0 0,12 -12,0 z M 240,204 l 12,0 0,12 -12,0 z M 252,204 l 12,0 0,12 -12,0 z M 0,216 l 12,0 0,12 -12,0 z M 12,216 l 12,0 0,12 -12,0 z M 24,216 l 12,0 0,12 -12,0 z M 36,216 l 12,0 0,12 -12,0 z M 48,216 l 12,0 0,12 -12,0 z M 60,216 l 12,0 0,12 -12,0 z M 72,216 l 12,0 0,12 -12,0 z M 96,216 l 12,0 0,12 -12,0 z M 108,216 l 12,0 0,12 -12,0 z M 156,216 l 12,0 0,12 -12,0 z M 192,216 l 12,0 0,12 -12,0 z M 216,216 l 12,0 0,12 -12,0 z M 240,216 l 12,0 0,12 -12,0 z M 264,216 l 12,0 0,12 -12,0 z M 276,216 l 12,0 0,12 -12,0 z M 288,216 l 12,0 0,12 -12,0 z M 0,228 l 12,0 0,12 -12,0 z M 72,228 l 12,0 0,12 -12,0 z M 144,228 l 12,0 0,12 -12,0 z M 168,228 l 12,0 0,12 -12,0 z M 180,228 l 12,0 0,12 -12,0 z M 192,228 l 12,0 0,12 -12,0 z M 240,228 l 12,0 0,12 -12,0 z M 252,228 l 12,0 0,12 -12,0 z M 276,228 l 12,0 0,12 -12,0 z M 288,228 l 12,0 0,12 -12,0 z M 0,240 l 12,0 0,12 -12,0 z M 24,240 l 12,0 0,12 -12,0 z M 36,240 l 12,0 0,12 -12,0 z M 48,240 l 12,0 0,12 -12,0 z M 72,240 l 12,0 0,12 -12,0 z M 96,240 l 12,0 0,12 -12,0 z M 108,240 l 12,0 0,12 -12,0 z M 144,240 l 12,0 0,12 -12,0 z M 156,240 l 12,0 0,12 -12,0 z M 180,240 l 12,0 0,12 -12,0 z M 192,240 l 12,0 0,12 -12,0 z M 204,240 l 12,0 0,12 -12,0 z M 216,240 l 12,0 0,12 -12,0 z M 228,240 l 12,0 0,12 -12,0 z M 240,240 l 12,0 0,12 -12,0 z M 264,240 l 12,0 0,12 -12,0 z M 276,240 l 12,0 0,12 -12,0 z M 0,252 l 12,0 0,12 -12,0 z M 24,252 l 12,0 0,12 -12,0 z M 36,252 l 12,0 0,12 -12,0 z M 48,252 l 12,0 0,12 -12,0 z M 72,252 l 12,0 0,12 -12,0 z M 96,252 l 12,0 0,12 -12,0 z M 120,252 l 12,0 0,12 -12,0 z M 156,252 l 12,0 0,12 -12,0 z M 204,252 l 12,0 0,12 -12,0 z M 216,252 l 12,0 0,12 -12,0 z M 240,252 l 12,0 0,12 -12,0 z M 252,252 l 12,0 0,12 -12,0 z M 264,252 l 12,0 0,12 -12,0 z M 288,252 l 12,0 0,12 -12,0 z M 0,264 l 12,0 0,12 -12,0 z M 24,264 l 12,0 0,12 -12,0 z M 36,264 l 12,0 0,12 -12,0 z M 48,264 l 12,0 0,12 -12,0 z M 72,264 l 12,0 0,12 -12,0 z M 96,264 l 12,0 0,12 -12,0 z M 108,264 l 12,0 0,12 -12,0 z M 132,264 l 12,0 0,12 -12,0 z M 144,264 l 12,0 0,12 -12,0 z M 252,264 l 12,0 0,12 -12,0 z M 264,264 l 12,0 0,12 -12,0 z M 288,264 l 12,0 0,12 -12,0 z M 0,276 l 12,0 0,12 -12,0 z M 72,276 l 12,0 0,12 -12,0 z M 96,276 l 12,0 0,12 -12,0 z M 120,276 l 12,0 0,12 -12,0 z M 132,276 l 12,0 0,12 -12,0 z M 180,276 l 12,0 0,12 -12,0 z M 192,276 l 12,0 0,12 -12,0 z M 204,276 l 12,0 0,12 -12,0 z M 228,276 l 12,0 0,12 -12,0 z M 240,276 l 12,0 0,12 -12,0 z M 252,276 l 12,0 0,12 -12,0 z M 288,276 l 12,0 0,12 -12,0 z M 0,288 l 12,0 0,12 -12,0 z M 12,288 l 12,0 0,12 -12,0 z M 24,288 l 12,0 0,12 -12,0 z M 36,288 l 12,0 0,12 -12,0 z M 48,288 l 12,0 0,12 -12,0 z M 60,288 l 12,0 0,12 -12,0 z M 72,288 l 12,0 0,12 -12,0 z M 96,288 l 12,0 0,12 -12,0 z M 132,288 l 12,0 0,12 -12,0 z M 144,288 l 12,0 0,12 -12,0 z M 204,288 l 12,0 0,12 -12,0 z M 216,288 l 12,0 0,12 -12,0 z M 228,288 l 12,0 0,12 -12,0 z M 240,288 l 12,0 0,12 -12,0 z M 252,288 l 12,0 0,12 -12,0 z M 264,288 l 12,0 0,12 -12,0 z M 276,288 l 12,0 0,12 -12,0 z M 288,288 l 12,0 0,12 -12,0 z";

export default function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [localTime, setLocalTime] = useState<string>("");

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Update Dhaka local time live
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Dhaka",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      const formatted = new Intl.DateTimeFormat("en-US", options).format(new Date());
      setLocalTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("fuadtalukder25@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({ name: "", email: "", message: "" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="contact"
      className="bg-[#090a0c] text-white py-24 px-4 min-h-screen relative overflow-hidden font-sans border-t border-gray-900"
    >
      {/* Ambient Background Glows */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#d4ff00]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Badge & Title */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 text-xs font-mono text-gray-300 mb-4 bg-[#141518] px-4 py-2 rounded-full border border-gray-800 shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4ff00] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d4ff00]"></span>
            </span>
            <span>&#123;04&#125; Get In Touch</span>
            <span className="text-gray-600">•</span>
            <span className="text-gray-400 font-sans">Available for new projects</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight"
          >
            Let&apos;s build something <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-[#1e1e1e]">
              extraordinary together.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 text-base md:text-lg leading-relaxed"
          >
            Have a project in mind, need a full-stack engineer, or just want to say hi? Fill out the brief below or scan WhatsApp for instant chat.
          </motion.p>
        </div>

        {/* Main Content Grid: Direct Contact Cards (Left) + Brief Form (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center jusify-center">

          {/* Left Column: Direct Email, Location, & WhatsApp Scanner */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Direct Email Card */}
            <div className="group relative  border border-gray-800/80 rounded-lg p-6 hover:border-[#d4ff00]/40 transition-all duration-300 shadow-lg overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4ff00]/3 rounded-bl-full pointer-events-none transition-colors" />
              <div className="flex items-center justify-between mb-3">
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gray-400">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>Direct Email</span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 text-xs font-mono bg-[#1c1d22] text-gray-300 hover:text-white px-3 py-1.5 rounded-lg border border-gray-700 hover:border-[#d4ff00]/60 transition-all active:scale-95 cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#d4ff00]" />
                      <span className="text-[#d4ff00]">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-gray-400" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <a
                href="mailto:fuadtalukder25@gmail.com"
                className="block text-lg sm:text-xl font-semibold text-white group-hover:text-[#d4ff00] transition-colors break-all"
              >
                fuadtalukder25@gmail.com
              </a>
            </div>

            {/* WhatsApp Scanner Card */}
            <div className=" border border-gray-800/80 rounded-lg p-6 hover:border-[#25D366]/50 transition-all duration-300 shadow-lg relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gray-400">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>WhatsApp Instant Chat</span>
                </div>
                <span className="text-[11px] font-mono bg-green-500/10 text-gray-400 px-2.5 py-0.5 rounded-full border border-green-500/20">
                  Instant
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* Scannable WhatsApp QR Code Frame */}
                <a
                  href="https://wa.me/8801756867585"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative shrink-0 p-2.5 bg-[#0d0e12] border border-gray-800 rounded-xl hover:border-[#25D366] transition-all cursor-pointer flex flex-col items-center"
                >
                  {/* Target Bracket Corners */}
                  <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-gray-600 group-hover:border-[#25D366] transition-colors" />
                  <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-gray-600 group-hover:border-[#25D366] transition-colors" />
                  <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-gray-600 group-hover:border-[#25D366] transition-colors" />
                  <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-gray-600 group-hover:border-[#25D366] transition-colors" />

                  <div className="relative w-32 h-32 bg-white p-2 rounded-lg flex items-center justify-center overflow-hidden">
                    <svg viewBox="0 0 300 300" className="w-full h-full">
                      <path fill="#000" d={WA_QR_PATH} />
                    </svg>

                    {/* Central WhatsApp Badge */}
                    <div className="absolute w-7 h-7 bg-[#25D366] rounded-full flex items-center justify-center shadow-md border-2 border-white">
                      <Phone className="w-3.5 h-3.5 text-white fill-white" />
                    </div>
                  </div>
                </a>

                {/* Info Text & Phone Number */}
                <div className="space-y-2 text-center sm:text-left">
                  <p className="text-lg font-semibold text-white font-mono">
                    +880 1756-867585
                  </p>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Scan the QR code or click to jump straight into a direct WhatsApp message.
                  </p>
                  <a
                    href="https://wa.me/8801756867585"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#25D366] hover:underline pt-1"
                  >
                    <span>Open WhatsApp Chat &rarr;</span>
                  </a>
                  <p className="text-xs text-gray-500 mt-2">
                    Typically replies within 1–2 hours on weekdays.
                  </p>
                </div>
              </div>
            </div>

            {/* Location & Local Time Card */}
            <div className=" border border-gray-800/80 rounded-lg p-6 shadow-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#1c1d22] rounded-xl border border-gray-800 text-gray-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-gray-400">Location</p>
                  <p className="text-sm font-semibold text-white">Dhaka, Bangladesh</p>
                </div>
              </div>

              <div className="text-right border-l border-gray-800 pl-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-400 mb-0.5">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  <span>UTC +6</span>
                </div>
                <p className="text-xs font-mono font-medium text-gray-300">{localTime || "--:--:--"}</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: ◊ §02 — THE BRIEF (Matching ContactView.tsx / Screenshot) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative lg:col-span-7 border border-gray-800/80 rounded-lg p-6 sm:p-8 shadow-2xl relative"
          >
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#d4ff00]/2 rounded-tr-full pointer-events-none group-hover:bg-[#d4ff00]/10 transition-colors" />
            <p className="font-sans text-[10px] uppercase tracking-widest text-white/55 mb-6">
              ◊ §02 — THE BRIEF
            </p>

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-12 border-t border-white/15"
                >
                  <p className="font-serif text-2xl text-white">
                    Thank you. Your inquiry has been received.
                  </p>
                  <p className="mt-3 font-sans text-sm text-white/65">
                    I will review your message and get back to you within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="mt-6 rounded-full border border-white/30 px-5 py-2 font-sans text-[10px] uppercase tracking-widest text-white hover:border-white transition-colors cursor-pointer"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* YOUR NAME */}
                    <label className="block">
                      <span className="font-sans text-[10px] uppercase tracking-widest text-white/65">
                        YOUR NAME <span className="text-[#d4ff00]">*</span>
                      </span>
                      <input
                        type="text"
                        required
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-2 w-full border-b border-white/15 bg-transparent py-2.5 font-serif text-lg leading-snug text-white placeholder:text-white/35 transition-colors focus:border-white focus:outline-none"
                      />
                    </label>

                    {/* EMAIL ADDRESS */}
                    <label className="block">
                      <span className="font-sans text-[10px] uppercase tracking-widest text-white/65">
                        EMAIL ADDRESS <span className="text-[#d4ff00]">*</span>
                      </span>
                      <input
                        type="email"
                        required
                        placeholder="hello@studio.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-2 w-full border-b border-white/15 bg-transparent py-2.5 font-serif text-lg leading-snug text-white placeholder:text-white/35 transition-colors focus:border-white focus:outline-none"
                      />
                    </label>
                  </div>

                  {/* PROJECT DETAILS */}
                  <div>
                    <label className="block font-sans text-[10px] uppercase tracking-widest text-white/65 mb-3">
                      ◊ PROJECT DETAILS
                    </label>
                    <textarea
                      rows={5}
                      required
                      maxLength={3000}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me what you’re building, the audience, the vibe, the rough timeline…"
                      className="w-full resize-none rounded-lg border border-white/15 bg-transparent px-4 py-3.5 font-sans text-base leading-relaxed text-white placeholder:text-white/40 transition-colors focus:border-white focus:outline-none"
                    />
                    <p className="mt-2 text-right font-sans text-[10px] uppercase tracking-widest text-white/45">
                      {formData.message.length} / 3000
                    </p>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="rounded-full bg-white hover:bg-gray-200 px-7 py-3.5 font-sans text-[11px] uppercase tracking-widest text-black font-semibold transition-colors disabled:opacity-60 cursor-pointer"
                    >
                      {isSubmitting ? "SENDING…" : "SEND INQUIRY"}
                    </button>
                  </div>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Footer Navigation Bar */}
        <div className="mt-24 pt-8 border-t border-gray-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
          <div>
            <span>&copy; {new Date().getFullYear()} Fuad Talukder. All rights reserved.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 bg-[#141518] hover:bg-[#1c1d22] text-gray-400 hover:text-[#d4ff00] px-4 py-2 rounded-full border border-gray-800 transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
