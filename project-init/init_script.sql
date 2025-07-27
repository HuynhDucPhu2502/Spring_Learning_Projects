-- --------------------------------------------------------
-- Server version:               11.6.2-MariaDB - mariadb.org binary distribution
-- HeidiSQL Version:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for talentbridge_db
CREATE DATABASE IF NOT EXISTS `talentbridge_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci */;
USE `talentbridge_db`;

-- Dumping structure for table talentbridge_db.companies
CREATE TABLE IF NOT EXISTS `companies` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `description` mediumtext DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `owner_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK2xrywqtkk3tty82u66fs3s7gm` (`owner_id`),
  CONSTRAINT `FKikhsc7na5r394c8jghny8b6t4` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Dumping data for table talentbridge_db.companies: ~0 rows (approximately)

-- Dumping structure for table talentbridge_db.company_logos
CREATE TABLE IF NOT EXISTS `company_logos` (
  `company_id` bigint(20) NOT NULL,
  `logo_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`company_id`),
  CONSTRAINT `FKbgn3lugrtbscf0x68i3tdsme1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Dumping data for table talentbridge_db.company_logos: ~0 rows (approximately)

-- Dumping structure for table talentbridge_db.jobs
CREATE TABLE IF NOT EXISTS `jobs` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `active` bit(1) DEFAULT NULL,
  `description` mediumtext DEFAULT NULL,
  `end_date` datetime(6) DEFAULT NULL,
  `level` enum('FRESHER','INTERN','MIDDLE','SENIOR') DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `salary` double DEFAULT NULL,
  `start_date` datetime(6) DEFAULT NULL,
  `company_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKrtmqcrktb6s7xq8djbs2a2war` (`company_id`),
  CONSTRAINT `FKrtmqcrktb6s7xq8djbs2a2war` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Dumping data for table talentbridge_db.jobs: ~0 rows (approximately)

-- Dumping structure for table talentbridge_db.job_skill
CREATE TABLE IF NOT EXISTS `job_skill` (
  `job_id` bigint(20) NOT NULL,
  `skill_id` bigint(20) NOT NULL,
  KEY `FKdh76859joo68p6dbj9erh4pbs` (`skill_id`),
  KEY `FKje4q8ajxb3v5bel11dhbxrb8d` (`job_id`),
  CONSTRAINT `FKdh76859joo68p6dbj9erh4pbs` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`id`),
  CONSTRAINT `FKje4q8ajxb3v5bel11dhbxrb8d` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Dumping data for table talentbridge_db.job_skill: ~0 rows (approximately)

-- Dumping structure for table talentbridge_db.permissions
CREATE TABLE IF NOT EXISTS `permissions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `api_path` varchar(255) NOT NULL,
  `method` varchar(255) NOT NULL,
  `module` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Dumping data for table talentbridge_db.permissions: ~52 rows (approximately)
