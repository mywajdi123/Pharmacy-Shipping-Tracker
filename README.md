# 📦 Pharmacy Shipping Tracker for Mail in Rx

Web application designed to help pharmacies track cold chain medication shipments end to end. Built with **Next.js**, **Prisma**, **Neon (PostgreSQL)**, and **Tailwind CSS**, this platform enables pharmacists to:

- Select patients and medications
- Plan and cost out shipments
- Monitor delivery status with live maps and event timelines
- Ensure compliance with temperature sensitive handling

---

## Features

### Authentication
- Secure login using **NextAuth.js**
- GitHub provider for quick and safe access
  
<img width="539" height="686" alt="page1" src="https://github.com/user-attachments/assets/02a1d87d-037e-46a6-a630-71443204e137" />

### Patient & Medication Management
- CRUD support for patients and medications
- Dose, temperature range, and cold chain tagging
  
<img width="525" height="933" alt="page2" src="https://github.com/user-attachments/assets/b12f58ed-c887-4457-8fde-fbf833eeb1c3" />

### Shipment Planning & Estimation
- Select patient, medication, shipping urgency, and options
- Real time cost breakdown
- Toggle cold chain features: temperature monitoring, signature delivery

<img width="468" height="835" alt="page3" src="https://github.com/user-attachments/assets/3d0ad598-1aed-4a90-a2a6-c55ddf55a72a" />

### Shipment Tracking
- Timeline of shipment status updates
- Displays latest location, delivery ETA, and exceptions

<img width="385" height="484" alt="page4" src="https://github.com/user-attachments/assets/d504fdc0-df03-4699-8acb-f8092858d17a" />

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
