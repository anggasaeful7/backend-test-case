-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 10, 2024 at 09:40 AM
-- Server version: 8.0.30
-- PHP Version: 7.4.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `backendtest`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` int NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `stock` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `code`, `title`, `author`, `stock`, `createdAt`, `updatedAt`) VALUES
(1, 'JK-45', 'Harry Potter', 'J.K Rowling', 0, '2024-06-09 18:00:16', '2024-06-10 07:53:58'),
(2, 'SHR-1', 'A Study in Scarlet', 'Arthur Conan Doyle', 1, '2024-06-09 18:00:16', '2024-06-10 08:38:23'),
(3, 'TW-11', 'Twilight', 'Stephenie Meyer', 1, '2024-06-09 18:00:16', '2024-06-10 08:38:51'),
(4, 'HOB-83', 'The Hobbit, or There and Back Again', 'J.R.R. Tolkien', 0, '2024-06-09 18:00:16', '2024-06-10 08:46:44'),
(5, 'NRN-7', 'The Lion, the Witch and the Wardrobe', 'C.S. Lewis', 1, '2024-06-09 18:00:16', '2024-06-09 18:00:16');

-- --------------------------------------------------------

--
-- Table structure for table `borrows`
--

CREATE TABLE `borrows` (
  `id` int NOT NULL,
  `id_user` varchar(255) DEFAULT NULL,
  `id_book` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `expire` date DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `borrows`
--

INSERT INTO `borrows` (`id`, `id_user`, `id_book`, `date`, `expire`, `createdAt`, `updatedAt`) VALUES
(16, '2', '1', '2024-06-10', '2024-06-17', '2024-06-10 07:53:58', '2024-06-10 07:53:58');

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `id` int NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'Active',
  `penalized_at` date DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`id`, `code`, `name`, `status`, `penalized_at`, `createdAt`, `updatedAt`) VALUES
(1, 'M001', 'Angga', 'Penalized', '2024-06-13', '2024-06-09 18:08:24', '2024-06-10 03:46:25'),
(2, 'M002', 'Ferry', 'Active', NULL, '2024-06-09 18:08:24', '2024-06-09 18:08:24'),
(3, 'M003', 'Putri', 'Active', NULL, '2024-06-09 18:08:40', '2024-06-09 18:08:40');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `borrows`
--
ALTER TABLE `borrows`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `borrows`
--
ALTER TABLE `borrows`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
