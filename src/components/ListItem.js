import React, { useMemo } from 'react';
import { Box, CheckIcon, CircleIcon, Pressable, Progress, Text } from 'native-base';

const ListItem = ({ id, name, tasks, icon, onPress }) => {
  const handleOnPress = () => onPress(id);

  const finishedTasks = useMemo(() => tasks.filter((t) => t.isDone === 1).length, [tasks]);

  const getIcon = () => {
    if (!icon) {
      if (finishedTasks === tasks.length && tasks.length > 0) {
        return <CheckIcon size="sm" />;
      }
      return <CircleIcon size="sm" />;
    }

    // TODO
    // handle when icon is provided
    // map given icon on a component icon
  };

  return (
    <Pressable onPress={handleOnPress}>
      <Box
        w={160}
        h={180}
        rounded={10}
        backgroundColor="#D3D3D3"
        p={3}
        justifyContent="space-between">
        <Box justifyContent="flex-end" flexDir="row">
          {getIcon(id)}
        </Box>
        {name?.toUpperCase()}

        <Box>
          <Text>
            Finished {finishedTasks} of {tasks.length}
          </Text>
          <Progress mt={1} min={0} value={finishedTasks} max={tasks.length} colorScheme="light" />
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
