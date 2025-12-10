# Banking Frontend (Next.js)

Bộ source code frontend cho project Banking Microservices.

## Tính năng
- Next.js (App Router) + TypeScript
- TailwindCSS
- Pages: Dashboard, Customers, Accounts, Transactions
- Gọi API trực tiếp tới các service backend:
  - Customer: http://localhost:3001
  - Account: http://localhost:3002
  - Transaction: http://localhost:3003

## Cách chạy (local)
1. Cài Node.js (18+)
2. Giải nén và vào thư mục:
   ```bash
   cd banking-frontend
   npm install
   npm run dev
   ```
3. Mở `http://localhost:3000`

## Lưu ý
- Frontend giả định backend đang chạy trên `localhost` với cổng:
  - customer-service: 3001
  - account-service: 3002
  - transaction-service: 3003
- Nếu backend khác port, chỉnh URL trong file `app/*` (axios calls).

## Muốn mình làm thêm
- Tạo Dockerfile & docker-compose để chạy frontend + backend + mongo
- Thêm auth (JWT)
- Tạo Postman Collection
- Tạo build production & hướng dẫn deploy
