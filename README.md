# 📦 Pharmacy Shipping Tracker for Mail in Rx

Web application designed to help pharmacies track cold chain medication shipments end to end. Built with **Next.js**, **Prisma**, **Neon (PostgreSQL)**, and **Tailwind CSS**, this platform enables pharmacists to:

- Select patients and medications
- Plan and cost out shipments
- Monitor delivery status with live maps and event timelines
- Ensure compliance with temperature sensitive handling

---

## Example of Web App with UI:
- <img width="539" height="686" alt="page1" src="https://github.com/user-attachments/assets/d466c0ba-205a-4eb5-9f07-d9b27d2a6d79" />


- <img width="525" height="933" alt="page2" src="https://github.com/user-attachments/assets/f8b61928-91e4-4c7a-aa47-5626e8eb048f" />


- <img width="468" height="835" alt="page3" src="https://github.com/user-attachments/assets/2a3fb3b3-4b65-4a72-8b2a-f92374e526d0" />


- <img width="385" height="484" alt="page4" src="https://github.com/user-attachments/assets/5eeac31c-0b48-4463-b06c-e1d689c4d4a1" />

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
