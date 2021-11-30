import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, FormControl, Input } from 'native-base';

const EditListModal = (props) => {
  const { onSubmit, onCancel, list } = props;

  const [inputs, setInputs] = useState({ name: list.name });

  const handleOnInputChange = (value) => {
    setInputs({ ...inputs, name: value });
  };

  const handleOnSubmit = () => {
    onSubmit(inputs);
  };

  return (
    <Modal.Content maxWidth="400px">
      <Modal.CloseButton />
      <Modal.Header>Update Information</Modal.Header>
      <Modal.Body>
        <FormControl>
          <FormControl.Label>Name</FormControl.Label>
          <Input
            type="text"
            onChangeText={handleOnInputChange}
            value={inputs.name}
            placeholder="List name"
            autoFocus
          />
        </FormControl>
      </Modal.Body>
      <Modal.Footer justifyContent="space-between">
        <Button variant="link" colorScheme="secondary" onPress={onCancel}>
          Cancel
        </Button>
        <Button
          onPress={handleOnSubmit}
          colorScheme="info"
          isDisabled={inputs.name.trim().length === 0}>
          Update
        </Button>
      </Modal.Footer>
    </Modal.Content>
  );
};

EditListModal.propTypes = {
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

EditListModal.defaultProps = {
  onCancel: () => null,
  onSubmit: () => null,
};

export default EditListModal;
