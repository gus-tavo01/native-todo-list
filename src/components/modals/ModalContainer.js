import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'native-base';

const AddItemModal = ({ isOpen, onClose, children }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    {children}
  </Modal>
);

AddItemModal.propTypes = {
  isOpen: PropTypes.bool,
  onCancel: PropTypes.func,
};

AddItemModal.defaultProps = {
  onCancel: () => null,
  isOpen: false,
};

export default AddItemModal;