INSERT INTO `permissions` (`id`, `created_at`, `created_by`, `modified_by`, `updated_at`, `api_path`, `method`, `module`, `name`) VALUES
	(6, '2025-07-12 10:29:53.249224', 'admin@gmail.com', 'admin@gmail.com', '2025-07-12 10:31:30.052370', '/users', 'GET', 'USER', 'Lấy danh sách User'),
	(7, '2025-07-12 10:30:24.113163', 'admin@gmail.com', 'admin@gmail.com', '2025-07-12 10:31:37.757513', '/users', 'PUT', 'USER', 'Cập nhật User'),
	(8, '2025-07-12 10:32:17.815563', 'admin@gmail.com', 'admin@gmail.com', '2025-07-12 10:32:17.815563', '/users', 'POST', 'USER', 'Tạo User'),
	(9, '2025-07-12 10:34:25.989081', 'admin@gmail.com', 'admin@gmail.com', '2025-07-12 10:34:25.989081', '/users/{id}', 'GET', 'USER', 'Tìm User theo id'),
	(10, '2025-07-12 10:35:06.546555', 'admin@gmail.com', 'admin@gmail.com', '2025-07-12 10:35:06.546555', '/users/{id}', 'DELETE', 'USER', 'Xóa User theo id'),
	(11, '2025-07-13 09:46:56.674094', 'admin@gmail.com', 'admin@gmail.com', '2025-07-13 09:49:24.608215', '/skills', 'POST', 'SKILL', 'Tạo Skill'),
	(12, '2025-07-13 09:47:15.298000', 'admin@gmail.com', 'admin@gmail.com', '2025-07-13 09:47:15.298000', '/skills', 'GET', 'SKILL', 'Lấy danh sách Skill'),
	(13, '2025-07-13 09:48:01.662749', 'admin@gmail.com', 'admin@gmail.com', '2025-07-13 09:48:01.662749', '/skills/{id}', 'GET', 'SKILL', 'Lấy Skill theo id'),
	(14, '2025-07-13 09:48:22.758295', 'admin@gmail.com', 'admin@gmail.com', '2025-07-13 09:48:22.758295', '/skills', 'PUT', 'SKILL', 'Cập nhật Skill'),
	(15, '2025-07-13 09:49:03.600776', 'admin@gmail.com', 'admin@gmail.com', '2025-07-13 09:49:03.600776', '/skills/{id}', 'DELETE', 'SKILL', 'Xóa Skill theo id'),
	(16, '2025-07-16 15:11:04.499728', 'admin@gmail.com', 'admin@gmail.com', '2025-07-16 15:11:04.499728', '/companies', 'POST', 'COMPANY', 'Tạo Company'),
	(17, '2025-07-16 15:11:24.271446', 'admin@gmail.com', 'admin@gmail.com', '2025-07-16 15:11:24.271446', '/companies/{id}', 'PUT', 'COMPANY', 'Cập nhật Company theo id'),
	(18, '2025-07-16 15:11:44.078473', 'admin@gmail.com', 'admin@gmail.com', '2025-07-16 15:11:44.078473', '/companies', 'GET', 'COMPANY', 'Lấy danh sách Company'),
	(19, '2025-07-16 15:12:06.652610', 'admin@gmail.com', 'admin@gmail.com', '2025-07-16 15:12:06.652610', '/companies/with-jobs-count', 'GET', 'COMPANY', 'Lấy danh sách Company kèm với số lượng nghề'),
	(20, '2025-07-16 15:12:24.416800', 'admin@gmail.com', 'admin@gmail.com', '2025-07-16 15:12:24.416800', '/companies/{id}', 'GET', 'COMPANY', 'Lấy Company theo id'),
	(21, '2025-07-16 15:12:41.177553', 'admin@gmail.com', 'admin@gmail.com', '2025-07-16 15:12:41.177553', '/companies/{id}', 'DELETE', 'COMPANY', 'Xóa company theo id'),
	(22, '2025-07-16 15:39:51.862610', 'admin@gmail.com', 'admin@gmail.com', '2025-07-16 15:39:51.862610', '/jobs', 'POST', 'JOB', 'Tạo Job'),
	(23, '2025-07-16 15:40:06.363460', 'admin@gmail.com', 'admin@gmail.com', '2025-07-16 15:40:06.363460', '/jobs/{id}', 'GET', 'JOB', 'Lấy Job theo id'),
	(24, '2025-07-16 15:40:35.401656', 'admin@gmail.com', 'admin@gmail.com', '2025-07-16 15:40:35.401656', '/jobs/{id}', 'PUT', 'JOB', 'Cập nhật Job theo id'),
	(25, '2025-07-16 15:40:57.210567', 'admin@gmail.com', 'admin@gmail.com', '2025-07-16 15:40:57.210567', '/jobs', 'GET', 'JOB', 'Lấy danh sách Job'),
	(26, '2025-07-16 15:43:05.626459', 'admin@gmail.com', 'admin@gmail.com', '2025-07-16 15:43:05.626459', '/jobs/companies/{id}', 'GET', 'JOB', 'Lấy Job theo Company'),
	(27, '2025-07-16 15:43:19.754552', 'admin@gmail.com', 'admin@gmail.com', '2025-07-16 15:44:30.308328', '/jobs/{id}', 'DELETE', 'JOB', 'Xóa Job theo id'),
	(28, '2025-07-21 08:07:39.463893', 'admin@gmail.com', 'admin@gmail.com', '2025-07-21 08:07:39.463893', '/resumes', 'POST', 'RESUME', 'Tạo resume'),
	(29, '2025-07-21 08:08:36.730444', 'admin@gmail.com', 'admin@gmail.com', '2025-07-22 03:09:44.361581', '/resumes/me', 'GET', 'RESUME', 'Lấy resume của người dùng hiện tại'),
	(30, '2025-07-21 08:09:08.882486', 'admin@gmail.com', 'admin@gmail.com', '2025-07-22 03:21:56.318770', '/resumes/me/jobs/{jobId}', 'DELETE', 'RESUME', 'Xóa resume theo job id của người dùng hiện tại'),
	(31, '2025-07-21 08:10:06.631883', 'admin@gmail.com', 'admin@gmail.com', '2025-07-22 03:53:03.215508', '/resumes/me/file/{id}', 'PUT', 'RESUME', 'Cập nhật file resume của người dùng hiện tại'),
	(32, '2025-07-21 08:10:41.125882', 'admin@gmail.com', 'admin@gmail.com', '2025-07-21 08:10:41.125882', '/resumes/file/{id}', 'GET', 'RESUME', 'Lấy file resume'),
	(33, '2025-07-21 08:11:13.003269', 'admin@gmail.com', 'admin@gmail.com', '2025-07-21 08:11:13.003269', '/resumes', 'GET', 'RESUME', 'Lấy danh sách resume'),
	(34, '2025-07-21 08:11:42.249902', 'admin@gmail.com', 'admin@gmail.com', '2025-07-21 08:11:42.249902', '/resumes/status', 'PUT', 'RESUME', 'Cập nhật trạng thái resume'),
	(35, '2025-07-21 09:09:09.460882', 'admin@gmail.com', 'admin@gmail.com', '2025-07-21 09:09:09.460882', '/roles', 'POST', 'ACCESS-CONTROLLER', 'Tạo Role'),
	(36, '2025-07-21 09:09:26.844223', 'admin@gmail.com', 'admin@gmail.com', '2025-07-21 09:09:26.844223', '/roles/{id}', 'PUT', 'ACCESS-CONTROLLER', 'Cập nhật Role'),
	(37, '2025-07-21 09:09:38.630954', 'admin@gmail.com', 'admin@gmail.com', '2025-07-21 09:09:38.630954', '/roles', 'GET', 'ACCESS-CONTROLLER', 'Lấy danh sách Role'),
	(38, '2025-07-21 09:09:51.814997', 'admin@gmail.com', 'admin@gmail.com', '2025-07-21 09:09:51.814997', '/roles/{id}', 'DELETE', 'ACCESS-CONTROLLER', 'Xóa Role theo id'),
	(39, '2025-07-21 10:00:44.434484', 'admin@gmail.com', 'admin@gmail.com', '2025-07-21 10:01:06.874982', '/permissions/*', 'GET', 'ACCESS-CONTROLLER', 'Thao tác quyền hạn'),
	(40, '2025-07-21 10:02:18.773023', 'admin@gmail.com', 'admin@gmail.com', '2025-07-21 10:02:18.773023', '/admin', 'GET', 'ACCESS-CONTROLLER', 'Truy cập trang Admin'),
	(41, '2025-07-22 05:11:07.569975', 'admin@gmail.com', 'admin@gmail.com', '2025-07-22 05:11:07.569975', '/resumes/company', 'GET', 'RESUME', 'Lấy danh sách resume theo company của người dùng hiện tại'),
	(42, '2025-07-22 05:49:21.891262', 'admin@gmail.com', 'admin@gmail.com', '2025-07-22 05:49:21.891262', '/resumes/company/status', 'PUT', 'RESUME', 'Cập nhật trạng thái resume theo company của người dùng hiện tại'),
	(43, '2025-07-22 09:00:45.719100', 'admin@gmail.com', 'admin@gmail.com', '2025-07-22 09:00:45.719100', '/jobs/company', 'GET', 'JOB', 'Lấy danh sách Job theo company của người dùng hiện tại'),
	(44, '2025-07-22 10:16:14.677636', 'admin@gmail.com', 'admin@gmail.com', '2025-07-22 10:16:14.677636', '/jobs/company/{id}', 'DELETE', 'JOB', 'Xóa Job theo id thuộc company của người dùng hiện tại'),
	(45, '2025-07-22 11:16:23.496262', 'admin@gmail.com', 'admin@gmail.com', '2025-07-22 11:16:23.496262', '/jobs/company', 'POST', 'JOB', 'Tạo Job thuộc company của người dùng hiện tại'),
	(46, '2025-07-22 11:41:31.524130', 'admin@gmail.com', 'admin@gmail.com', '2025-07-22 11:41:31.524130', '/jobs/company/{id}', 'PUT', 'JOB', 'Cập nhật Job theo id thuộc company của người dùng hiện tại'),
	(47, '2025-07-22 13:42:12.936877', 'admin@gmail.com', 'admin@gmail.com', '2025-07-22 13:42:12.936877', '/companies/me', 'GET', 'COMPANY', 'Lấy Company theo người dùng hiện tại'),
	(48, '2025-07-22 14:13:28.808892', 'admin@gmail.com', 'admin@gmail.com', '2025-07-22 14:13:28.808892', '/companies/me', 'PUT', 'COMPANY', 'Cập nhật Company của người dùng hiện tại'),
	(49, '2025-07-22 14:24:58.633574', 'admin@gmail.com', 'admin@gmail.com', '2025-07-22 14:24:58.633574', '/recruiter', 'GET', 'ACCESS-CONTROLLER', 'Truy cập trang Recruiter'),
	(50, '2025-07-23 11:21:20.813320', 'admin@gmail.com', 'admin@gmail.com', '2025-07-23 11:21:20.813320', '/companies/me', 'POST', 'COMPANY', 'Tạo Company cho người dùng hiện tại'),
	(51, '2025-07-23 13:16:19.196193', 'admin@gmail.com', 'admin@gmail.com', '2025-07-23 13:16:19.196193', '/companies/me/users', 'GET', 'COMPANY', 'Lấy danh sách users recruiter của người dùng hiện tại'),
	(52, '2025-07-23 13:48:04.623081', 'admin@gmail.com', 'admin@gmail.com', '2025-07-23 13:48:04.623081', '/companies/me/users', 'POST', 'COMPANY', 'Thêm người dùng khác vào company của người dùng hiện tại'),
	(53, '2025-07-23 14:07:45.408798', 'admin@gmail.com', 'admin@gmail.com', '2025-07-23 14:22:50.243716', '/companies/me/users', 'PUT', 'COMPANY', 'Loại bỏ người dùng khác khỏi company của người dùng hiện tại'),
	(54, '2025-07-24 05:22:00.893513', 'admin@gmail.com', 'admin@gmail.com', '2025-07-24 05:22:00.893513', '/subscribers/me', 'POST', 'SUBSCRIBER', 'Tạo subscriber cho người dùng hiện tại'),
	(55, '2025-07-24 05:22:58.606915', 'admin@gmail.com', 'admin@gmail.com', '2025-07-24 05:22:58.606915', '/subscribers/me', 'GET', 'SUBSCRIBER', 'Lấy subscriber cho người dùng hiện tại'),
	(56, '2025-07-24 05:23:13.620716', 'admin@gmail.com', 'admin@gmail.com', '2025-07-24 05:23:13.620716', '/subscribers/me', 'PUT', 'SUBSCRIBER', 'Cập nhật subscriber cho người dùng hiện tại'),
	(57, '2025-07-24 05:23:26.077917', 'admin@gmail.com', 'admin@gmail.com', '2025-07-24 05:23:26.077917', '/subscribers/me', 'DELETE', 'SUBSCRIBER', 'Xóa subscriber cho người dùng hiện tại');

