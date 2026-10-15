import { useState, useRef, useEffect, type WheelEvent } from 'react'
import type { Page } from '../App'
import sandsFinalPreview from '../../Frame 7.png'
import sandsWireframePreview from '../../Isometric Website Wireframe Collage.png'
import projectPageBackground from '../../project-page-background.png'
import webAppSectionBackground from '../../web-app-section-background.png'
import mobileAppSectionBackground from '../../mobile-app-section-background.png'
import companyBrandingSectionBackground from '../../company-branding-section-background.png'
import socialMediaSectionBackground from '../../social-media-section-background.png'
import videoSectionBackground from '../../video-section-background.png'
import logoDesignSectionBackground from '../../logo-design-section-background.png'
import expoEventsSectionBackground from '../../expo-events-section-background.png'

interface ProjectsPageProps {
  onNavigate: (page: Page) => void
}

// ===== DATA =====

const categories = ["All", "Websites", "Web Apps", "Mobile Apps", "Graphic Design", "Branding", "Videos", "UI/UX"]

const categoryColors: Record<string, string> = {
  "Websites":      "#4ECDC4",
  "Web Apps":      "#5631A1",
  "Mobile Apps":   "#FF6B6B",
  "Graphic Design":"#FF6B6B",
  "Branding":      "#FFB347",
  "Videos":        "#9999FF",
  "UI/UX":         "#5631A1",
}

