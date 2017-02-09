-- phpMyAdmin SQL Dump
-- version 4.2.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: Feb 02, 2016 at 12:15 PM
-- Server version: 5.5.38
-- PHP Version: 5.6.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `youtrain_eval`
--

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
`id` int(11) NOT NULL,
  `course_name` varchar(64) NOT NULL,
  `course_cat` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `evals`
--

CREATE TABLE `evals` (
`id` int(11) NOT NULL,
  `name` varchar(64) NOT NULL,
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
  `recommend` int(11) NOT NULL,
  `use` int(11) NOT NULL,
  `trainerComments` longtext NOT NULL,
  `courseComments` longtext NOT NULL,
  `classroomComments` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
-- Indexes for table `courses`
--
ALTER TABLE `courses`
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
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `evals`
--
ALTER TABLE `evals`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `trainers`
--
ALTER TABLE `trainers`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;