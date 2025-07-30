# 📦 Pharmacy Shipping Tracker for Mail in Rx

A full stack web application designed to help pharmacies track cold chain medication shipments end to end. Built with **Next.js**, **Prisma**, **Neon (PostgreSQL)**, and **Tailwind CSS**, this platform enables pharmacists to:

- Select patients and medications
- Plan and cost out shipments
- Monitor delivery status with live maps and event timelines
- Ensure compliance with temperature sensitive handling

---

## Features

### Authentication
- Secure login using **NextAuth.js**
- GitHub provider for quick and safe access

### Patient & Medication Management
- CRUD support for patients and medications
- Dose, temperature range, and cold chain tagging

### Shipment Planning & Estimation
- Select patient, medication, shipping urgency, and options
- Real time cost breakdown
- Toggle cold chain features: temperature monitoring, signature delivery

### Shipment Tracking
- Interactive **Google Maps** view (via Mapbox or similar)
- Timeline of shipment status updates
- Displays latest location, delivery ETA, and exceptions

### Admin Dashboard
- Overview of active shipments
- Quick access to tracking, patient, and inventory details

---

## 🛠️ Tech Stack

| Layer       | Tech Used                        |
|-------------|----------------------------------|
| Frontend    | Next.js 14 (App Router)          |
| Styling     | Tailwind CSS                     |
| Auth        | NextAuth.js (GitHub Provider)    |
| Database    | PostgreSQL via NeonDB            |
| ORM         | Prisma                           |
| API Routes  | Next.js Server Actions + REST    |

---
