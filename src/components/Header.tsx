"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "./AppContext";
import {
  Globe,
  Eye,
  Menu,
  X,
  Landmark,
  Award,
  Shield,
  FileText,
  Info,
  HelpCircle,
} from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const {
    language,
    setLanguage,
    t,
    fontSize,
    setFontSize,
    highContrast,
    setHighContrast,
    dyslexiaFont,
    setDyslexiaFont,
    ttsEnabled,
    setTtsEnabled,
    currentRole,
    setCurrentRole,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accessPanelOpen, setAccessPanelOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: t("home"), icon: Landmark },
    { href: "/about", label: t("about"), icon: Info },
    { href: "/citizen", label: t("citizenPortal"), icon: Award },
    { href: "/map", label: t("map"), icon: Globe },
    { href: "/museum", label: t("museum"), icon: Landmark },
    { href: "/procurement", label: t("procurement"), icon: FileText },
    { href: "/media", label: t("media"), icon: FileText },
  ];

  const toggleLanguage = (lang: "en" | "ib" | "an" | "or") => {
    setLanguage(lang);
    setLangMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#C7A349]/40 bg-[#0B5E3C] text-white shadow-xl transition-colors duration-300">
      {/* Top Banner: State Subtitle & Accessibility Controls */}
      <div className="w-full border-b border-white/10 bg-[#073c26] text-xs py-1.5 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse shadow-sm"></span>
            <span className="font-semibold tracking-wider uppercase opacity-95 text-[11px] sm:text-xs">
              {t("subtitle")} • The Land of Promise
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Quick Access Action */}
            <button
              onClick={() => {
                setAccessPanelOpen(!accessPanelOpen);
                setLangMenuOpen(false);
              }}
              className="flex items-center gap-1.5 opacity-90 hover:opacity-100 text-[#C7A349] hover:text-white transition-all font-medium"
              aria-label="Accessibility settings"
            >
              <Eye size={14} />
              <span className="inline">{t("accessibilityMode")}</span>
            </button>

            {/* Active Simulation Role Selector */}
            <div className="flex items-center gap-1.5 border-l border-white/20 pl-3">
              <span className="opacity-75 text-[10px] sm:text-xs hidden sm:inline">
                Role:
              </span>
              <select
                value={currentRole}
                onChange={(e) => setCurrentRole(e.target.value as any)}
                className="bg-[#0B5E3C] border border-[#C7A349]/60 text-white rounded px-2 py-0.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#C7A349] cursor-pointer"
              >
                <option value="CITIZEN">Citizen</option>
                <option value="STAFF">Govt Staff</option>
                <option value="ADMIN">System Admin</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3.5 gap-4">
      
        <Link
          href="/"
          className="flex items-center gap-2 sm:gap-3.5 group min-w-0 mr-1 flex-1 sm:flex-initial"
        >
          <img
            src="https://res.cloudinary.com/duweg8kpv/image/upload/v1777919226/ak-removebg-preview_cuhg4u.png"
            alt="Ministry of Arts,Culture"
            className="h-8 w-auto object-contain grayscale brightness-50 contrast-200"
          />
          <div className="flex flex-col justify-center min-w-0">
            <h1 className="font-playfair text-[10px] xs:text-xs sm:text-sm md:text-base font-bold tracking-tight text-[#FAF8F5] leading-tight group-hover:text-[#C7A349] transition-colors truncate xs:whitespace-normal">
              Ministry of Arts, Culture & Creative Economy
            </h1>
            <span className="text-[9px] sm:text-xs font-semibold tracking-wider text-[#C7A349] uppercase">
              Akwa Ibom State
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 rounded-md text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? "text-[#C7A349] bg-white/10 font-bold"
                    : "text-white/85 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 h-[2px] w-2/3 -translate-x-1/2 bg-[#C7A349] rounded-full"></span>
                )}
              </Link>
            );
          })}

          {/* Admin link depending on simulated role */}
          {currentRole !== "CITIZEN" && (
            <Link
              href="/admin"
              className={`px-3 py-2 rounded-md text-xs font-semibold tracking-wide transition-all flex items-center gap-1 border border-dashed border-[#C7A349] text-[#C7A349] bg-[#C7A349]/10 hover:bg-[#C7A349]/20 ml-1`}
            >
              <Shield size={14} />
              {t("admin")}
            </Link>
          )}
        </nav>

        {/* Global Controls: Language & Mobile Menu Trigger */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setLangMenuOpen(!langMenuOpen);
                setAccessPanelOpen(false);
              }}
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-md px-2.5 py-1.5 text-xs font-semibold transition-all"
              aria-label="Language selection"
            >
              <Globe size={15} className="text-[#C7A349]" />
              <span className="uppercase text-xs font-bold">
                {language === "ib"
                  ? "IB"
                  : language === "an"
                    ? "AN"
                    : language === "or"
                      ? "OR"
                      : "EN"}
              </span>
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 rounded-md bg-white text-gray-800 shadow-2xl border border-gray-200 py-1 z-50 animate-fade-in">
                <button
                  onClick={() => toggleLanguage("en")}
                  className="flex w-full items-center px-4 py-2 text-xs font-semibold hover:bg-gray-100 text-left"
                >
                  English (EN)
                </button>
                <button
                  onClick={() => toggleLanguage("ib")}
                  className="flex w-full items-center px-4 py-2 text-xs font-semibold hover:bg-gray-100 text-left"
                >
                  Ibibio (IB)
                </button>
                <button
                  onClick={() => toggleLanguage("an")}
                  className="flex w-full items-center px-4 py-2 text-xs font-semibold hover:bg-gray-100 text-left"
                >
                  Annang (AN)
                </button>
                <button
                  onClick={() => toggleLanguage("or")}
                  className="flex w-full items-center px-4 py-2 text-xs font-semibold hover:bg-gray-100 text-left"
                >
                  Oron (OR)
                </button>
                <button
                  onClick={() => toggleLanguage("ib")}
                  className="flex w-full items-center px-4 py-2 text-xs font-semibold hover:bg-gray-100 text-left"
                >
                  Eket (EK)
                </button>
              </div>
            )}
          </div>

          {/* Mobile & Tablet Navigation Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-md hover:bg-white/15 border border-white/20 transition-all text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ACCESSIBILITY SETTINGS PANEL OVERLAY */}
      {accessPanelOpen && (
        <div className="w-full bg-[#111A2E] text-white border-y-2 border-[#C7A349] p-6 shadow-2xl transition-all duration-300">
          <div className="mx-auto max-w-5xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <h3 className="font-playfair text-base sm:text-lg font-bold text-[#C7A349] flex items-center gap-2">
                <Eye size={20} />
                Accessibility Options Dashboard
              </h3>
              <button
                onClick={() => setAccessPanelOpen(false)}
                className="text-white/60 hover:text-white p-1"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Text Resize */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-white/70">
                  Text Scaling
                </h4>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setFontSize("normal")}
                    className={`flex-1 py-1.5 text-xs font-bold rounded border ${fontSize === "normal" ? "bg-[#0B5E3C] border-[#C7A349]" : "border-white/20 hover:bg-white/5"}`}
                  >
                    100%
                  </button>
                  <button
                    onClick={() => setFontSize("large")}
                    className={`flex-1 py-1.5 text-xs font-bold rounded border ${fontSize === "large" ? "bg-[#0B5E3C] border-[#C7A349]" : "border-white/20 hover:bg-white/5"}`}
                  >
                    125%
                  </button>
                  <button
                    onClick={() => setFontSize("xlarge")}
                    className={`flex-1 py-1.5 text-xs font-bold rounded border ${fontSize === "xlarge" ? "bg-[#0B5E3C] border-[#C7A349]" : "border-white/20 hover:bg-white/5"}`}
                  >
                    150%
                  </button>
                </div>
              </div>

              {/* High Contrast Mode */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-white/70">
                  High Contrast
                </h4>
                <button
                  onClick={() => setHighContrast(!highContrast)}
                  className={`w-full py-2 text-xs font-bold rounded border transition-all ${highContrast ? "bg-yellow-400 text-black border-yellow-500" : "border-white/20 hover:bg-white/5"}`}
                >
                  {highContrast
                    ? "High Contrast: ENABLED"
                    : "Enable High Contrast"}
                </button>
              </div>

              {/* Dyslexia Friendly font */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-white/70">
                  Dyslexia Spacing
                </h4>
                <button
                  onClick={() => setDyslexiaFont(!dyslexiaFont)}
                  className={`w-full py-2 text-xs font-bold rounded border transition-all ${dyslexiaFont ? "bg-[#0B5E3C] border-[#C7A349]" : "border-white/20 hover:bg-white/5"}`}
                >
                  {dyslexiaFont
                    ? "Font Dyslexic: ACTIVE"
                    : "Enable Friendly Font"}
                </button>
              </div>

              {/* Text To Speech */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-white/70">
                  Voice Narration Reader
                </h4>
                <button
                  onClick={() => setTtsEnabled(!ttsEnabled)}
                  className={`w-full py-2 text-xs font-bold rounded border transition-all ${ttsEnabled ? "bg-amber-600 border-amber-500" : "border-white/20 hover:bg-white/5"}`}
                >
                  {ttsEnabled ? "Speech Reader: ACTIVE" : "Enable Voice Guide"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Mobile & Tablet Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="xl:hidden w-full bg-[#073c26] border-t border-[#C7A349]/30 p-6 space-y-3 shadow-2xl animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 p-3 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-[#C7A349] text-white"
                      : "bg-white/5 hover:bg-white/10 text-white/90"
                  }`}
                >
                  <Icon
                    size={18}
                    className={isActive ? "text-white" : "text-[#C7A349]"}
                  />
                  {link.label}
                </Link>
              );
            })}

            {currentRole !== "CITIZEN" && (
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg text-sm font-semibold bg-[#C7A349]/20 text-[#C7A349] border border-[#C7A349]/40"
              >
                <Shield size={18} />
                {t("admin")}
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