-- Dumping structure for table talentbridge_db.resumes
CREATE TABLE IF NOT EXISTS `resumes` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `file_key` varchar(255) DEFAULT NULL,
  `status` enum('APPROVED','PENDING','REJECTED','REVIEWING') DEFAULT NULL,
  `version` bigint(20) DEFAULT NULL,
  `job_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKjdec9qbp2blbpag6obwf0fmbd` (`job_id`),
  KEY `FK340nuaivxiy99hslr3sdydfvv` (`user_id`),
  CONSTRAINT `FK340nuaivxiy99hslr3sdydfvv` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKjdec9qbp2blbpag6obwf0fmbd` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Dumping data for table talentbridge_db.resumes: ~0 rows (approximately)

-- Dumping structure for table talentbridge_db.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `active` bit(1) NOT NULL,
  `description` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Dumping data for table talentbridge_db.roles: ~3 rows (approximately)
INSERT INTO `roles` (`id`, `created_at`, `created_by`, `modified_by`, `updated_at`, `active`, `description`, `name`) VALUES
	(3, '2025-07-12 10:37:07.913355', 'admin@gmail.com', 'admin@gmail.com', '2025-07-24 05:23:38.720587', b'1', 'Chức vụ quản trị toàn bộ hệ thống', 'ADMIN'),
	(5, '2025-07-16 15:20:47.008697', 'admin@gmail.com', 'admin@gmail.com', '2025-07-24 05:23:51.777808', b'1', 'Người dùng bình thường, được cấp quyền tối thiểu', 'USER'),
	(8, '2025-07-22 13:41:34.037646', 'admin@gmail.com', 'admin@gmail.com', '2025-07-24 05:24:10.025850', b'1', 'Nhà tuyển dụng, có thể truy cập trang quản lý tuyển dụng', 'RECRUITER');

-- Dumping structure for table talentbridge_db.roles_permissions
CREATE TABLE IF NOT EXISTS `roles_permissions` (
  `role_id` bigint(20) NOT NULL,
  `permission_id` bigint(20) NOT NULL,
  PRIMARY KEY (`role_id`,`permission_id`),
  KEY `FKbx9r9uw77p58gsq4mus0mec0o` (`permission_id`),
  CONSTRAINT `FKbx9r9uw77p58gsq4mus0mec0o` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`),
  CONSTRAINT `FKqi9odri6c1o81vjox54eedwyh` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Dumping data for table talentbridge_db.roles_permissions: ~95 rows (approximately)
