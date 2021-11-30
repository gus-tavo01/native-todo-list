import React, { useState, useLayoutEffect, useMemo, useEffect } from 'react';
import {
  Center,
  VStack,
  Fab,
  AddIcon,
  Menu,
  Pressable,
  HamburgerIcon,
  Divider,
  Text,
  FlatList,
} from 'native-base';

import { useDispatch, useSelector } from 'react-redux';
import { setLists } from '../redux/actions/list-actions';
import { setTasks } from '../redux/actions/task-actions';

import DatabaseService from '../services/database-service';

import TodoItem from '../components/TodoItem';

import ModalContainer from '../components/modals/ModalContainer';
import DeleteListModal from '../components/modals/DeleteListModal';
import EditListModal from '../components/modals/EditListModal';

import AddTaskModal from '../components/modals/AddTaskModal';
import TaskDetailsModal from '../components/modals/TaskDetailsModal';

import useAppToast from '../hooks/useAppToast';

const initialModalState = { open: false, content: null };

const Tasks = ({ navigation, route }) => {
  const { listId } = route.params;

  const [tasksModal, setTasksModal] = useState(initialModalState);
  const currentList = useSelector((state) => state.lists.items.find((li) => li.id === listId));
  const tasks = useSelector((store) => store.tasks);

  const dispatch = useDispatch();
  const toast = useAppToast();
  const databaseService = useMemo(() => new DatabaseService(), []);

  useEffect(() => {
    const fetchTasks = async () => {
      const { payload } = await databaseService.getTasks(listId);
      dispatch(setTasks(payload));
    };

    fetchTasks();

    // clean up tasks
    return () => {
      dispatch(setTasks([]));
    };
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: currentList.name.toUpperCase() || 'Tasks',
      headerRight: () => (
        <Menu
          w={110}
          trigger={(triggerProps) => {
            return (
              <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                <HamburgerIcon />
              </Pressable>
            );
          }}>
          <Menu.Item onPress={handleOnListEdit}>Edit</Menu.Item>
          <Divider />
          <Menu.Item onPress={handleOnListDelete}>Delete</Menu.Item>
        </Menu>
      ),
    });
  }, [navigation, currentList]);

  const closeModal = () => setTasksModal(initialModalState);

  const handleOnListEdit = () => {
    setTasksModal({
      open: true,
      content: <EditListModal onSubmit={onListEdit} onCancel={closeModal} list={currentList} />,
    });
  };
  const onListEdit = async (updatedList) => {
    let resultMessage;

    closeModal();

    try {
      const result = await databaseService.updateList(listId, updatedList);

      if (!result.errorMessage) {
        dispatch(setLists(result.payload));
        resultMessage = 'List updated successfully';
      } else {
        resultMessage = result.errorMessage;
      }
    } catch (err) {
      resultMessage = err.message;
    }

    toast.show(resultMessage);
  };

  const handleOnListDelete = () => {
    setTasksModal({
      open: true,
      content: <DeleteListModal onSubmit={onListDelete} onCancel={closeModal} />,
    });
  };
  const onListDelete = async () => {
    try {
      closeModal();

      const result = await databaseService.deleteList(listId);

      if (!result.errorMessage) {
        toast.show('List removed successfully');
        navigation.navigate('Lists');
        dispatch(setLists(result.payload));
      } else {
        toast.show(result.errorMessage);
      }
    } catch (err) {
      toast.show(err.message);
    }
  };

  // #region tasks handlers
  const handleOnTaskAdd = () => {
    setTasksModal({
      open: true,
      content: <AddTaskModal onSubmit={onTaskAdd} onCancel={closeModal} />,
    });
  };
  const onTaskAdd = async (newTask) => {
    if (newTask.name.trim().length === 0) return;

    closeModal();

    let statusMessage;

    const { payload, errorMessage } = await databaseService.addTask(listId, newTask);
    if (errorMessage) {
      statusMessage = errorMessage;
    } else {
      statusMessage = 'Task added successfully';
      dispatch(setTasks(payload));
    }

    toast.show(statusMessage);
  };

  const handleOnTaskCheck = async (task, isSelected) => {
    try {
      const update = { ...task, isDone: isSelected ? 1 : 0 };
      const { payload, errorMessage } = await databaseService.updateTask(listId, task.id, update);
      if (!errorMessage) {
        dispatch(setTasks(payload));
      } else {
        toast.show('Task cannot be updated');
      }
    } catch (err) {
      toast.show(err.message);
    }
  };

  const handleOnTaskEdit = (task) => {
    setTasksModal({
      open: true,
      content: (
        <EditListModal
          onSubmit={(newTask) => onTaskEdit(task.id, newTask)}
          list={task}
          onCancel={closeModal}
        />
      ),
    });
  };

  const onTaskEdit = async (taskId, update) => {
    let statusMessage;

    try {
      closeModal();
      const result = await databaseService.updateTask(listId, taskId, update);

      if (!result.errorMessage) {
        dispatch(setTasks(result.payload));
        statusMessage = 'Task updated successfully';
      } else {
        statusMessage = result.errorMessage;
      }
    } catch (err) {
      statusMessage = err.message;
    }

    toast.show(statusMessage);
  };

  const handleOnTaskDelete = async (task) => {
    let statusMessage;
    try {
      const result = await databaseService.deleteTask(listId, task.id);
      if (!result.errorMessage) {
        statusMessage = 'Task removed successfully';

        dispatch(setTasks(result.payload));
      } else {
        statusMessage = result.errorMessage;
      }
    } catch (err) {
      statusMessage = err.message;
    }
    toast.show(statusMessage);
  };

  const handleOnTaskPress = async (task) => {
    setTasksModal({
      open: true,
      content: <TaskDetailsModal onSubmit={closeModal} task={task} />,
    });
  };
  // #endregion tasks handlers

  return (
    <VStack alignItems="center">
      <FlatList
        data={tasks || []}
        keyExtractor={(t) => t.id}
        renderItem={({ item }) => (
          <TodoItem
            key={item.id}
            id={item.id}
            name={item.name}
            isDone={item.isDone === 1}
            description={item.description}
            onEdit={handleOnTaskEdit}
            onDelete={handleOnTaskDelete}
            onMarkAsDone={handleOnTaskCheck}
            onPress={handleOnTaskPress}
          />
        )}
      />

      {tasks?.length === 0 && (
        <Center w={64} h={20} mt={10}>
          <Text fontSize={18}>This list is empty 🙄</Text>
        </Center>
      )}

      <ModalContainer isOpen={tasksModal.open} onClose={() => setTasksModal(initialModalState)}>
        {tasksModal.content}
      </ModalContainer>

      <Fab onPress={handleOnTaskAdd} position="absolute" icon={<AddIcon />} colorScheme="info" />
    </VStack>
  );
};

export default Tasks;
