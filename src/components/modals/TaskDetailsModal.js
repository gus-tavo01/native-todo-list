import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'native-base';

const TaskDetailsModal = (props) => {
  const { onSubmit, task } = props;
  const { name, description } = task;

  return (
    <Modal.Content maxWidth="400px">
      <Modal.CloseButton />
      <Modal.Header>{name}</Modal.Header>
      <Modal.Body>{description}</Modal.Body>
      <Modal.Footer justifyContent="flex-end">
        <Button.Group space={2}>
          <Button onPress={onSubmit} colorScheme="info">
            OK
          </Button>
        </Button.Group>
      </Modal.Footer>
    </Modal.Content>
  );
};

TaskDetailsModal.propTypes = {
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  task: PropTypes.shape({ name: PropTypes.string, description: PropTypes.string }),
};

TaskDetailsModal.defaultProps = {
  onCancel: () => null,
  onSubmit: () => null,
  task: {
    name: 'No name',
    description: 'No description',
  },
};

export default TaskDetailsModal;
