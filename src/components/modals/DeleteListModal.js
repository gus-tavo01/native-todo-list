import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'native-base';

const DeleteListModal = ({ onSubmit, onCancel }) => (
  <Modal.Content maxWidth="400px">
    <Modal.CloseButton />
    <Modal.Header>Heads up</Modal.Header>
    <Modal.Body>You are about to delete this entire list.</Modal.Body>
    <Modal.Footer justifyContent="space-between">
      <Button variant="link" colorScheme="secondary" onPress={onCancel}>
        Cancel
      </Button>
      <Button onPress={onSubmit} colorScheme="light">
        Delete
      </Button>
    </Modal.Footer>
  </Modal.Content>
);

DeleteListModal.propTypes = {
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

export default DeleteListModal;
