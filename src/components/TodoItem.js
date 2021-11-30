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

const fontColor = '#000';
const bgColor = 'blue.300';

const TodoItem = (props) => {
  const item = {
    id: props.id,
    name: props.name,
    isDone: props.isDone,
    description: props.description,
  };
  const { onMarkAsDone, onEdit, onDelete, onPress } = props;

  const handleOnPress = () => {
    if (item.description) {
      onPress(item);
    }
  };
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
      backgroundColor={bgColor}>
      <Container flexDirection="row" alignItems="center">
        <Checkbox
          value={item.isDone.toString()}
          my={3}
          mr={3}
          size="lg"
          colorScheme="info"
          rounded={20}
          isChecked={item.isDone}
          onChange={(selected) => onMarkAsDone(item, selected)}
          accessibilityLabel="is the task done"
        />
        <Pressable onPress={handleOnPress} accessibilitiLabel="Todo details">
          <Text mx={3} strikeThrough={item.isDone} fontSize={22} color={fontColor}>
            {item.name}
          </Text>
        </Pressable>
      </Container>
      <Menu
        w={110}
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
  onPress: PropTypes.func,
};

TodoItem.defaultProps = {
  name: 'dummy',
  isDone: false,
  description: null,
  onEdit: () => null,
  onDelete: () => null,
  onMarkAsDone: () => null,
  onPress: () => null,
};

export default TodoItem;