const allProjects = [
  {
    id: 1, title: "SANDS Corporate Website", category: "Websites",
    duration: "6 weeks · 2023",
    tags: ["Figma", "HTML5", "CSS3", "JavaScript"],
    overview: "A premium e-commerce experience for a luxury fashion brand. The brief called for a layout that felt editorial — full-bleed imagery, generous whitespace, and a checkout flow with zero unnecessary steps. Every interaction was designed to feel considered and unhurried.",
    challenge: "The existing website contained extensive technical and product information, making offerings difficult to understand quickly. Challenges included complex content, hard-to-find information, weak hierarchy, limited separation between products, services, and industries, and the need to build credibility with B2B decision-makers across desktop and mobile.",
    outcome: "The redesign organizes products, solutions, industries, case studies, company information, and resources into a clear B2B information architecture. It simplifies technical content, improves navigation and product presentation, highlights SANDS' experience, and creates clear enquiry and demo paths with responsive layouts and a consistent visual language.",
    process: ["Discovery", "UX Research", "Information Architecture", "Wireframes", "UI Design", "Development Handoff"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=700&fit=crop&auto=format",
    screens: [
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=500&fit=crop&auto=format",
    ],
    accent: "#4ECDC4",
  },
  {
    id: 2, title: "Precise3DM Digital Manufacturing Website", category: "Websites",
    duration: "4 weeks · 2023",
    tags: ["Figma", "HTML5", "CSS3", "JavaScript"],
    overview: "A full corporate website redesign for a B2B technology company. The goal was to reposition the brand from legacy enterprise software vendor to a modern cloud solutions partner — without alienating their existing client base.",
    challenge: "Precise3DM offers many technical services, scanning technologies, and industry-specific solutions. The challenge was to present them without overwhelming visitors unfamiliar with 3D scanning or reverse engineering, clarify the Scan-to-CAD process, establish B2B trust, and strengthen enquiry and quote journeys.",
    outcome: "The information architecture follows how customers evaluate engineering services: Problem, Technology, Service, Application, Process, Result, then Enquiry. Clear service categories, visual workflow explanations, industry content, case studies, responsive layouts, and direct calls to action make it easier to understand and enquire about the right solution.",
    process: ["Discovery", "UX Research", "Information Architecture", "User Flows", "Wireframes", "UI Design", "Development Handoff"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=700&fit=crop&auto=format",
    screens: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=500&fit=crop&auto=format",
    ],
    accent: "#5631A1",
  },
  {
    id: 3, title: "Graft3D Healthcare Website", category: "Websites",
    duration: "5 weeks · 2023",
    tags: ["Figma", "HTML5", "CSS3", "JavaScript"],
    overview: "A healthcare technology website design project for Graft3D Healthcare Solutions, a company providing medical 3D printing and digital healthcare solutions for hospitals, surgeons, and patients. The project creates a professional, trustworthy digital experience while making DICOM-to-3D conversion, medical image segmentation, Bio-CAD modelling, surgical planning, and patient-specific implants easier to understand.",
    challenge: "Graft3D offers specialized healthcare technologies to users with different levels of technical knowledge. The site needed to explain complex medical information, multiple services and user needs, and the DICOM-to-3D workflow while communicating clinical accuracy and trust.",
    outcome: "User testing sessions averaged 42 seconds from landing to reservation confirmation — beating the 60-second target. App store rating of 4.7 at launch.",
    process: ["Discovery", "UX Research", "Information Architecture", "User Flow", "Wireframes", "UI Design", "Development Handoff"],
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=700&fit=crop&auto=format",
    screens: [
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800&h=500&fit=crop&auto=format",
    ],
    accent: "#FF6B6B",
  },
  {
    id: 4, title: "WildPlantTS Reality Capture & Digital Engineering", category: "Websites",
    duration: "UX/UI Design",
    tags: ["Figma", "HTML5", "CSS3", "JavaScript"],
    overview: "A B2B corporate website design project for WildPlantTS, a technology-driven company specializing in reality capture, 3D laser scanning, digital engineering, and digital twin solutions. The experience helps businesses understand complex industrial technologies and find the right hardware, software, or engineering service. Its information architecture supports two core journeys: buying reality-capture technologies and outsourcing engineering services.",
    challenge: "WildPlantTS serves customers with different technical requirements, from companies purchasing scanning equipment to engineering teams outsourcing 3D scanning and digital modelling. The website needed to clarify technical terminology, distinguish products from services, explain the path from physical assets to digital models, and guide industrial decision-makers toward the right enquiry.",
    outcome: "The design organizes technology sales and engineering services into clear customer journeys, groups offerings by application and industry, explains workflows in accessible steps, and creates clear paths to request a quote, consultation, or product demonstration. Responsive layouts support a consistent experience across devices.",
    process: ["Discovery", "UX Research", "Information Architecture", "User Flows", "Wireframes", "UI Design", "Development Handoff"],
    image: "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1200&h=700&fit=crop&auto=format",
    screens: [
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=500&fit=crop&auto=format",
    ],
    accent: "#4ECDC4",
  },
  {
    id: 5, title: "NM Construction & Designing Corporate Website", category: "Websites",
    duration: "UX/UI Design",
    tags: ["Figma", "HTML5", "CSS3", "JavaScript"],
    overview: "A corporate website design project for NM Construction & Designing, a construction and architectural design company providing residential, commercial, and industrial building solutions. The experience showcases construction capabilities, architectural services, completed projects, and ongoing developments while helping prospective clients explore services and submit project enquiries.",
    challenge: "Construction customers need confidence in a company's experience, design capabilities, project quality, and delivery process before making an enquiry. The website needed to present architectural and construction services clearly, organize completed and ongoing work, explain the build process, and make project enquiries straightforward across devices.",
    outcome: "The design guides prospective clients from discovering the company to exploring services and project work, understanding the construction process, and requesting a consultation. Project cards surface useful details such as location, category, area, and completion status, while a structured enquiry form helps clients share their project requirements.",
    process: ["Discovery", "UX Research", "Information Architecture", "User Flows", "Wireframes", "UI Design", "Development Handoff"],
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=700&fit=crop&auto=format",
    screens: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=500&fit=crop&auto=format",
    ],
    accent: "#C47A45",
  },
  {
    id: 6, title: "Shiv Shakti Crackers World E-commerce Website", category: "Websites",
    duration: "UX/UI Design",
    tags: ["Figma", "E-commerce", "HTML5", "CSS3", "JavaScript"],
    overview: "A festive e-commerce website design project for Shiv Shakti Crackers World, a fireworks retail business offering crackers, sparklers, fancy fireworks, and celebration packages. The online catalogue helps customers explore products, discover offers, compare options, and find suitable items for festive celebrations.",
    challenge: "A fireworks catalogue can contain many products, variations, categories, and seasonal promotions. Without a clear structure, customers may find it difficult to discover the right products or compare available options. The experience needed clear category browsing, visible offers, consistent product information, and easy to locate enquiry options across devices.",
    outcome: "The shopping journey is organized around discovery, category browsing, product exploration, offer review, and enquiry. Promotional banners, structured product cards, search and filtering, consistent product details, clear calls to action, and responsive layouts make the catalogue easier to explore.",
    process: ["Discovery", "UX Research", "Information Architecture", "User Flows", "Wireframes", "UI Design"],
    image: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=1200&h=700&fit=crop&auto=format",
    screens: [
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=500&fit=crop&auto=format",
    ],
    accent: "#D84A28",  },
  {
    id: 7, title: "Mahaperiyava Imports & Exports Startup Website", category: "Websites",
    duration: "UX/UI Design",
    tags: ["Figma", "HTML5", "CSS3", "JavaScript"],
    overview: "A website design project for Mahaperiyava Imports & Exports, an emerging business building its presence in the import-export industry. The website establishes a professional digital identity, communicates the company's business offerings, and helps potential customers and partners discover products and initiate enquiries. The design focuses on brand credibility, clear communication, product presentation, and business growth.",
    challenge: "As a startup, the company needed a digital presence that would introduce its business to potential customers and build confidence among prospective partners. The website needed to communicate the offering clearly, organize products and services for discovery, establish credibility, make enquiries straightforward, and provide a structure that could grow with the business.",
    outcome: "The design creates a professional starting point for the company's digital presence. A structured homepage introduces the business, clear sections organize product and service information, and consistent visual hierarchy, relevant capability details, responsive layouts, and direct contact pathways support discovery and future growth.",
    process: ["Discovery", "Information Architecture", "Wireframing", "UI Design", "Responsive Design"],
    image: "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?w=1200&h=700&fit=crop&auto=format",
    screens: [
      "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?w=800&h=500&fit=crop&auto=format",
    ],
    accent: "#287A70",
  },
  {
    id: 25, title: "UrbanStay Hotel Website", category: "Websites",
    duration: "4 weeks · 2022",
    tags: ["Figma", "HTML5", "CSS3", "JavaScript"],
    overview: "A welcoming hotel booking website that pairs destination photography with clear room details, availability, and a simple reservation flow.",
    challenge: "Guests had to move between several pages to compare rooms and understand what was included. The redesign brings room options, amenities, and booking details together so visitors can make a confident choice.",
    outcome: "The streamlined booking journey helped more visitors reach the reservation form, while clearer room comparisons reduced booking questions for the hotel team.",
    process: ["Discovery", "Content Structure", "Wireframes", "UI Design", "Prototype", "Dev Handoff"],
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=700&fit=crop&auto=format",
    screens: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=500&fit=crop&auto=format",
    ],
    accent: "#4ECDC4",
  },
  {
    id: 8, title: "SANDS B2B Analytics Dashboard", category: "Web Apps",
    duration: "12 weeks · 2023",
    tags: ["Figma", "React", "Tailwind CSS", "Chart.js"],
    overview: "An enterprise analytics dashboard built for Signals & Systems India — real-time data visualisation, CRM integration, role-based access control, and custom report generation for B2B operations teams.",
    challenge: "The existing reporting system required users to export CSV files and open Excel to analyse data. Power users were spending 3+ hours per week on manual reporting. The redesign had to bring all insights into a single live interface without overwhelming non-technical users.",
    outcome: "Reporting time per user dropped from 3 hours/week to 20 minutes. User satisfaction score increased from 3.1 to 4.6 out of 5.",
    process: ["Discovery", "Data Architecture", "User Flows", "Wireframes", "Design System", "Prototype", "Dev Handoff"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=700&fit=crop&auto=format",
    screens: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=500&fit=crop&auto=format",
    ],
    accent: "#5631A1",
  },
  {
    id: 9, title: "HealthTrack Patient Portal", category: "Web Apps",
    duration: "10 weeks · 2023",
    tags: ["Figma", "HTML", "CSS", "JavaScript"],
    overview: "A health monitoring SaaS with patient-facing dashboards, appointment scheduling, telemedicine session management, and HIPAA-compliant UX patterns throughout.",
    challenge: "Healthcare UX must balance information density (clinicians need data fast) with clarity (patients are often stressed when using it). Designing for both user types in a single system required a deeply considered role-based architecture.",
    outcome: "Clinician onboarding time reduced by 60%. Patient portal adoption increased from 18% to 67% of registered users.",
    process: ["Research", "User Personas", "User Flows", "Wireframes", "UI Design", "Usability Testing"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=700&fit=crop&auto=format",
    screens: [
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&h=500&fit=crop&auto=format",
    ],
    accent: "#4ECDC4",
  },
  {
    id: 10, title: "HR Management System", category: "Web Apps",
    duration: "8 weeks · 2022",
    tags: ["Figma", "Adobe XD"],
    overview: "A comprehensive HRMS covering employee onboarding, leave management, performance reviews, payroll integration, and org chart visualisation — all in a unified interface that HR teams actually want to use.",
    challenge: "The client had 6 separate HR tools that didn't talk to each other. Employees filed leave requests in one system, tracked performance in another, and accessed payslips via a third. Consolidation meant mapping 6 separate mental models into one coherent IA.",
    outcome: "Reduced HR admin overhead by 40%. Employee self-service adoption: 89% within 60 days of launch.",
    process: ["System Audit", "IA Design", "User Research", "Design System", "Prototype"],
    image: "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=1200&h=700&fit=crop&auto=format",
    screens: [
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=500&fit=crop&auto=format",
    ],
    accent: "#FFB347",
  },
  {
    id: 11, title: "CRM Sales Pipeline", category: "Web Apps",
    duration: "6 weeks · 2022",
    tags: ["Figma", "HTML5", "CSS3", "JavaScript"],
    overview: "A visual CRM with Kanban-style pipeline management, contact enrichment from LinkedIn, automated follow-up reminders, email threading, and real-time team collaboration.",
    challenge: "Sales reps described their existing CRM as 'a place where deals go to die'. The tool had high data-entry friction, poor mobile experience, and no visibility into team activity. The redesign prioritised speed of input and at-a-glance pipeline health.",
    outcome: "Daily active usage increased 3× post-launch. Average deal cycle shortened by 18% in the first quarter.",
    process: ["Research", "User Interviews", "User Flows", "UI Design", "Dev Handoff"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=700&fit=crop&auto=format",
    screens: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop&auto=format",
    ],
    accent: "#5631A1",
  },
  {
    id: 12, title: "Inventory Management Portal", category: "Web Apps",
    duration: "5 weeks · 2022",
    tags: ["Figma", "HTML5", "CSS3", "JavaScript"],
    overview: "A warehouse inventory system with barcode scanning integration, real-time low-stock alerts, vendor management, purchase order workflows, and auto-reorder logic.",
    challenge: "Stock discrepancies were costing the client ₹4L/month. Manual counts were error-prone and slow. The new system needed to integrate with existing barcode hardware while making stock-takes fast enough that staff would actually do them.",
    outcome: "Stock discrepancy rate dropped 94%. Monthly losses from errors reduced to near zero within 90 days.",
    process: ["Discovery", "Hardware Audit", "Wireframes", "UI Design", "Dev"],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=700&fit=crop&auto=format",
    screens: [],
    accent: "#A8E6CF",
  },
  {
    id: 13, title: "Mobile Banking App", category: "Mobile Apps",
    duration: "8 weeks · 2023",
    tags: ["Figma", "Adobe XD", "Principle"],
    overview: "An intuitive mobile banking experience with biometric authentication, smart transaction categorisation, budgeting insights, savings goal tracking, and a design optimised for both iOS and Android.",
    challenge: "Research revealed users checked their balance an average of 6× per day — mostly on the go, under 30 seconds per session. The app needed to surface the most critical information in the fewest possible taps.",
    outcome: "Task completion rate of 96% in usability testing. Time to complete a bank transfer reduced from 2 minutes (competitor benchmark) to 34 seconds.",
    process: ["Research", "Competitive Analysis", "User Flows", "Wireframes", "UI Design", "Prototype", "Handoff"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=700&fit=crop&auto=format",
    screens: [
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=500&fit=crop&auto=format",
    ],
    accent: "#FF6B6B",
  },
  {
    id: 14, title: "FitLife Fitness Tracker", category: "Mobile Apps",
    duration: "6 weeks · 2022",
    tags: ["Figma", "ProtoPie"],
    overview: "A gamified fitness app with workout logging, interactive progress charts, friend challenges, AI-suggested training plans, and wearable device sync for Apple Watch and Wear OS.",
    challenge: "Most fitness apps lose 80% of users within the first week. The design had to build a habit loop — reward, progress visibility, and social accountability — before users could fall off.",
    outcome: "D7 retention rate of 54% — more than double the category average of 25%.",
    process: ["Research", "Habit Design", "User Flows", "UI Design", "Micro-interactions", "Prototype"],
    image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=1200&h=700&fit=crop&auto=format",
    screens: [],
    accent: "#5631A1",
  },
  {
    id: 15, title: "FoodDelight Delivery App", category: "Mobile Apps",
    duration: "5 weeks · 2022",
    tags: ["Figma", "Adobe XD"],
    overview: "A food delivery experience with real-time GPS order tracking, smart restaurant recommendations based on order history, dietary preference filters, and a checkout under 3 taps.",
    challenge: "The client's delivery partner had a 4.2-star app competing against 4.8-star incumbents. User reviews cited confusing navigation and a slow, multi-step checkout as primary complaints.",
    outcome: "App store rating improved from 4.2 to 4.8 within 3 months of redesign launch.",
    process: ["Research", "User Interviews", "User Flows", "UI Design", "Prototype"],
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&h=700&fit=crop&auto=format",
    screens: [],
    accent: "#FFB347",
  },
  {
    id: 16, title: "EventSync Manager App", category: "Mobile Apps",
    duration: "4 weeks · 2022",
    tags: ["Figma", "Principle"],
    overview: "An all-in-one event management app for attendees and organisers — ticketing, QR check-in, live schedule with session reminders, speaker bios, networking profiles, and a Q&A system.",
    challenge: "Event apps are typically built for a single event and discarded. The challenge was designing a product generic enough to work across event types while feeling bespoke to each one through theming.",
    outcome: "Deployed at 12 events in the first 6 months. Average attendee app usage: 4.1 sessions per event day.",
    process: ["Discovery", "User Personas", "Wireframes", "UI Design", "Prototype"],
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&h=700&fit=crop&auto=format",
    screens: [],
    accent: "#4ECDC4",
  },
  {
    id: 17, title: "Social Media Campaign", category: "Graphic Design",
    duration: "Ongoing · 2022–2023",
    tags: ["Photoshop", "Illustrator", "After Effects", "Canva"],
    overview: "100+ social media creatives for a lifestyle brand across Instagram, LinkedIn, and Twitter — consistent visual language, seasonal campaigns, product launches, and motion graphic variants for Reels and Stories.",
    challenge: "The brand had no visual guidelines. Every post looked different. The brief was to create a design system for social content that any team member could execute consistently.",
    outcome: "Follower growth of 340% over 8 months. Average post engagement rate of 6.2% — 4× above the lifestyle brand average.",
    process: ["Brand Discovery", "Style Guide", "Template Design", "Content Calendar", "Production"],
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&h=700&fit=crop&auto=format",
    screens: [],
    accent: "#FF6B6B",
  },
  {
    id: 18, title: "Corporate Brochure Series", category: "Graphic Design",
    duration: "3 weeks · 2022",
    tags: ["Illustrator", "InDesign", "Photoshop"],
    overview: "15 corporate brochures across multiple product lines — tri-fold, bi-fold, and multi-page formats — print-ready with CMYK profiles, bleed marks, and spot colour specifications.",
    challenge: "All 15 documents needed to feel like a cohesive family while each one clearly distinguished its product line. A modular grid system was designed first so all layouts shared the same structural DNA.",
    outcome: "Print batch delivered on time across 3 international markets. Zero reprints required — first time the client had achieved this.",
    process: ["Brief", "Grid System", "Typography", "Layout", "Pre-press"],
    image: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=1200&h=700&fit=crop&auto=format",
    screens: [],
    accent: "#5631A1",
  },
  {
    id: 19, title: "NovaBrand Identity System", category: "Branding",
    duration: "5 weeks · 2023",
    tags: ["Illustrator", "Photoshop", "InDesign"],
    overview: "Complete visual identity for a B2B tech startup — logomark, wordmark, colour system, type hierarchy, brand voice guidelines, business cards, email signatures, presentation templates, and a 48-page brand book.",
    challenge: "The founders wanted to appear established and credible to enterprise clients while being genuinely approachable to SMB clients. These are usually opposing positioning stances — the identity had to live in the tension between them.",
    outcome: "Brand launched at a major industry conference. 3 enterprise pilot enquiries received within the first week of launch.",
    process: ["Discovery", "Competitive Positioning", "Concept Development", "Identity Design", "Brand Book"],
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=700&fit=crop&auto=format",
    screens: [
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=500&fit=crop&auto=format",
    ],
    accent: "#FFB347",
  },
  {
    id: 20, title: "Artisan Café Rebrand", category: "Branding",
    duration: "4 weeks · 2022",
    tags: ["Illustrator", "Photoshop"],
    overview: "Full rebrand for a 3-location artisan café chain — new logo system, cup and packaging design, menu redesign, signage specs, takeaway bag design, and a social media template kit.",
    challenge: "The original brand looked indistinguishable from any independent café. The redesign needed to build a recognisable identity that could scale to 15 locations without losing its handcrafted character.",
    outcome: "Brand recognition in customer surveys increased from 23% to 71% within 6 months. Franchise enquiries received for the first time in the company's 7-year history.",
    process: ["Brand Audit", "Concept", "Identity Design", "Packaging", "Signage", "Rollout"],
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&h=700&fit=crop&auto=format",
    screens: [],
    accent: "#FF6B6B",
  },
  {
    id: 21, title: "Product Launch Video", category: "Videos",
    duration: "2 weeks · 2023",
    tags: ["Premiere Pro", "After Effects", "Photoshop"],
    overview: "A 90-second product launch video with kinetic typography, brand animations, custom motion graphics, colour-graded footage, and a professional sound design pass — delivered in 4K for web and broadcast.",
    challenge: "The client had a 2-week window between product photography delivery and the public launch event. Full post-production in 14 days with 3 rounds of revisions built in.",
    outcome: "Delivered on day 13. Video reached 120K organic views on LinkedIn in the first 48 hours.",
    process: ["Script", "Storyboard", "Motion Design", "Edit", "Sound Design", "Colour Grade"],
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&h=700&fit=crop&auto=format",
    screens: [],
    accent: "#9999FF",
  },
  {
    id: 22, title: "Corporate Brand Film", category: "Videos",
    duration: "3 weeks · 2022",
    tags: ["Premiere Pro", "After Effects"],
    overview: "A 4-minute corporate identity film — company story, team highlights, product showcase, client testimonials, and custom motion graphics throughout. Delivered in multiple aspect ratios for web, LinkedIn, and conference display.",
    challenge: "Filming was completed before the design brief was finalised, leaving a mix of footage that didn't tell a coherent story. The edit had to construct a narrative from existing assets alone.",
    outcome: "Used as the hero video at the client's annual conference (1,200 attendees) and embedded on their homepage. Website conversions increased 28% in the following month.",
    process: ["Concept", "Rough Cut", "Motion Graphics", "Fine Cut", "Sound Mix", "Delivery"],
    image: "https://images.unsplash.com/photo-1536240478700-b869ad10e128?w=1200&h=700&fit=crop&auto=format",
    screens: [],
    accent: "#5631A1",
  },
  {
    id: 23, title: "Nebula UI Design System", category: "UI/UX",
    duration: "10 weeks · 2023",
    tags: ["Figma", "Storybook", "React"],
    overview: "A comprehensive design system with 80+ components, a full token set (colour, spacing, typography, elevation, motion), accessibility documentation, interactive Storybook, and a Figma plugin for token management.",
    challenge: "The team had 4 designers and 12 developers producing inconsistent UIs across 3 products. Components were being rebuilt from scratch every sprint. A system was needed that would genuinely be adopted — not just documented.",
    outcome: "Component reuse rate reached 92% within 2 sprints of rollout. Designer–developer handoff time reduced by 65%.",
    process: ["Audit", "Token Architecture", "Component Design", "Documentation", "Storybook", "Adoption Training"],
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&h=700&fit=crop&auto=format",
    screens: [
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&h=500&fit=crop&auto=format",
    ],
    accent: "#5631A1",
  },
  {
    id: 24, title: "B2B Onboarding UX Research", category: "UI/UX",
    duration: "4 weeks · 2022",
    tags: ["Figma", "Maze", "Hotjar"],
    overview: "An end-to-end UX research study on B2B SaaS onboarding — 18 user interviews, moderated usability testing with 12 participants, heatmap analysis across 3 months of Hotjar data, and a redesigned onboarding flow.",
    challenge: "The client's SaaS product had a 67% drop-off during the 7-day free trial. The research had to identify whether this was a product, onboarding, or market fit problem — and then solve it.",
    outcome: "Research identified 4 critical drop-off points. Redesigned onboarding reduced trial-to-paid conversion drop-off by 38%. Monthly recurring revenue increased 19% in the quarter following implementation.",
    process: ["Research Plan", "User Interviews", "Usability Testing", "Data Analysis", "Redesign", "A/B Test"],
    image: "https://images.unsplash.com/photo-1576153192396-180ecef2a715?w=1200&h=700&fit=crop&auto=format",
    screens: [],
    accent: "#FF6B6B",
  },
]

// ===== MAIN COMPONENT =====

function LegacyProjectsPage({ onNavigate }: ProjectsPageProps) {
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedId, setSelectedId] = useState(allProjects[0].id)
  const [mobileOpen, setMobileOpen] = useState(false)
  const detailRef = useRef<HTMLDivElement>(null)

  const counts: Record<string, number> = { All: allProjects.length }
  allProjects.forEach(p => { counts[p.category] = (counts[p.category] || 0) + 1 })

  const filtered = activeCategory === "All" ? allProjects : allProjects.filter(p => p.category === activeCategory)

  useEffect(() => {
    if (filtered.length > 0 && !filtered.find(p => p.id === selectedId)) {
      setSelectedId(filtered[0].id)
      detailRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [activeCategory, filtered, selectedId])

  const selected = allProjects.find(p => p.id === selectedId) ?? allProjects[0]

  const handleSelect = (id: number) => {
    setSelectedId(id)
    setMobileOpen(false)
    detailRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat)
  }

  return (
    <div
      className="flex flex-col"
      style={{ height: '100vh', paddingTop: '64px', backgroundColor: '#F9F8F6', overflow: 'hidden' }}
    >
      {/* ── MOBILE: dropdown trigger bar ── */}
      <div
        className="md:hidden shrink-0 flex items-center gap-3 px-4 py-3"
        style={{ background: 'white', borderBottom: '1px solid rgba(86,49,161,0.1)' }}
      >
        {/* current project label */}
        <div className="flex-1 min-w-0">
          <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Viewing
          </p>
          <p className="text-sm font-semibold truncate" style={{ color: '#1A1A2E', fontFamily: "'Outfit', sans-serif" }}>
            {selected.title}
          </p>
        </div>
        {/* open/close button */}
        <button
          onClick={() => setMobileOpen(o => !o)}
          aria-label={mobileOpen ? 'Close project browser' : 'Open project browser'}
          title={mobileOpen ? 'Close project browser' : 'Open project browser'}
          className="shrink-0 flex h-10 w-10 items-center justify-center rounded-full text-xs font-semibold transition-all"
          style={{
            background: mobileOpen ? '#5631A1' : 'rgba(86,49,161,0.08)',
            color: mobileOpen ? 'white' : '#5631A1',
            fontFamily: "'Outfit', sans-serif",
            border: '1px solid rgba(86,49,161,0.2)',
          }}
        >
          <svg
            width="14" height="14" viewBox="0 0 12 12" fill="none"
            style={{ transform: mobileOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
          >
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* ── MOBILE: dropdown panel ── */}
      <div
        className="md:hidden shrink-0 overflow-y-auto no-scrollbar"
        style={{
          maxHeight: mobileOpen ? '55vh' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease',
          background: 'white',
          borderBottom: mobileOpen ? '1px solid rgba(86,49,161,0.12)' : 'none',
          zIndex: 20,
        }}
      >
        {/* Category filters inside dropdown */}
        <div
          className="px-4 pt-3 pb-2 flex flex-wrap gap-2"
          style={{ borderBottom: '1px solid rgba(86,49,161,0.08)' }}
        >
          {categories.map(cat => {
            const active = activeCategory === cat
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all whitespace-nowrap"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  background: active ? '#5631A1' : 'rgba(86,49,161,0.07)',
                  color: active ? 'white' : '#5631A1',
                  border: active ? 'none' : '1px solid rgba(86,49,161,0.18)',
                  boxShadow: active ? '0 3px 10px rgba(86,49,161,0.28)' : 'none',
                }}
              >
                {cat}
                <span
                  className="text-[9px] px-1 py-0.5 rounded-full"
                  style={{
                    background: active ? 'rgba(255,255,255,0.25)' : 'rgba(86,49,161,0.12)',
                    color: active ? 'white' : '#5631A1',
                  }}
                >
                  {counts[cat] ?? 0}
                </span>
              </button>
            )
          })}
        </div>

        {/* Project list inside dropdown */}
        {filtered.map((project, idx) => {
          const isActive = project.id === selectedId
          const catColor = categoryColors[project.category] ?? '#5631A1'
          return (
            <button
              key={project.id}
              onClick={() => handleSelect(project.id)}
              className="w-full text-left flex items-center gap-3 px-4 py-3 relative transition-colors"
              style={{
                background: isActive ? 'rgba(86,49,161,0.06)' : 'transparent',
                borderBottom: '1px solid rgba(86,49,161,0.06)',
              }}
            >
              {isActive && (
                <span className="absolute left-0 top-0 bottom-0 w-0.5 rounded-r" style={{ background: '#5631A1' }} />
              )}
              <span
                className="shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold"
                style={{
                  background: isActive ? '#5631A1' : 'rgba(86,49,161,0.08)',
                  color: isActive ? 'white' : '#9CA3AF',
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                {String(idx + 1).padStart(2, '0')}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold truncate" style={{ color: isActive ? '#1A1A2E' : '#374151', fontFamily: "'Outfit', sans-serif" }}>
                  {project.title}
                </p>
                <span
                  className="inline-block text-[10px] font-medium px-2 py-0.5 rounded-full mt-0.5"
                  style={{ background: `${catColor}18`, color: catColor, fontFamily: "'Outfit', sans-serif" }}
                >
                  {project.category}
                </span>
              </div>
              {isActive && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
                  <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="#5631A1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          )
        })}
      </div>

      {/* ── DESKTOP: 30/70 split ── */}
      <div className="flex flex-1 min-h-0">

        {/* ══ LEFT SIDEBAR (desktop only, 30%) ══ */}
        <aside
          className="hidden md:flex shrink-0 flex-col"
          style={{
            width: '30%',
            minWidth: '220px',
            maxWidth: '320px',
            borderRight: '1px solid rgba(86,49,161,0.1)',
            background: 'white',
          }}
        >
          {/* ── Category filter section ── */}
          <div
            className="shrink-0 px-4 pt-4 pb-3"
            style={{ borderBottom: '1px solid rgba(86,49,161,0.1)' }}
          >
            <p
              className="text-[10px] font-bold uppercase tracking-widest mb-3"
              style={{ color: '#9CA3AF', fontFamily: "'Outfit', sans-serif" }}
            >
              Filter by Category
            </p>
            <div className="space-y-1">
              {categories.map(cat => {
                const active = activeCategory === cat
                const catColor = categoryColors[cat] ?? '#5631A1'
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 text-left"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      background: active ? '#5631A1' : 'transparent',
                      color: active ? 'white' : '#4B5563',
                    }}
                  >
                    <span className="flex items-center gap-2">
                      {cat !== 'All' && (
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ background: active ? 'rgba(255,255,255,0.6)' : catColor }}
                        />
                      )}
                      {cat}
                    </span>
                    <span
                      className="text-[10px] px-1.5 py-0.5 rounded-full shrink-0"
                      style={{
                        background: active ? 'rgba(255,255,255,0.22)' : 'rgba(86,49,161,0.09)',
                        color: active ? 'white' : '#5631A1',
                      }}
                    >
                      {counts[cat] ?? 0}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* ── Project list ── */}
          <div className="flex-1 overflow-y-auto no-scrollbar">
            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                <span className="text-3xl mb-3">🔍</span>
                <p className="text-sm font-semibold" style={{ color: '#1A1A2E', fontFamily: "'Outfit', sans-serif" }}>
                  No projects here yet
                </p>
              </div>
            )}

            {filtered.map((project, idx) => {
              const isActive = project.id === selectedId
              const catColor = categoryColors[project.category] ?? '#5631A1'
              return (
                <button
                  key={project.id}
                  onClick={() => handleSelect(project.id)}
                  className="w-full text-left flex items-start gap-3 px-4 py-3.5 transition-all duration-150 relative"
                  style={{
                    background: isActive ? 'rgba(86,49,161,0.06)' : 'transparent',
                    borderBottom: '1px solid rgba(86,49,161,0.07)',
                  }}
                >
                  {isActive && (
                    <span
                      className="absolute left-0 top-0 bottom-0 w-0.5 rounded-r"
                      style={{ background: '#5631A1' }}
                    />
                  )}
                  <span
                    className="shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold mt-0.5"
                    style={{
                      background: isActive ? '#5631A1' : 'rgba(86,49,161,0.08)',
                      color: isActive ? 'white' : '#9CA3AF',
                      fontFamily: "'Outfit', sans-serif",
                    }}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-xs font-semibold leading-snug truncate"
                      style={{ color: isActive ? '#1A1A2E' : '#374151', fontFamily: "'Outfit', sans-serif" }}
                    >
                      {project.title}
                    </p>
                    <span
                      className="inline-block mt-1 text-[10px] font-medium px-2 py-0.5 rounded-full"
                      style={{ background: `${catColor}18`, color: catColor, fontFamily: "'Outfit', sans-serif" }}
                    >
                      {project.category}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </aside>

        {/* ══ RIGHT DETAIL PANEL ══ */}
        <div
          ref={detailRef}
          className="flex-1 overflow-y-auto no-scrollbar"
          style={{ background: selected.id === 1 ? '#FFFFFF' : '#F9F8F6' }}
          key={selected.id}
        >
          <ProjectDetail project={selected} onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  )
}

// ===== DETAIL PANEL =====

function ProjectDetail({
  project,
  onNavigate,
}: {
  project: typeof allProjects[0]
  onNavigate: (p: Page) => void
}) {
  const catColor = categoryColors[project.category] ?? '#5631A1'

  // simple fade-in on mount keyed by project id
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(false)
    const t = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(t)
  }, [project.id])

  return (
    <div
      className="transition-opacity duration-300"
      style={{ opacity: mounted ? 1 : 0, minHeight: '100%' }}
    >
      {/* ── Hero image ── */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: '280px', background: '#E8E8E8' }}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(26,26,46,0.55) 0%, transparent 60%)' }}
        />
        {/* Category chip */}
        <span
          className="absolute top-5 left-6 px-3 py-1 rounded-full text-xs font-bold text-white"
          style={{ background: catColor, fontFamily: "'Outfit', sans-serif", boxShadow: `0 2px 10px ${catColor}60` }}
        >
          {project.category}
        </span>
        {/* Title on image */}
        <div className="absolute bottom-5 left-6 right-6">
          <h1
            className="font-black leading-tight text-white"
            style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(1.4rem, 3vw, 2rem)', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
          >
            {project.title}
          </h1>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="px-6 md:px-8 py-7 space-y-8">

        {/* ── Meta row: duration + tags ── */}
        <div className="flex flex-wrap items-center gap-4">
          <div
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl"
            style={{ background: 'white', border: '1px solid #E8E8E8', boxShadow: '0 2px 8px rgba(86,49,161,0.06)' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="2" width="12" height="11" rx="2" stroke="#5631A1" strokeWidth="1.2" />
              <line x1="4" y1="1" x2="4" y2="4" stroke="#5631A1" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="10" y1="1" x2="10" y2="4" stroke="#5631A1" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="1" y1="6" x2="13" y2="6" stroke="#5631A1" strokeWidth="1.2" />
            </svg>
            <span className="text-xs font-semibold" style={{ color: '#5631A1', fontFamily: "'Outfit', sans-serif" }}>
              {project.duration}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map(t => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-lg text-xs font-medium"
                style={{
                  background: 'rgba(86,49,161,0.07)',
                  color: '#5631A1',
                  border: '1px solid rgba(86,49,161,0.16)',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* ── Overview ── */}
        <Section label="Overview" icon="📋" color={catColor}>
          <p className="text-sm leading-relaxed" style={{ color: '#4B5563', fontFamily: "'Inter', sans-serif" }}>
            {project.overview}
          </p>
        </Section>

        {/* ── Design Process ── */}
        <Section label="Design Process" icon="🔄" color={catColor}>
          <div className="flex flex-wrap gap-2 items-center">
            {project.process.map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <div
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl"
                  style={{
                    background: `${catColor}12`,
                    border: `1px solid ${catColor}30`,
                  }}
                >
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black text-white shrink-0"
                    style={{ background: catColor, fontFamily: "'Outfit', sans-serif" }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-xs font-semibold" style={{ color: catColor, fontFamily: "'Outfit', sans-serif" }}>
                    {step}
                  </span>
                </div>
                {i < project.process.length - 1 && (
                  <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
                    <path d="M1 4h12M10 1l3 3-3 3" stroke={catColor} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </Section>

        {/* ── Design Showcase ── */}
        <Section label="Design Showcase" icon="🖼️" color={catColor}>
          {project.screens.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Main image */}
              <div
                className="overflow-hidden rounded-2xl col-span-full sm:col-span-1"
                style={{ background: '#E8E8E8', aspectRatio: '16/9' }}
              >
                <img
                  src={project.image}
                  alt={`${project.title} — main screen`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              {project.screens.map((src, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-2xl"
                  style={{ background: '#E8E8E8', aspectRatio: '16/9' }}
                >
                  <img
                    src={src}
                    alt={`${project.title} — screen ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                className="overflow-hidden rounded-2xl col-span-full"
                style={{ background: '#E8E8E8', aspectRatio: '21/9' }}
              >
                <img
                  src={project.image}
                  alt={`${project.title} — main screen`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          )}
        </Section>

        {/* ── Case Study ── */}
        <Section label="Case Study" icon="📖" color={catColor}>
          <div className="space-y-5">
            <CaseBlock
              title="The Challenge"
              color={catColor}
              icon="⚡"
              body={project.challenge}
            />
            <CaseBlock
              title="Outcome"
              color={catColor}
              icon="🎯"
              body={project.outcome}
              highlight
            />
          </div>
        </Section>

        {/* ── Footer CTA ── */}
        <div
          className="flex items-center justify-between py-6 px-6 rounded-2xl mt-2"
          style={{ background: `${catColor}0E`, border: `1px solid ${catColor}25` }}
        >
          <div>
            <p
              className="font-bold text-sm"
              style={{ color: '#1A1A2E', fontFamily: "'Outfit', sans-serif" }}
            >
              Liked this project?
            </p>
            <p className="text-xs mt-0.5" style={{ color: '#6B7280', fontFamily: "'Inter', sans-serif" }}>
              Let's build something great together.
            </p>
          </div>
          <button
            onClick={() => {
              onNavigate('home')
              setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 200)
            }}
            className="px-5 py-2.5 rounded-full text-xs font-bold text-white shrink-0"
            style={{ background: catColor, fontFamily: "'Outfit', sans-serif", boxShadow: `0 4px 14px ${catColor}50` }}
          >
            Hire Me →
          </button>
        </div>

        {/* bottom breathing room */}
        <div className="h-6" />
      </div>
    </div>
  )
}

// ===== HELPERS =====

function Section({
  label,
  icon,
  color,
  children,
}: {
  label: string
  icon: string
  color: string
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="flex items-center gap-2.5 mb-4">
        <span className="text-base">{icon}</span>
        <h2
          className="font-bold text-sm"
          style={{ color: '#1A1A2E', fontFamily: "'Outfit', sans-serif", letterSpacing: '0.03em' }}
        >
          {label}
        </h2>
        <div
          className="flex-1 h-px"
          style={{ background: `${color}25` }}
        />
      </div>
      {children}
    </div>
  )
}

function DetailSection({
  title,
  color,
  children,
}: {
  title: string
  color: string
  children: React.ReactNode
}) {
  return (
    <section className="bg-transparent">
      <h2 className="mb-4 border-b pb-2 text-xl font-extrabold text-[#1A1A2E]" style={{ fontFamily: "'Outfit', sans-serif", borderColor: `${color}40` }}>{title}</h2>
      <div className="text-sm leading-7 text-[#697080]">{children}</div>
    </section>
  )
}

function PreviewSection({ title, image, accent, keepColor = false, fullHeight = false }: { title: string; image: string; accent: string; keepColor?: boolean; fullHeight?: boolean }) {
  return (
    <section className={fullHeight ? 'relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2' : 'w-full'}>
      <div className={`relative flex w-full items-center justify-center overflow-hidden bg-white ${fullHeight ? 'h-[80vh]' : 'min-h-[22rem] rounded-[24px] sm:min-h-[34rem]'}`} style={{ border: fullHeight ? undefined : `1px solid ${accent}25` }}>
        <img src={image} alt={title} className={`w-full ${fullHeight ? 'h-full object-cover' : 'h-full max-h-[70vh] rounded-[24px] object-cover'} transition-[filter] duration-500 ${keepColor ? '' : 'grayscale hover:grayscale-0'}`} />
        <h2 className="pointer-events-none absolute inset-0 flex items-center justify-center px-4 text-center text-2xl font-extrabold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] sm:text-4xl" style={{ fontFamily: "'Outfit', sans-serif" }}>{title}</h2>
      </div>
    </section>
  )
}

function CaseBlock({
  title,
  icon,
  body,
  color,
  highlight = false,
}: {
  title: string
  icon: string
  body: string
  color: string
  highlight?: boolean
}) {
  return (
    <div
      className="p-4 rounded-xl"
      style={{
        background: highlight ? `${color}0D` : 'white',
        border: highlight ? `1px solid ${color}30` : '1px solid #E8E8E8',
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm">{icon}</span>
        <h3
          className="text-xs font-bold uppercase tracking-wider"
          style={{ color: highlight ? color : '#9CA3AF', fontFamily: "'Outfit', sans-serif" }}
        >
          {title}
        </h3>
      </div>
      <p className="text-sm leading-relaxed" style={{ color: '#4B5563', fontFamily: "'Inter', sans-serif" }}>
        {body}
      </p>
    </div>
  )
}

// ===== CENTERED PORTFOLIO =====

type PortfolioTab = 'uiux' | 'graphic'

const portfolioTabs: { id: PortfolioTab; label: string; description: string }[] = [
  { id: 'uiux', label: 'UI/UX Designer', description: 'Websites, web apps, mobile products, and company brand experiences.' },
  { id: 'graphic', label: 'Graphic Designer', description: 'Social posts, videos, logo design, and expo event experiences.' },
]

function projectsForTab(tab: PortfolioTab) {
  const uiuxCategories = ['Websites', 'Web Apps', 'Mobile Apps', 'Branding']

  if (tab === 'graphic') {
    const graphicCardProjects = [17, 21, 19, 22]
    const graphicCardLabels: Record<number, string> = {
      17: 'Social Media Posts',
      21: 'Videos',
      19: 'Logo Design',
      22: 'Expo Events',
    }
    return graphicCardProjects
      .map((id) => {
        const project = allProjects.find((item) => item.id === id)
        return project ? { ...project, category: graphicCardLabels[id] } : undefined
      })
      .filter((project): project is NonNullable<typeof project> => Boolean(project))
  }

  // Keep one featured project card for each UI/UX service area.
  return uiuxCategories
    .map((category) => allProjects.find((project) => project.category === category))
    .filter((project): project is (typeof allProjects)[number] => Boolean(project))
}

function projectCategoryLabel(category: string) {
  const labels: Record<string, string> = {
    Websites: 'Website',
    'Web Apps': 'Web App',
    'Mobile Apps': 'Mobile App',
    Branding: 'Company Branding',
  }
  return labels[category] ?? category
}

function projectCount(category: string) {
  const graphicCounts: Record<string, number> = {
    'Social Media Posts': 1,
    Videos: allProjects.filter((project) => project.category === 'Videos').length,
    'Logo Design': allProjects.filter((project) => project.category === 'Branding').length,
    'Expo Events': 1,
  }
  if (category in graphicCounts) return graphicCounts[category]
  return allProjects.filter((project) => project.category === category).length
}

export default function ProjectsPage(_props: ProjectsPageProps) {
  const [activeTab, setActiveTab] = useState<PortfolioTab>('uiux')
  const [visible, setVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const lastSoundIndexRef = useRef(0)
  const projects = projectsForTab(activeTab)
  const backgroundProject = projects[activeIndex] ?? projects[0]
  const selectedProject = allProjects.find((project) => project.id === selectedProjectId)
  const currentTab = portfolioTabs.find((tab) => tab.id === activeTab)!

  useEffect(() => {
    setVisible(false)
    setActiveIndex(0)
    railRef.current?.scrollTo({ left: 0, behavior: 'auto' })
    const frame = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(frame)
  }, [activeTab])

  const updateActiveCard = () => {
    const rail = railRef.current
    if (!rail) return
    const cards = Array.from(rail.querySelectorAll<HTMLElement>('[data-project-card]'))
    const railCenter = rail.scrollLeft + rail.clientWidth / 2
    const closest = cards.reduce((best, card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2
      return Math.abs(cardCenter - railCenter) < Math.abs(cards[best].offsetLeft + cards[best].offsetWidth / 2 - railCenter) ? index : best
    }, 0)
    setActiveIndex((previous) => {
      if (previous !== closest && lastSoundIndexRef.current !== closest) {
        lastSoundIndexRef.current = closest
        const context = audioContextRef.current ?? new AudioContext()
        audioContextRef.current = context
        const oscillator = context.createOscillator()
        const gain = context.createGain()
        oscillator.type = 'sine'
        oscillator.frequency.setValueAtTime(440, context.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(300, context.currentTime + 0.07)
        gain.gain.setValueAtTime(0.025, context.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.07)
        oscillator.connect(gain).connect(context.destination)
        oscillator.start()
        oscillator.stop(context.currentTime + 0.07)
      }
      return closest
    })
  }

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    const rail = railRef.current
    if (!rail || event.deltaY === 0) return
    event.preventDefault()
    rail.scrollBy({ left: event.deltaY, behavior: 'smooth' })
  }

  const openProject = (id: number) => {
    setSelectedProjectId(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const closeProject = () => {
    setSelectedProjectId(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (selectedProject) {
    const projectChoices = allProjects.filter((item) => item.category === selectedProject.category)
    const websiteLabels = ['Sands', 'Precise3DM', 'Graft3D', 'WildplantTS', 'NMCdesigns', 'shivshakticrackers', 'Mahaperiyava']
    return (
      <main className="min-h-screen pt-16" style={{ background: selectedProject.id === 1 ? '#FFFFFF' : '#F9F8F6' }}>
        <div className="sticky top-16 z-30 border-b border-[#E8E8E8] bg-white/95 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center gap-2 px-3 py-2 sm:gap-4 sm:px-8 sm:py-3">
            <span className="shrink-0 text-xs font-bold text-[#1A1A2E] sm:text-sm">{selectedProject.category}</span>
            <div className="min-w-0 flex-1 overflow-x-auto">
              <div className="flex w-max items-center gap-1.5 sm:gap-2">
                {projectChoices.map((project, index) => (
                  <button
                    key={project.id}
                    onClick={() => openProject(project.id)}
                    aria-label={`Open ${project.title}`}
                    title={project.title}
                    className={`flex h-10 min-w-fit shrink-0 items-center justify-center whitespace-nowrap rounded-lg px-3 text-[11px] font-bold transition sm:h-12 sm:rounded-xl sm:px-4 sm:text-sm ${project.id === selectedProject.id ? 'bg-[#5631A1] text-white' : 'bg-[#E8E8E8] text-[#1A1A2E] hover:bg-[#D6D6D6]'}`}
                  >
                    {selectedProject.category === 'Websites' ? websiteLabels[index] ?? `W${index + 1}` : `W${index + 1}`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <header className="flex min-h-44 items-center justify-center px-6 py-12 text-center text-white sm:min-h-56" style={{ background: `linear-gradient(115deg, ${selectedProject.accent}E8, #17152BEE), url(${selectedProject.image}) center/cover` }}>
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-white/75">{selectedProject.category}</p>
            <h1 className="mx-auto max-w-4xl text-3xl font-extrabold sm:text-5xl" style={{ fontFamily: "'Outfit', sans-serif" }}>{selectedProject.title}</h1>
          </div>
        </header>

        <div className="mx-auto max-w-5xl space-y-6 px-5 py-10 sm:px-8 sm:py-14">
          <DetailSection title="About the Project" color={selectedProject.accent}>
            <p>{selectedProject.overview}</p>
            <p className="mt-4 text-xs font-semibold text-[#8A849C]">{selectedProject.duration}</p>
            {(selectedProject.id === 1 || selectedProject.id === 2 || selectedProject.id === 3 || selectedProject.id === 4 || selectedProject.id === 5 || selectedProject.id === 6 || selectedProject.id === 7) && (
              <div className="mt-5 grid gap-3 border-t border-[#E8E8E8] pt-5 sm:grid-cols-4">
                {(selectedProject.id === 1 ? [["Role", "UX/UI Designer"], ["Project", "SANDS Corporate Website"], ["Industry", "Energy, Power & Industrial Technology"]] : selectedProject.id === 2 ? [["Role", "UX/UI Designer"], ["Project", "Precise3DM Website"], ["Industry", "Digital Manufacturing / 3D Technology"]] : selectedProject.id === 3 ? [["Role", "UX/UI Designer"], ["Project", "Graft3D Healthcare Website"], ["Industry", "Healthcare Technology / Medical 3D Printing"]] : selectedProject.id === 4 ? [["Role", "UX/UI Designer"], ["Project", "WildPlantTS Corporate Website"], ["Industry", "Reality Capture / Digital Engineering"], ["Focus", "B2B UX/UI · Information Architecture · Service Discovery"]] : selectedProject.id === 5 ? [["Role", "UX/UI Designer"], ["Project", "NM Construction & Designing Website"], ["Industry", "Construction & Architecture"], ["Focus", "Corporate Website · Project Showcase · Lead Generation"]] : selectedProject.id === 6 ? [["Role", "UX/UI Designer"], ["Project", "Shiv Shakti Crackers World Website"], ["Industry", "E-commerce / Festive Retail"], ["Focus", "UX/UI · Product Discovery · Catalogue Design · Responsive Web Design"]] : [["Role", "UX/UI Designer"], ["Project", "Mahaperiyava Imports & Exports Website"], ["Industry", "Import & Export"], ["Focus", "Startup Website · UX/UI Design · Brand Presence · Lead Generation"]]).map(([label, value]) => (
                  <div key={label}><p className="text-[11px] font-bold uppercase tracking-wider text-[#9A96A8]">{label}</p><p className="mt-1 font-semibold text-[#343447]">{value}</p></div>
                ))}
              </div>
            )}
          </DetailSection>
          <DetailSection title="Problem and Solution" color={selectedProject.accent}>
            <div className="grid gap-6 md:grid-cols-2">
              <div><h3 className="mb-2 font-bold text-[#1A1A2E]">The Problem</h3><p>{selectedProject.challenge}</p></div>
              <div><h3 className="mb-2 font-bold text-[#1A1A2E]">The Solution</h3><p>{selectedProject.outcome}</p></div>
            </div>
          </DetailSection>
          {selectedProject.id === 2 && (
            <>
              <DetailSection title="Design Approach" color={selectedProject.accent}>
                <p>Technical specifications are introduced progressively, after visitors understand the problem, process, technology, and outcome. The Scan-to-CAD journey is made visible:</p>
                <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl bg-[#F9F8F6] p-4 text-xs font-bold text-[#343447]">
                  {["Physical Part", "3D Scanning", "Scan Data / Mesh", "Reverse Engineering", "CAD Model", "Manufacture / Inspect / 3D Print"].map((step, index) => <span key={step} className="flex items-center gap-2"><span className="rounded-lg bg-white px-3 py-2 shadow-sm">{step}</span>{index < 5 && <span className="text-[#9A96A8]">→</span>}</span>)}
                </div>
                <p className="mt-4">This visual workflow helps visitors understand how a physical component becomes an editable digital model ready for manufacturing, inspection, or 3D printing.</p>
              </DetailSection>
              <DetailSection title="Key Website Sections" color={selectedProject.accent}>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    ["Services & Technologies", "3D scanning, reverse engineering, inspection, additive manufacturing, Scan-to-CAD, and technologies such as structured light, handheld scanning, LiDAR, and photogrammetry."],
                    ["Industries", "Automotive, aerospace, EV, defence, heavy engineering, power and energy, mining, pumps and valves, consumer products, and agricultural machinery."],
                    ["Process & Case Studies", "Explain requirement capture, scanner selection, scanning, reverse engineering, validation, and delivery through clear workflows and real engineering examples."],
                    ["Trust & Lead Generation", "Show experience and capabilities, then guide visitors to Get a Quote, Request Consultation, Talk to an Engineer, or Book a Demo."],
                  ].map(([title, description]) => <div key={title} className="rounded-xl border border-[#E8E8E8] bg-white p-4"><h3 className="font-bold text-[#1A1A2E]">{title}</h3><p className="mt-2 text-xs leading-5">{description}</p></div>)}
                </div>
                <p className="mt-4">Precise3DM highlights 10+ years in 3D scanning, 3,000+ scan-based projects, 10,000+ objects scanned, 250+ scanners installed, and presence across 15+ countries.</p>
              </DetailSection>
            </>
          )}
          {selectedProject.id === 3 && (
            <>
              <DetailSection title="Design Approach" color={selectedProject.accent}>
                <p>The experience makes the path from medical imaging to a usable patient-specific solution understandable at a glance, while presenting clinical and technical details progressively.</p>
                <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl bg-[#F9F8F6] p-4 text-xs font-bold text-[#343447]">
                  {["CT / MRI / CBCT", "DICOM Processing", "Image Segmentation", "3D Anatomical Model", "Bio-CAD Design", "Medical 3D Printing", "Clinical Application"].map((step, index) => <span key={step} className="flex items-center gap-2"><span className="rounded-lg bg-white px-3 py-2 shadow-sm">{step}</span>{index < 6 && <span className="text-[#9A96A8]">→</span>}</span>)}
                </div>
                <p className="mt-4">The design principles are clarity, trust, simplicity, precision, and accessibility, balancing medical professionalism with modern technology.</p>
              </DetailSection>
              <DetailSection title="Key Website Sections" color={selectedProject.accent}>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    ["Healthcare 3D Services", "DICOM image processing, Bio-CAD modelling, medical 3D printing, and custom medical design."],
                    ["Applications", "Surgical planning, anatomical models, patient-specific implants, prosthetics and orthotics, device design, and healthcare education."],
                    ["Products & Packages", "Medical products, patient-specific solutions, and structured anatomical model and surgical planning packages."],
                    ["How It Works", "A clear service workflow: Upload, Process, Design, Review, Print, and Deliver."],
                    ["Trust & Credibility", "Medical expertise, customer and technology partners, quality messaging, and capability highlights."],
                    ["Enquiry & Consultation", "Direct paths to Get a Quote, Book a Demo, Enquire Now, or Meet Us Live."],
                  ].map(([title, description]) => <div key={title} className="rounded-xl border border-[#E8E8E8] bg-white p-4"><h3 className="font-bold text-[#1A1A2E]">{title}</h3><p className="mt-2 text-xs leading-5">{description}</p></div>)}
                </div>
                <p className="mt-4 rounded-xl border border-[#FF6B6B30] bg-[#FF6B6B0D] p-4">Graft3D highlights 250+ medical 3D printed parts, 200+ healthcare customers, 30+ medical 3D software installations, and 10+ medical 3D printing applications developed.</p>
              </DetailSection>
            </>
          )}
          {selectedProject.id === 4 && (
            <>
              <DetailSection title="Design Approach" color={selectedProject.accent}>
                <p>The core story connects physical assets to useful digital engineering information. A clear four-stage workflow helps visitors understand what reality capture makes possible.</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    ["01. Reality Capture", "Capture buildings, factories, plants, and infrastructure using LiDAR or SLAM technologies."],
                    ["02. Point-Cloud Processing", "Process spatial data into accurate digital representations."],
                    ["03. Digital Engineering", "Convert scan data into BIM models, CAD drawings, and engineering deliverables."],
                    ["04. Digital Twin", "Create digital asset representations for visualization, planning, and asset management."],
                  ].map(([title, description]) => <div key={title} className="rounded-xl bg-[#F9F8F6] p-4"><h3 className="mb-1 font-bold text-[#1A1A2E]">{title}</h3><p>{description}</p></div>)}
                </div>
                <p className="mt-4">The information architecture separates the two primary paths: CAPEX technology purchases (hardware, software, implementation, training, and support) and OPEX engineering services (reality capture, point-cloud processing, Scan-to-BIM, Scan-to-CAD, and digital twins).</p>
              </DetailSection>
              <DetailSection title="Key Website Sections" color={selectedProject.accent}>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    ["Hero", "Introduce reality capture and digital twin technology, with clear routes to services and technologies."],
                    ["Technologies & Products", "Make scanning hardware, SLAM systems, processing software, and related technologies easy to explore."],
                    ["Engineering Services", "Present factory, building, and infrastructure scanning alongside Scan-to-BIM and Scan-to-CAD."],
                    ["Industries", "Help customers browse applications across construction, manufacturing, oil and gas, infrastructure, mining, and facility management."],
                    ["Digital Twin Solutions", "Explain how captured data and digital models support physical asset management and visualization."],
                    ["Projects & Enquiries", "Show project applications and guide prospective customers toward quotes, consultations, and product demonstrations."],
                  ].map(([title, description]) => <div key={title} className="rounded-xl border border-[#E8E8E8] bg-white p-4"><h3 className="font-bold text-[#1A1A2E]">{title}</h3><p className="mt-2 text-xs leading-5">{description}</p></div>)}
                </div>
              </DetailSection>
              <DetailSection title="Customer Journeys" color={selectedProject.accent}>
                <div className="grid gap-3 md:grid-cols-3">
                  {[
                    ["Buy technologies", "Project requirements → Explore technologies → Compare solutions → Book a demo → Request a quote"],
                    ["Outsource engineering", "Project requirements → Explore services → Select an application → Review deliverables → Request a consultation"],
                    ["Plan a digital twin", "Facility assessment → Reality capture → Point-cloud processing → Digital model → Digital twin solution"],
                  ].map(([title, flow]) => <div key={title} className="rounded-xl border border-[#E8E8E8] bg-white p-4"><h3 className="font-bold text-[#1A1A2E]">{title}</h3><p className="mt-2 text-xs leading-5">{flow}</p></div>)}
                </div>
              </DetailSection>
            </>
          )}
          {selectedProject.id === 5 && (
            <>
              <DetailSection title="Design Approach" color={selectedProject.accent}>
                <p>The experience follows a simple customer journey: introduce the company, explain its design and construction capabilities, show relevant project work, then make it easy to discuss a new build.</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    ["01. Discover", "Introduce the company, its capabilities, and available services."],
                    ["02. Design", "Present architectural planning, floor plans, 3D elevations, and design services."],
                    ["03. Build", "Explain construction execution, quality inspection, and project management."],
                    ["04. Deliver", "Showcase completed work and guide prospective clients toward an enquiry."],
                  ].map(([title, description]) => <div key={title} className="rounded-xl bg-[#F9F8F6] p-4"><h3 className="mb-1 font-bold text-[#1A1A2E]">{title}</h3><p>{description}</p></div>)}
                </div>
                <p className="mt-4">Project cards can surface location, category, built-up area, and completion status so visitors can quickly find work relevant to their own project.</p>
              </DetailSection>
              <DetailSection title="Key Website Sections" color={selectedProject.accent}>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    ["Hero", "Communicate construction and design capabilities with clear consultation and project-viewing actions."],
                    ["Services", "Organize architectural design, civil construction, planning, and related building services."],
                    ["Featured Projects", "Show residential and commercial work with location, area, category, and completion status."],
                    ["Construction Process", "Explain consultation, planning and design, cost estimation, execution, quality inspection, and handover."],
                    ["About the Company", "Communicate the company's approach to construction quality, project management, and customer service."],
                    ["Contact & Enquiry", "Let clients share project location, type, budget, and requirements through a direct enquiry path."],
                  ].map(([title, description]) => <div key={title} className="rounded-xl border border-[#E8E8E8] bg-white p-4"><h3 className="font-bold text-[#1A1A2E]">{title}</h3><p className="mt-2 text-xs leading-5">{description}</p></div>)}
                </div>
              </DetailSection>
              <DetailSection title="Customer Journeys" color={selectedProject.accent}>
                <div className="grid gap-3 md:grid-cols-2">
                  {[
                    ["Building a home", "Discover the website → Explore services → View residential projects → Understand the process → Request a consultation"],
                    ["Planning a commercial project", "Explore capabilities → Browse commercial projects → Review project details → Submit an enquiry"],
                  ].map(([title, flow]) => <div key={title} className="rounded-xl border border-[#E8E8E8] bg-white p-4"><h3 className="font-bold text-[#1A1A2E]">{title}</h3><p className="mt-2 text-xs leading-5">{flow}</p></div>)}
                </div>
              </DetailSection>
            </>
          )}
          {selectedProject.id === 6 && (
            <>
              <DetailSection title="Design Approach" color={selectedProject.accent}>
                <p>The catalogue follows a straightforward festive shopping journey, helping visitors move from a broad selection to products that suit their celebration.</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    ["01. Discover", "Introduce the brand, seasonal promotions, and featured collections."],
                    ["02. Explore", "Help customers navigate the catalogue and find relevant products."],
                    ["03. Compare", "Present product details, prices, available offers, and package information clearly."],
                    ["04. Enquire", "Provide a clear next step for product questions and customer assistance."],
                  ].map(([title, description]) => <div key={title} className="rounded-xl bg-[#F9F8F6] p-4"><h3 className="mb-1 font-bold text-[#1A1A2E]">{title}</h3><p>{description}</p></div>)}
                </div>
                <p className="mt-4">The information architecture connects the main shopping needs: Home → Categories → Product Listing → Product Details → Cart or Enquiry → Contact. Category content should reflect the products included in the actual catalogue.</p>
              </DetailSection>
              <DetailSection title="Key Website Sections" color={selectedProject.accent}>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    ["Hero", "Set the festive tone and highlight current promotions and featured collections."],
                    ["Shop by Category", "Organize the catalogue into clear groups so customers can browse without unrelated products getting in the way."],
                    ["Featured Products", "Use consistent product images, names, pricing, and relevant calls to action."],
                    ["Offers & Combos", "Give seasonal promotions and bundled collections a dedicated, easy-to-find presentation."],
                    ["Contact & Customer Support", "Keep business information and enquiry options accessible to customers."],
                  ].map(([title, description]) => <div key={title} className="rounded-xl border border-[#E8E8E8] bg-white p-4"><h3 className="font-bold text-[#1A1A2E]">{title}</h3><p className="mt-2 text-xs leading-5">{description}</p></div>)}
                </div>
              </DetailSection>
              <DetailSection title="Shopping Journeys" color={selectedProject.accent}>
                <div className="grid gap-3 md:grid-cols-2">
                  {[
                    ["Find a specific product", "Homepage → Search → Product Listing → Product Details → Enquiry"],
                    ["Explore festive offers", "Homepage → Promotional Banner → Category → Featured Products → Offer Details"],
                  ].map(([title, flow]) => <div key={title} className="rounded-xl border border-[#E8E8E8] bg-white p-4"><h3 className="font-bold text-[#1A1A2E]">{title}</h3><p className="mt-2 text-xs leading-5">{flow}</p></div>)}
                </div>
              </DetailSection>
              <DetailSection title="Design Principles" color={selectedProject.accent}>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    ["Visual hierarchy", "Make promotions, product names, pricing, and key actions easy to scan."],
                    ["Simplicity", "Reduce unnecessary steps when browsing categories and products."],
                    ["Consistency", "Use reusable product cards, consistent spacing, and predictable interactions."],
                    ["Discoverability", "Make categories, search, and relevant offers easy to find."],
                    ["Responsive design", "Adapt the shopping experience to desktop, tablet, and mobile screens."],
                  ].map(([title, description]) => <div key={title} className="rounded-xl border border-[#E8E8E8] bg-white p-4"><h3 className="font-bold text-[#1A1A2E]">{title}</h3><p className="mt-2 text-xs leading-5">{description}</p></div>)}
                </div>
              </DetailSection>
            </>
          )}
          {selectedProject.id === 7 && (
            <>
              <DetailSection title="Design Approach" color={selectedProject.accent}>
                <p>The design establishes a strong first impression for an emerging business while keeping the experience clear and easy to navigate.</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    ["Clarity", "Communicate the business offering without unnecessary complexity."],
                    ["Credibility", "Present company information professionally to build confidence."],
                    ["Simplicity", "Make navigation and enquiries straightforward."],
                    ["Scalability", "Allow the structure to accommodate more products, services, and business information as the company grows."],
                  ].map(([title, description]) => <div key={title} className="rounded-xl bg-[#F9F8F6] p-4"><h3 className="mb-1 font-bold text-[#1A1A2E]">{title}</h3><p>{description}</p></div>)}
                </div>
              </DetailSection>
              <DetailSection title="Key Website Sections" color={selectedProject.accent}>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    ["Hero", "Introduce the company and its business offering."],
                    ["About Us", "Communicate the company's background and objectives."],
                    ["Products & Services", "Organize offerings so visitors can discover them easily."],
                    ["Business Capabilities", "Present relevant strengths and capabilities."],
                    ["Contact & Enquiry", "Help potential customers and partners connect with the business."],
                  ].map(([title, description]) => <div key={title} className="rounded-xl border border-[#E8E8E8] bg-white p-4"><h3 className="font-bold text-[#1A1A2E]">{title}</h3><p className="mt-2 text-xs leading-5">{description}</p></div>)}
                </div>
              </DetailSection>
              <DetailSection title="Project Summary" color={selectedProject.accent}>
                <p>This startup website provides a professional foundation for the company's online presence, improves business information discovery, and creates a path for customer enquiries and future growth.</p>
              </DetailSection>
            </>
          )}
          {selectedProject.id === 1 && (
            <>
              <DetailSection title="Design Approach" color={selectedProject.accent}>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    ["Simplicity", "Reduce technical complexity and present information in an easy-to-understand structure."],
                    ["Clarity", "Use strong visual hierarchy so visitors can quickly identify products, solutions, and key information."],
                    ["Consistency", "Keep typography, spacing, components, buttons, cards, and interactions consistent throughout."],
                    ["Trust", "Use certifications, customer information, achievements, case studies, and company history to build credibility."],
                  ].map(([title, description]) => <div key={title} className="rounded-xl bg-[#F9F8F6] p-4"><h3 className="mb-1 font-bold text-[#1A1A2E]">{title}</h3><p>{description}</p></div>)}
                </div>
                <p className="mt-4 rounded-xl border border-[#4ECDC430] bg-[#4ECDC40D] p-4">The website also communicates SANDS' experience, including more than 200 million meter readings over 20 years and revenue improvements of over 40% in certain utilities.</p>
              </DetailSection>
              <DetailSection title="Key Website Sections" color={selectedProject.accent}>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    ["01", "Home", "Company overview, key solutions, products, and primary calls to action."],
                    ["02", "Products", "Structured presentation of electric utility and industrial products."],
                    ["03", "Solutions", "Data analytics, energy management, asset monitoring, and more."],
                    ["04", "Industries", "Content organized around industries and applications served."],
                    ["05", "Case Studies", "Real-world applications and measurable outcomes."],
                    ["06", "About SANDS", "Company history, mission, facilities, achievements, and leadership."],
                    ["07", "Resources", "Brochures, certifications, and technical information."],
                    ["08", "Contact", "An enquiry experience that helps potential customers connect."],
                  ].map(([number, title, description]) => <div key={number} className="rounded-xl border border-[#E8E8E8] bg-white p-4"><span className="text-xs font-bold" style={{ color: selectedProject.accent }}>{number}</span><h3 className="mt-2 font-bold text-[#1A1A2E]">{title}</h3><p className="mt-1 text-xs leading-5">{description}</p></div>)}
                </div>
              </DetailSection>
            </>
          )}
          <DetailSection title="UX Case Study" color={selectedProject.accent}>
            <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {selectedProject.process.map((step, index) => (
                <li key={step} className="rounded-xl border border-[#E8E8E8] bg-white p-4">
                  <span className="mr-2 text-xs font-bold" style={{ color: selectedProject.accent }}>0{index + 1}</span>
                  <span className="text-sm font-semibold text-[#343447]">{step}</span>
                </li>
              ))}
            </ol>
          </DetailSection>
          <div>
            <h2 className="mb-3 text-sm font-bold text-[#1A1A2E]" style={{ fontFamily: "'Outfit', sans-serif" }}>Tools</h2>
            <div className="flex flex-wrap gap-2">
              {selectedProject.tags.map((tag) => <span key={tag} className="rounded-lg border border-[#E8E8E8] bg-white px-4 py-2 text-sm font-medium text-[#55546A]">{tag}</span>)}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <PreviewSection title="Wireframe Preview" image={selectedProject.id === 1 ? sandsWireframePreview : selectedProject.screens[0] ?? selectedProject.image} accent={selectedProject.accent} fullHeight={selectedProject.id === 1} />
          <PreviewSection title="Final Design Preview" image={selectedProject.id === 1 ? sandsFinalPreview : selectedProject.screens[1] ?? selectedProject.image} accent={selectedProject.accent} keepColor={selectedProject.id === 1} fullHeight={selectedProject.id === 1} />
          <section className="mx-auto flex min-h-[24rem] max-w-5xl flex-col items-center justify-center rounded-[28px] px-6 py-12 text-center" style={{ background: `linear-gradient(135deg, ${selectedProject.accent}12, white)`, border: `1px solid ${selectedProject.accent}30` }}>
            <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-extrabold text-white" style={{ background: selectedProject.accent }}>F</span>
            <h2 className="text-2xl font-extrabold text-[#1A1A2E]" style={{ fontFamily: "'Outfit', sans-serif" }}>Figma File</h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-[#697080]">The interactive Figma file for this project can be embedded here.</p>
          </section>
        </div>
        <footer className="mt-6 flex min-h-48 items-center justify-center bg-[#1A1A2E] px-6 text-center text-white">
          <div><p className="text-lg font-bold" style={{ fontFamily: "'Outfit', sans-serif" }}>Thanks for viewing this project</p><button onClick={closeProject} className="mt-4 text-sm font-semibold" style={{ color: selectedProject.accent }}>← Back to all projects</button></div>
        </footer>
      </main>
    )
  }

  return (
    <main className="relative isolate h-screen overflow-hidden pt-20" style={{ background: '#F9F8F6' }}>
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        {backgroundProject && (
          <img
            key={backgroundProject.id}
            src={backgroundProject.category === 'Websites'
              ? projectPageBackground
              : backgroundProject.category === 'Web Apps'
                ? webAppSectionBackground
                : backgroundProject.category === 'Mobile Apps'
                  ? mobileAppSectionBackground
                  : backgroundProject.category === 'Branding'
                    ? companyBrandingSectionBackground
                    : backgroundProject.category === 'Social Media Posts'
                      ? socialMediaSectionBackground
                      : backgroundProject.category === 'Videos'
                        ? videoSectionBackground
                        : backgroundProject.category === 'Logo Design'
                          ? logoDesignSectionBackground
                          : backgroundProject.category === 'Expo Events'
                            ? expoEventsSectionBackground
                            : backgroundProject.image}
            alt=""
            className="project-background-fade h-full w-full object-cover"
          />
        )}
      </div>
      <section className="relative z-10 h-full flex flex-col text-center">
        <div className="self-center inline-flex items-center gap-1 p-1.5 mt-5 rounded-2xl" style={{ background: 'white', border: '1px solid #E8E8E8', boxShadow: '0 12px 32px rgba(41, 31, 91, 0.08)' }}>
          {portfolioTabs.map((tab) => {
            const active = tab.id === activeTab
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative px-4 sm:px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300"
                style={{
                  background: active ? '#5631A1' : 'transparent',
                  color: active ? 'white' : '#667085',
                  fontFamily: "'Outfit', sans-serif",
                  transform: active ? 'translateY(-1px)' : 'translateY(0)',
                  boxShadow: active ? '0 8px 18px rgba(86, 49, 161, 0.28)' : 'none',
                }}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        <div className="mt-4">
          <h2 className="text-xl sm:text-2xl font-extrabold" style={{ color: '#1A1A2E', fontFamily: "'Outfit', sans-serif" }}>
            {currentTab.label}
          </h2>
          <p className="mt-2 text-sm" style={{ color: '#7A7D8E' }}>{currentTab.description}</p>
        </div>

        <div className="flex-1 min-h-0 mt-4 text-left flex items-center">
          <div
            ref={railRef}
            onScroll={updateActiveCard}
            onWheel={handleWheel}
            className="project-rail flex w-full items-center gap-6 overflow-x-auto"
            style={{
              scrollSnapType: 'x mandatory',
              scrollBehavior: 'smooth',
              paddingInline: 'max(8vw, calc((100vw - min(84vw, 760px)) / 2))',
              paddingBlock: '1.25rem',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(14px)',
              transition: 'opacity 500ms ease, transform 500ms ease',
            }}
          >
            {projects.map((project, index) => {
              const distance = Math.abs(index - activeIndex)
              const focused = distance === 0
              return (
                <button
                  key={project.id}
                  data-project-card
                  type="button"
                  onClick={() => openProject(project.id)}
                  aria-label={`Open ${projectCategoryLabel(project.category)} project details`}
                  className="group shrink-0 overflow-hidden rounded-[28px] bg-white text-left focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#5631A1]"
                  style={{
                    flexBasis: 'min(84vw, 760px)',
                    scrollSnapAlign: 'center',
                    border: '1px solid #E8E8E8',
                    boxShadow: focused ? '0 24px 55px rgba(39, 30, 82, 0.16)' : '0 5px 22px rgba(39, 30, 82, 0.06)',
                    filter: project.category === 'Websites' || project.category === 'Web Apps' || project.category === 'Mobile Apps' || project.category === 'Branding' || project.category === 'Social Media Posts' || project.category === 'Videos' || project.category === 'Logo Design' || project.category === 'Expo Events' ? 'none' : `blur(${Math.min(distance * 2.5, 6)}px)`,
                    opacity: distance > 2 ? 0.45 : 1 - distance * 0.18,
                    transform: `scale(${Math.max(0.86, 1 - distance * 0.07)})`,
                    transition: 'transform 420ms ease, filter 420ms ease, opacity 420ms ease, box-shadow 420ms ease',
                  }}
                >
                  <div className="relative flex aspect-[16/8] items-center justify-center overflow-hidden text-center" style={{ background: '#E8E8E8' }}>
                    <img src={project.category === 'Websites'
                      ? projectPageBackground
                      : project.category === 'Web Apps'
                        ? webAppSectionBackground
                        : project.category === 'Mobile Apps'
                          ? mobileAppSectionBackground
                          : project.category === 'Branding'
                            ? companyBrandingSectionBackground
                            : project.category === 'Social Media Posts'
                              ? socialMediaSectionBackground
                              : project.category === 'Videos'
                                ? videoSectionBackground
                                : project.category === 'Logo Design'
                                  ? logoDesignSectionBackground
                                  : project.category === 'Expo Events'
                                    ? expoEventsSectionBackground
                                    : project.image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgba(14, 12, 28, 0.72), rgba(14, 12, 28, 0.2))' }} />
                    <div className="relative z-10 px-6 text-white">
                      <h3 className="text-3xl sm:text-5xl font-extrabold" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        {activeTab === 'uiux' ? projectCategoryLabel(project.category) : project.category}
                      </h3>
                      <p className="mt-3 text-sm sm:text-base font-semibold text-white/90">
                        {projectCount(project.category)} {projectCount(project.category) === 1 ? 'Project' : 'Projects'}
                      </p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