INSERT INTO `roles_permissions` (`role_id`, `permission_id`) VALUES
	(3, 6),
	(3, 7),
	(3, 8),
	(3, 9),
	(3, 10),
	(3, 11),
	(8, 11),
	(3, 12),
	(5, 12),
	(8, 12),
	(3, 13),
	(5, 13),
	(8, 13),
	(3, 14),
	(8, 14),
	(3, 15),
	(3, 16),
	(3, 17),
	(3, 18),
	(5, 18),
	(8, 18),
	(3, 19),
	(5, 19),
	(8, 19),
	(3, 20),
	(5, 20),
	(8, 20),
	(3, 21),
	(3, 22),
	(3, 23),
	(5, 23),
	(8, 23),
	(3, 24),
	(3, 25),
	(5, 25),
	(8, 25),
	(3, 26),
	(5, 26),
	(8, 26),
	(3, 27),
	(3, 28),
	(5, 28),
	(3, 29),
	(5, 29),
	(3, 30),
	(5, 30),
	(3, 31),
	(5, 31),
	(3, 32),
	(3, 33),
	(3, 34),
	(3, 35),
	(3, 36),
	(3, 37),
	(3, 38),
	(3, 39),
	(3, 40),
	(3, 41),
	(8, 41),
	(3, 42),
	(8, 42),
	(3, 43),
	(8, 43),
	(3, 44),
	(8, 44),
	(3, 45),
	(8, 45),
	(3, 46),
	(8, 46),
	(3, 47),
	(8, 47),
	(3, 48),
	(8, 48),
	(3, 49),
	(8, 49),
	(3, 50),
	(8, 50),
	(3, 51),
	(8, 51),
	(3, 52),
	(8, 52),
	(3, 53),
	(8, 53),
	(3, 54),
	(5, 54),
	(8, 54),
	(3, 55),
	(5, 55),
	(8, 55),
	(3, 56),
	(5, 56),
	(8, 56),
	(3, 57),
	(5, 57),
	(8, 57);

