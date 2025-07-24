# TalentBridge

TalentBridge là nền tảng tuyển dụng thế hệ mới – nơi kết nối nhà tuyển dụng, ứng viên và admin trong một hệ sinh thái tiện lợi, minh bạch và bảo mật. Không chỉ đơn thuần là website tra cứu việc làm, TalentBridge còn giúp tối ưu hóa quy trình tuyển dụng, trải nghiệm người dùng và hiệu quả quản lý cho mọi bên.

<p align="center">
  <img src="TalentBridge-Frontend/public/web-logo.png" alt="TalentBridge Logo" width="160" />
</p>

## 👥 3 nhóm người dùng – Mỗi vai trò, mỗi trải nghiệm

### 1. **USER (Ứng viên)**

- Tìm kiếm và khám phá chi tiết thông tin công ty, các vị trí tuyển dụng.
- Quản lý hồ sơ cá nhân toàn diện: cập nhật thông tin, đổi avatar, bảo mật tài khoản.
- Chủ động tạo, chỉnh sửa, xoá, tải lên CV – và có thể nộp/rút CV mọi lúc, mọi nơi.
- Đăng ký nhận email job alert siêu cá nhân hoá, tự động gợi ý công việc đúng ngành/nghề, kỹ năng mong muốn.

### 2. **RECRUITER (Nhà tuyển dụng)**

- Tự do đăng tin tuyển dụng, quản lý vị trí, chỉnh sửa hoặc ngừng tuyển bất kỳ lúc nào.
- Quản trị thông tin công ty: cập nhật profile, hình ảnh, nội dung giới thiệu.
- Quản lý & lọc ứng viên: duyệt CV, từ chối/nổi bật hồ sơ, xuất báo cáo hiệu quả.
- Mời thêm đồng nghiệp vào đội ngũ, phân quyền từng người theo chức năng tuyển dụng (quản lý tin đăng, duyệt hồ sơ…).

### 3. **ADMIN (Quản trị viên)**

- Quản lý toàn bộ hệ thống: duyệt, chỉnh sửa, khóa/xóa mọi loại tài khoản.
- Tạo, chỉnh sửa và phân quyền vai trò cực kỳ chi tiết cho từng tài khoản, nhóm người dùng.
- Theo dõi hoạt động, log hệ thống, xử lý vi phạm, quản lý nội dung, cấu hình và hỗ trợ kỹ thuật toàn diện.

---

## 🚩 Tổng quan công nghệ

TalentBridge kết hợp sức mạnh của **Spring Boot** và **React**, hướng tới trải nghiệm nhanh, ổn định, dễ bảo trì — phù hợp cả startup lẫn doanh nghiệp lớn.

---

## 🛠️ Backend

- **Spring Boot**: Trái tim của hệ thống, hơn 60 endpoints “gánh” mọi nghiệp vụ backend.
- **Spring Security + Oauth2 Resource Server**: Xác thực, phân quyền “cứng” bằng JWT, an toàn tuyệt đối.
- **AWS S3**: Lưu trữ ảnh, file; chia folder public/private, presigned url bảo vệ file nhạy cảm (ví dụ: CV).
- **Redis + Spring Cache**: Quản lý refresh_token và link tạm thời, block link hết hạn, giữ dữ liệu luôn riêng tư.
- **Spring Mail + Thymeleaf**: Gửi email tự động, template đẹp, cá nhân hóa nội dung gửi đi.
- **Cronjob**: Gửi email gợi ý việc làm mỗi 8h sáng — luôn giữ kết nối với user.
- **Swagger**: Docs API cho dev/test, nhanh gọn, dễ mở rộng.
- **Và hơn thế nữa**: CORS, cookie, global exception, giới hạn page size, tối ưu hiệu năng, bảo mật đa tầng.

---

## 💻 Frontend

- **React + Vite**: UI hiện đại, build siêu nhanh, DX mượt.
- **Redux Toolkit + Redux Persist**: State management “thép”, giữ app luôn nhất quán, tránh flash/reload mất trạng thái.
- **Axios interceptor**: Tự động refresh token, quên luôn cảnh báo token hết hạn.
- **Tailwind toàn tập**: Shadcn components, typography, line-clamp… cho giao diện bắt mắt, chuyên nghiệp, responsive chuẩn.
- **35+ layout/screens**: Đa dạng từ dashboard, bảng dữ liệu, profile cá nhân tới trang quản trị chi tiết.
- **React Quill + dompurify**: Editor WYSIWYG an toàn, chống XSS tối đa.
- **PDF Viewer**: Xem trực tiếp file PDF trên web, không cần tải về.
- **React Router v7**: Điều hướng đa trang, có route bảo vệ role-based.
- **Tiện ích nâng cao**: Dark mode, theming, toast, animation, icon, tooltip, avatar, html-to-text...

---

## ⚙️ Cấu hình backend (`application.properties`)

> **Tạo file `src/main/resources/application.properties` với nội dung sau, tuỳ chỉnh các biến theo môi trường của bạn.**

```properties
spring.application.name=TalentBridge-Backend

# Database connection config
spring.datasource.url=
spring.datasource.username=
spring.datasource.password=
spring.datasource.driver-class-name=
spring.jpa.hibernate.ddl-auto=update

# JWT Config
jwt.secret=
jwt.access-token-expiration=300
jwt.refresh-token-expiration=86400

# Pagination Config
spring.data.web.pageable.one-indexed-parameters=true
spring.data.web.pageable.max-page-size=20

# AWS S3
aws.access-key=
aws.secret-key=
aws.region=
aws.s3.bucket-name=

# Redis
redis.host=
redis.port=
redis.password=

# Caching
spring.cache.type=redis

# Swagger
springdoc.api-docs.path=/v3/api-docs

# Mail Sender
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=
mail.from=
spring.mail.password=
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

**Lưu ý:** Không public file này lên Github nếu đã điền thông tin thật!

---
