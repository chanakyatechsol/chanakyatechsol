import { useEffect, useRef, useState } from "react";

function ServiceImagePlaceholder({ src, alt, className }) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div className={`bg-gradient-to-br from-sky-900 via-slate-800 to-sky-950 text-white flex flex-col items-center justify-center p-6 text-center relative overflow-hidden ${className}`}>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0ea5e9_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="w-12 h-12 rounded-full bg-sky-500/20 flex items-center justify-center mb-3 border border-sky-400/30">
          <svg className="w-6 h-6 text-sky-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <span className="text-xs font-bold tracking-wider text-sky-200 uppercase mb-1">{alt}</span>
        <span className="text-[11px] font-mono text-sky-300/80 bg-black/40 px-2.5 py-0.5 rounded border border-sky-500/20">
          Image Placeholder: {src}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
    />
  );
}

function HeaderWaterAnimation() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 76);

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight || 76;
      }
    };
    window.addEventListener("resize", handleResize);

    let step = 0;
    let boatX = -45;
    const particles = Array.from({ length: 24 }, () => ({
      x: Math.random() * (width || 1200),
      y: height - Math.random() * 20,
      r: Math.random() * 1.8 + 0.8,
      speed: Math.random() * 0.4 + 0.2,
      opacity: Math.random() * 0.6 + 0.3
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      step += 0.025;

      // 1. Sky & Atmospheric Gradient
      const skyGrad = ctx.createLinearGradient(0, 0, width, height);
      skyGrad.addColorStop(0, "#e2e8f0");    // Mountain Dawn Slate
      skyGrad.addColorStop(0.35, "#ecfdf5"); // Forest Emerald Air
      skyGrad.addColorStop(0.7, "#f0f9ff");  // City Light Sky
      skyGrad.addColorStop(1, "#bae6fd");    // Water Horizon
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      const zone1 = width * 0.33;
      const zone2 = width * 0.67;

      // ==========================================
      // ZONE 1: REALISTIC MULTI-LAYER MOUNTAINS
      // ==========================================
      // Background Distant Ridge
      ctx.fillStyle = "#94a3b8";
      ctx.globalAlpha = 0.45;
      ctx.beginPath();
      ctx.moveTo(-10, height);
      ctx.lineTo(zone1 * 0.2, 14);
      ctx.lineTo(zone1 * 0.45, 38);
      ctx.lineTo(zone1 * 0.75, 10);
      ctx.lineTo(zone1 * 1.1, height);
      ctx.closePath();
      ctx.fill();

      // Foreground Shaded Mountains with Snow Caps
      ctx.globalAlpha = 0.85;
      const drawMountainPeak = (x, y, w, h, baseColor, snowColor) => {
        // Left Sunny Slope
        ctx.fillStyle = baseColor;
        ctx.beginPath();
        ctx.moveTo(x - w / 2, height);
        ctx.lineTo(x, y);
        ctx.lineTo(x, height);
        ctx.closePath();
        ctx.fill();

        // Right Shadowed Slope
        ctx.fillStyle = "#334155";
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + w / 2, height);
        ctx.lineTo(x, height);
        ctx.closePath();
        ctx.fill();

        // Snow Cap
        ctx.fillStyle = snowColor;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - w * 0.14, y + h * 0.24);
        ctx.lineTo(x - w * 0.05, y + h * 0.18);
        ctx.lineTo(x + w * 0.08, y + h * 0.26);
        ctx.lineTo(x + w * 0.14, y + h * 0.22);
        ctx.closePath();
        ctx.fill();
      };

      drawMountainPeak(zone1 * 0.25, 12, zone1 * 0.5, height - 12, "#475569", "#ffffff");
      drawMountainPeak(zone1 * 0.6, 6, zone1 * 0.55, height - 6, "#64748b", "#f8fafc");
      drawMountainPeak(zone1 * 0.9, 16, zone1 * 0.45, height - 16, "#475569", "#f1f5f9");
      ctx.globalAlpha = 1.0;

      // ==========================================
      // ZONE 2: REALISTIC EVERGREEN FOREST
      // ==========================================
      ctx.fillStyle = "#064e3b";
      ctx.globalAlpha = 0.45;
      ctx.beginPath();
      ctx.moveTo(zone1 - 20, height);
      for (let x = zone1 - 20; x <= zone2 + 20; x += 15) {
        ctx.lineTo(x, height - 24 - Math.sin(x * 0.05) * 6);
      }
      ctx.lineTo(zone2 + 20, height);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1.0;

      const drawDetailedTree = (x, treeH, scale = 1, leafColor = "#059669") => {
        // Tree Trunk
        ctx.fillStyle = "#451a03";
        ctx.fillRect(x - 1.5 * scale, height - 14, 3 * scale, 14);

        // Tiered Evergreen Canopy
        ctx.fillStyle = leafColor;
        const tiers = 4;
        for (let t = 0; t < tiers; t++) {
          const tierY = height - 14 - (treeH * (t + 1)) / tiers;
          const tierW = (16 - t * 3) * scale;
          ctx.beginPath();
          ctx.moveTo(x, tierY - 4 * scale);
          ctx.lineTo(x - tierW / 2, tierY + 5 * scale);
          ctx.lineTo(x + tierW / 2, tierY + 5 * scale);
          ctx.closePath();
          ctx.fill();
        }
      };

      const forestW = zone2 - zone1;
      const treeCount = 14;
      for (let i = 0; i < treeCount; i++) {
        const tx = zone1 + (forestW * (i + 0.5)) / treeCount;
        const h = 24 + (i % 4) * 5;
        const c = i % 3 === 0 ? "#047857" : i % 3 === 1 ? "#059669" : "#10b981";
        drawDetailedTree(tx, h, 0.9 + (i % 3) * 0.15, c);
      }

      // ==========================================
      // ZONE 3: REALISTIC CITY & INDUSTRIAL PLANT
      // ==========================================
      const cityW = width - zone2;
      const cStart = zone2;

      // Industrial Storage Tank (Silo)
      ctx.fillStyle = "#0284c7";
      ctx.beginPath();
      ctx.ellipse(cStart + cityW * 0.12, height - 32, 16, 6, 0, 0, Math.PI * 2);
      ctx.fill();
      const tankGrad = ctx.createLinearGradient(cStart + cityW * 0.12 - 16, 0, cStart + cityW * 0.12 + 16, 0);
      tankGrad.addColorStop(0, "#0369a1");
      tankGrad.addColorStop(0.5, "#38bdf8");
      tankGrad.addColorStop(1, "#0284c7");
      ctx.fillStyle = tankGrad;
      ctx.fillRect(cStart + cityW * 0.12 - 16, height - 32, 32, 24);

      // Industrial Building with Chimneys & Translucent Steam
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(cStart + cityW * 0.28, height - 36, 32, 28);
      ctx.fillStyle = "#fef08a";
      for (let r = 0; r < 3; r++) {
        for (let col = 0; col < 3; col++) {
          ctx.fillRect(cStart + cityW * 0.28 + 5 + col * 8, height - 32 + r * 7, 4, 4);
        }
      }
      ctx.fillStyle = "#475569";
      ctx.fillRect(cStart + cityW * 0.28 + 24, height - 44, 4, 10);
      ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
      ctx.beginPath();
      ctx.arc(cStart + cityW * 0.28 + 26, height - 47 - (step * 2) % 10, 4 + (step % 3), 0, Math.PI * 2);
      ctx.fill();

      // Water Tower with Steel Lattice
      ctx.strokeStyle = "#0284c7";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cStart + cityW * 0.5, height - 4);
      ctx.lineTo(cStart + cityW * 0.54, height - 38);
      ctx.lineTo(cStart + cityW * 0.58, height - 4);
      ctx.stroke();
      ctx.fillStyle = "#38bdf8";
      ctx.beginPath();
      ctx.ellipse(cStart + cityW * 0.54, height - 38, 14, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      // Modern Skyscrapers with Window Grids
      const drawSkyscraper = (x, w, h, color) => {
        ctx.fillStyle = color;
        ctx.fillRect(x, height - h, w, h);
        ctx.fillStyle = "#fbbf24";
        ctx.globalAlpha = 0.7;
        for (let wy = height - h + 6; wy < height - 10; wy += 8) {
          for (let wx = x + 4; wx < x + w - 4; wx += 6) {
            if ((wx + wy) % 3 !== 0) {
              ctx.fillRect(wx, wy, 3, 4);
            }
          }
        }
        ctx.globalAlpha = 1.0;
      };

      drawSkyscraper(cStart + cityW * 0.65, 24, 42, "#1e3a8a");
      drawSkyscraper(cStart + cityW * 0.77, 28, 52, "#1d4ed8");
      drawSkyscraper(cStart + cityW * 0.89, 32, 38, "#0369a1");

      // ==========================================
      // FLOWING RIVER & REALISTIC FLOATING BOAT
      // ==========================================
      // Back Water Layer
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 10) {
        const y = Math.sin(x * 0.012 + step * 0.8) * 4 + height - 20;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fillStyle = "rgba(56, 189, 248, 0.4)";
      ctx.fill();

      // Front Main River Layer
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 10) {
        const y = Math.sin(x * 0.018 + step * 1.2) * 5 + height - 14;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      const riverGrad = ctx.createLinearGradient(0, height - 22, 0, height);
      riverGrad.addColorStop(0, "#0ea5e9");
      riverGrad.addColorStop(0.5, "#0284c7");
      riverGrad.addColorStop(1, "#0369a1");
      ctx.fillStyle = riverGrad;
      ctx.fill();

      // Water Surface Reflections
      ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      for (let rx = 20; rx < width; rx += 55) {
        const ry = Math.sin((rx + step * 40) * 0.02) * 2 + height - 8;
        ctx.moveTo(rx, ry);
        ctx.lineTo(rx + 24, ry);
      }
      ctx.stroke();

      // Water Bubble Particles
      particles.forEach((p) => {
        p.y -= p.speed;
        if (p.y < height - 20) {
          p.y = height;
          p.x = Math.random() * width;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
      });

      // Floating Boat Physics Motion
      boatX += 1.2;
      if (boatX > width + 45) boatX = -45;

      const boatY = Math.sin(boatX * 0.018 + step * 1.2) * 5 + height - 15;
      const nextY = Math.sin((boatX + 4) * 0.018 + step * 1.2) * 5 + height - 15;
      const angle = Math.atan2(nextY - boatY, 4);

      // Render Detailed Sailboat
      ctx.save();
      ctx.translate(boatX, boatY);
      ctx.rotate(angle);

      // Boat Wake
      ctx.beginPath();
      ctx.moveTo(-14, 3);
      ctx.lineTo(-32, 7);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Hull
      ctx.beginPath();
      ctx.moveTo(-12, 0);
      ctx.lineTo(-8, 8);
      ctx.lineTo(10, 8);
      ctx.lineTo(15, 0);
      ctx.closePath();
      ctx.fillStyle = "#0369a1";
      ctx.fill();
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Mast
      ctx.beginPath();
      ctx.moveTo(2, 0);
      ctx.lineTo(2, -18);
      ctx.strokeStyle = "#0284c7";
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // Main Sail (White)
      ctx.beginPath();
      ctx.moveTo(2, -17);
      ctx.lineTo(12, -3);
      ctx.lineTo(2, -3);
      ctx.closePath();
      ctx.fillStyle = "#ffffff";
      ctx.fill();
      ctx.strokeStyle = "#bae6fd";
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Jib Sail (Cyan)
      ctx.beginPath();
      ctx.moveTo(2, -14);
      ctx.lineTo(-8, -3);
      ctx.lineTo(2, -3);
      ctx.closePath();
      ctx.fillStyle = "#38bdf8";
      ctx.fill();

      // Red Flag
      ctx.beginPath();
      ctx.moveTo(2, -18);
      ctx.lineTo(7, -15);
      ctx.lineTo(2, -12);
      ctx.closePath();
      ctx.fillStyle = "#ef4444";
      ctx.fill();

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden pointer-events-none select-none">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}

function InteractiveClientScroller({ clientLogos }) {
  const scrollRef = useRef(null);
  const isPausedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId;
    const speed = 2.8;

    const step = () => {
      if (scrollContainer && !isPausedRef.current && !isDraggingRef.current) {
        scrollContainer.scrollLeft += speed;
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleMouseDown = (e) => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    isDraggingRef.current = true;
    isPausedRef.current = true;
    startXRef.current = e.pageX - scrollContainer.offsetLeft;
    scrollLeftRef.current = scrollContainer.scrollLeft;
  };

  const handleMouseLeaveOrUp = () => {
    isDraggingRef.current = false;
    isPausedRef.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    const x = e.pageX - scrollContainer.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    scrollContainer.scrollLeft = scrollLeftRef.current - walk;
  };

  const scrollLeftNav = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRightNav = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full group py-4">
      {/* Side Fade Gradient Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-28 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-28 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      {/* Manual Scroll Controls for PC */}
      <button
        onClick={scrollLeftNav}
        aria-label="Scroll left"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-sky-700 hover:text-white text-gray-800 w-9 h-9 rounded-full shadow-md border border-gray-200 transition hidden md:flex items-center justify-center font-bold text-lg opacity-80 group-hover:opacity-100"
      >
        ‹
      </button>

      <button
        onClick={scrollRightNav}
        aria-label="Scroll right"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-sky-700 hover:text-white text-gray-800 w-9 h-9 rounded-full shadow-md border border-gray-200 transition hidden md:flex items-center justify-center font-bold text-lg opacity-80 group-hover:opacity-100"
      >
        ›
      </button>

      {/* Scrollable Logos Container */}
      <div
        ref={scrollRef}
        onMouseEnter={() => (isPausedRef.current = true)}
        onMouseLeave={handleMouseLeaveOrUp}
        onTouchStart={() => (isPausedRef.current = true)}
        onTouchEnd={() => {
          setTimeout(() => {
            isPausedRef.current = false;
          }, 1500);
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseLeaveOrUp}
        onMouseMove={handleMouseMove}
        className="flex items-center gap-5 md:gap-7 overflow-x-auto scrollbar-none cursor-grab active:cursor-grabbing select-none px-4 scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {[...clientLogos, ...clientLogos].map((logoPath, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-40 sm:w-48 md:w-52 h-22 sm:h-26 md:h-28 bg-white border border-gray-200/90 rounded-2xl p-3 shadow-xs hover:shadow-md transition-all duration-300 flex items-center justify-center hover:border-sky-400 hover:scale-105"
          >
            <img
              src={logoPath}
              alt={`Client Partner ${idx + 1}`}
              className="max-w-full max-h-full object-contain pointer-events-none"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ChanakyaTechnicalSolutionsWebsite() {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [enquiryMessage, setEnquiryMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const testimonials = [
    {
      id: 1,
      company: "Aditya Engineers",
      title: "Aditya Engineers",
      image: "/assets/images/testimonials/1.jpeg",
      subtitle: "20 KLPH Reverse Osmosis (RO) Plant — TOGO Plant, West Africa"
    },
    {
      id: 2,
      company: "Covalent Laboratories Pvt. Ltd.",
      title: "Covalent Laboratories Pvt. Ltd.",
      image: "/assets/images/testimonials/2.jpeg",
      subtitle: "HSRO, DTRO Spares, ACF & Low Fouling RO Membranes — ETP & WTP Operations"
    },
    {
      id: 3,
      company: "Saraca Laboratories Limited",
      title: "Saraca Laboratories Limited",
      image: "/assets/images/testimonials/3.jpeg",
      subtitle: "70 KLD MBR (Membrane Bio Reactor) System Supply & Commissioning"
    },
    {
      id: 4,
      company: "3XPER Innoventure Limited",
      title: "3XPER Innoventure Limited (Murugappa Group)",
      image: "/assets/images/testimonials/4.jpeg",
      subtitle: "20 KLD Packaged STP & 40 KLD ETP (Pharma Effluent Plant)"
    },
    {
      id: 5,
      company: "3F Industries Ltd.",
      title: "3F Industries Ltd.",
      image: "/assets/images/testimonials/5.jpeg",
      subtitle: "15 KLPH MGF-UF-RO-MB Water Treatment Export System — Tema, Ghana"
    }
  ];

  // Dual Email + WhatsApp Contact Form Submission Handler
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const name = formData.name || "Website Visitor";
    const email = formData.email || "Not Provided";
    const phone = formData.phone || "Not Provided";
    const message = enquiryMessage || "General Inquiry for Chanakya Technical Solutions";

    // 1. WhatsApp Pre-formatted Message & Deep Link
    const waText = encodeURIComponent(
      `*New Website Inquiry - Chanakya Technical Solutions*\n\n` +
      `👤 *Name:* ${name}\n` +
      `📧 *Email:* ${email}\n` +
      `📞 *Phone:* ${phone}\n` +
      `📝 *Message:* ${message}`
    );
    const waUrl = `https://wa.me/919490316328?text=${waText}`;

    // 2. Email Delivery API (Web3Forms) to narendrareddy@chanakyatechsol.com
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: "e34eb392-5401-4475-be49-923f05cdd8fa",
          name: name,
          email: email,
          phone: phone,
          message: message,
          subject: `New Inquiry from ${name} - Chanakya Technical Solutions`
        })
      });
    } catch (err) {
      console.log("Email dispatch complete", err);
    }

    // 3. Open WhatsApp in new tab / app
    window.open(waUrl, "_blank");

    // 4. UI feedback & reset
    setIsSubmitting(false);
    setFormSubmitted(true);
    setFormData({ name: "", email: "", phone: "" });
    setEnquiryMessage("");

    setTimeout(() => setFormSubmitted(false), 9000);
  };

  // Handle Enquiry click reliably across mobile and desktop
  const handleEnquire = (subjectName) => {
    setSelectedService(null);
    setMobileMenuOpen(false);

    if (subjectName) {
      setEnquiryMessage(`Hello, I would like to enquire about ${subjectName}.`);
    }

    setTimeout(() => {
      const contactEl = document.getElementById("contact");
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: "smooth" });
      }
    }, 60);
  };

  // Open sub-services modal and push state so phone back button closes modal
  const handleOpenService = (service) => {
    setSelectedService(service);
    window.history.pushState({ modalOpen: true }, "", `#service-${service.id}`);
  };

  // Close sub-services modal safely
  const handleCloseService = () => {
    if (selectedService) {
      setSelectedService(null);
      if (window.history.state && window.history.state.modalOpen) {
        window.history.back();
      }
    }
  };

  // Open testimonial modal and push state so phone back button closes modal
  const handleOpenTestimonial = (item) => {
    setSelectedTestimonial(item);
    window.history.pushState({ modalOpen: true }, "", `#testimonial-${item.id}`);
  };

  // Close testimonial modal safely
  const handleCloseTestimonial = () => {
    if (selectedTestimonial) {
      setSelectedTestimonial(null);
      if (window.history.state && window.history.state.modalOpen) {
        window.history.back();
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (selectedService) handleCloseService();
        if (selectedTestimonial) handleCloseTestimonial();
        setMobileMenuOpen(false);
      }
    };

    const handlePopState = () => {
      if (selectedService) {
        setSelectedService(null);
      }
      if (selectedTestimonial) {
        setSelectedTestimonial(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [selectedService, selectedTestimonial]);

  const clientLogos = [
    "/assets/client companies/1.jpeg",
    "/assets/client companies/11.jpeg",
    "/assets/client companies/123.jpeg",
    "/assets/client companies/2.jpeg",
    "/assets/client companies/22.jpeg",
    "/assets/client companies/25.jpeg",
    "/assets/client companies/3.jpeg",
    "/assets/client companies/30.jpeg",
    "/assets/client companies/33.jpeg",
    "/assets/client companies/4.jpeg",
    "/assets/client companies/44.jpeg",
    "/assets/client companies/5.jpeg",
    "/assets/client companies/55.jpeg",
    "/assets/client companies/6.jpeg",
    "/assets/client companies/7.jpeg",
    "/assets/client companies/77.jpeg",
    "/assets/client companies/8.jpeg",
    "/assets/client companies/88.jpeg",
    "/assets/client companies/9.jpeg",
    "/assets/client companies/99.jpeg",
    "/assets/client companies/WhatsApp Image 2026-08-09 at 2.18.51 PM.jpeg"
  ];

  const mainServices = [
    {
      id: "1",
      num: "01",
      title: "Pretreatment systems",
      category: "Clarification & Separation",
      image: "/assets/images/services/clarifier.jpeg",
      description: "High-efficiency primary physical-chemical clarification and screening systems engineered to eliminate suspended solids, heavy fats, oils, and grease before main treatment stages.",
      subServices: [
        {
          name: "Clarifier",
          image: "/assets/images/services/clarifier.jpeg",
          description: "High-rate gravity settling tanks and lamella clarifiers for primary TSS separation and sludge thickening."
        },
        {
          name: "DAF (Dissolved Air Flotation)",
          image: "/assets/images/services/daf.jpeg",
          description: "Micro-bubble flotation systems for high-efficiency removal of fine suspended solids, emulsified oil, and grease."
        },
        {
          name: "O&G traps (Oil & Grease traps)",
          image: "/assets/images/services/daf.jpeg",
          description: "Industrial and commercial grease interceptors and oil-water separators for free oil and scum removal."
        },
        {
          name: "Screening systems",
          image: "/assets/images/services/screening.jpeg",
          description: "Automated coarse and fine bar screens, rotary drum screens, and trash collectors for debris removal."
        }
      ]
    },
    {
      id: "2",
      num: "02",
      title: "Water softening and filtration",
      category: "Filtration & Softening",
      image: "/assets/images/services/softening and filtration.jpeg",
      description: "Commercial and industrial ion-exchange water softeners, Pressure Sand Filters (PSF), and Activated Carbon Filters (ACF) for total hardness, turbidity, and organic removal.",
      subServices: [
        {
          name: "Water Softening Systems",
          image: "/assets/images/services/softening and filtration.jpeg",
          description: "Ion-exchange resin softeners for total hardness reduction and boiler/cooling tower scale prevention."
        },
        {
          name: "Pressure Sand Filters (PSF)",
          image: "/assets/images/services/softening and filtration.jpeg",
          description: "Multi-grade sand bed filters for turbidity, suspended solids, and sediment filtration."
        },
        {
          name: "Activated Carbon Filters (ACF)",
          image: "/assets/images/services/softening and filtration.jpeg",
          description: "High-iodine activated carbon beds for free chlorine, odor, color, and organic compound absorption."
        }
      ]
    },
    {
      id: "3",
      num: "03",
      title: "Water treatment plants",
      category: "Wastewater & Effluent",
      image: "/assets/images/services/wtp.jpeg",
      description: "Complete turnkey treatment plants customized for municipal, industrial, commercial, and institutional applications.",
      subServices: [
        {
          name: "STP (Sewage Treatment Plant)",
          image: "/assets/images/services/stp.jpeg",
          description: "Biological sewage treatment systems using SBR, MBBR, MBR, and extended aeration processes for clean effluent discharge and reuse."
        },
        {
          name: "ETP (Effluent Treatment Plant)",
          image: "/assets/images/services/etp.jpeg",
          description: "Customized industrial effluent treatment plants engineered for chemical, textile, pharma, and food processing wastewater."
        },
        {
          name: "MTP (Modular Treatment Plant)",
          image: "/assets/images/services/wtp.jpeg",
          description: "Pre-engineered containerized and skid-mounted modular water/wastewater treatment plants for rapid deployment."
        }
      ]
    },
    {
      id: "4",
      num: "04",
      title: "Chemical treatment",
      category: "Specialty Chemicals",
      image: "/assets/images/services/chemical-treatment.jpeg",
      description: "Formulated industrial chemical solutions to prevent scaling, bio-fouling, corrosion, and organic buildup across RO systems, boilers, cooling towers, and ETPs.",
      subServices: [
        {
          name: "Antiscalant",
          image: "/assets/images/services/antiscalant.jpeg",
          description: "High-efficiency RO membrane antiscalants for silica, calcium sulfate, and carbonate scale prevention."
        },
        {
          name: "Cleaning chemicals",
          image: "/assets/images/services/cleaning-chemicals.jpeg",
          description: "Acidic and alkaline CIP cleaning chemicals for RO, UF, and MBR membrane rejuvenation."
        },
        {
          name: "Descaling chemicals",
          image: "/assets/images/services/descaling-chemicals.jpeg",
          description: "Heavy-duty descalers for heat exchangers, boilers, cooling towers, and pipe scale removal."
        },
        {
          name: "Deoiling polymer",
          image: "/assets/images/services/deoiling-polymer.jpeg",
          description: "Specialized de-oiling polyelectrolytes and coagulant aids for rapid oil-water phase separation."
        },
        {
          name: "Defoamer",
          image: "/assets/images/services/defoamer.jpeg",
          description: "Silicone and non-silicone food/industrial grade anti-foaming agents for aeration tanks and ETP units."
        }
      ]
    },
    {
      id: "5",
      num: "05",
      title: "Membrane filtration",
      category: "Advanced Separation",
      image: "/assets/images/services/uf.jpeg",
      description: "State-of-the-art physical membrane barrier separation technologies for ultra-clean permeate, bacterial removal, and high-purity water recycling.",
      subServices: [
        {
          name: "UF (Ultrafiltration)",
          image: "/assets/images/services/uf.jpeg",
          description: "Hollow fiber ultrafiltration systems providing 0.02-micron physical separation for SDI reduction and RO pretreatment."
        },
        {
          name: "MBR (Membrane Bioreactor)",
          image: "/assets/images/services/mbr.jpeg",
          description: "Submerged and external MBR systems combining biological oxidation with membrane filtration for ultra-pure effluent."
        }
      ]
    },
    {
      id: "6",
      num: "06",
      title: "ZLD (Zero Liquid Discharge)",
      category: "Zero Discharge & Recycling",
      image: "/assets/images/services/zld.jpeg",
      description: "Turnkey ZLD plants engineered for 100% liquid waste recovery and total salt crystallization based on MEE, MVR, and ATFD thermal technologies.",
      subServices: [
        {
          name: "MEE (Multiple Effect Evaporator)",
          image: "/assets/images/services/zld.jpeg",
          description: "Steam-driven multi-stage evaporators for concentrating high TDS wastewater reject streams."
        },
        {
          name: "MVR (Mechanical Vapor Recompression)",
          image: "/assets/images/services/zld.jpeg",
          description: "Energy-efficient vapor recompression evaporators minimizing thermal energy consumption."
        },
        {
          name: "ATFD (Agitated Thin Film Dryer)",
          image: "/assets/images/services/zld.jpeg",
          description: "Thermal dryers for converting concentrated slurry into dry salt crystals for zero liquid discharge."
        }
      ]
    },
    {
      id: "7",
      num: "07",
      title: "Water audit",
      category: "Technical Auditing & Optimization",
      image: "/assets/images/services/water-audit.jpeg",
      description: "Comprehensive industrial, institutional, and commercial water audits, flow balancing, leak detection, and sustainability optimization.",
      subServices: [
        {
          name: "Industrial Water Balance & Flow Audit",
          image: "/assets/images/services/water-audit.jpeg",
          description: "Detailed mapping of plant intake, process consumption, cooling tower losses, and discharge streams."
        },
        {
          name: "Process Optimization & Conservation Report",
          image: "/assets/images/services/water-audit.jpeg",
          description: "Actionable engineering recommendations for reducing specific water consumption and maximizing recycling."
        }
      ]
    }
  ];

  const googleMapsUrl =
    "https://www.google.com/maps/search/?api=1&query=Flat%20No.%20201%2C%202nd%20Floor%2C%20Plot%20No.%2051C%2C%20Sahiti%20Enclave%2C%20Gauthampur%20Colony%2C%20Opp.%20Model%20City%20School%2C%20Moti%20Nagar%2C%20Erragadda%2C%20Hyderabad%20500018";

  const whatsappUrl =
    "https://wa.me/919490316328?text=Hello%20Chanakya%20Technical%20Solutions%2C%20I%20would%20like%20to%20know%20more%20about%20your%20water%20and%20waste%20treatment%20services.";

  return (
    <div className="font-sans text-gray-800 bg-white min-h-screen">
      {/* Executive Header Bar with Background River Journey Animation */}
      <header className="border-b border-sky-200/60 sticky top-0 bg-white/80 backdrop-blur-md z-50 shadow-sm relative overflow-hidden">
        {/* Background Animation Canvas */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
          <HeaderWaterAnimation />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-3 md:py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <img
              src="/assets/images/logo.png"
              alt="Chanakya Technical Solutions"
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain transition-transform duration-300 hover:scale-105"
            />

            <div>
              <h1 className="font-serif text-base sm:text-lg md:text-xl font-bold text-sky-950 leading-tight tracking-tight">
                Chanakya Technical Solutions
              </h1>
              <p className="text-[11px] sm:text-xs text-gray-700 italic font-sans font-medium">
                Sustaining the future. One drop at a time
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-8">
            <nav className="hidden md:flex gap-7 text-[14px] font-bold text-gray-800">
              <a href="#home" className="hover:text-sky-700 transition">
                Home
              </a>
              <a href="#about" className="hover:text-sky-700 transition">
                About
              </a>
              <a href="#services-products" className="hover:text-sky-700 transition">
                Services & Products
              </a>
              <a href="#testimonials" className="hover:text-sky-700 transition">
                Testimonials
              </a>
              <a href="#contact" className="hover:text-sky-700 transition">
                Contact
              </a>
            </nav>

            <a
              href="#contact"
              className="hidden sm:inline-block bg-sky-700 hover:bg-sky-800 text-white text-xs font-semibold px-4 py-2.5 rounded-md shadow-md transition"
            >
              Contact Us
            </a>

            {/* Mobile Menu Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="md:hidden p-2 rounded-lg bg-sky-100/90 text-sky-900 hover:bg-sky-200 transition focus:outline-none border border-sky-200"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="relative z-20 md:hidden bg-white/95 backdrop-blur-lg border-t border-sky-100 px-5 py-4 shadow-lg animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col gap-2.5 text-base font-bold text-gray-800">
              <a
                href="#home"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-lg hover:bg-sky-50 hover:text-sky-700 transition"
              >
                Home
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-lg hover:bg-sky-50 hover:text-sky-700 transition"
              >
                About Us
              </a>
              <a
                href="#services-products"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-lg hover:bg-sky-50 hover:text-sky-700 transition"
              >
                Services & Products
              </a>
              <a
                href="#testimonials"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-lg hover:bg-sky-50 hover:text-sky-700 transition"
              >
                Testimonials
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-lg hover:bg-sky-50 hover:text-sky-700 transition"
              >
                Contact Us
              </a>
              <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center bg-sky-700 hover:bg-sky-800 text-white font-semibold py-3 rounded-lg text-sm transition shadow-sm"
                >
                  Get Direct Consultation
                </a>
                <a
                  href="tel:+919490316328"
                  className="w-full text-center bg-sky-50 hover:bg-sky-100 text-sky-800 font-bold py-2.5 rounded-lg text-xs border border-sky-200 transition"
                >
                  📞 Call Us: +91 9490316328
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      <section
        id="home"
        className="relative bg-cover bg-center bg-no-repeat bg-slate-900"
        style={{ backgroundImage: "url('/assets/images/hero-banner.jpeg')" }}
      >
        <div className="bg-black/55">
          <div className="max-w-7xl mx-auto px-4 py-20 sm:py-28 md:py-36 text-white">
            <div className="max-w-3xl">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4 sm:mb-6">
                Water & Waste Treatment Services
              </h2>

              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-200 mb-6 sm:mb-8">
                Professional solutions for water treatment, sewage treatment,
                effluent management and industrial water systems.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                <a
                  href="#services-products"
                  className="w-full sm:w-auto text-center bg-sky-700 hover:bg-sky-800 px-7 py-3 rounded-lg text-white font-semibold transition shadow-md"
                >
                  Services & Products
                </a>

                <a
                  href="#contact"
                  className="w-full sm:w-auto text-center border border-white hover:bg-white hover:text-black px-7 py-3 rounded-lg font-semibold transition"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-12 sm:py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-100 text-sky-800 mb-3">
              About The Company
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-sky-900 mb-5 sm:mb-6">
              Chanakya Technical Solutions
            </h3>

            <p className="text-gray-700 leading-relaxed mb-4 text-justify text-sm sm:text-base">
              Chanakya Technical Solutions is a technical solutions provider specializing in water and environmental management, offering solutions for water treatment, wastewater treatment, solid waste management, and waste-to-energy applications.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4 text-justify text-sm sm:text-base">
              The company focuses on providing reliable and efficient technical solutions to address the growing requirements of industries, institutions, municipalities, communities, and residential customers. Its services are aimed at improving water quality, optimizing treatment processes, supporting wastewater reuse, and promoting sustainable waste-management practices.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6 text-justify text-sm sm:text-base">
              With a focus on technical expertise, customer-oriented solutions, innovation, and dedicated service, Chanakya Technical Solutions works toward delivering customized solutions based on the specific requirements of each application. Its multidisciplinary approach enables the company to address a wide range of challenges associated with water purification, wastewater management, waste treatment, resource recovery, and environmental sustainability.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 p-3 rounded-lg bg-sky-50 border border-sky-100">
                <span className="text-sky-600 font-bold">✓</span>
                <span className="text-xs font-semibold text-gray-800">Water & Wastewater Treatment</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-lg bg-sky-50 border border-sky-100">
                <span className="text-sky-600 font-bold">✓</span>
                <span className="text-xs font-semibold text-gray-800">Solid Waste & Resource Recovery</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-lg bg-sky-50 border border-sky-100">
                <span className="text-sky-600 font-bold">✓</span>
                <span className="text-xs font-semibold text-gray-800">Waste-to-Energy Applications</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-lg bg-sky-50 border border-sky-100">
                <span className="text-sky-600 font-bold">✓</span>
                <span className="text-xs font-semibold text-gray-800">Industrial & Municipal Solutions</span>
              </div>
            </div>
          </div>

          <div className="relative mt-4 md:mt-0">
            <img
              src="/assets/images/about-image.png"
              alt="Chanakya Technical Solutions - Environmental Engineering"
              className="rounded-2xl shadow-xl w-full h-72 sm:h-96 md:h-[460px] object-contain bg-sky-950/5 p-2 border border-gray-100"
              onError={(e) => {
                e.target.src = "/assets/images/logo.png";
              }}
            />
          </div>
        </div>
      </section>

      {/* Services & Products Section */}
      <section id="services-products" className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-100 text-sky-800 mb-3">
              Technical Offerings & Solutions
            </span>
            <h3 className="text-3xl md:text-4xl font-extrabold text-sky-900 mb-4">
              Services & Specialized Systems
            </h3>
            <p className="text-gray-600 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
              Explore our core technical divisions below. Click on any main service to view detailed sub-services, system specifications, and equipment image placeholders.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainServices.map((item) => (
              <div
                key={item.id}
                onClick={() => handleOpenService(item)}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 cursor-pointer"
              >
                <div>
                  {/* Service Image Placeholder */}
                  <ServiceImagePlaceholder
                    src={item.image}
                    alt={item.title}
                    className="w-full h-44 object-cover"
                  />

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold px-3 py-1 bg-sky-50 text-sky-700 rounded-full border border-sky-100">
                        {item.category}
                      </span>
                      <span className="text-2xl font-black text-sky-200 group-hover:text-sky-600 transition-colors">
                        {item.num}
                      </span>
                    </div>

                    <h4 className="text-xl font-bold text-gray-900 leading-snug mb-3 group-hover:text-sky-700 transition-colors">
                      {item.title}
                    </h4>

                    <p className="text-gray-600 text-sm leading-relaxed mb-5">
                      {item.description}
                    </p>

                    {item.subServices && item.subServices.length > 0 && (
                      <div className="mb-5 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                        <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                          Included Sub-Services ({item.subServices.length}):
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {item.subServices.map((sub, idx) => (
                            <span
                              key={idx}
                              className="text-xs font-semibold bg-white text-sky-800 px-2.5 py-1 rounded-md border border-sky-100 shadow-2xs"
                            >
                              {sub.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="px-6 pb-6">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenService(item);
                    }}
                    className="w-full text-center bg-sky-700 group-hover:bg-sky-800 text-white font-semibold py-3 rounded-xl text-sm transition shadow-md flex items-center justify-center gap-2"
                  >
                    <span>View Sub-Services & Details</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Sub-Services Detail Page Modal */}
      {selectedService && (
        <div
          onClick={handleCloseService}
          className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50 overflow-y-auto p-4 md:p-8 flex justify-center items-start cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white max-w-5xl w-full rounded-2xl shadow-2xl border border-gray-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200 cursor-default"
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-sky-900 via-sky-800 to-slate-900 text-white p-6 md:p-8 relative">
              <div className="flex items-center justify-between gap-4 mb-4">
                <button
                  onClick={handleCloseService}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg border border-white/20 transition"
                >
                  <span>← Back to All Services</span>
                </button>

                <span className="text-3xl font-black text-sky-400 opacity-60">
                  {selectedService.num}
                </span>
              </div>

              <span className="inline-block text-xs font-bold text-sky-300 uppercase tracking-widest bg-sky-950/60 px-3 py-1 rounded border border-sky-500/30 mb-2">
                {selectedService.category}
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
                {selectedService.title}
              </h3>
              <p className="text-sky-100 text-sm md:text-base leading-relaxed max-w-3xl">
                {selectedService.description}
              </p>
            </div>

            {/* Modal Content - Sub-Services Grid */}
            <div className="p-6 md:p-8 bg-slate-50">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-xl font-bold text-gray-900">
                  Specialized Sub-Services & System Units
                </h4>
                <span className="text-xs font-semibold text-gray-500">
                  Image placeholders ready for folder upload
                </span>
              </div>

              {selectedService.subServices && selectedService.subServices.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-6">
                  {selectedService.subServices.map((sub, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
                    >
                      <div>
                        {/* Sub-Service Image Placeholder */}
                        <ServiceImagePlaceholder
                          src={sub.image}
                          alt={sub.name}
                          className="w-full h-48 object-cover"
                        />

                        <div className="p-5">
                          <h5 className="text-lg font-bold text-sky-900 mb-2">
                            {sub.name}
                          </h5>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {sub.description}
                          </p>
                        </div>
                      </div>

                      <div className="p-5 pt-0">
                        <button
                          onClick={() => handleEnquire(sub.name)}
                          className="w-full text-center bg-sky-700 hover:bg-sky-800 text-white font-bold py-2.5 rounded-lg text-xs transition shadow-sm"
                        >
                          Enquire For {sub.name}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white p-8 rounded-xl border border-gray-200 text-center">
                  <ServiceImagePlaceholder
                    src={selectedService.image}
                    alt={selectedService.title}
                    className="w-full h-64 object-cover rounded-lg mb-6"
                  />
                  <h5 className="text-xl font-bold text-sky-900 mb-3">
                    {selectedService.title} Solutions
                  </h5>
                  <p className="text-gray-600 max-w-2xl mx-auto text-sm leading-relaxed mb-6">
                    {selectedService.description}
                  </p>
                  <button
                    onClick={() => handleEnquire(selectedService.title)}
                    className="inline-block bg-sky-700 hover:bg-sky-800 text-white font-semibold px-6 py-3 rounded-lg text-sm transition shadow-md"
                  >
                    Request Technical Consultation
                  </button>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-100 px-6 py-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={handleCloseService}
                className="bg-gray-800 hover:bg-gray-900 text-white font-semibold text-xs px-5 py-2.5 rounded-lg transition"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Client Companies Infinite Marquee Scroller */}
      <section className="py-14 md:py-20 bg-white border-y border-gray-200/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-100 text-sky-800 mb-3">
            Proven Track Record
          </span>
          <h3 className="text-2xl md:text-3xl font-extrabold text-sky-950">
            Companies & Clients We Have Worked With
          </h3>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto mt-2">
            Trusted by leading industrial, commercial, and municipal clients across water and waste treatment engineering.
          </p>
        </div>

        {/* Continuous & Interactive Horizontal Logo Scroller */}
        <InteractiveClientScroller clientLogos={clientLogos} />
      </section>

      <section className="py-16 md:py-20 bg-sky-700 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h3 className="text-3xl font-bold mb-4">Why Choose Us</h3>
            <p className="max-w-3xl mx-auto leading-7 text-sky-100">
              Reliable solutions, experienced support and customer-focused
              service for every project.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="bg-white/10 p-6 rounded">
              <h4 className="text-xl font-semibold mb-3">Quality Service</h4>
              <p className="text-sky-100 text-sm leading-7">
                Reliable and professional project execution.
              </p>
            </div>

            <div className="bg-white/10 p-6 rounded">
              <h4 className="text-xl font-semibold mb-3">Expert Solutions</h4>
              <p className="text-sky-100 text-sm leading-7">
                Customized treatment systems for every need.
              </p>
            </div>

            <div className="bg-white/10 p-6 rounded">
              <h4 className="text-xl font-semibold mb-3">Customer Support</h4>
              <p className="text-sky-100 text-sm leading-7">
                Dedicated assistance and technical support.
              </p>
            </div>

            <div className="bg-white/10 p-6 rounded">
              <h4 className="text-xl font-semibold mb-3">Sustainable Focus</h4>
              <p className="text-sky-100 text-sm leading-7">
                Environment-friendly treatment solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials & Certificates Section */}
      <section id="testimonials" className="py-16 md:py-24 bg-slate-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-100 text-sky-800 mb-3">
              Client Endorsements & Certificates
            </span>
            <h3 className="text-3xl md:text-4xl font-extrabold text-sky-950 mb-4">
              Client Testimonials & Recommendations
            </h3>
            <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
              Read real feedback, performance certificates, and appreciation letters from our esteemed industrial, institutional, and commercial partners. Click any image to view full size.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((item) => (
              <div
                key={item.id}
                onClick={() => handleOpenTestimonial(item)}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-sky-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <span className="bg-sky-700 text-white text-xs font-bold px-4 py-2 rounded-lg shadow-md flex items-center gap-1.5">
                      <span>🔍 Click to View Certificate</span>
                    </span>
                  </div>
                </div>

                <div className="p-5 border-t border-gray-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-1 rounded">
                    Official Certificate
                  </span>
                  <h4 className="text-base font-bold text-gray-900 mt-2 group-hover:text-sky-700 transition">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full-size Testimonial Certificate Lightbox Modal */}
      {selectedTestimonial && (
        <div
          onClick={handleCloseTestimonial}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 p-4 md:p-8 flex items-center justify-center cursor-pointer animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white max-w-4xl w-full rounded-2xl shadow-2xl overflow-hidden border border-gray-200 cursor-default animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
          >
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
              <div>
                <h4 className="font-bold text-base md:text-lg text-white">
                  {selectedTestimonial.title}
                </h4>
                <p className="text-xs text-sky-300">
                  {selectedTestimonial.subtitle}
                </p>
              </div>

              <button
                onClick={handleCloseTestimonial}
                className="bg-white/10 hover:bg-white/20 text-white w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold transition"
              >
                ✕
              </button>
            </div>

            <div className="p-4 md:p-6 bg-slate-950 overflow-y-auto flex items-center justify-center min-h-[300px]">
              <img
                src={selectedTestimonial.image}
                alt={selectedTestimonial.title}
                className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-lg border border-slate-800"
              />
            </div>

            <div className="bg-gray-100 px-6 py-3 border-t border-gray-200 flex items-center justify-between text-xs text-gray-600">
              <span>Chanakya Technical Solutions - Client Testimonials</span>
              <button
                onClick={handleCloseTestimonial}
                className="bg-sky-700 hover:bg-sky-800 text-white font-bold px-4 py-2 rounded-lg text-xs transition"
              >
                Close Certificate
              </button>
            </div>
          </div>
        </div>
      )}

      <section id="contact" className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-3xl font-bold text-sky-700 mb-6">
              Contact Us
            </h3>

            <div className="space-y-5 text-gray-700 leading-7">
              <div>
                <h4 className="font-semibold text-lg mb-1">Address</h4>
                <p>
                  Flat No. 201, 2nd Floor, Plot No. 51C,
                  <br />
                  Sahiti Enclave, Gauthampur Colony,
                  <br />
                  Opp. Model City School, Moti Nagar,
                  <br />
                  Erragadda, Hyderabad - 500018
                </p>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-sky-700 font-medium hover:text-sky-800"
                >
                  View on Google Maps
                </a>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-1">Phone</h4>
                <p>+91 9490316328</p>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-1">Email</h4>
                <p>
                  <a href="mailto:narendrareddy@chanakyatechsol.com" className="hover:text-sky-700 font-medium">
                    narendrareddy@chanakyatechsol.com
                  </a>
                </p>
                <p className="text-sm text-gray-500">
                  <a href="mailto:chanakyatechsol@gmail.com" className="hover:text-sky-700">
                    chanakyatechsol@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md border border-gray-200">
            {formSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center animate-in fade-in duration-300">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                  ✓
                </div>
                <h4 className="text-xl font-bold text-emerald-900 mb-2">Inquiry Sent Successfully!</h4>
                <p className="text-sm text-emerald-700 leading-relaxed mb-4">
                  Thank you! Your inquiry has been sent to our email (<strong>narendrareddy@chanakyatechsol.com</strong>) and opened in WhatsApp for instant chat.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs px-5 py-2.5 rounded-lg transition"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="grid gap-4 sm:gap-5">
                <h4 className="text-xl font-bold text-sky-950 mb-1">
                  Send Inquiry via Email & WhatsApp
                </h4>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full border border-gray-300 px-4 py-3 rounded-lg outline-none focus:border-sky-700 focus:ring-1 focus:ring-sky-700 text-base sm:text-sm"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full border border-gray-300 px-4 py-3 rounded-lg outline-none focus:border-sky-700 focus:ring-1 focus:ring-sky-700 text-base sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 9876543210"
                      className="w-full border border-gray-300 px-4 py-3 rounded-lg outline-none focus:border-sky-700 focus:ring-1 focus:ring-sky-700 text-base sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Message / Technical Requirements
                  </label>
                  <textarea
                    rows="4"
                    value={enquiryMessage}
                    onChange={(e) => setEnquiryMessage(e.target.value)}
                    placeholder="Describe your water/waste treatment requirements or plant capacity..."
                    className="w-full border border-gray-300 px-4 py-3 rounded-lg outline-none focus:border-sky-700 focus:ring-1 focus:ring-sky-700 text-base sm:text-sm"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-sky-700 hover:bg-sky-800 text-white font-bold py-3.5 rounded-lg text-sm transition shadow-md flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Sending Inquiry...</span>
                  ) : (
                    <>
                      <span>✉️ Send via Email & 💬 WhatsApp</span>
                      <span>→</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Comprehensive Executive Footer */}
      <footer className="bg-slate-950 text-gray-300 pt-16 pb-12 border-t border-slate-800 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
            {/* Column 1: Brand & Slogan */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/assets/images/logo.png"
                  alt="Chanakya Technical Solutions"
                  className="w-10 h-10 object-contain"
                />
                <div>
                  <h4 className="font-serif text-base font-bold text-white leading-tight">
                    Chanakya Technical Solutions
                  </h4>
                  <p className="text-[11px] text-sky-400 italic">
                    Sustaining the future. One drop at a time
                  </p>
                </div>
              </div>

              <p className="text-gray-400 text-xs leading-relaxed mb-5">
                Technical solutions provider specializing in water purification, wastewater treatment, solid waste management, and waste-to-energy applications for industries, municipalities, and communities.
              </p>

              <div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition inline-flex items-center gap-1.5 shadow-sm"
                >
                  <span>💬 WhatsApp Chat</span>
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-4 border-b border-sky-500/30 pb-1.5 inline-block">
                Navigation
              </h5>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <a href="#home" className="hover:text-sky-400 transition flex items-center gap-2">
                    <span className="text-sky-500">•</span> Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-sky-400 transition flex items-center gap-2">
                    <span className="text-sky-500">•</span> About Us
                  </a>
                </li>
                <li>
                  <a href="#services-products" className="hover:text-sky-400 transition flex items-center gap-2">
                    <span className="text-sky-500">•</span> Services & Products
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-sky-400 transition flex items-center gap-2">
                    <span className="text-sky-500">•</span> Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Core Services */}
            <div>
              <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-4 border-b border-sky-500/30 pb-1.5 inline-block">
                Technical Divisions
              </h5>
              <ul className="space-y-2 text-xs">
                <li className="text-gray-400">✓ Pretreatment & Clarifiers</li>
                <li className="text-gray-400">✓ Water Softening & Filtration (PSF/ACF)</li>
                <li className="text-gray-400">✓ STP, ETP & Modular Treatment Plants</li>
                <li className="text-gray-400">✓ Specialty Chemical Treatment</li>
                <li className="text-gray-400">✓ Ultrafiltration & MBR Membranes</li>
                <li className="text-gray-400">✓ Zero Liquid Discharge (ZLD - MEE/MVR/ATFD)</li>
                <li className="text-gray-400">✓ Water Audits & Optimization</li>
              </ul>
            </div>

            {/* Column 4: Registered Office Contact */}
            <div>
              <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-4 border-b border-sky-500/30 pb-1.5 inline-block">
                Registered Office
              </h5>
              <div className="space-y-3 text-xs text-gray-300">
                <p className="leading-relaxed text-gray-400">
                  📍 Flat No. 201, 2nd Floor, Plot No. 51C, Sahiti Enclave, Gauthampur Colony, Opp. Model City School, Moti Nagar, Erragadda, Hyderabad - 500018
                </p>

                <p>
                  📞 <strong className="text-white">Phone:</strong>{" "}
                  <a href="tel:+919490316328" className="hover:text-sky-400">
                    +91 9490316328
                  </a>
                </p>

                <div>
                  ✉️ <strong className="text-white">Email:</strong>
                  <div className="mt-1 space-y-0.5">
                    <a
                      href="mailto:narendrareddy@chanakyatechsol.com"
                      className="block text-sky-400 hover:underline"
                    >
                      narendrareddy@chanakyatechsol.com
                    </a>
                    <a
                      href="mailto:chanakyatechsol@gmail.com"
                      className="block text-gray-400 hover:text-white"
                    >
                      chanakyatechsol@gmail.com
                    </a>
                  </div>
                </div>

                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-1 text-sky-400 hover:text-sky-300 font-semibold"
                >
                  🗺️ Open in Google Maps →
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
            <p>© 2026 Chanakya Technical Solutions. All Rights Reserved.</p>
            <div className="flex items-center gap-6">
              <a
                href="#home"
                className="hover:text-sky-400 transition flex items-center gap-1"
              >
                <span>Back to Top</span>
                <span>↑</span>
              </a>
            </div>
          </div>
        </div>
      </footer>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg z-50"
      >
        <svg
          viewBox="0 0 32 32"
          aria-hidden="true"
          className="w-8 h-8 fill-current"
        >
          <path d="M16.01 3.2c-7.04 0-12.77 5.69-12.77 12.69 0 2.24.59 4.43 1.7 6.35L3.14 28.8l6.75-1.77a12.85 12.85 0 0 0 6.12 1.55c7.04 0 12.77-5.69 12.77-12.69S23.05 3.2 16.01 3.2Zm0 23.25c-1.94 0-3.83-.52-5.49-1.51l-.39-.23-4.01 1.05 1.07-3.89-.25-.4a10.45 10.45 0 0 1-1.57-5.58c0-5.83 4.78-10.57 10.64-10.57s10.64 4.74 10.64 10.57-4.78 10.56-10.64 10.56Zm5.83-7.9c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16-.21.32-.82 1.04-1 1.25-.18.21-.37.24-.69.08-.32-.16-1.35-.49-2.57-1.57-.95-.84-1.59-1.88-1.78-2.2-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.7-.97-2.33-.26-.61-.52-.53-.71-.54h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.08-1.11 2.63s1.14 3.05 1.3 3.26c.16.21 2.24 3.4 5.42 4.77.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.89-.77 2.16-1.51.26-.74.26-1.38.18-1.51-.08-.13-.29-.21-.61-.37Z" />
        </svg>
      </a>
    </div>
  );
}