-- Dumping structure for table talentbridge_db.skills
CREATE TABLE IF NOT EXISTS `skills` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK85woe63nu9klkk9fa73vf0jd0` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Dumping data for table talentbridge_db.skills: ~33 rows (approximately)
INSERT INTO `skills` (`id`, `created_at`, `created_by`, `modified_by`, `updated_at`, `name`) VALUES
	(11, '2025-06-29 05:16:24.115730', 'admin@gmail.com', 'admin@gmail.com', '2025-06-29 05:16:24.115730', '.NET Developer'),
	(12, '2025-06-29 05:16:34.643666', 'admin@gmail.com', 'admin@gmail.com', '2025-06-29 05:16:34.643666', 'Back End Developer'),
	(13, '2025-06-29 05:17:36.489759', 'admin@gmail.com', 'admin@gmail.com', '2025-06-29 05:17:36.489759', 'Business Analysis'),
	(14, '2025-06-29 05:17:42.737695', 'admin@gmail.com', 'admin@gmail.com', '2025-06-29 05:17:42.737695', 'Front End Developer'),
	(15, '2025-06-29 05:17:48.955935', 'admin@gmail.com', 'admin@gmail.com', '2025-06-29 05:17:48.955935', 'Full Stack Web Developer'),
	(16, '2025-06-29 05:17:54.470633', 'admin@gmail.com', 'admin@gmail.com', '2025-06-29 05:17:54.470633', 'Leadership'),
	(17, '2025-06-29 05:18:00.117650', 'admin@gmail.com', 'admin@gmail.com', '2025-06-29 05:18:00.117650', 'PHP Developer'),
	(18, '2025-06-29 05:18:16.764668', 'admin@gmail.com', 'admin@gmail.com', '2025-06-29 05:18:16.764668', 'Bridge Project Management'),
	(19, '2025-06-29 05:18:26.786306', 'admin@gmail.com', 'admin@gmail.com', '2025-06-29 05:18:26.786306', 'Google Cloud SQL'),
	(20, '2025-06-29 12:13:12.884080', 'admin@gmail.com', 'admin@gmail.com', '2025-06-29 12:13:12.884080', 'Full-Stack Developer (React.JS/Node.js)'),
	(21, '2025-06-30 04:21:22.376092', 'admin@gmail.com', 'admin@gmail.com', '2025-06-30 04:21:22.376092', 'System Admin'),
	(22, '2025-06-30 04:21:37.143414', 'admin@gmail.com', 'admin@gmail.com', '2025-06-30 04:21:37.143414', 'Linux'),
	(23, '2025-06-30 04:21:40.901658', 'admin@gmail.com', 'admin@gmail.com', '2025-06-30 04:21:40.901658', 'Orcale'),
	(24, '2025-06-30 04:21:47.077534', 'admin@gmail.com', 'admin@gmail.com', '2025-06-30 04:21:47.077534', 'Unix'),
	(25, '2025-06-30 04:21:51.542289', 'admin@gmail.com', 'admin@gmail.com', '2025-06-30 04:21:51.542289', 'Middleware'),
	(26, '2025-06-30 04:27:36.308345', 'admin@gmail.com', 'admin@gmail.com', '2025-06-30 04:27:36.308345', 'Security'),
	(27, '2025-06-30 04:28:26.792783', 'admin@gmail.com', 'admin@gmail.com', '2025-06-30 04:28:26.792783', 'Cloud-native Architecture'),
	(28, '2025-06-30 04:28:35.175763', 'admin@gmail.com', 'admin@gmail.com', '2025-06-30 04:28:35.175763', 'SIEM'),
	(29, '2025-06-30 04:28:39.748945', 'admin@gmail.com', 'admin@gmail.com', '2025-06-30 04:28:39.748945', 'SOAR'),
	(30, '2025-06-30 04:35:44.200650', 'admin@gmail.com', 'admin@gmail.com', '2025-06-30 04:35:44.200650', 'MongoDB'),
	(31, '2025-06-30 04:35:49.206862', 'admin@gmail.com', 'admin@gmail.com', '2025-06-30 04:35:49.206862', 'Spark'),
	(32, '2025-06-30 04:36:36.363795', 'admin@gmail.com', 'admin@gmail.com', '2025-06-30 04:36:36.363795', 'PostgreSQL'),
	(33, '2025-06-30 04:36:50.921844', 'admin@gmail.com', 'admin@gmail.com', '2025-06-30 04:36:50.921844', 'Data Engineer'),
	(34, '2025-06-30 04:40:10.672344', 'admin@gmail.com', 'admin@gmail.com', '2025-06-30 04:40:10.672344', 'SQL'),
	(35, '2025-06-30 04:40:19.529101', 'admin@gmail.com', 'admin@gmail.com', '2025-06-30 04:40:19.529101', 'Database'),
	(36, '2025-06-30 04:40:34.391821', 'admin@gmail.com', 'admin@gmail.com', '2025-06-30 04:40:34.391821', 'ETL'),
	(37, '2025-06-30 04:40:56.328453', 'admin@gmail.com', 'admin@gmail.com', '2025-06-30 04:40:56.328453', 'Microsoft SQL Server'),
	(38, '2025-06-30 04:44:20.178975', 'admin@gmail.com', 'admin@gmail.com', '2025-06-30 04:44:20.178975', 'UI-UX'),
	(39, '2025-06-30 04:44:30.264241', 'admin@gmail.com', 'admin@gmail.com', '2025-06-30 04:44:30.264241', 'User diagram'),
	(40, '2025-06-30 04:44:36.214124', 'admin@gmail.com', 'admin@gmail.com', '2025-06-30 04:44:36.214124', 'AI'),
	(41, '2025-06-30 04:44:39.241681', 'admin@gmail.com', 'admin@gmail.com', '2025-06-30 04:44:39.241681', 'Figma'),
	(42, '2025-07-02 04:12:42.893819', 'admin@gmail.com', 'admin@gmail.com', '2025-07-02 04:12:42.893819', 'Python'),
	(43, '2025-07-24 09:23:38.793411', 'admin@gmail.com', 'admin@gmail.com', '2025-07-24 09:23:38.793411', 'Java');

-- Dumping structure for table talentbridge_db.subscribers
CREATE TABLE IF NOT EXISTS `subscribers` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Dumping data for table talentbridge_db.subscribers: ~0 rows (approximately)

-- Dumping structure for table talentbridge_db.subscriber_skills
CREATE TABLE IF NOT EXISTS `subscriber_skills` (
  `subscriber_id` bigint(20) NOT NULL,
  `skill_id` bigint(20) NOT NULL,
  KEY `FKhxf6u96wfokxsw8ygf3e9lqiv` (`skill_id`),
  KEY `FKnqlrhhuad8ep5frnpvtq70kg1` (`subscriber_id`),
  CONSTRAINT `FKhxf6u96wfokxsw8ygf3e9lqiv` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`id`),
  CONSTRAINT `FKnqlrhhuad8ep5frnpvtq70kg1` FOREIGN KEY (`subscriber_id`) REFERENCES `subscribers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Dumping data for table talentbridge_db.subscriber_skills: ~0 rows (approximately)

