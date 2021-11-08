import React, { useMemo } from 'react';
import { Box, MoonIcon, Pressable, Progress, Text } from 'native-base';

const ListItem = ({ id, name, tasks, icon, onPress }) => {
  const getIcon = () => {
    if (!icon) return <MoonIcon size="sm" />;

    // TODO
    // handle when icon is provided
    // map given icon on a component icon
  };

  const handleOnPress = () => onPress(id);

  const finishedTasks = useMemo(() => tasks.filter((t) => t.isDone === 1).length, [tasks]);

  return (
    <Pressable onPress={handleOnPress}>
      <Box
        w={160}
        h={180}
        rounded={10}
        backgroundColor="emerald.300"
        p={3}
        justifyContent="space-between">
        {getIcon()}

        {name?.toUpperCase()}

        <Box>
          <Text>
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
