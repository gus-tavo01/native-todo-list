import React, { useMemo } from 'react';
import { Box, CheckIcon, CircleIcon, Pressable, Progress, Text } from 'native-base';

const bgColor = 'blue.300';
const fontColor = '#000';

const ListItem = ({ id, name, tasks, onPress }) => {
  const handleOnPress = () => onPress(id);

  const finishedTasks = useMemo(() => tasks.filter((t) => t.isDone === 1).length, [tasks]);

  const renderIcon = () => {
    if (finishedTasks === tasks.length && tasks.length > 0) {
      return <CheckIcon size="sm" color="emerald.400" />;
    }
    return <CircleIcon size="sm" color="gray.200" />;
  };

  return (
    <Pressable onPress={handleOnPress}>
      <Box
        w={160}
        h={180}
        rounded={10}
        backgroundColor={bgColor}
        p={3}
        justifyContent="space-between">
        <Box justifyContent="flex-end" flexDir="row">
          {renderIcon()}
        </Box>

        <Text color={fontColor}>{name?.toUpperCase()}</Text>

        <Box>
          <Text color={fontColor}>
            Finished {finishedTasks} of {tasks.length}
          </Text>
          <Progress mt={1} min={0} value={finishedTasks} max={tasks.length} colorScheme="primary" />
        </Box>
      </Box>
    </Pressable>
  );
};

ListItem.defaultProps = {
  name: 'Tasks List',
  tasks: [],
};

export default ListItem;
