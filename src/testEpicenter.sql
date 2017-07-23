-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Хост: localhost
-- Время создания: Июл 23 2017 г., 17:01
-- Версия сервера: 10.1.19-MariaDB
-- Версия PHP: 5.6.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `testEpicenter`
--

-- --------------------------------------------------------

--
-- Структура таблицы `items`
--

CREATE TABLE `items` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `articule` int(11) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `shotDescription` text NOT NULL,
  `foolDescription` text NOT NULL,
  `rating` float NOT NULL,
  `valuation` int(11) NOT NULL,
  `totalVotes` int(11) NOT NULL,
  `rewiewsTotal` int(11) NOT NULL,
  `price` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `items`
--

INSERT INTO `items` (`id`, `title`, `articule`, `brand`, `shotDescription`, `foolDescription`, `rating`, `valuation`, `totalVotes`, `rewiewsTotal`, `price`) VALUES
(1, '', 2234234, 'MOMENTUM', 'Wireless headphones with integrated microphone', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus necessitatibus illo inventore dolorum id nisi accusantium officiis exercitationem quibusdam possimus harum soluta, deserunt iste repellendus obcaecati, consequatur ducimus minima odit!', 3.69, 251, 68, 154, 436.21);

-- --------------------------------------------------------

--
-- Структура таблицы `item_color`
--

CREATE TABLE `item_color` (
  `id` int(11) NOT NULL,
  `color` varchar(255) NOT NULL,
  `item_id` int(11) NOT NULL,
  `colorDescription` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `item_color`
--

INSERT INTO `item_color` (`id`, `color`, `item_id`, `colorDescription`) VALUES
(1, '#3c383a', 1, 'Wireles Blac'),
(2, '#e8e6e3', 1, 'Gold');

-- --------------------------------------------------------

--
-- Структура таблицы `item_img`
--

CREATE TABLE `item_img` (
  `id` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `item_id` int(11) NOT NULL,
  `color_type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `item_img`
--

INSERT INTO `item_img` (`id`, `url`, `item_id`, `color_type`) VALUES
(1, 'https://i2.rozetka.ua/goods/1535205/samsung_galaxy_j7_ds_black_images_1535205421.jpg', 1, '#3c383a'),
(2, 'https://i2.rozetka.ua/goods/1535205/samsung_galaxy_j7_ds_black_images_1535205421.jpg', 1, '#3c383a'),
(3, 'https://i2.rozetka.ua/goods/1535205/samsung_galaxy_j7_ds_black_images_1535205421.jpg', 1, '#3c383a'),
(4, 'https://i2.rozetka.ua/goods/1535207/samsung_galaxy_j7_ds_gold_images_1535207423.jpg', 1, '#e8e6e3'),
(5, 'https://i2.rozetka.ua/goods/1535207/samsung_galaxy_j7_ds_gold_images_1535207423.jpg', 1, '#e8e6e3'),
(6, 'https://i2.rozetka.ua/goods/1535207/samsung_galaxy_j7_ds_gold_images_1535207423.jpg', 1, '#e8e6e3');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `item_color`
--
ALTER TABLE `item_color`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `item_img`
--
ALTER TABLE `item_img`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `items`
--
ALTER TABLE `items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT для таблицы `item_color`
--
ALTER TABLE `item_color`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT для таблицы `item_img`
--
ALTER TABLE `item_img`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
