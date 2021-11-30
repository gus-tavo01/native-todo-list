import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, FormControl, Input } from 'native-base';

const initialValues = { name: '' };

const AddListModal = (props) => {
  const { onSubmit, onCancel } = props;
  const [inputs, setInputs] = useState(initialValues);

  const handleOnChange = (value) => {
    setInputs({ ...inputs, name: value });
  };

  const handleSubmit = () => {
    onSubmit(inputs);
    setInputs(initialValues);
  };

  return (
    <Modal.Content maxWidth="400px">
      <Modal.CloseButton />
      <Modal.Header>Add a new entry</Modal.Header>
      <Modal.Body>
        <FormControl>
          <FormControl.Label>Name</FormControl.Label>
          <Input
            type="text"
            onChangeText={handleOnChange}
            value={inputs.name}
            placeholder="Name"
            autoFocus
          />
        </FormControl>
      </Modal.Body>
      <Modal.Footer justifyContent="space-between">
        <Button variant="link" colorScheme="secondary" onPress={onCancel}>
          Cancel
        </Button>
        <Button onPress={handleSubmit} colorScheme="info">
          Add
        </Button>
      </Modal.Footer>
    </Modal.Content>
  );
};

AddListModal.propTypes = {
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
};

AddListModal.defaultProps = {
  onCancel: () => null,
  onSubmit: () => null,
};

export default AddListModal;
