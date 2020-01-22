-- phpMyAdmin SQL Dump
-- version 4.6.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 14, 2018 at 12:15 AM
-- Server version: 5.7.17
-- PHP Version: 7.0.24

/*
'username' => 'gereonco_game',
'password' => '4steDr01D$%gPm',
'database' => 'gereonco_gameteste'
*/

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gereonco_gameteste`
--

-- --------------------------------------------------------

--
-- Table structure for table `__game_highscore`
--

CREATE TABLE `__game_highscore` (
  `score_id` bigint(20) NOT NULL,
  `score_user_id` varchar(50) NOT NULL,
  `score_value` bigint(20) NOT NULL,
  `score_locate` varchar(10) NOT NULL,
  `score_record` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `score_actived` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `__game_highscore`
--

INSERT INTO `__game_highscore` (`score_id`, `score_user_id`, `score_value`, `score_locate`, `score_record`, `score_actived`) VALUES
(42, '1c5caafccaf0fbdf47c5fe0abca8f360', 271, 'pt-br', '2017-12-29 02:11:27', 1),
(43, '1c5caafccaf0fbdf47c5fe0abca8f360', 8803, 'pt-br', '2018-01-14 00:11:43', 1),
(44, '1c5caafccaf0fbdf47c5fe0abca8f360', 1988, 'pt-br', '2018-01-14 00:13:03', 1),
(45, '1c5caafccaf0fbdf47c5fe0abca8f360', 3474, 'pt-br', '2018-01-14 00:14:15', 1);

-- --------------------------------------------------------

--
-- Table structure for table `__game_session`
--

CREATE TABLE `__game_session` (
  `id` varchar(128) NOT NULL,
  `ip_address` varchar(45) NOT NULL,
  `timestamp` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `data` blob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `__game_session`
--

INSERT INTO `__game_session` (`id`, `ip_address`, `timestamp`, `data`) VALUES
('ivfe6c4kb5vs7auhjo2vtgiebghkutai', '127.0.0.1', 1515888857, 0x5f5f63695f6c6173745f726567656e65726174657c693a313531353838383635383b757365726c6f676765647c623a313b757365725f69647c733a33323a223163356361616663636166306662646634376335666530616263613866333630223b757365725f6d61696c7c733a32333a2265726963646d61636861646f3240676d61696c2e636f6d223b);

-- --------------------------------------------------------

--
-- Table structure for table `__game_users`
--

CREATE TABLE `__game_users` (
  `user_id` varchar(50) NOT NULL COMMENT 'uid',
  `user_mail` varchar(75) NOT NULL COMMENT 'email',
  `user_pass` tinytext NOT NULL COMMENT 'password',
  `user_image` varchar(120) DEFAULT NULL COMMENT 'image',
  `user_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'created in',
  `user_actived` bit(1) NOT NULL DEFAULT b'1' COMMENT 'boolean'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `__game_users`
--

INSERT INTO `__game_users` (`user_id`, `user_mail`, `user_pass`, `user_image`, `user_created`, `user_actived`) VALUES
('1c5caafccaf0fbdf47c5fe0abca8f360', 'ericdmachado2@gmail.com', '21525eb80f449426e4bc80632e02312f63c9bdf97b1e0944e5f27f8dfc7fa384', '', '2017-12-29 02:02:59', b'1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `__game_highscore`
--
ALTER TABLE `__game_highscore`
  ADD PRIMARY KEY (`score_id`);

--
-- Indexes for table `__game_session`
--
ALTER TABLE `__game_session`
  ADD KEY `ci_sessions_timestamp` (`timestamp`);

--
-- Indexes for table `__game_users`
--
ALTER TABLE `__game_users`
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `__game_highscore`
--
ALTER TABLE `__game_highscore`
  MODIFY `score_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
