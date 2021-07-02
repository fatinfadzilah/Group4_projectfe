-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 02, 2021 at 02:22 PM
-- Server version: 5.6.33
-- PHP Version: 5.6.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `skimtech_group4`
--

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `email` varchar(50) NOT NULL,
  `addedDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `owneremail` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `name`, `phone`, `email`, `addedDate`, `owneremail`) VALUES
(1, 'fatin fadzilah', '0137741998', 'fatinfadzilah98@gmail.com', '2021-06-28 10:06:54', 'any@gmail.com'),
(3, 'fatin fadzilah', '0137741998', 'fatinfadzilah98@gmail.com', '2021-07-01 14:57:27', 'any@gmail.com'),
(4, 'fatin fadzilah', '0137741998', 'fatinfadzilah98@gmail.com', '2021-07-01 22:22:27', 'any@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `memory`
--

CREATE TABLE `memory` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `category` varchar(100) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `owneremail` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `memory`
--

INSERT INTO `memory` (`id`, `title`, `category`, `date`, `owneremail`) VALUES
(1, 'midoro     ', 'Colour', '2021-07-02 05:53:25', 'any@gmail.com'),
(2, 'san ', 'Number', '2021-07-02 01:18:00', 'any@gmail.com'),
(3, 'watermelon suikai ', 'Fruit and Vegetable', '2021-07-02 06:02:49', 'any@gmail.com'),
(5, 'ichi ', 'Number', '2021-07-02 06:01:34', 'any@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `register`
--

CREATE TABLE `register` (
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `last_login` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `register`
--

INSERT INTO `register` (`email`, `password`, `last_login`) VALUES
('any@gmail.com', '111', '2021-06-28 08:17:14');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `memory`
--
ALTER TABLE `memory`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `memory`
--
ALTER TABLE `memory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
