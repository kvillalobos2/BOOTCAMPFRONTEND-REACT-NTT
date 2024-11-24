import { useState } from "react";

export const useModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const handleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return {
    isModalVisible,
    openModal,
    closeModal,
    handleModal,
  };
};
