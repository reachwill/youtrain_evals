-- phpMyAdmin SQL Dump
-- version 4.2.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: Jan 26, 2017 at 03:54 PM
-- Server version: 5.5.38
-- PHP Version: 5.6.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `youtrain_eval`
--

-- --------------------------------------------------------

--
-- Table structure for table `apprenticeEvals`
--

CREATE TABLE `apprenticeEvals` (
`id` int(11) NOT NULL,
  `firstname` varchar(128) NOT NULL,
  `lastname` varchar(128) NOT NULL,
  `email` varchar(128) NOT NULL,
  `tel` varchar(64) NOT NULL,
  `company` varchar(256) NOT NULL,
  `award` int(11) NOT NULL,
  `trainer` varchar(128) NOT NULL,
  `start` varchar(64) NOT NULL,
  `end` varchar(64) NOT NULL,
  `date` varchar(64) NOT NULL,
  `relevance` int(11) NOT NULL,
  `content` int(11) NOT NULL,
  `format` int(11) NOT NULL,
  `duration` int(11) NOT NULL,
  `awardComments` longtext NOT NULL,
  `induction` int(11) NOT NULL,
  `ongoing` int(11) NOT NULL,
  `clarity` int(11) NOT NULL,
  `frequency` int(11) NOT NULL,
  `helpfulness` int(11) NOT NULL,
  `trainerComments` longtext NOT NULL,
  `impact` varchar(28) NOT NULL,
  `impactComments` longtext NOT NULL,
  `improvements` varchar(28) NOT NULL,
  `improvementsComments` longtext NOT NULL,
  `recommend` varchar(28) NOT NULL,
  `canuse` varchar(28) NOT NULL,
  `eval_interval` varchar(28) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `apprenticeEvals`
--

INSERT INTO `apprenticeEvals` (`id`, `firstname`, `lastname`, `email`, `tel`, `company`, `award`, `trainer`, `start`, `end`, `date`, `relevance`, `content`, `format`, `duration`, `awardComments`, `induction`, `ongoing`, `clarity`, `frequency`, `helpfulness`, `trainerComments`, `impact`, `impactComments`, `improvements`, `improvementsComments`, `recommend`, `canuse`, `eval_interval`) VALUES
(6, 'will', 'gregory', 'w@w.com', '3646346', 'will LTD', 6, 'trainer', '', '2017-01-17', '2017-01-19', 4, 4, 4, 4, '', 4, 4, 4, 4, 4, '', 'impactYes', '', 'improveNo', '', '', '', 'final'),
(7, 'will', 'gregory', 'w@w.com', '3646346', 'will LTD', 6, 'trainer', '2017-01-19', '', '2017-01-19', 4, 4, 4, 4, '', 4, 4, 4, 4, 4, '', 'impactNo', '', 'improveNo', '', '', '', 'mid'),
(8, 'will', 'gregory', 'w@w.com', '3646346', 'will LTD', 8, 'trainer', '', '2017-01-17', '2017-01-19', 4, 4, 4, 4, '', 4, 4, 4, 4, 4, '', 'impactYes', '', 'improveNo', '', '', '', 'final'),
(9, 'will', 'gregory', 'w@w.com', '3646346', 'will LTD', 9, 'trainer', '2016-11-08', '', '2017-01-19', 3, 5, 4, 4, '', 3, 4, 4, 4, 4, '', 'impactNo', '', 'improveYes', '', 'recommend', 'canuse', 'mid');

-- --------------------------------------------------------

--
-- Table structure for table `awards`
--

CREATE TABLE `awards` (
`id` int(11) NOT NULL,
  `award_title` varchar(128) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `awards`
--

INSERT INTO `awards` (`id`, `award_title`) VALUES
(1, 'Diploma for IT Level SCQF Level 5'),
(2, 'Diploma for IT Level SCQF Level 6'),
(3, 'Diploma for IT Level SCQF Level 8'),
(4, 'Digital Applications Level 3'),
(5, 'Digital Marketing Level 3'),
(6, 'Business Admin Level 2'),
(7, 'Business Admin Level 3'),
(8, 'Business Admin Level 3 (P)'),
(9, 'Customer Service Level 3'),
(10, 'Management Level 3'),
(11, 'Management Level 4'),
(12, 'Management Level 5'),
(13, 'Foundation Accounts'),
(14, 'Life Sciences Level 2'),
(15, 'Life Sciences Level 3');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
`id` int(11) NOT NULL,
  `course_name` varchar(256) NOT NULL,
  `course_type_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `course_name`, `course_type_id`) VALUES
(1, 'CCENT Interconnecting Cisco Networking Devices (ICND1)', 6),
(2, 'ICND 2 Interconnecting Cisco Networking Devices (ICND2)', 6),
(3, 'CCNAX - An Accelerated 50 Hour Bootcamp Course', 6),
(4, 'CCNA SECURITY - Implementing Cisco IOS Network Security (IINS)', 6),
(5, 'CCNA Implementing Cisco Collaboration Devices (CICD)', 6),
(6, 'CCNP Cisco Collaboration Track', 6),
(7, 'CCNP - Implementing Cisco IP Routing (ROUTE)', 6),
(8, 'CCNP - Implementing Cisco IP Switched Networks (SWITCH)', 6),
(9, 'CCNP - Troubleshooting & Maintaining Cisco IP Networks (TSHOOT)', 6),
(10, 'Implementing Cisco Edge Network Security Solutions (SENSS)', 7),
(11, 'Cisco Data Center Unified Computing Implementation (DCUCI)', 7),
(12, 'Introducing Cisco Data Center Networking (DCICN)', 7),
(13, 'Introducing Cisco Data Center Technologies (DCICT)', 7),
(14, 'Implementing Cisco Wireless Network Fundamentals (WIFUND)', 7),
(15, 'Implementing Cisco Data Center Unified Fabric (DCUFI)', 7),
(16, 'Implementing Cisco Threat Control Systems (SITCS)', 7),
(17, 'Implementing Cisco Secure Access Solutions (SISAS)', 7),
(18, 'Implementing Cisco Secure Mobility (SIMOS)', 7),
(19, 'Configuring Cisco Nexus 9000 Switches in ACI Mode (DCAC9K)', 7),
(20, 'Implementing Cisco MPLS (MPLS)', 7),
(21, 'Configuring BGP on Cisco Routers (BGP)', 7),
(22, 'Operating Systems Fundamentals', 8),
(23, 'Networking Fundamentals', 8),
(24, 'Server Fundamentals', 8),
(25, 'Security Fundamentals', 8),
(26, 'Mobility & Devices Fundamentals	', 8),
(27, 'Cloud Fundamentals', 8),
(28, 'Database Fundamentals', 8),
(29, 'Microsoft: Introduction to programming', 8),
(30, 'HTML5 Application Development Fundamentals', 8),
(31, 'Software Development Fundamentals', 8),
(32, 'Installing and Configuring Windows 10', 9),
(33, 'Configuring Windows 7', 10),
(34, 'Windows 7 Enterprise Desktop Support Technician', 10),
(35, 'Installing and Configuring Server 2012', 11),
(36, 'Administering Windows Server 2012', 11),
(37, 'Configuring Advanced Windows Server 2012 Services', 11),
(38, 'Enabling & Managing Office 365', 12),
(39, 'Querying Microsoft SQL Server 2012', 13),
(40, 'Administering Microsoft SQL Server 2012 Databases', 13),
(41, 'Implementing a Data Warehouse with Microsoft SQL Server 2012', 13),
(42, 'Administering System Centre 2012 Configuration Manager', 14),
(43, 'Core Solutions of Microsoft Sharepoint Server 2013', 15),
(44, 'Advanced Solutions of Microsoft Sharepoint Server 2013', 15),
(45, 'Core Solutions of Microsoft Lync Server 2013', 16),
(46, 'Enterprise Voice & Online Services with Microsoft Lync Server 2013', 16),
(47, 'Core Solutions of Microsoft Exchange Server 2013', 17),
(48, 'Designing and Implementing a Server 2012 Infrastructure', 18),
(49, 'Implementing an Advanced Server 2012 Infrastructure', 18),
(50, 'ITIL Training - Foundation', 19),
(51, 'Foundation & Practitioner', 20),
(52, 'HTML5 & CSS3 and Javascript & jQuery', 21),
(53, 'PHP & MySQL and Wordpress & Concepts of CMS', 21),
(54, 'Developing Mobile Apps', 21),
(55, 'Node JS', 21),
(56, 'Introducing HTML5 & CSS3', 21),
(57, 'Javascript & jQuery', 21),
(58, 'PHP & MySQL', 21),
(59, 'Wordpress & Concepts of CMS', 21),
(60, 'MOS: Microsoft Office Outlook 2013', 22),
(61, 'MOS: Microsoft Office Excel 2013', 22),
(62, 'MOS: Microsoft Office Excel Expert 2013', 22),
(63, 'MOS: Microsoft Office Word 2013', 22),
(64, 'MOS: Microsoft Office Advanced Word 2013', 22),
(65, 'MOS: Microsoft Office PowerPoint 2013', 22),
(66, 'MOS: Microsoft Office Access 2013', 22),
(67, 'Leading with Impact', 23),
(68, 'Managing Change', 23),
(69, 'Coaching for Improved Performance', 23),
(70, 'Performance Appraisal', 23),
(71, 'Organisational Communication', 23),
(72, 'Time & Meeting Management', 23),
(73, 'Introduction to Customer Service and Communication', 24);

-- --------------------------------------------------------

--
-- Table structure for table `courseTypes`
--

CREATE TABLE `courseTypes` (
`id` int(11) NOT NULL,
  `course_type` varchar(256) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `courseTypes`
--

INSERT INTO `courseTypes` (`id`, `course_type`) VALUES
(6, 'CISCO CCNA AND CCNP CERTIFICATIONS'),
(7, 'CISCO - SPECIALIST COURSES BY DEMAND'),
(8, 'MICROSOFT ENTRY LEVEL TECHNICAL'),
(9, 'MCSA: WINDOWS 10'),
(10, 'MCSA: WINDOWS 7'),
(11, 'MCSA: WINDOWS SERVER 2012'),
(12, 'MICROSOFT OFFICE 365 (TECHNICAL)'),
(13, 'MCSA: SQL SERVER'),
(14, 'SYSTEM CENTRE 2012'),
(15, 'MCSE: SHAREPOINT'),
(16, 'MCSE: COMMUNICATIONS (LYNC)'),
(17, 'MCSE: EXCHANGE SERVER 2013'),
(18, 'MCSE: SERVER INFRASTRUCTURE'),
(19, 'ITIL TRAINING AND CERTIFICATION'),
(20, 'PRINCE2'),
(21, 'WEB DEVELOPER COURSES'),
(22, 'MICROSOFT OFFICE COURSES'),
(23, 'MANAGEMENT COURSES'),
(24, 'CUSTOMER SERVICE');

-- --------------------------------------------------------

--
-- Table structure for table `evals`
--

CREATE TABLE `evals` (
`id` int(11) NOT NULL,
  `firstname` varchar(64) NOT NULL,
  `lastname` varchar(64) NOT NULL,
  `company` varchar(64) NOT NULL,
  `course` varchar(64) NOT NULL,
  `email` varchar(64) NOT NULL,
  `start` varchar(16) NOT NULL,
  `trainer` varchar(64) NOT NULL,
  `date` varchar(64) NOT NULL,
  `enthusiastic` int(11) NOT NULL,
  `knowledgeable` int(11) NOT NULL,
  `prepared` int(11) NOT NULL,
  `participation` int(11) NOT NULL,
  `communicates` int(11) NOT NULL,
  `objectives` int(11) NOT NULL,
  `organised` int(11) NOT NULL,
  `pace` int(11) NOT NULL,
  `activities` int(11) NOT NULL,
  `confirmation` int(11) NOT NULL,
  `classroom` int(11) NOT NULL,
  `equipment` int(11) NOT NULL,
  `tel` varchar(64) NOT NULL,
  `recommend` varchar(16) NOT NULL,
  `canuse` varchar(6) NOT NULL,
  `trainerComments` longtext NOT NULL,
  `courseComments` longtext NOT NULL,
  `classroomComments` longtext NOT NULL,
  `comments` longtext NOT NULL,
  `other_courses` longtext NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `evals`
--

INSERT INTO `evals` (`id`, `firstname`, `lastname`, `company`, `course`, `email`, `start`, `trainer`, `date`, `enthusiastic`, `knowledgeable`, `prepared`, `participation`, `communicates`, `objectives`, `organised`, `pace`, `activities`, `confirmation`, `classroom`, `equipment`, `tel`, `recommend`, `canuse`, `trainerComments`, `courseComments`, `classroomComments`, `comments`, `other_courses`) VALUES
(24, 'Will', 'Gregory', 'Will LTD', '15', 'w@w.com', '2017-01-05', 'J. Trainer', '2017-01-18', 5, 4, 5, 3, 6, 3, 5, 6, 4, 5, 6, 5, '3646346', 'recommend', 'canuse', 'Knew%20his%20stuff', 'Good%20contents', 'Great%20service', 'I%20would%20like%20to%20do%20more%20courses', ''),
(25, 'Jo', 'King', 'will LTD', '4', 'j@w.com', '2017-01-07', 'F. Instructor', '2017-01-18', 6, 6, 3, 5, 5, 5, 3, 5, 5, 5, 3, 6, '3646346', 'recommend', '', 'Obviously%20knew%20his%20topic', 'Great%20course%20materials', 'Very%20friendly%20staff', 'I%20plan%20to%20do%20more%20courses', ''),
(26, 'Luis', 'Suarez', 'Barcelona LTD', '54', 'l@b.com', '2017-01-12', 'J. Klopp', '2017-01-18', 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 6, '3564537867', '', '', '', '', '', '', ''),
(28, 'will', 'gregory', 'will LTD', '19', 'w@w.com', '2017-01-18', 'trainer', '2017-01-19', 5, 3, 4, 4, 5, 4, 4, 4, 4, 4, 4, 4, '3646346', 'recommend', '', 'sghdfgsda', '', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `trainers`
--

CREATE TABLE `trainers` (
`id` int(11) NOT NULL,
  `trainer_name` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `apprenticeEvals`
--
ALTER TABLE `apprenticeEvals`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `awards`
--
ALTER TABLE `awards`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `courseTypes`
--
ALTER TABLE `courseTypes`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `evals`
--
ALTER TABLE `evals`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trainers`
--
ALTER TABLE `trainers`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `apprenticeEvals`
--
ALTER TABLE `apprenticeEvals`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `awards`
--
ALTER TABLE `awards`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=74;
--
-- AUTO_INCREMENT for table `courseTypes`
--
ALTER TABLE `courseTypes`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT for table `evals`
--
ALTER TABLE `evals`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=29;
--
-- AUTO_INCREMENT for table `trainers`
--
ALTER TABLE `trainers`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
