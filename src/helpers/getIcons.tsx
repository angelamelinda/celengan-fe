import React from 'react';
import {
  MdLocalGasStation,
  MdWifi,
  MdChildCare,
  MdCreditCard,
  MdMotorcycle,
  MdCardGiftcard,
  MdShoppingCart,
  MdCameraAlt,
  MdPhoneAndroid,
  MdPhoneInTalk,
  MdAccountBalanceWallet,
  MdAirplanemodeActive,
  MdFitnessCenter,
  MdLocalLaundryService,
  MdLocalMovies,
  MdMonetizationOn,
  MdPeople,
  MdTrain,
} from 'react-icons/md';
import {
  FaBusinessTime,
  FaCat,
  FaChurch,
  FaDog,
  FaHeartbeat,
  FaHome,
  FaHospital,
  FaMosque,
  FaMusic,
  FaPiggyBank,
  FaShoppingBag,
} from 'react-icons/fa';
import { AiFillCar, AiFillGolden, AiOutlineStock } from 'react-icons/ai';
import {
  GiCoffeeCup,
  GiCupcake,
  GiElectric,
  GiPayMoney,
  GiReceiveMoney,
} from 'react-icons/gi';
import { SiNetflix } from 'react-icons/si';
import { BsFileText, BsShieldShaded } from 'react-icons/bs';
import { IoIosBusiness, IoIosWater } from 'react-icons/io';
import { BiDonateHeart } from 'react-icons/bi';
import { RiBookOpenLine, RiSafeLine } from 'react-icons/ri';
import { ImSpoonKnife } from 'react-icons/im';

export const getIcons = (name: string) => {
  switch (name) {
    case 'wifi':
      return <MdWifi />;
    case 'gas-oil':
      return <MdLocalGasStation />;
    case 'child':
      return <MdChildCare />;
    case 'credit-card':
      return <MdCreditCard />;
    case 'motor-cycle':
      return <MdMotorcycle />;
    case 'gift':
      return <MdCardGiftcard />;
    case 'dog':
      return <FaDog />;
    case 'hospital':
      return <FaHospital />;
    case 'cart':
      return <MdShoppingCart />;
    case 'home':
      return <FaHome />;
    case 'church':
      return <FaChurch />;
    case 'mosque':
      return <FaMosque />;
    case 'gold':
      return <AiFillGolden />;
    case 'handphone':
      return <MdPhoneAndroid />;
    case 'phone-talk':
      return <MdPhoneInTalk />;
    case 'cat':
      return <FaCat />;
    case 'car':
      return <AiFillCar />;
    case 'music':
      return <FaMusic />;
    case 'camera':
      return <MdCameraAlt />;
    case 'cupcake':
      return <GiCupcake />;
    case 'coffee-cup':
      return <GiCoffeeCup />;
    case 'heart-break':
      return <FaHeartbeat />;
    case 'stock':
      return <AiOutlineStock />;
    case 'bag':
      return <FaShoppingBag />;
    case 'water':
      return <IoIosWater />;
    case 'spoon-fork':
      return <ImSpoonKnife />;
    case 'book':
      return <RiBookOpenLine />;
    case 'safe':
      return <RiSafeLine />;
    case 'donate-heart':
      return <BiDonateHeart />;
    case 'business-bag':
      return <FaBusinessTime />;
    case 'business-building':
      return <IoIosBusiness />;
    case 'plane':
      return <MdAirplanemodeActive />;
    case 'receive-money':
      return <GiReceiveMoney />;
    case 'give-money':
      return <GiPayMoney />;
    case 'electricity':
      return <GiElectric />;
    case 'account-balance':
      return <MdAccountBalanceWallet />;
    case 'moneytization':
      return <MdMonetizationOn />;
    case 'people':
      return <MdPeople />;
    case 'fitness':
      return <MdFitnessCenter />;
    case 'train':
      return <MdTrain />;
    case 'laundry':
      return <MdLocalLaundryService />;
    case 'movie':
      return <MdLocalMovies />;
    case 'netflix':
      return <SiNetflix />;
    case 'piggy-bank':
      return <FaPiggyBank />;
    case 'bill':
      return <BsFileText />;
    case 'shield':
      return <BsShieldShaded />;
  }
};
