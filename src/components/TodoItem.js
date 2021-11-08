import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Checkbox,
  Menu,
  Pressable,
  Stack,
  Divider,
  ThreeDotsIcon,
  Container,
} from 'native-base';

const TodoItem = (props) => {
  const item = { id: props.id, name: props.name, isDone: props.isDone };
  const { onMarkAsDone, onEdit, onDelete } = props;
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      maxWidth={350}
      minWidth={300}
      px={2}
      my={3}
      rounded={15}
      backgroundColor="blue.200">
      <Container flexDirection="row" alignItems="center">
        <Checkbox
          value={item.isDone.toString()}
          my={3}
          mr={3}
          size="lg"
          colorScheme="success"
          rounded={20}
          isChecked={item.isDone}
          onChange={(selected) => onMarkAsDone(item, selected)}
          accessibilityLabel="is the task done"
        />
        <Text mx={3} strikeThrough={item.isDone} fontSize={22}>
          {item.name}
        </Text>
      </Container>
      <Menu
        w="150"
        trigger={(triggerProps) => {
          return (
            <Pressable accessibilityLabel="More options menu" {...triggerProps}>
              <ThreeDotsIcon />
            </Pressable>
          );
        }}>
        <Menu.Item onPress={() => onEdit(item)}>Edit</Menu.Item>
        <Divider />
        <Menu.Item onPress={() => onDelete(item)}>Delete</Menu.Item>
      </Menu>
    </Stack>
  );
};

TodoItem.propTypes = {
  name: PropTypes.string.isRequired,
  isDone: PropTypes.bool,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onMarkAsDone: PropTypes.func,
};

TodoItem.defaultProps = {
  name: 'dummy',
  isDone: false,
  onEdit: () => null,
  onDelete: () => null,
  onMarkAsDone: () => null,
};

export default TodoItem;
