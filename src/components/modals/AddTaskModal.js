import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  FormControl,
  Input,
  TextArea,
  PresenceTransition,
  ChevronDownIcon,
  Divider,
} from 'native-base';

const initialValues = { name: '', description: '' };

const AddTaskModal = (props) => {
  const { onSubmit, onCancel } = props;
  const [inputs, setInputs] = useState(initialValues);
  const [detailsHidden, setDetailsHidden] = useState(true);

  const handleOnChange = (key, value) => {
    setInputs({ ...inputs, [key]: value });
  };

  const handleSubmit = () => {
    onSubmit(inputs);
    setInputs(initialValues);
  };

  return (
    <Modal.Content maxWidth="400px">
      <Modal.CloseButton />
      <Modal.Header>Todo information</Modal.Header>
      <Modal.Body>
        <FormControl>
          <FormControl.Label isRequired>Name</FormControl.Label>
          <Input
            type="text"
            onChangeText={(v) => handleOnChange('name', v)}
            value={inputs.name}
            placeholder="Todo name.."
            autoFocus
            my={2}
          />

          <Button
            mx={-2.5}
            size="md"
            alignSelf="flex-start"
            endIcon={<ChevronDownIcon />}
            variant="link"
            colorScheme="muted"
            onPress={() => setDetailsHidden(!detailsHidden)}>
            Details
          </Button>
          <Divider />
          <PresenceTransition visible={!detailsHidden}>
            <TextArea
              onChangeText={(v) => handleOnChange('description', v)}
              value={inputs.description}
              placeholder="Details about this todo.."
              my={2}
            />
          </PresenceTransition>
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

AddTaskModal.propTypes = {
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
};

AddTaskModal.defaultProps = {
  onCancel: () => null,
  onSubmit: () => null,
};

export default AddTaskModal;
