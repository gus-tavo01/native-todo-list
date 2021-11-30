import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, FormControl, Input, TextArea } from 'native-base';

const EditTaskModal = (props) => {
  const { onSubmit, onCancel, task } = props;

  const [inputs, setInputs] = useState({ name: task.name, description: task.description });

  const handleOnInputChange = (key, value) => {
    setInputs({ ...inputs, [key]: value });
  };

  const handleOnSubmit = () => {
    onSubmit(inputs);
  };

  return (
    <Modal.Content maxWidth="400px">
      <Modal.CloseButton />
      <Modal.Header>Update Task Information</Modal.Header>
      <Modal.Body>
        <FormControl>
          <FormControl.Label isRequired>Name</FormControl.Label>
          <Input
            type="text"
            onChangeText={(v) => handleOnInputChange('name', v)}
            value={inputs.name}
            placeholder="Todo name.."
          />

          <FormControl.Label>Description</FormControl.Label>
          <TextArea
            onChangeText={(v) => handleOnInputChange('description', v)}
            value={inputs.description}
            placeholder="Optional todo details.."
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

EditTaskModal.propTypes = {
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

EditTaskModal.defaultProps = {
  onCancel: () => null,
  onSubmit: () => null,
};

export default EditTaskModal;