-- Dumping structure for table talentbridge_db.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `gender` enum('FEMALE','MALE','OTHER') DEFAULT NULL,
  `company_id` bigint(20) DEFAULT NULL,
  `role_id` bigint(20) DEFAULT NULL,
  `logo_url` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `FKin8gn4o1hpiwe6qe4ey7ykwq7` (`company_id`),
  KEY `FKp56c1712k691lhsyewcssf40f` (`role_id`),
  CONSTRAINT `FKin8gn4o1hpiwe6qe4ey7ykwq7` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`),
  CONSTRAINT `FKp56c1712k691lhsyewcssf40f` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Dumping data for table talentbridge_db.users: ~1 rows (approximately)
INSERT INTO `users` (`id`, `email`, `name`, `password`, `created_at`, `created_by`, `modified_by`, `updated_at`, `address`, `gender`, `company_id`, `role_id`, `logo_url`, `dob`) VALUES
	(7, 'admin@gmail.com', 'ADMIN', '$2a$10$BYbZRlqTUA1RTKpG6QXlg.zuJqrV5cQcy7VP9fFg8WYJo9aygzEXa', NULL, NULL, 'admin@gmail.com', '2025-07-24 10:35:52.547706', 'TalentBridge', 'MALE', NULL, 3, NULL, '2003-02-25');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
